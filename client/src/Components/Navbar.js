import React, {useContext ,useEffect , useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link, navigate} from '@reach/router'
import {AuthContext} from '../Context/AuthContext';
import AuthService from '../Services/AuthService';


const useStyles = makeStyles((theme, pos) => ({
    navStyle: {
        height: '70px',
        background: 'lightblue',
        display: 'flex',
        flexDirection: 'row',
        position:pos,
        justifyContent: 'space-between',
        alignItems:'center',
        padding:'30px'
    }

  }));

const Navbar = (props) => {
    const {user, setUser, isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const [loaded , setLoaded] = useState(true)
  console.log(user);
    const classes = useStyles(props.position);

    useEffect(() => {
        setLoaded(!loaded)
    }, [isAuthenticated])

    const logout = () => {
        AuthService.logout().then(res => {
            setUser({name:"", genre:""});
            setIsAuthenticated(false);
            navigate("/")
        })

    }

    return (
        <nav className={classes.navStyle}>
            <h2>{props.title}</h2>
            {
            isAuthenticated ?
            <h3 className={classes.navStyle} style={{width:'15%'}}>
                {/* <Link onClick={logout}>Logout</Link> */}
                <button onClick={logout}>Logout</button>
            </h3>
            :
            <h3 className={classes.navStyle} style={{width:'15%'}}>
                <Link to={props.ref1}>{props.link1}</Link>
                <Link to={props.ref2}>{props.link2}</Link>
            </h3>
            }
            
        </nav>
    )
}

export default Navbar