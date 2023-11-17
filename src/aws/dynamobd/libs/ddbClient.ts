import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const REGION = process.env.REGION ?? 'eu-west-1';
const ENDPOINT = process.env.DYNAMO_ENDPOINT ?? 'http://localhost:8010';

export const ddbClient = new DynamoDBClient({
  region: REGION,
  endpoint: ENDPOINT,
});
