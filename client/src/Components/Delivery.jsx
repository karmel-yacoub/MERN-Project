import { Redirect } from '@reach/router';
import React,{useContext} from 'react';
import {AuthContext} from '../Context/AuthContext';
import RelativeViews from './RelativeViews';

const Delivery = () => {
    const {user} = useContext(AuthContext);
    return (
        <div>
            <RelativeViews ForRestView={} ForCustomerView={} ForDeliveryView={} />
        </div>
    )
}

export default Delivery
