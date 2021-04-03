import { APIGatewayProxyEvent } from 'aws-lambda';
import Lambda from '../../types/Lambda';
import { makeErrorResponse } from '../responses';

export default function authorize(
  target: Lambda,
  key: string,
  descriptor: PropertyDescriptor
): void {
  const originalLambda = descriptor.value;

  descriptor.value = async function (event: APIGatewayProxyEvent) {
    const { headers } = event;
    const isAuthorized = await checkIsAuthorized(headers);
    if (!isAuthorized) {
      return makeErrorResponse(401);
    }
    return originalLambda(event);
  };
}

async function checkIsAuthorized(headers: any): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (headers.Authorization === 'abc123') {
        resolve(true);
      } else {
        resolve(false);
      }
    }, 500);
  });
}
