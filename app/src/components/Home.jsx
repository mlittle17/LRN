import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
// import axios from 'axios';

import { Grid, Typography } from '@material-ui/core';
import { Button } from 'semantic-ui-react';

import ProfileCard from './ProfileCard.jsx';
import FindSessions from './FindSessions.jsx';
import Binder from './Binder.jsx';
import UpcomingSessions from './UpcomingSessions.jsx';

import '../styles/Home.css';

const Home = () => {
  return (
    <div className="Home">
      <Grid container justify="space-evenly" style={{ marginBottom: '30px' }}>
        <ProfileCard />
        <div>
          {/* <Typography gutterBottom variant="h7" component="h7"><b>SESSIONS</b></Typography> */}
          <>
            {/* <br /> */}
            <Button as={Link} to="/registered" style={{ backgroundColor: '#474a2c', color: '#f6fef5' }}>My Sessions</Button>

            <Button as={Link} to="/find" style={{ backgroundColor: '#474a2c', color: '#f6fef5' }}>Find Sessions</Button>

            <Button as={Link} to="/create" style={{ backgroundColor: '#474a2c', color: '#f6fef5' }}>Create Session</Button>
          </>
          <div style={{ marginTop: '30px' }}>
            <UpcomingSessions />
          </div>
        </div>
      </Grid>
      <div>
        <Binder />
      </div>

      <div>
        <Switch>
          <Route exact path="/find" component={FindSessions} />

        </Switch>
      </div>
    </div>
  );
};

export default Home;
