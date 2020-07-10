import  React from 'react';
// import axios from 'axios';

import Calendar from './Calendar.jsx';
import SessionCard from './SessionCard.jsx';

import { Grid } from '@material-ui/core';

function Sessions() {

  return (
    <div className="Sessions">
      <div>Sessions</div>
      <Grid container justify="space-around">
        <Calendar />
        <SessionCard />
      </Grid>
    </div>
  );
}

export default Sessions;