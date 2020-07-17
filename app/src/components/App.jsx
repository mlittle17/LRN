import React, { useEffect, useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import axios from 'axios';

import Navbar from './Navbar.jsx';

import '../styles/App.css';

function App() {
  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios.get('/event')
      .then(response => {
        setSessions(response.data);
      });
  }, []);

  useEffect(() => {
    // may need to change to user documents
    axios.get('event/3/documents')
      .then(response => {
        setDocuments(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios.get('/auth/exist')
      .then(res => {
        if (res.data === 'no one here') {
          console.log('I am not logged in');
        } else {
          console.log(res.data.username, 'I am logged in');
          setUser(res.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const googleLogin = () => {
    window.location.replace('http://localhost:8080/auth/login');
  };

  const googleLogout = () => {
    axios.get('auth/logout')
      .then(res => {
        console.log(res, 'in logout function');
        setUser(null);
        window.location.reload(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar googleLogin={googleLogin} googleLogout={googleLogout} user={user} documents={documents} sessions={sessions} />
      {/* <button onClick={googleLogin}>Log In</button> */}
      <Router>
        <div className="App" />
      </Router>
    </div>
  );
}

export default App;
