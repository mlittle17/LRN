import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Card, CardContent, CardActionArea, CardActions, Grid, Typography, IconButton, CardHeader } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import { authorize } from 'passport';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 310,
    minWidth: 310,
    minHeight: 420,
    maxHeight: 440,
    borderColor: '#474a2c',
  },
  actionArea: {
    backgroundColor: '#a58e57',
  },
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    margin: 'auto',
  },
  icon: {
    color: '#474a2c',
  },
}));

const ProfileCard = ({ userInfo }) => {
  const classes = useStyles();
  const [user, setUser] = useState({
    name: 'Sally Name',
    avatar: 'https://ca.slack-edge.com/T02P3HQD6-URYEC04TS-1d8e4abade33-512',
    // avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTaUPxz9QpJvEvbLP1nX4jGz6yyiWthbrEn-g&usqp=CAU',
    email: 'sallyName@gmail.com',
    zip: 77777,
    subjects: ['Music', 'Math', 'History', 'Food'],
  });

  return (
    <Card variant="outlined" className={classes.root}>
      <CardActionArea className={classes.actionArea}>
        <br />
        <Avatar alt="Sally Name" src={user.avatar} className={classes.large} />

        <br />
        <Typography gutterBottom variant="h5" component="h4" style={{ color: '#474337', margin: 'auto' }}>
          Jerry McDonald
        </Typography>
        <br />
      </CardActionArea>
      <CardContent>
        <div>
          <Typography gutterBottom variant="h6" component="h7" style={{ color: '#a58e57' }}>
            <EmailIcon className={classes.icon} /> jerryMcDonald@gmail.com
          </Typography>
          <br /><br />
          <Typography gutterBottom variant="h6" component="h7" style={{ color: '#a58e57' }}>
            <PersonPinCircleIcon className={classes.icon} /> 70810
          </Typography>
        </div>

        <br />
        <div>
          <Typography gutterBottom variant="h6" component="h7" style={{ color: '#a58e57' }}>
            Subjects
          </Typography>
          {user.subjects.map((sub) => {
            return (
              <Typography variant="body1" color="textSecondary" component="p">
                {sub}
              </Typography>
            );
          })}
        </div>
      </CardContent>
      {/* <CardActions>

      </CardActions> */}

    </Card>
  );
};

export default ProfileCard;
