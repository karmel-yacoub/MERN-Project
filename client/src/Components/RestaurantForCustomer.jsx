import { Redirect } from '@reach/router';
import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import RelativeViews from './RelativeViews';
import Prof from './Prof';

const RestaurantForCustomer = ({ id }) => {
    const { user } = useContext(AuthContext);
    return (
        <div>
            {
                user._id !== id ? <p>Hello</p>
                                : user._id === id ?
                                <Prof /> :
                                <Redirect to="/" noThrow />
            }
        </div>
    )
}

export default RestaurantForCustomer
