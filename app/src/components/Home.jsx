import React from 'react';
import { Link, Switch } from 'react-router-dom';

import { Button } from 'semantic-ui-react';
import { Grid } from '@material-ui/core';
import ProfileCard from './ProfileCard.jsx';
import Binder from './Binder.jsx';
import UpcomingSessions from './UpcomingSessions.jsx';

const Home = ({
  user, binder, sessions, regSessions, setNavbarSessionName,
}) => {

  return (
    <div className="Home">
      <Grid container justify="space-evenly" style={{ marginBottom: '30px' }}>
        <ProfileCard userInfo={user} />
        <div>
          <>
            <Button as={Link} to="/registered" style={{ backgroundColor: '#474a2c', color: '#f6fef5' }}>My Sessions</Button>
            <Button as={Link} to="/find" style={{ backgroundColor: '#474a2c', color: '#f6fef5' }}>Find Sessions</Button>
            <Button as={Link} to="/create" style={{ backgroundColor: '#474a2c', color: '#f6fef5' }}>Create Session</Button>
          </>
          <div style={{ marginTop: '30px' }}>
            <UpcomingSessions sessions={sessions} regSessions={regSessions} user={user} setNavbarSessionName={setNavbarSessionName} />
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
