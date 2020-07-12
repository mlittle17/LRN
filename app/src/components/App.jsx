import React, { useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import axios from 'axios';
import '../styles/App.css';

import Navbar from './Navbar';

function App() {

  useEffect(() => {
    axios.post('/test')
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  });

  function googleLogin() {
    axios.get('/auth/google')
      .then(res => {
        console.log(res, 'inside of googleLogin')
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div>
      <Navbar />
      <div>LRN</div>
      <button onClick={googleLogin}>Log In</button>
      <Router>
        <div className="App" />
      </Router>
    </div>
  );
}

export default App;
