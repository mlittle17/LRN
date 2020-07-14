import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Card, CardContent, CardActionArea, CardActions, Grid, Typography, IconButton, CardHeader } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 320,
    minWidth: 320,
    minHeight: 340,
    maxHeight: 340,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
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
    <Card className={classes.root}>
      <CardContent>
        <CardActionArea>

          <Avatar alt="Sally Name" src={user.avatar} className={classes.large} />

          <br />
          <Typography gutterBottom variant="h5" component="h4">
            JERRY MCDONALD
          </Typography>

          <br />
          <div>
            <Typography gutterBottom variant="h7" component="h7">
              <EmailIcon /> jerryMcDonald@gmail.com
            </Typography>
            <br /><br />
            <Typography gutterBottom variant="h7" component="h7">
              <PersonPinCircleIcon /> 70810
            </Typography>
          </div>

        </CardActionArea>
        <br />
        <div>
          <Typography gutterBottom variant="h7" component="h7">
            Subjects
          </Typography>
          {user.subjects.map((sub) => {
            return (
              <Typography variant="body2" color="textSecondary" component="p">
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
