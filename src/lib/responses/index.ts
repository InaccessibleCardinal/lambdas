import { APIGatewayProxyResult } from 'aws-lambda';

export function makeErrorResponse(
  statusCode: number,
  message?: string,
  err?: Error
): APIGatewayProxyResult {
  if (message) {
    return { statusCode, body: message };
  } else if (err) {
    return { statusCode, body: err.message };
  } else {
    return { statusCode, body: 'Something went wrong. You mad.' };
  }
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
