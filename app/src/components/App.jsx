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

  const fakeUserInfo = {
    id: 1,
    image_url: 'https://ca.slack-edge.com/T02P3HQD6-UQADDLNHW-8dd89119b2b0-512',
    username: 'jessicaTorres',
    email: 'fakeEmail2',
  };

  const userFakeSessions = [
    {
      title: 'History of the Aztec',
      namefirst: 'Prof. Alan',
      namelast: 'Thicke',
      date: '07/26/2020',
      time: '5:30 pm',
    },
    {
      title: 'Homestyle Lasagna: The True Italian Way',
      namefirst: 'Rya',
      namelast: 'Sicily',
      date: '08/03/2020',
      time: '7:25 pm',
    },
    {
      title: 'Traveling Light: Your Trip to Europe',
      namefirst: 'Greg',
      namelast: 'Sanzen',
      date: '08/10/2020',
      time: '11:00 am',
    },
    {
      title: 'One, Two, Rhythm For Beginners',
      namefirst: 'Sarah',
      namelast: 'Courtz',
      date: '09/15/2020',
      time: '6:00 pm',
    },
    {
      title: 'A Healthy Home: Hygiene to Keep Up',
      namefirst: 'Rita',
      namelast: 'Teller',
      date: '09/17/2020',
      time: '8:00 pm',
    },
    {
      title: 'Balancing Your Checkbook',
      namefirst: 'Yare',
      namelast: 'Rewwn',
      date: '10/10/2020',
      time: '12:00 pm',
    },
  ];

  const userFakeDocuments = [
    {
      id: 1,
      documenttype: 'Word Document',
      title: 'Lasagna Recipe',
      linkto: 'https://www.google.com/',
      namefirst: 'Rya',
      namelast: 'Sicily',
      dateSaved: '08/03/2020',
    },
    {
      id: 2,
      documenttype: 'Word Document',
      title: 'Packing Ess. List',
      linkto: 'https://www.google.coml',
      namefirst: 'Greg',
      namelast: 'Sanzen',
      dateSaved: '08/10/2020',
    },
  ];

  return (
    <div>
      <Navbar googleLogin={googleLogin} googleLogout={googleLogout} user={fakeUserInfo} documents={userFakeDocuments} sessions={userFakeSessions} />
      {/* <button onClick={googleLogin}>Log In</button> */}
      <Router>
        <div className="App" />
      </Router>
    </div>
  );
}

export default App;
