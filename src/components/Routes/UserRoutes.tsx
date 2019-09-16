import React from 'react';
import { Route, Switch } from "react-router-dom";
import Profile from '../UserModule/Profile';
import ShowUser from '../UserModule/ShowUser';

const UserRoutes = () => {

    return (
        <Switch>
            <Route path="/profile" exact component={Profile} />
            <Route path="/profile/:id" exact component={ShowUser} />
        </Switch>
    )
}


export default UserRoutes;