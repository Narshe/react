import Comment from '../interfaces/CommentInterface';
import Post from '../interfaces/PostInterface';
const axios = require('axios');

declare type ChangeCallback = (store: CommentStore) => void;

export default class CommentStore
{   

    private callbacks: ChangeCallback[] = [];
    private _apiUrl: string = "/comments";

    private _comments: Comment[] = [];


    inform = () => {

        this.callbacks.forEach((cb) => cb(this));
    }

    onChange = (cb: ChangeCallback) => {
        
        this.callbacks.push(cb)
    }

    getAll(post: Post, limit:number|'all') {

        axios.get(`${this.url}/${post.id}/${limit}`)
            .then(({data}: any) => {
                this.comments = data
            })
            .catch((err: any) => {
                console.log(err)
            })
            .finally(() => {
                this.inform();
            })  
    }
    
    create(content:string, post: Post) {
        
        axios.post(`${this.url}`,{ content, post_id: post.id})
            .then(({data}: any) => {
                this.comments = [...this.comments, data]
            })
            .finally(() => {
                this.inform();
            })
    }

    destroy(comment: Comment) {

        axios.delete(`${this.url}/${comment.id}`)
            .then(({data}: any ) => {
                this.comments = this.comments.filter((c) => comment.id !== c.id)
            })
            .finally(() => {
                this.inform();
            })
    }

    set comments(comments: Comment[]) { this._comments = comments}

    get comments() { return this._comments}
    get url() { return this._apiUrl; }

}