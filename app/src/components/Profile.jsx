import React from 'react';
import ProfileCard from './ProfileCard';
import Binder from './Binder';
import {Grid} from '@material-ui/core';
// import axios from 'axios';

function Profile() {
  return (
    <div className="Profile">
      <Grid container justify="space-around">
      <ProfileCard />
      <Binder />
      </Grid>
    </div>
  );
}

export default Profile;
