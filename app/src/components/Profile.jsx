import React, { useState } from 'react';

import { Grid } from '@material-ui/core';

import ProfileCard from './ProfileCard.jsx';
import Binder from './Binder.jsx';
// import axios from 'axios';

function Profile({ user, binder }) {
  // console.log(user.username, 'inside profile component');

  return (
    <div className="Profile">
      <Grid container justify="space-around">
        <ProfileCard userInfo={user} />
        <Binder userInfo={user} binder={binder} />
      </Grid>
    </div>
  );
}

export default Profile;
