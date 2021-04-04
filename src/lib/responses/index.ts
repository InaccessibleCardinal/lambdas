import { APIGatewayProxyResult } from 'aws-lambda';

export function makeErrorResponse(statusCode: number, err: Error): APIGatewayProxyResult {
  return { statusCode, body: JSON.stringify({ error: err.message }) };
}

export function makeSuccessResponse(
  statusCode: 200 | 201 | 204,
  data?: any
): APIGatewayProxyResult {
  if (data) {
    return { statusCode, body: JSON.stringify(data) };
  }
  return { statusCode, body: '' };
}
