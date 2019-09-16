import Post from './PostInterface';

export default interface UserInterface 
{   
    [key:string]: any;
    id: number | null | string;
    name: string;
    password?: string;
    email: string;
    posts?: Post[];
}