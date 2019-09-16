import React from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from "../../store/UserProvider";
import LoginForm from './forms/LoginForm';
import UserStore from '../../store/UserStore';
import User from '../../interfaces/UserInterface';


interface LoginState {
    user: User;
    errors: string | null;
    redirect: boolean;
}

const initialUser: User = { id:null, name: '', password:'', email:'' }
const userStore: UserStore = new UserStore();

export default class Login extends React.PureComponent<Object, LoginState>
{

    static contextType  = UserContext;

    constructor(props: Object, context: any) {
        super(props);

        this.state = { 
            user: initialUser,
            errors: null,
            redirect: false
        }

        userStore.onChange((UserStore: UserStore)  =>  {

            if(UserStore.user) {  
                
                localStorage.setItem("user", JSON.stringify(UserStore.user));
                context.updateUser(UserStore.user);

                this.setState({redirect: true, user: initialUser})

            } else {
                this.setState({errors: 'Nom d\'utilisateur ou mot de passe incorect'});
            }
        });
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
        
        userStore.authenticate(this.state.user);
    }

    render() {


        let redirect = this.state.redirect && <Redirect to={`/`} />

        let error = this.getErrors();

        return (
            <div className="login-form">
                {redirect}
                {error}
                <LoginForm onChange={this.handleInputChange} onSubmit={this.handleSubmit}/>
            </div>
        )
    }
}