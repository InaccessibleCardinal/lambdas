import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { makeErrorResponse, makeSuccessResponse } from '../../lib/responses';
import authorize from '../../lib/authorizer';
import log from '../../lib/logger';
import getPosts from '../../mocks/mockposts';
import Lambda from '../../types/Lambda';

class PostsLambda implements Lambda {
  @log
  @authorize
  async invoke(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const posts = await getPosts();
      return makeSuccessResponse(200, posts);
    } catch (err) {
      return makeErrorResponse(500, new Error('Internal server error.'));
    }
  }
}

const p = new PostsLambda();

export default p.invoke;
