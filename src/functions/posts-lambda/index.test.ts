import { APIGatewayProxyEvent } from 'aws-lambda';
import lambdaFunc from './';

describe('PostsLambda func', () => {
  it('should get posts', async () => {
    const req = ({ headers: { Authorization: 'abc123' } } as unknown) as APIGatewayProxyEvent;
    const { statusCode, body } = await lambdaFunc(req);
    expect(statusCode).toBe(200);
    expect(JSON.parse(body).length).toBe(3);
  });

  it('should get an unauthorized response', async () => {
    const req = ({ headers: { Authorization: 'abc' } } as unknown) as APIGatewayProxyEvent;
    const { statusCode } = await lambdaFunc(req);
    expect(statusCode).toBe(401);
  });
});
