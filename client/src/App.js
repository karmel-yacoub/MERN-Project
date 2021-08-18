// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';
import { Router } from '@reach/router';
import Login from './Components/LoginForm';
import RegistrationForm from './Components/RegistrationForm';
import LandingPage from './Components/LandingPage';
import UserPage from './Components/UserPage';
import OrdersTable from './Components/OrdersTable';
import Home from './Components/Home';
import Restaurant from './Components/Restaurant';
import PrivateComponent from './HOCs/PrivateComponent';
import UnPrivateComponent from './HOCs/UnPrivateComponent';
import Customer from './Components/CustomerForCustomer';
import Delivery from './Components/Delivery';
import RelativeViews from './Components/RelativeViews';
import CustomerForRestaurant from './Components/CustomerForRestaurant';
import Navbar from './Components/Navbar';
import CustomerForDelivery from './Components/CustomerForDelivery';
import RestaurantForRestaurant from './Components/RestaurantForRestaurant';


import CreateMeal from './Components/CreateMeal';
import CustomerForCustomer from './Components/CustomerForCustomer';
import Prof from './Components/Prof';
import RestaurantForCustomer from './Components/RestaurantForCustomer';
import DeliveryForDelivery from './Components/DeliveryForDelivery';
import DeliveryForRestaurant from './Components/DeliveryForRestaurant';
import DeliveryForCustomer from './Components/DeliveryForCustomer';
import TogglableTabs from './Components/TogglableTabs';




function App() {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  // console.log(user);
  // console.log(isAuthenticated);
  return (
    <div className="App">
      <Navbar position="relative" title="Food is here" link1="Login" ref1="/login" link2="Register" ref2="/registration" />
      <Router>
        <TogglableTabs path="/home" />
        {/* <Restaurant path="/restaurants" /> */}
        <Login path="/login" />
        <RegistrationForm path="/registration" />

        <LandingPage path='/' />




        <UserPage path='/users/:id' />
        <OrdersTable path='/order' />
        <Prof path='/profile' />

        {/* <UserPage path='/users/:id'/> */}
        <UnPrivateComponent Component={RelativeViews} ForRestView={CustomerForRestaurant} ForCustomerView={CustomerForCustomer} ForDeliveryView={CustomerForDelivery} path="/customers/:id" />
        <UnPrivateComponent Component={RelativeViews} ForRestView={RestaurantForRestaurant} ForCustomerView={RestaurantForCustomer} ForDeliveryView={RestaurantForCustomer} path="/restaurants/:id" />
        <UnPrivateComponent Component={RelativeViews} ForRestView={DeliveryForRestaurant} ForCustomerView={DeliveryForCustomer} ForDeliveryView={DeliveryForDelivery} path="/deliverys/:id" />
        {/* <UnPrivateComponent Component={Delivery} path="deliveries" /> */}
        {/* <UnPrivateComponent Component={Customer} path="customers" /> */}


        <UserPage path='/users/:id' />
        <OrdersTable path='/order' />


        <UserPage path='/users/:id' />
        <OrdersTable path='/order' />

        {/* <UserPage path='/users/:id'/> */}
        {/* <UnPrivateComponent Component={RelativeViews} ForRestView={} ForCustomerView={} ForDeliveryView={} path="/restaurants/:id" /> */}
        {/* <UnPrivateComponent Component={Delivery} path="/deliveries" /> */}
        {/* <UnPrivateComponent Component={Customer} path="/customers" /> */}



        <CreateMeal path='/meal' />


      </Router>
    </div>
  );
}

export default App;
