import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { Menu, Image } from 'semantic-ui-react';
import logo from '../styles/images/logo.png';
import logoWithTitle from '../styles/images/logoWithTitle.png';



function NotLoggedIn() {

  return (
    <div className="Profile">
      <Grid container justify="space-around">
         <Image src={logoWithTitle} size="large" alt="LRN logo" />
      </Grid>
    </div>
  );
}

export default NotLoggedIn;