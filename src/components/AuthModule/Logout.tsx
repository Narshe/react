import React from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from "../../store/UserProvider";
import UserStore from '../../store/UserStore';
import User from '../../interfaces/UserInterface';


interface LogoutState {

    redirect: boolean;
}

const userStore: UserStore = new UserStore();
const initialState: LogoutState = { redirect: false }

export default class Logout extends React.Component<Object, LogoutState>
{
    static contextType  = UserContext;
    
    constructor(props: Object) {
        super(props);
        this.state = initialState
        
        userStore.onChange((UserStore: UserStore) => {

            if (!UserStore.user) {
                this.context.updateUser(null);
                localStorage.removeItem('user');
            } 

            this.setState({redirect: true});
            
        })  
    }

    componentDidMount() {

        userStore.user = this.context.user || null;

        userStore.logout();
    }
 
    render() {

        let redirect = this.state.redirect && <Redirect to={`/`} />

        return (
            
            <>
                {redirect}
            </>
        )
    }
}