// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, {useContext} from 'react';
import {AuthContext} from './Context/AuthContext';
import {Router} from '@reach/router';
import Login from './Components/LoginForm';
import RegistrationForm from './Components/RegistrationForm'
import LandingPage from './Components/LandingPage'
import UserPage from './Components/UserPage';
import Home from './Components/Home';
import Restaurant from './Components/Restaurant';
import PrivateComponent from './HOCs/PrivateComponent';

function App() {
  const {user, setUser, isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
  console.log(user);
  console.log(isAuthenticated);
  return (
    <div className="App">
      {/* <p>Hello</p> */}
      <Router>
        <Home path="/home" />
        {/* <Restaurant path="/restaurants" /> */}
        <Login path="/login" />
        <RegistrationForm path="/registration" />
        <LandingPage path='/'/>
        <UserPage path='/users/:id'/>
        <PrivateComponent Component={Restaurant} path="restaurants" />
      </Router>
    </div>
  );
}

export default App;
