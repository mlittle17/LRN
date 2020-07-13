import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Grid } from '@material-ui/core';
import Calendar from './Calendar.jsx';
import SessionCard from './SessionCard.jsx';

function Sessions() {
  const [sessionObj, setSessionObj] = useState([]);
  useEffect(() => {
    axios.get('/event')
      .then(response => {
        setSessionObj(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  });

  return (
    <div className="Sessions">
      <div>Sessions</div>
      <Grid container justify="space-around">
        <Calendar sessions={sessionObj} />
        <SessionCard />
      </Grid>
    </div>
  );
}

export default Sessions;
