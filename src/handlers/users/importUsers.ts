import { APIGatewayEvent } from 'aws-lambda';
import { ValidationError } from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { returnData } from '../../utils/returnData';
import { CreateUserInputIF, DynamoUserIF } from '../../types/users';
import { batchWrite } from '../../aws/dynamodb/batchWriteItems';
import { userCreateSchema } from './validation/usersValidation';

interface WriteUsersBatch {
  isSuccess: boolean;
  data: Object;
}

export const writeUsersBatch = async (
  users: CreateUserInputIF[]
): Promise<WriteUsersBatch> => {
  const { TABLE_NAME_USERS } = process.env;
  if (!TABLE_NAME_USERS) {
    console.log('No users table name!');
    return { isSuccess: false, data: { message: 'No users table name!' } };
  }
  const invalidUsers = [] as CreateUserInputIF[];
  const parsedUsers: DynamoUserIF[] = [];
  try {
    for (const user of users) {
      try {
        /* eslint-disable-next-line no-await-in-loop */
        await userCreateSchema.validate(user);
        parsedUsers.push({
          ...(user.avatarUrl && { avatarUrl: { S: user.avatarUrl } }),
          email: { S: user.email },
          firstName: { S: user.firstName },
          isActive: { N: 1 },
          userId: { S: uuidv4() },
          lastName: { S: user.lastName },
          userName: { S: user.userName },
        });
      } catch (error) {
        if (error instanceof ValidationError) {
          invalidUsers.push(user);
        }
      }
    }
    const result = await batchWrite(
      parsedUsers as unknown as Record<string, AttributeValue>[],
      TABLE_NAME_USERS
    );
    return {
      isSuccess: true,
      data: {
        invalidUsers,
        dynamoDbResponse: result.message,
      },
    };
  } catch (error: any) {
    return { isSuccess: false, data: { error: error.message } };
  }
};

export const handler = async (event: APIGatewayEvent) => {
  if (!event.body) {
    return returnData(400, 'No body!');
  }
  const users: CreateUserInputIF[] = JSON.parse(event.body);
  if (!users.length) {
    return returnData(400, 'No users!');
  }
  const response = await writeUsersBatch(users);
  if (response.isSuccess) {
    return returnData(200, 'Import users result', { result: response });
  }
  return returnData(400, 'Bad request', { result: response });
};
