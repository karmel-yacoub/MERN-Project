import React, { useContext } from 'react';
import styles from '../styles/css/profile.module.css';
import { AuthContext } from '../Context/AuthContext'
import {Link} from '@reach/router'

const Prof = props => {
    const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    return (
        <div className={styles.paper}><img className={styles.poster} src={user.picture} />
            <h2>Featured</h2>
            <h1>{user.name.toUpperCase()}</h1>
            <h3>Location: {user.location.toUpperCase()}</h3>
            <hr />
            <p>Phone Number: {user.phone.toUpperCase()}.</p>
            <p> Email: {user.email.toUpperCase()}.</p>
            <Link to='' className={styles.btn}>Edit Profile</Link>
            <div className={styles.space}></div>
        </div>
    )
}

export default Prof