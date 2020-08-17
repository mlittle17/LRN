import React, { useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Chip } from '@material-ui/core';
import DoneAllIcon from '@material-ui/icons/DoneAll';

const useStyles = makeStyles((theme) => ({
  button: {
    color: '#f7fff6',
    backgroundColor: '#474a2c',
  },
  chip: {
    backgroundColor: '#474a2c',
    color: '#f6fef5',
  }
}));

const Register = ({ user, session }) => {
  const [clicked, setClicked] = useState(false);

  const classes = useStyles();

  const register = (eventId) => {
    console.log('trying to post at least');
    axios.post(`event/${user.id}/student`, { user: user.id, event: eventId })
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
          <Button className={classes.button} size="small" onClick={() => register(session.id)}>
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
