import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar, Button, Card, CardContent, CardActionArea, CardActions,
  Grid, Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    minWidth: 500,
    minHeight: 500,
    maxHeight: 500,
    borderColor: '#474a2c',
    backgroundColor: '#474a2c',
  },
  actionArea: {
    backgroundColor: '#a58e57',
  },

  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
    margin: 'auto',
  },
  icon: {
    color: '#e57373',
  },
}));

const BulletinBoard = ({ notes, user }) => {
  const classes = useStyles();

  const clickIcon = (documentId) => {
    // do a post request to add the documents to the students binder
    axios.post(`users/${user.id}/binder`, { users_id: user.id, document_id: documentId })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Card variant="outlined" className={classes.root}>
      <CardActionArea className={classes.actionArea} align="center">
        <h1>Bulletin Board</h1>
        <br />
      </CardActionArea>
      <CardContent>
        <br />
        <div>
          <Typography gutterBottom variant="h6" component="h7" style={{ color: '#F6FEF5' }}>
            {notes && (
            <div>
              {notes.map((session) => (
                <div>
                  <div>{session.documenttype}</div>
                  <div>{session.linkto}</div><AddCircleIcon onClick={() => { clickIcon(session.id); }} className={classes.icon} />
                </div>
              ))}
            </div>
            )}
          </Typography>
        </div>

      </CardContent>
      {/* <CardActions>

      </CardActions> */}

    </Card>
  );
};

export default BulletinBoard;
