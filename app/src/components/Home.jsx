import React from 'react';
// import axios from 'axios';

import ProfileCard from './ProfileCard.jsx';
import { Grid, Typography } from '@material-ui/core';
import { Button } from 'semantic-ui-react';

function Home() {

  return (
    <div className="Home">
      <div>Home</div>
      <Grid container justify="space-evenly">
        <ProfileCard />
        <div>
          <>
            <Typography gutterBottom variant="h7" component="h7"><b>SESSIONS</b></Typography>
            <br />
            <Button.Group size="small">
              <Button>Create</Button>
              <Button.Or />
              <Button>Find</Button>
              <Button.Or />
              <Button>View Joined</Button>
            </Button.Group>
          </>
        </div>
      </Grid>
    </div>
  );
}

export default Home;