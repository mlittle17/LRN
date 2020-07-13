import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
// import axios from 'axios';

import { Grid, Typography } from '@material-ui/core';
import { Button } from 'semantic-ui-react';

import ProfileCard from './ProfileCard.jsx';
import CreateSession from './CreateSession.jsx';
import FindSessions from './FindSessions.jsx';
import Sessions from './Sessions.jsx';
import Binder from './Binder.jsx';
import UpcomingSessions from './UpcomingSessions.jsx';

const Home = () => {
  return (
    <div className="Home">
      <Grid container justify="space-evenly" style={{ marginBottom: '30px' }}>
        <ProfileCard />
        <div>
          <>
            <Typography gutterBottom variant="h7" component="h7"><b>SESSIONS</b></Typography>
            <br />
            <Button.Group size="small">
              <Button as={Link} to="/create">Create</Button>
              <Button.Or />
              <Button as={Link} to="/find">Find</Button>
              <Button.Or />
              <Button as={Link} to="/registered">View Joined</Button>
            </Button.Group>
          </>
          <UpcomingSessions />
        </div>
      </Grid>
      <Binder />

      <div>
        <Switch>
          <Route exact path="/create" component={CreateSession} />
          <Route exact path="/find" component={FindSessions} />
          <Route exact path="/registered" component={Sessions} />
        </Switch>
      </div>
    </div>
  );
};

export default Home;
