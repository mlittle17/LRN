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
  })

  return (
    <div>
      <Navbar />
      <Router>
        <div className="App">
        </div>
      </Router>
    </div>
  );
}

export default App;
