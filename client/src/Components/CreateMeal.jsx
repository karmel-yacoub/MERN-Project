import React, {useState, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AuthService from '../Services/AuthService';
import {AuthContext} from '../Context/AuthContext';
import {Link, navigate} from '@reach/router'
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <a color="inherit" href="https://material-ui.com/">
        Your Website
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CreateMeal(props) {
    const {user, setUser, isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const [name, setName] = useState("");
    const [price, setPrice] = useState();
    const [description, setDescription] = useState("");
    const [disabled , setDisabled] = useState(true);
    const [error , setError] =useState('')
    const classes = useStyles();

    // const {user, setUser, isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    const create = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/menuitems', {
            name,
            price,
            description,
        })
            .then(res=>{
                console.log('result' , res)
                navigate('/restaurats/'+user._id)
            })
    };

    const checkPrice = (e) => {
        setPrice(e.target.value)
        if(e.target.value === 0 | e.target.value.length < 1 ){
            setDisabled(true)
            setError('Price should be greater than zero $')
        }
        else{
            setDisabled(false);
            setError('');
        }
    }



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h3" variant="h5">
          Create Meal
        </Typography>
        <form className={classes.form} noValidate onSubmit={create}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Meal Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
          />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="price"
            label="Price"
            type="price"
            id="price"
            autoComplete="price"
            value={price}
            onChange={(e) => checkPrice(e)}
          />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Description"
            label="Description"
            type="Description"
            id="Description"
            autoComplete="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />



          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={disabled}
          >
            Create
          </Button>
          <p>{error}</p>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}