import React from 'react';
import {Link} from 'react-router-dom';
import User from '../../interfaces/UserInterface';

interface Props {
    user: User
}

const LoggedHeader = (props: Props) => {

    return (
        <>
            <Link className="btn btn-sm btn-outline-secondary ml-3" to="/profile">{props.user.name}</Link>
            <Link className="btn btn-sm btn-outline-secondary ml-3" to="/logout">Se déconnecter</Link>
        </>
    )
}

export default LoggedHeader;