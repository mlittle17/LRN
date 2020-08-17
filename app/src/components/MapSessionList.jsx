import React, { useState, useEffect } from 'react';
import axios from 'axios';

import clsx from 'clsx';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Register from './Register.jsx';
import {
 Button, Divider, Grid, Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  }
}));

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    // rgba(0, 0, 0, .03)
    color: '#f6fef5',
    backgroundColor: '#2d2e2e',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    backgroundColor: '#f6fef5',
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const AccordionActions = withStyles({
  root: {
    backgroundColor: '#f6fef5',
  },
})(MuiAccordionSummary);

const MapSessionList = ({ user, sessionList, regSessions }) => {
  const [expanded, setExpanded] = useState(0);

  const classes = useStyles();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    console.log('regSessions:', regSessions);
  }, [sessionList])
  console.log('sessionList:', sessionList)


  return (
    <div className="map-list">
      {sessionList.map((session, index) => (

        <Accordion square key={index} expanded={expanded === index} onChange={handleChange(index)}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">
              <b>{session.name.toUpperCase()}</b>
            </Typography><br />
          </AccordionSummary>

          <AccordionDetails className={classes.details}>
            <div className={classes.column}>
              <Typography variant="h5">
                {session.topic.toUpperCase()}
              </Typography>
            </div>
            <div className={clsx(classes.column, classes.helper)}>
              <Typography variant="h7">
                {session.date}
              </Typography>
            </div>
            <div className={clsx(classes.column, classes.helper)}>
              <Typography variant="h7">
                {session.time}
              </Typography>
            </div>
          </AccordionDetails>
          <Divider /><br />
            <Typography variant="h7">
              {session.description}
            </Typography>

          <AccordionActions style={{ marginTop: 10 }}>
            <Register userId={user.id} sessionId={session.id} />
          </AccordionActions>
        </Accordion>
      ))}
    </div>
  );
}

export default MapSessionList;
