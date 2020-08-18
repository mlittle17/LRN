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
      side: '#f6fef5',
    },
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [binder, setBinder] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [regSessions, setRegSessions] = useState([]);
  const [notes, setNotes] = useState([]);

  // Retrieve all scheduled sessions
  useEffect(() => {
    axios.get('/event')
      .then(response => {
        // Put upcoming session in order by date and time. 
        const sortedSessions = response.data.sort(function(a, b) {
          const aMDY = a.date.split('/').join('-');
          const bMDY = b.date.split('/').join('-');
          const aUnix = moment(aMDY + ' ' + a.time, 'MM-DD-YY HH:mm a').unix();
          const bUnix = moment(bMDY + ' ' + b.time, 'MM-DD-YY HH:mm a').unix();
          return aUnix - bUnix;
        })

        setSessions(sortedSessions);
      });
  }, []);

  // Retrieve all registered sessions
  useEffect(() => {
    if (user) {
      axios.get(`event/${user.id}/student`)
        .then((response) => {
          const sortedRegSessions = response.data.sort(function(a, b) {
            const aMDY = a.date.split('/').join('-');
            const bMDY = b.date.split('/').join('-');
            const aUnix = moment(aMDY + ' ' + a.time, 'MM-DD-YY HH:mm a').unix();
            const bUnix = moment(bMDY + ' ' + b.time, 'MM-DD-YY HH:mm a').unix();
            return aUnix - bUnix;
          })
          setRegSessions(sortedRegSessions);
        });
    }
  });

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
    // Geocode.setApiKey(process.env.GOOGLE_API_KEY);
    Geocode.setApiKey('AIzaSyCVPR2bv5DCVKltpal636K0ei6zCIGb_68');
    Geocode.fromAddress(user.zip).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        user.location = { lat, lng, zipcode: user.zip };
      },
      error => {
        console.error('Error geocoding in App:', error);
      },
    );
  }

  const googleLogin = () => {
    window.location.replace('https://lrn-solid-sun-282620.uc.r.appspot.com/auth/login');
  };

  const googleLogout = () => {
    axios.get('auth/logout')
      .then(res => {
        setUser(null);
        window.location.reload(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Navbar googleLogin={googleLogin} googleLogout={googleLogout} user={user} binder={binder} sessions={sessions} regSessions={regSessions} notes={notes} />
        {/* <button onClick={googleLogin}>Log In</button> */}
        <Router>
          <div className="App" />
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
