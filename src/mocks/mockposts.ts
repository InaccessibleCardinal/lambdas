import { Post } from '../types/Post';

export default async function getPosts(): Promise<Post[]> {
    return [
        {
            id: '123',
            body: 'some content there',
            title: 'post 1',
            author: 'sam lee',
        },
        {
            id: '123',
            body: 'some content here',
            title: 'post 2',
            author: 'al smith',
        },
        {
            id: '123',
            body: 'some more content',
            title: 'post 3',
            author: 'jen lee',
        },
    ];
}
