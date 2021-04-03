import { APIGatewayProxyEvent } from 'aws-lambda';
import Lambda from '../../types/Lambda';

export default function log(target: Lambda, key: string, descriptor: PropertyDescriptor): void {
  const originalLambda = descriptor.value;

  descriptor.value = function (event: APIGatewayProxyEvent) {
    console.info(
      `${target.constructor.name} 'invoke' method called with event: ${JSON.stringify(event)}`
    );
    return originalLambda(event);
  };
}
