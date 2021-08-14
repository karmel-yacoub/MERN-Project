import { Redirect } from '@reach/router';
import React, { useContext , useState , useEffect} from 'react';
import { AuthContext } from '../Context/AuthContext';
import RelativeViews from './RelativeViews';
import Prof from './Prof';
import OrdersTable from './OrdersTable';
import axios from 'axios';

const RestaurantForCustomer = ({ id }) => {
    const [data, setData] = useState({})
    const { user } = useContext(AuthContext);
    const [loaded , setLoaded] = useState(false)

    useEffect(() => {

        axios.get('http://localhost:8000/api/users/'+id)
        .then(res => {
            setData(res.data)
            console.log("rest", res)
            setLoaded(true)
        })
        .catch(err => console.log(err))


    }, [id])

    return (
        <div>
            { loaded &&         <>
                                    <Prof data={data}/>
                                {/* menu */}
                                </>
            }
        </div>
    )
}

export default RestaurantForCustomer
