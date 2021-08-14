import React, {useContext ,useEffect , useState} from 'react';
import {Link, navigate} from '@reach/router'
import {AuthContext} from '../Context/AuthContext';
import AuthService from '../Services/AuthService';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

const Navbar = (props) => {
    const {user, setUser, isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const [loaded , setLoaded] = useState(true)
    // const classes = useStyles(props.position);
    const classes = useStyles();

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
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={() => navigate("/")} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    {props.title}
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        
                    </Typography>
                    {
                        isAuthenticated ?
                        <Button onClick={logout} color="inherit">logout</Button> :
                        <>
                        <Button onClick={() => navigate("/login")} color="inherit">Login</Button>
                        <Button onClick={() => navigate("/registration")} color="inherit">Register</Button>
                        </>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar