import React, { useContext ,useEffect , useState } from 'react';
import styles from '../styles/css/profile.module.css';
import { AuthContext } from '../Context/AuthContext'
import {Link} from '@reach/router'

const Prof = props => {
    const {data} = props;
    const { user } = useContext(AuthContext);


    console.log('test',data)
   
    return (
        <>
        {
        <div className={styles.paper}><img className={styles.poster} src={data.picture} alt="" />
            <h2>Featured</h2>
            <h1>{data.name.toUpperCase()}</h1>
            <h3>Location: {data.location.toUpperCase()}</h3>
            <hr />
            <p>Phone Number: {data.phone.toUpperCase()}.</p>
            <p> Email: {data.email.toUpperCase()}.</p>
            <Link to='' className={styles.btn}>Edit Profile</Link>
            <div className={styles.space}></div>
        </div>
        }
        </>

    )
}

export default Prof