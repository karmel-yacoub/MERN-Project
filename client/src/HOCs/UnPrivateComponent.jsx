import React,{useContext} from 'react';
import {Router, Redirect} from '@reach/router';
import {AuthContext} from '../Context/AuthContext';

const UnPrivateComponent = ({Component, roles, ForRestView, ForCustomerView, ForDeliveryView, ...rest}) => {
    const {isAuthenticated} = useContext(AuthContext);
    

    return (
        <div>
            {/* {
                isAuthenticated ?
                <Component ForRestView={} ForCustomerView={} ForDeliveryView={}/>:
                <Redirect to="/login" noThrow />
            }
             */}
        </div>
    )
}

export default UnPrivateComponent