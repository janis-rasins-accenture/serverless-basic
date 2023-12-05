import {
  AttributeValue,
  BatchWriteItemCommand,
  BatchWriteItemCommandInput,
  WriteRequest,
} from '@aws-sdk/client-dynamodb';
import { ddbClient } from './libs/ddbClient';

const BATCH_MAX = 25;

export interface BatchWriteResponseIF {
  isSuccess: boolean;
  message: Record<string, WriteRequest[]>[] | string;
}

const batchWriteItems = async (
  writeRequest: WriteRequest[],
  tableName: string
): Promise<Record<string, WriteRequest[]>> => {
  const params: BatchWriteItemCommandInput = {
    RequestItems: {
      [tableName]: writeRequest,
    },
  };
  try {
    const response = await ddbClient.send(new BatchWriteItemCommand(params));
    return response.UnprocessedItems ?? {};
  } catch (error: any) {
    throw new Error(error);
  }
};

export const batchWrite = async (
  items: Record<string, AttributeValue>[],
  tableName: string
): Promise<BatchWriteResponseIF> => {
  if (!tableName) {
    return { isSuccess: false, message: 'No table name!' };
  }
  if (!items.length) {
    return { isSuccess: false, message: 'No items!' };
  }
  const BATCHES = Math.floor((items.length + BATCH_MAX - 1) / BATCH_MAX);
  const output: Record<string, WriteRequest[]>[] = [];

  for (let batch = 0; batch < BATCHES; batch += 1) {
    const itemsArray: WriteRequest[] = [];

    for (let ii = 0; ii < BATCH_MAX; ii += 1) {
      const index = batch * BATCH_MAX + ii;

      if (index >= items.length) break;

      itemsArray.push({
        PutRequest: {
          Item: items[index],
        },
      });
    }

    console.log('Batch', batch, 'write', itemsArray.length, 'items');
    try {
      /* eslint-disable-next-line no-await-in-loop */
      const unprocessedItems = await batchWriteItems(itemsArray, tableName);
      if (unprocessedItems?.length) {
        output.push(unprocessedItems);
      }
      console.log(`BatchWrite response: ${JSON.stringify(unprocessedItems)}`);
    } catch (error: unknown) {
      const err = error as Error;
      console.log(`BatchWrite error: ${err}`);
      throw new Error(err.message);
    }
  }
  return { isSuccess: true, message: output };
};
