import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export default interface Lambda {
  invoke(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>;
}
