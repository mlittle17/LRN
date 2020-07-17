import React, {useState} from 'react';

import { Grid } from '@material-ui/core';

import ProfileCard from './ProfileCard.jsx';
import Binder from './Binder.jsx';
// import axios from 'axios';

function Profile({ user }) {
  // console.log(user. namefirst, 'inside profile component');
  return (
    <div className="Profile">
      <Grid container justify="space-around">
        <ProfileCard userInfo={user} />
        <Binder />
      </Grid>
    </div>
  );
}

export default Profile;
