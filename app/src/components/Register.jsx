import React, { useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Chip } from '@material-ui/core';
import DoneAllIcon from '@material-ui/icons/DoneAll';

const useStyles = makeStyles((theme) => ({
  chip: {
    backgroundColor: '#474a2c',
    color: '#f6fef5',
  }
}));

const Register = ({ userId, sessionId }) => {
  const [clicked, setClicked] = useState(false);

  const classes = useStyles();

  const register = (eventId) => {
    axios.post(`event/${userId}/student`, { user: userId, event: eventId })
      .then((response) => {
        console.log('Map Session List, post response:', response)
      })
      .then(() => {
        setClicked(true);
      })
  }

  return (
    <div className="register">
      {clicked === false
        ? (
          <Button style={{ color: '#f7fff6', backgroundColor: '#474a2c' }} size="small" onClick={() => register(sessionId)}>
            Register
          </Button>
        )
        : (
          <Chip className={classes.chip} size="medium" icon={<DoneAllIcon style={{ color: '#f7fff6' }} />} label="Registered" />
        )
      }
    </div>
  );
}

export default Register;
