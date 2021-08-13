import React,{useContext} from 'react';
import {Router, Redirect} from '@reach/router';
import {AuthContext} from '../Context/AuthContext';

const PrivateComponent = ({Component, roles, ...rest}) => {
    const {isAuthenticated, user} = useContext(AuthContext);
    

    return (
        <div>
            {
                isAuthenticated ?
                // roles.includes(user.role) ?
                <Component/>:
                // <Redirect to="/" noThrow />:
                <Redirect to="/login" noThrow />
            }
            
        </div>
    )
}

export default PrivateComponent
