// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, {useContext} from 'react';
import {AuthContext} from './Context/AuthContext';

function App() {
  const {user, setUser, isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
  return (
    <div className="App">
      <p>sdskdbjmsjdvbsjd</p>
    </div>
  );
}

export default App;
