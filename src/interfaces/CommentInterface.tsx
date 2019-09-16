import Post from './PostInterface';
import User from './UserInterface';


export default interface Comment {
    
    id: number;
    user: User;
    post: Post;
    content: string;
    created_at: string;
    updated_at: string;
}