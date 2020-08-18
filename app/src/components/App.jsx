import React, { useEffect, useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Geocode from 'react-geocode';
import axios from 'axios';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import moment, { isBefore, isSameOrAfter } from 'moment';
import Navbar from './Navbar.jsx';

import '../styles/App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#a58e57',
    },
    secondary: {
      main: '#474a2c',
    },
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [binder, setBinder] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [notes, setNotes] = useState([]);
  // const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/event')
      .then(response => {
        console.log('response data:', response.data);
        // put session in order by date and time. 
        const sortedSessions = response.data.sort(function(a, b) {
          const aMDY = a.date.split('/').join('-');
          const bMDY = b.date.split('/').join('-');
          const aUnix = moment(aMDY + ' ' + a.time, 'MM-DD-YY HH:mm a').unix();
          const bUnix = moment(bMDY + ' ' + b.time, 'MM-DD-YY HH:mm a').unix();
          return aUnix - bUnix;
        })
        console.log(sortedSessions, 'sorted sessions');
        setSessions(sortedSessions);
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

  if (user) {
    // Set up the Geocoding for transforming the zip to lat and lon
    Geocode.setApiKey('AIzaSyCVPR2bv5DCVKltpal636K0ei6zCIGb_68');
    console.log('User obj in App.jsx:', user);
    Geocode.fromAddress('70810').then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        user.location = { lat, lng, zipcode: 70810 };
      },
      error => {
        console.error(error);
      },
    );
  }
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
      <MuiThemeProvider theme={theme}>
        <Navbar googleLogin={googleLogin} googleLogout={googleLogout} user={user} binder={binder} sessions={sessions} notes={notes} />
        {/* <button onClick={googleLogin}>Log In</button> */}
        <Router>
          <div className="App" />
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
