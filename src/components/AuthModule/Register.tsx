import React from 'react';
import { Redirect } from 'react-router-dom';
import RegisterForm from './forms/RegisterForm';
import UserStore from '../../store/UserStore';
import User from '../../interfaces/UserInterface';


interface RegisterState {

    user: User;
    errors: string | null;
    redirect: boolean;
}

const initialUser: User = {
    id: null, 
    name: '',
    password: '', 
    email: ''
}

const initialState: RegisterState = {
     user: initialUser as User,
     errors: null,
     redirect: false
}

const userStore = new UserStore();

export default class Register extends React.Component<Object, RegisterState>
{   

    constructor(props: Object) {
        super(props);
        this.state = initialState

        userStore.onChange((UserStore: UserStore) => {

            if(UserStore.user)
            return this.setState({redirect: true, user:initialUser});

            this.setState({errors: 'Une erreur est servenue lors de l\'inscription'});

        })
    }

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        let {name, value} = e.target

        let newUser: User = this.state.user;

        newUser[name] = value

        this.setState({user: newUser})
    }   


    getErrors = () => {
        return this.state.errors && <div className="alert alert-danger">{this.state.errors}</div>    
    }

    handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();
       
        userStore.create(this.state.user);
    }

    render() {

        const redirect = this.state.redirect && <Redirect to={`/login`} />

        let error = this.getErrors();

        return (

            <div className="register-form">
                {redirect}
                {error}
                <RegisterForm onChange={this.handleInputChange} onSubmit={this.handleSubmit}/>
            </div>
           
        )
    }
}