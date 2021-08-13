// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, {useContext} from 'react';
import {AuthContext} from './Context/AuthContext';
import {Router} from '@reach/router';
import Login from './Components/LoginForm';
import RegistrationForm from './Components/RegistrationForm';
import LandingPage from './Components/LandingPage';
import UserPage from './Components/UserPage';
import OrdersTable from './Components/OrdersTable';
import Home from './Components/Home';
import Restaurant from './Components/Restaurant';
import PrivateComponent from './HOCs/PrivateComponent';
import UnPrivateComponent from './HOCs/UnPrivateComponent';
import Customer from './Components/Customer';
import Delivery from './Components/Delivery';
import RelativeViews from './Components/RelativeViews';


function App() {
  const {user, setUser, isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
  console.log(user);
  console.log(isAuthenticated);
  return (
    <div className="App">
      <Router>
        <Home path="/home" />
        {/* <Restaurant path="/restaurants" /> */}
        <Login path="/login" />
        <RegistrationForm path="/registration" />
        <LandingPage path='/'/>
<<<<<<< HEAD
        <UserPage path='/users/:id'/>
        <OrdersTable path='/order'/>
=======
        {/* <UserPage path='/users/:id'/> */}
        {/* <UnPrivateComponent Component={RelativeViews} ForRestView={} ForCustomerView={} ForDeliveryView={} path="restaurants" /> */}
        <UnPrivateComponent Component={Delivery} path="deliveries" />
        <UnPrivateComponent Component={Customer} path="customers" />
>>>>>>> dc8e6c8a970217e9ede6af2b25a2dfe2ef15817c
      </Router>
    </div>
  );
}

export default App;
