// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar, Button, Card, CardContent, CardActionArea, CardActions,
  CardHeader, Collapse, Dialog, Grid, Typography, IconButton,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    minWidth: 300,
    borderColor: '#474a2c',
  },
  dialog: {
    maxWidth: 364,
    minWidth: 364,
    minHeight: 550,
    marginLeft: 'auto',
  },
  actionArea: {
    backgroundColor: '#a58e57',
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

const SessionCard = ({ event }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const {
    name, namefirst, namelast, date, time, description, duration,
    topic, capacitycount, classlimit,
  } = event.other;

  // Open the event card window
  const handleClickOpen = () => {
    console.log(event);
    setOpen(true);
  };

  // Close the event card window
  const handleClose = () => {
    setOpen(false);
  };

  // Set the Card to expand show the extra details
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const location = useLocation();

  return (
    <>
      <Button size="small" onClick={handleClickOpen}>
        SESSION {/* {event.name} */}
      </Button>
      <Dialog
        fullWidth="true"
        className={classes.dialog}
        maxWidth="md"
        scroll="paper"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        hideBackdrop="true"
      >
        { event && (
          <Card className={classes.root} variant="outlined">
            <CardActionArea className={classes.actionArea}>
              <div style={{ marginTop: '10px' }}>
                <Typography gutterBottom variant="h4" component="h1" align="center">
                  {name}
                </Typography>
              </div>
              <br />
            </CardActionArea>
            <CardContent>
              <div>
                {/* Possibly add an avatar here with instructor name */}
                <Typography gutterBottom variant="h5" component="h2">
                  Instructor
            </Typography>
                {/* Possibly add an avatar here with instructor name */}
                <Typography variant="body1" color="textSecondary" component="p">
                  {`${namefirst} ${namelast}`}
                </Typography>
              </div>
              <br />
              <Grid container justify="space-between">
                <div>
                  <Typography gutterBottom variant="h5" component="h2">
                    Subject
              </Typography>
                  <Typography variant="body1" color="textSecondary" component="p">
                    {topic}
                  </Typography>
                </div>
                <div>
                  <Typography gutterBottom variant="h5" component="h2">
                    Capacity
              </Typography>
                  <Typography variant="body1" color="textSecondary" component="p">
                    {capacitycount} / {classlimit}
                  </Typography>
                </div>
              </Grid>
              <br />
              <Grid container justify="space-between">
                <div>
                  <Typography gutterBottom variant="h5" component="h2">
                    Date
              </Typography>
                  <Typography variant="body1" color="textSecondary" component="p">
                    {date}
                  </Typography>
                </div>
                <div>
                  <Typography gutterBottom variant="h5" component="h2">
                    Time
              </Typography>
                  <Typography variant="body1" color="textSecondary" component="p">
                    {time}
                  </Typography>
                </div>
              </Grid>

            </CardContent>
            <CardActions>
              <Grid container justify="space-between">
                <div>
                  <Button size="small" onClick={handleClose} style={{ color: '#f7fff6', backgroundColor: '#474a2c' }}>
                    Close
              </Button>
                  {/* && registered !== true */}
                  {(location.pathname !== '/registered') && (
                    <Button size="small" style={{ color: '#f7fff6', backgroundColor: '#474a2c' }}>
                      Register
                    </Button>
                  )}
                </div>
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
              </Grid>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Description:
            </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  What was the class structure of the Aztecs? What language did the Aztec speak?
                  What can we learn from the Aztecs? Find out the answers to these questions and
                  more in this comprehensive session pulled straight from my course curriculum at Tulane.
            </Typography>

                <Typography gutterBottom variant="h5" component="h2">
                  Est. Duration:
            </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  1hr 45min
            </Typography>
              </CardContent>
            </Collapse>
          </Card>
        )}
      </Dialog>
    </>
  );
};

export default SessionCard;
