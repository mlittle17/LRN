import React, { useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import axios from 'axios';
import '../styles/App.css';

import Navbar from './Navbar.jsx';
// import Home from './Home.jsx';

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
    axios.get('/auth/exist')
      .then(res => {
        console.log(res.body, 'inside of googleLogin')
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div>
      <Navbar />
      <div>LRN</div>
      <button onClick={googleLogin}>Log In</button>
      <Router>
        <div className="App" />
      </Router>
      {/* <Home /> */}
    </div>
  );
}

export default App;
