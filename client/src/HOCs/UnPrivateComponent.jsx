import React, { useContext } from 'react';
import { Router, Redirect } from '@reach/router';
import { AuthContext } from '../Context/AuthContext';

const UnPrivateComponent = ({ Component, roles, ForRestView, ForCustomerView, ForDeliveryView, id, ...rest }) => {
    const { isAuthenticated } = useContext(AuthContext);


    return (
        <div style={{ display: "flex" }}>
            {
                isAuthenticated ?
                    <Component ForRestView={ForRestView} ForCustomerView={ForCustomerView} ForDeliveryView={ForDeliveryView} id={id} /> :
                    <Redirect to="/" noThrow />
            }
        </div>
    )
}

export default UnPrivateComponent