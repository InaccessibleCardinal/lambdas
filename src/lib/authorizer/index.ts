import { APIGatewayProxyEvent } from 'aws-lambda';
import Lambda from '../../types/Lambda';
import { makeErrorResponse } from '../responses';
import { Result } from '../../types/Result';

export default function authorize(
  target: Lambda,
  key: string,
  descriptor: PropertyDescriptor
): void {
  const originalLambda = descriptor.value;

  descriptor.value = async function (event: APIGatewayProxyEvent) {
    const { headers } = event;
    const { type, value } = await checkIsAuthorized(headers);
    if (type === 'error') {
      if (value.message === 'Unauthorized') {
        return makeErrorResponse(401, value as Error);
      } else {
        return makeErrorResponse(403, value as Error);
      }
    }
    return originalLambda(event);
  };
}

type AuthType = {
  statusCode: number;
  token: string;
  message: string;
};

async function checkIsAuthorized(headers: any): Promise<Result<AuthType>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { Authorization } = headers;
      if (!Authorization) {
        resolve({ type: 'error', value: new Error('Unauthorized') });
      } else {
        if (Authorization !== 'abc123') {
          resolve({ type: 'error', value: new Error('Forbidden') });
        } else {
          resolve({
            type: 'success',
            value: { statusCode: 200, token: 'goodtoken', message: 'auth success' },
          });
        }
      }
    }, 500);
  });
}
