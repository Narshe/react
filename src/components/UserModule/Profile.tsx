import React from 'react';
import { Redirect, match } from "react-router-dom";
import { UserContext } from "../../store/UserProvider";
import User from "../../interfaces/UserInterface";
import UserStore from '../../store/UserStore';
import Post from '../PostModule/Post';


interface ProfileProps {

  
}

interface ProfileState {

    user: User;
    redirect: {to: string, hasTo: boolean};
}

export default class Profile extends React.Component<ProfileProps, ProfileState>
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

            this.setState({redirect: {to:'/', hasTo:true}})
        })
    }


    componentDidMount() {

        this.UserStore.find();
      
    }
    
  
    render() {

        let redirect = this.state.redirect.hasTo && <Redirect to={this.state.redirect.to} />;
        let {user} = this.state;

        return (
            
            <div className="container">
            {redirect}
            <div className="row">
                <div className="card col-12 col-md-9">
                    <div className="card-body">
                    <h5 className="card-title">Informations de l'utilisateur</h5>
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                    </div>
                </div>
                <ul className="list-group col-12 col-md-3 px-md-2">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Morbi leo risus</li>
                    <li className="list-group-item">Porta ac consectetur ac</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
            </div>
                { (user.posts  && user.posts.length > 0) ?
                    <div className="posts">
                        <h4>Articles de {user.name}</h4>
                        {
                            user.posts.map((post, index) => {
                                return <Post limit={3} key={`post_${index}`} post={post} />
                            })
                        }
                    </div>
                    :
                    <p>Aucun article pour le moment...</p>
                
                }
            </div>
        )
    }
}