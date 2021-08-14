import { Redirect } from '@reach/router';
import React, { useContext , useEffect ,useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import RelativeViews from './RelativeViews';
import Prof from './Prof';
import axios from 'axios';

const Customer = ({ id }) => {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState({})
    useEffect(() => {
        if(user._id !== id){
            axios.get('http://localhost:8000/api/users/'+id)
            .then(res => {
                setData(res.json)
                console.log(res.json)
            })
            .catch(err => console.log(err))
        }
    }, [id])
    return (
        <div>
            {
                user._id === id ?
                    <Prof data={user} /> :
                    <Redirect to="/" noThrow />
            }
        </div>
    )
}

export default Customer
