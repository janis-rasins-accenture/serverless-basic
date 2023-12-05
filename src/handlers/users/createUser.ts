import { PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { APIGatewayEvent } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { ValidationError } from 'yup';
import { CreateUserInputIF } from '../../types/users';
import { putItem } from '../../aws/dynamodb/putItem';
import { StandardResponse, returnData } from '../../utils/returnData';
import { userCreateSchema } from './validation/usersValidation';

export const handler = async (
  event: APIGatewayEvent
): Promise<StandardResponse> => {
  if (!event.body) {
    return returnData(400, 'No body!');
  }
  const { TABLE_NAME_USERS } = process.env;
  if (!TABLE_NAME_USERS) {
    console.log('No TABLE_NAME_USERS');
    return returnData(500, 'Internal server error');
  }
  const user: CreateUserInputIF = JSON.parse(event.body);

  try {
    await userCreateSchema.validate(user);
  } catch (error) {
    if (error instanceof ValidationError) {
      return returnData(400, error.message);
    }
    return returnData(500, 'Internal server error', { error });
  }

  const uuid = uuidv4();
  const params: PutCommandInput = {
    TableName: TABLE_NAME_USERS,
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
    const response = await putItem(params);
    if (response.success) {
      return returnData(200, 'Success!', { userId: uuid });
    }
    return returnData(400, 'Something goes wrong', response.error);
  } catch (error: any) {
    return returnData(500, 'Internal server error', error);
  }
};
