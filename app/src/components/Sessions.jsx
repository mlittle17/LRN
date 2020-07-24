import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Grid } from '@material-ui/core';
import Calendar from './Calendar.jsx';
import SessionCard from './SessionCard.jsx';

function Sessions() {
  const [sessionObjs, setSessionObjs] = useState([]);
  useEffect(() => {
    // get all events
    axios.get('/event')
      .then(response => {
        setSessionObjs(response.data);
      })
      .catch(error => {
        console.error('Error getting all events from database:', error);
      });
  }, []);

  useEffect(() => {
    // console.log('reaching sessions', sessionObjs);
    sessionObjs.forEach((sessionObj) => {
      axios.get(`/users/${sessionObj.users_id}`)
        .then(response => {
          console.log('R:', response);
        })
        .catch(error => {
          console.error('Error finding session creator:', error);
        });
    });
  }, [sessionObjs]);

  return (
    <div className="Sessions">
      <br />
      <Grid container justify="space-evenly">
        <Calendar sessions={sessionObjs} />
        <div>
          {/* <SessionCard /> */}
        </div>
      </Grid>
    </div>
  );
}

export default Sessions;
