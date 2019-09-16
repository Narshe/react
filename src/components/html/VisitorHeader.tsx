import React from 'react';
import {Link} from 'react-router-dom';

const VisitorHeader = () => {

    return (
        <React.Fragment>
            <Link className="btn btn-sm btn-outline-secondary" to="/login">Se connecter</Link>
            <Link className="btn btn-sm btn-outline-secondary ml-3" to="/register">S'inscrire</Link>
        </React.Fragment>   
    )
}

export default VisitorHeader;