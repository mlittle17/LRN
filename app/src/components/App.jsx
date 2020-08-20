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
        const sortedSessions = response.data.sort((a, b) => {
          const aMDY = a.date.split('/').join('-');
          const bMDY = b.date.split('/').join('-');
          const aUnix = moment(`${aMDY} ${a.time}`, 'MM-DD-YY HH:mm a').unix();
          const bUnix = moment(`${bMDY} ${b.time}`, 'MM-DD-YY HH:mm a').unix();
          return aUnix - bUnix;
        });

        setSessions(sortedSessions);
      });
  }, []);

  useEffect(() => {
    if (user) {
      axios.get(`users/${user.id}/binder`)
        .then(response => {
          setBinder(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  });

  useEffect(() => {
    axios.get('/auth/exist')
      .then(res => {
        if (res.data === 'no one here') {
          console.log('I am not logged in');
        } else {
          console.log(res.data.username, 'I am logged in');
          axios.get('users/')
            .then(response => {
              console.log(response.data, 'all the users');
              return response.data;
            }).then(allUsers => {
              axios.get(`event/${res.data.id}/student`)
                .then((response) => {
                  console.log(response, 'response in app');
                  const sortedRegSessions = response.data.sort((a, b) => {
                    const aMDY = a.date.split('/').join('-');
                    const bMDY = b.date.split('/').join('-');
                    const aUnix = moment(`${aMDY} ${a.time}`, 'MM-DD-YY HH:mm a').unix();
                    const bUnix = moment(`${bMDY} ${b.time}`, 'MM-DD-YY HH:mm a').unix();
                    return aUnix - bUnix;
                  });
                  sortedRegSessions.forEach(session => {
                    for (let i = 0; i < allUsers.length; i++) {
                      if (session.users_id === allUsers[i].id) {
                        session.namefirst = allUsers[i].namefirst;
                        session.namelast = allUsers[i].namelast;
                      }
                    }
                  });
                  setRegSessions(sortedRegSessions);
                });
            })
            .catch(err => {
              console.log(err);
            });
          // Retrieve all registered sessions
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
    Geocode.setApiKey('AIzaSyBGDKoZw-9lBvWcgE4rgOpsq6xNeRWyBi0');
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
    window.location.replace('http://localhost:8080/auth/login');
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
