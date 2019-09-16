import React from 'react';
import { Route, Switch } from "react-router-dom";

import Login from '../AuthModule/Login';
import Register from '../AuthModule/Register';
import Logout from '../AuthModule/Logout';

const AuthRoutes = () => {

    return (
        <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/logout" exact component={Logout} />
        </Switch>
    )
}


export default AuthRoutes;