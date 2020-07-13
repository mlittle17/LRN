import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar, Button, Card, CardContent, CardActionArea, CardActions, CardHeader, Collapse, Grid, Typography, IconButton,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    minWidth: 300,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const SessionCard = () => {
  const classes = useStyles();
  const [cardOpen, setCardOpen] = useState('false');
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>

          <CardHeader
            title="Session Info"
          />
          {/* <Typography gutterBottom variant="h4" component="h1">
            Session Info
          </Typography> */}

          <br />
          <div>
            <Typography gutterBottom variant="h5" component="h2">
              Instructor
            </Typography>
            {/* Possibly add an avatar here with instructor name */}
            <Typography variant="body2" color="textSecondary" component="p">
              Prof. Alan Thicke
            </Typography>
          </div>
          <br />
          <Grid container justify="space-between">
            <div>
              <Typography gutterBottom variant="h5" component="h2">
                Subject
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                History
              </Typography>
            </div>
            <div>
              <Typography gutterBottom variant="h5" component="h2">
                Capacity
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                12/25
              </Typography>
            </div>
          </Grid>
          <br />
          <Grid container justify="space-between">
            <div>
              <Typography gutterBottom variant="h5" component="h2">
                Date
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                07/ 26 / 2020
              </Typography>
            </div>
            <div>
              <Typography gutterBottom variant="h5" component="h2">
                Time
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                5:30 pm
              </Typography>
            </div>
          </Grid>

        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Close
        </Button>
        <Button size="small" color="primary">
          Register
        </Button>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Description:
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            What was the class structure of the Aztecs? What language did the Aztec speak?
            What can we learn from the Aztecs? Find out the answers to these questions and
            more in this comprehensive session pulled straight from my course curriculum at Tulane.
          </Typography>

          <Typography gutterBottom variant="h5" component="h2">
            Est. Duration:
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            1hr 45min
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default SessionCard;
