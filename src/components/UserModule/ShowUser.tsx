import React from 'react';
import { Redirect, match } from "react-router-dom";
import { UserContext } from "../../store/UserProvider";
import User from "../../interfaces/UserInterface";
import UserStore from '../../store/UserStore';


interface Params {
    id?: string;
}

interface ProfileProps {

    match: match<Params>
}

interface ProfileState {

    user: User;
    redirect: {to: string, hasTo: boolean};
}

export default class ShowUser extends React.Component<ProfileProps, ProfileState>
{
    static contextType  = UserContext;
    private UserStore: UserStore = new UserStore();
    private initUser: User = {id: null, name:'', email:''}

    constructor(props: ProfileProps) {
        super(props);
        this.state = { 
            user: this.initUser,
            redirect: {to: '/', hasTo: false},
        }

        this.UserStore.onChange((UserStore: UserStore) => {

            if (UserStore.user) {

                return this.setState({user: UserStore.user}); 
            }

            this.setState({redirect: {to:'/profile', hasTo:true}})
        })
    }


    componentDidMount() {
        
        let userId = this.props.match.params.id;
        this.UserStore.user = this.context.user || null;

        if ((this.UserStore.user && userId) && this.UserStore.user.id === parseInt(userId)) {

            return this.setState({redirect: {to:'/profile', hasTo:true}})

        }

        this.UserStore.find(userId);
      
    }
    
  
    render() {

        console.log("Render");
        let redirect = this.state.redirect.hasTo && <Redirect to={this.state.redirect.to} />;
        let {user} = this.state;

        return (
            
            <div>
                {redirect}
                <div className="card">
                    <div className="card-body">
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                    </div>
                </div>


            </div>
        )
    }
}