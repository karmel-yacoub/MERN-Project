import { Redirect } from '@reach/router';
import React,{useContext} from 'react';
import {AuthContext} from '../Context/AuthContext';

const RelativeViews = ({ForRestView, ForCustomerView, ForDeliveryView}) => {
    const {user} = useContext(AuthContext);
    return (
        <div>
            {
                user.genre === "restaurant" ?
                <ForRestView /> :
                user.genre === "customer" ?
                <ForCustomerView /> :
                user.genre === "delivery" ?
                <ForDeliveryView /> :
                <Redirect to="/" noThrow/>
                 
            }
            
        </div>
    )
}

export default RelativeViews
