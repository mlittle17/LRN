import React, { useEffect, useState } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
// import axios from 'axios';
import moment from 'moment';

import React from 'react';
import { Link, Switch } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import { Button } from 'semantic-ui-react';
import ProfileCard from './ProfileCard.jsx';
import Binder from './Binder.jsx';
import UpcomingSessions from './UpcomingSessions.jsx';

const Home = ({ user, binder, sessions }) => {
  const [currentTime, setCurrentTime] = useState();

  useEffect(() => {
    // we need to create the current date/time
    console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
  }, []);

  return (
    <div className="Home">
      <Grid container justify="space-evenly" style={{ marginBottom: '30px' }}>
        <ProfileCard userInfo={user} />
        <div>
          <>
            {/* <br /> */}
            <Button as={Link} to="/registered" style={{ backgroundColor: '#474a2c', color: '#f6fef5' }}>My Sessions</Button>
            <Button as={Link} to="/find" style={{ backgroundColor: '#474a2c', color: '#f6fef5' }}>Find Sessions</Button>
            <Button as={Link} to="/create" style={{ backgroundColor: '#474a2c', color: '#f6fef5' }}>Create Session</Button>
          </>
          <div style={{ marginTop: '30px' }}>
            <UpcomingSessions sessions={sessions} />
          </div>
          <Binder binder={binder} />
        </div>
      </Grid>
      <div>
        <Switch />
      </div>
    </div>
  );
};
export default Home;