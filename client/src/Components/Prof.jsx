import React, { useContext ,useEffect , useState } from 'react';
import styles from '../styles/css/profile.module.css';
import { AuthContext } from '../Context/AuthContext'
import {Link} from '@reach/router'

const Prof = props => {
    const {data} = props;
    const { user } = useContext(AuthContext);
    // const [visitedUser , setVisitedUser] = useState({})
    // const [loaded , setLoaded] = useState(false)

    console.log('test',data)

    // useEffect(() => {
    //     if(data._id === user._id){
    //         setVisitedUser(user)
    //         console.log("equal" , data)
    //     }
    //     if (data._id !== user._id){
    //         setVisitedUser(data)
    //         console.log("not equal" , data)
    //     }
    //     console.log("daaaaata" , data)
    //     setLoaded(true)
    // }, [])
   
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