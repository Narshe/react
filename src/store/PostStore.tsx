import Post from '../interfaces/PostInterface'
const axios = require('axios');

declare type ChangeCallback = (store: PostStore) => void;

export default class PostStore 
{   
    private _posts: Post[] = [];
    private _apiUrl: string = '/posts';
    private callbacks: ChangeCallback[] = [];
    private _error: string = '';
    
    inform = () => {

        this.callbacks.forEach((cb) => cb(this));
    }

    onChange = (cb: ChangeCallback) => {
        
        this.callbacks.push(cb)
    }

    getAll = () => {
        
        axios.get(`${this.url}`)
            .then(({data}: any) => {

                this.posts = data;
            })
            .catch((err: any) => {
                console.log(err)
            })  
            .finally(() => {
                this.inform()
            })
    }

    getPost = (id: number) => {
    
        axios.get(`${this.url}/${id}`)
            .then(({data}: any) => {
                
                this.posts = [data, ...this.posts];
            })
            .catch((err: any) => {
                this.error = '404';
            })  
            .finally(() => {
                this.inform()
            })
    }

    create = (title: string, content: string) => {

        axios.post(`${this.url}`, {title, content})

            .then(({data}: any) => {

                this.posts = [data, ...this.posts];

            }).catch(({data}: any) => {

                this.error = 'Titre ou contenu vide';
            })
            .finally(() => {
                this.inform()
            })
    }

    
    destroy = (post: Post) => {
        axios.delete(`${this.url}/${post.id}`,)
            .then(() => {
                this.posts = this.posts.filter((p) => p.id !== post.id);
                this.inform();
            })
    }
  
    lastInsertId = () => {
        return this.posts[0] ? this.posts[0].id : null;
    }

    set posts(posts: Post[]) { this._posts = posts}
    set error(error: string) { this._error = error}

    get error() { return this._error }
    get posts() { return this._posts }
    get url() { return this._apiUrl }
}