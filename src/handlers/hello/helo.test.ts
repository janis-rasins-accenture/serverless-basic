import {
  APIGatewayEvent,
  APIGatewayEventIdentity,
  APIGatewayProxyEventMultiValueHeaders,
} from 'aws-lambda';
import * as HelloHandler from './hello';

describe('Unit test for AWS lambda hello handler', () => {
  let spyHelloCall: jest.SpyInstance;
  beforeAll(() => {
    spyHelloCall = jest.spyOn(HelloHandler, 'handler');
  });
  const mockAPIGatewayEvent: APIGatewayEvent = {
    body: null,
    headers: {
      'user-agent': 'PostmanRuntime/7.32.2',
      accept: '*/*',
      'cache-control': 'no-cache',
      'postman-token': '3a0946b9-32e0-4af6-9e05-674c17a080bb',
      host: 'localhost:4000',
      'accept-encoding': 'gzip, deflate, br',
      connection: 'keep-alive',
    },
    isBase64Encoded: false,
    pathParameters: null,
    queryStringParameters: null,
    requestContext: {
      accountId: 'offlineContext_accountId',
      apiId: 'offlineContext_apiId',
      authorizer: {
        jwt: {},
      },
      domainName: 'offlineContext_domainName',
      domainPrefix: 'offlineContext_domainPrefix',
      requestId: 'offlineContext_resourceId',
      routeKey: 'GET /local/hello',
      stage: '$default',
      httpMethod: 'GET',
      protocol: 'HTTP/1.1',
      path: '/local/hello',
      requestTimeEpoch: 1686568437839,
      identity: {} as APIGatewayEventIdentity,
      resourceId: '123',
      resourcePath: 'path',
    },
    stageVariables: null,
    httpMethod: 'GET',
    multiValueHeaders: {} as APIGatewayProxyEventMultiValueHeaders,
    path: '/local/hello',
    resource: '',
    multiValueQueryStringParameters: null,
  };
  const expectedBodyMessage =
    'Go Serverless v3.0! Your function executed successfully!';
  const responseData = {
    body: null,
    headers: {
      'user-agent': 'PostmanRuntime/7.32.2',
      accept: '*/*',
      'cache-control': 'no-cache',
      'postman-token': '3a0946b9-32e0-4af6-9e05-674c17a080bb',
      host: 'localhost:4000',
      'accept-encoding': 'gzip, deflate, br',
      connection: 'keep-alive',
    },
    isBase64Encoded: false,
    pathParameters: null,
    queryStringParameters: null,
    requestContext: {
      accountId: 'offlineContext_accountId',
      apiId: 'offlineContext_apiId',
      authorizer: { jwt: {} },
      domainName: 'offlineContext_domainName',
      domainPrefix: 'offlineContext_domainPrefix',
      requestId: 'offlineContext_resourceId',
      routeKey: 'GET /local/hello',
      stage: '$default',
      httpMethod: 'GET',
      protocol: 'HTTP/1.1',
      path: '/local/hello',
      requestTimeEpoch: 1686568437839,
      identity: {},
      resourceId: '123',
      resourcePath: 'path',
    },
    stageVariables: null,
    httpMethod: 'GET',
    multiValueHeaders: {},
    path: '/local/hello',
    resource: '',
    multiValueQueryStringParameters: null,
  };

  it('Handles hello', async () => {
    const callBody = {
      message: expectedBodyMessage,
      data: responseData,
    };
    const response = await HelloHandler.handler(mockAPIGatewayEvent);
    expect(spyHelloCall).toHaveBeenCalledTimes(1);
    expect(spyHelloCall).toHaveBeenCalledWith(mockAPIGatewayEvent);
    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.body).message).toEqual(callBody.message);
    expect(JSON.parse(response.body).data).toEqual(callBody.data);
  });
});
