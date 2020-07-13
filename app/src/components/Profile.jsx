import React from 'react';

import { Grid } from '@material-ui/core';

import ProfileCard from './ProfileCard.jsx';
import Binder from './Binder.jsx';
// import axios from 'axios';

function Profile() {
  return (
    <div className="Profile">
      <Grid container justify="space-evenly">
        <ProfileCard />
        <Binder />
      </Grid>
    </div>
  );
}

export default Profile;
