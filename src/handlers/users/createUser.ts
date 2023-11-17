import { PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { APIGatewayEvent } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserInputIF } from '../../types/users';
import { putItem } from '../../aws/dynamobd/putItem';
import { StandardResponse, returnData } from '../../utils/returnData';

export const handler = async (
  event: APIGatewayEvent
): Promise<StandardResponse> => {
  if (!event.body) {
    return returnData(400, 'No body!');
  }
  const user: CreateUserInputIF = JSON.parse(event.body);
  const uuid = uuidv4();
  const params: PutCommandInput = {
    TableName: process.env.TABLE_NAME_USERS,
    Item: {
      userId: uuid,
      firstName: user.firstName,
      isActive: 1,
      lastName: user.lastName,
      email: user.email,
      userName: user.userName,
    },
  };
  try {
    await putItem(params);
    return returnData(200, 'Success!', { userId: uuid });
  } catch (error: any) {
    return returnData(400, 'Something goes wrong', error);
  }
};
