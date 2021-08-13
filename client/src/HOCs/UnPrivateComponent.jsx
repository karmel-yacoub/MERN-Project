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
<<<<<<< HEAD
            } */}
            
=======
            }
             */}
>>>>>>> c20b2808beb427ec6e3d90cbea15836fd57669d5
        </div>
    )
}

export default UnPrivateComponent