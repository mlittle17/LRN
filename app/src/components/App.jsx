import React, { useEffect, useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import axios from 'axios';

import Navbar from './Navbar.jsx';

import '../styles/App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.post('/test')
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  });

  const googleLogin = () => {
    window.location.replace('http://localhost:8080/auth/login');
    // axios.get('/auth/google/redirect')
    //   .then(res => {
    //     console.log(res, 'inside of googleLogin');
    //     setUser(res.data);
    //     if (!res.data) {
    //       console.log('I am not logged in');
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  return (
    <div>
      <Navbar googleLogin={googleLogin} user={user} />
      {/* <button onClick={googleLogin}>Log In</button> */}
      <Router>
        <div className="App" />
      </Router>
    </div>
  );
}

export default App;
