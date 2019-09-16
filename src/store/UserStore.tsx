import User from '../interfaces/UserInterface';
const axios = require('axios');

declare type ChangeCallback = (store: UserStore) => void;

export default class UserStore 
{   

    private callbacks: ChangeCallback[] = [];
    private _user: User | null = null;
    private _apiUrl: string = "/users";

    inform = () => {

        this.callbacks.forEach((cb) => cb(this));
    }

    onChange = (cb: ChangeCallback) => {
        
        this.callbacks.push(cb)
    }

    authenticate = (user: User) => {

        axios.post(`${this.url}/authenticate`, user)
        .then(({data}: User) => {      

            this.user = data;
        })
        .finally(() => {
            this.inform();
        })
    }

    create(user: User) {

        axios.post(`${this.url}/new`, user)
            .then(({data}: User) => {

                this.user = data;
            })
            .finally(() => {
                this.inform();
            })
    }

    find(path: number|string = 'profile') {


        axios.get(`/users/${path}`)
            .then(({data}: any ) => {
                
                this.user = data;
            })
            .catch(() => {
                this.user = null;
            })
            .finally(() => {
                this.inform();
            })
    }

    logout() {

        axios.get('/users/logout')
            .then(() => {
                
                this.user = null;
            })
            .finally(() => {
                this.inform();
            })
    }
  
    set user(user: User|null) { this._user = user; }

    get user() { return this._user }
    get url() { return this._apiUrl; }

}