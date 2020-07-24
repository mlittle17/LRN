import React, { useEffect, useState, Route } from 'react';
import { useHistory, Link, Switch } from 'react-router-dom';

// import axios from 'axios';
import moment, { isBefore, isSameOrAfter } from 'moment';

import { Grid, Fab } from '@material-ui/core';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import { Button } from 'semantic-ui-react';
import ProfileCard from './ProfileCard.jsx';
import Binder from './Binder.jsx';
import UpcomingSessions from './UpcomingSessions.jsx';

const Home = ({
  user, binder, sessions, setNavbarSessionName,
}) => {
  const [currentTime, setCurrentTime] = useState();
  const [joinSession, setJoinSession] = useState(false);
  const [sessionToPlace, setSessionToPlace] = useState({});
  const history = useHistory();

  useEffect(() => {
    // we need to create the current date/time
    console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
    console.log(sessions);
    sessions.forEach(session => {
      const mDY = session.date.split('/').join('-');
      console.log(session.name, 'should show button', moment().isSameOrAfter(mDY));
      const currentTime = moment().format('h:mma');
      console.log('current time', currentTime);
      if (moment().isSameOrAfter(mDY)) {
        setJoinSession(true);
        setSessionToPlace({
          name: session.name,
          userId: session.users_id,
          uuid: session.uuid,
        });
      }
    });
  }, [sessions]);

  const placeInSession = () => {
    console.log('you pushed a button', (user.id === sessionToPlace.userId));
    setNavbarSessionName(sessionToPlace.name);
    // check if the current user is the creator
    if (user.id === sessionToPlace.userId) {
      history.push(`/instructor/${sessionToPlace.uuid}/${sessionToPlace.name}`);
    } else {
      history.push(`/student/${sessionToPlace.uuid}/${sessionToPlace.name}`);
    }
  };

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
          {joinSession && (
          <Fab color="primary" aria-label="add" style={{ marginLeft: '30px' }} onClick={placeInSession}>
            <VoiceChatIcon fontSize="large" />
          </Fab>
          )}
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
