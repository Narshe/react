import User from './UserInterface';

export default interface Post 
{
    id: number;
    user: User;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;

}