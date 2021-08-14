import { Redirect } from '@reach/router';
import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const RelativeViews = ({ ForRestView, ForCustomerView, ForDeliveryView, id }) => {
    const { user } = useContext(AuthContext);
    return (
        <div style={{ margin: "1%" }}>
            {
                user.genre === "restaurant" ?
                    <ForRestView id={id} /> :
                    user.genre === "customer" ?
                        <ForCustomerView id={id} /> :
                        user.genre === "delivery" ?
                            <ForDeliveryView id={id} /> :
                            <Redirect to="/" noThrow />
            }
        </div>
    )
}

export default RelativeViews
