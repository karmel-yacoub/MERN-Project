import React,{useState,useContext} from 'react';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from '@reach/router';
import AuthService from '../Services/AuthService';
import {AuthContext} from '../Context/AuthContext';
import {navigate} from '@reach/router'

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [genre, setGenre] = useState("customer");
    const [message, setMessage] = useState("");
    const [disabled, setDisabled] = useState(" ");
    const [passError, setPassError] = useState("");
    const authContext = useContext(AuthContext);

  const classes = useStyles();


  const signUp = (e) => {
    e.preventDefault();
    AuthService.register({name,email,password,phone,location,genre})
    .then(data => {
        if(!data.errors) {
        // console.log(data);
        navigate("/login")
        }
    })
    .catch(err => console.log(err))
};

const confPass = (e) => {
  setConfPassword(e.target.value)
  if( e.target.value === password ){
    setDisabled(false)
    setPassError('')
  }
  else{
    setDisabled(true)
    setPassError('Password does not match')
  }
}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={signUp} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Full Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              value={genre}
              onChange={e => setGenre(e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="genre"
                label="Genre"
                name="genre"
                autoComplete="genre"
                select
              >
                  <MenuItem value="customer">Customer</MenuItem>
                  <MenuItem value="restaurant">restaurant</MenuItem>
                  <MenuItem value="delivery">Delivery</MenuItem>
              </TextField>
            </Grid>


            <Grid item xs={12} sm={6}>
              <TextField
                value={phone}
                onChange={e => setPhone(e.target.value)}
                autoComplete="phone"
                name="phone"
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="phone"
                autoFocus
              />
            </Grid>

            <Grid item xs={12} >
              <TextField
                value={location}
                onChange={e => setLocation(e.target.value)}
                autoComplete="location"
                name="location"
                variant="outlined"
                required
                fullWidth
                id="location"
                label="Location"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
              value={email}
              onChange={e => setEmail(e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              value={password}
              onChange={e => setPassword(e.target.value)}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              value={confPassword}
              onChange={confPass}
                variant="outlined"
                required
                fullWidth
                name="confPassword"
                label="Confirm Password"
                type="password"
                id="confPassword"
                autoComplete="current-password"
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={disabled}
          >
            Sign Up 
          </Button>
          <p>{passError}</p>
          <Grid container justifyContent="center">
            <Grid item>

            <Link to="/login" >Already have an account? Sign in</Link>
{/* 
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link> */}
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}