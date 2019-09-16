import React, { createContext, Component } from "react";
import User from '../interfaces/UserInterface';


interface Props {
  children: React.ReactNode
}

interface State {
    user?: User,
    updateUser: (user: User) => void
}

export const UserContext = createContext({});


export default class UserProvider extends Component<Props, State>
{

    constructor(props: Props) {
        
        super(props);

        let localUser = localStorage.getItem('user')

        this.state = {
            user: typeof localUser === "string" ? JSON.parse(localUser) : localUser,
            updateUser: this.updateUser
        }
    }

    updateUser = (user: User): void => {

      this.setState({user: user});
    }

    render() {
        return (
          <UserContext.Provider value={this.state}>
            {this.props.children}
          </UserContext.Provider>
        );
      }
}