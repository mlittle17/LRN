import React, { useEffect, useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import axios from 'axios';

import Navbar from './Navbar.jsx';

import '../styles/App.css';

function App() {
  const [user, setUser] = useState(null);
  const [binder, setBinder] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('/event')
      .then(response => {
        setSessions(response.data);
      });
  }, []);

  useEffect(() => {
    // may need to change to user documents
    axios.get('users/1/binder')
      .then(response => {
        setBinder(response.data);
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

  // useEffect(() => {
    // axios.get('event/1/documents')
    //   .then(response => {
    //     setNotes(response.data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
      // fetch('8080/students/event/1/documents',
      // {
      //     /*
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Accept':'application/json'
      //     },
      //     */
      //     method: "get",
      //     dataType: 'json',
      // })
      // .then((res) => res.json())
      // .catch(err => console.log(err));
  // }, []);

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
      <Navbar googleLogin={googleLogin} googleLogout={googleLogout} user={user} binder={binder} sessions={sessions} notes={notes} />
      {/* <button onClick={googleLogin}>Log In</button> */}
      <Router>
        <div className="App" />
      </Router>
    </div>
  );
}

export default App;
