/* eslint-disable object-shorthand */
import React, { useState } from 'react';
import { useHistory, Link, Switch } from 'react-router-dom';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';

import moment, { isBefore, isSameOrAfter } from 'moment';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#a58e57',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

// const createData = (name, creator, date, time) => {
//   return {
//     name, creator, date, time,
//   };
// };

const useStyles = makeStyles({
  table: {
    minWidth: 550,
    minHeight: 300,
    maxHeight: 300,
  },
  colLabel: {
    color: '#2d2e2e',
  },
  rowText: {
    color: '#474a2c',
  },
});

const UpcomingTable = ({
  sessionPage, user, setNavbarSessionName,
}) => {
  // const {
  //   name, creator, date, time,
  // } = sessions;
  const classes = useStyles();
  const [joinSession, setJoinSession] = useState(true);
  const history = useHistory();


  
  const doWeNeedButton = (date, time) => {
    const mDY = date.split('/').join('-');
    // console.log(mDY);
    // console.log(time, moment().isSameOrAfter(moment(time, 'HH:mm a')));
    if (moment().isSameOrAfter(mDY)) {
      if(moment().isSameOrAfter(moment(time, 'HH:mm a'))){
        return true;
      }
    } else {
      return false;
    }
  }

  const placeInSession = (uuid, date, sessionName, creatorUserId) => {
    doWeNeedButton(date);
    console.log('you pushed a button', uuid, sessionName);
    setNavbarSessionName(sessionName);
    console.log(user.id, 'userid', creatorUserId, 'creatorId');
    if (user.id === creatorUserId) {
      history.push(`/instructor/${uuid}/${sessionName}`);
    } else {
      history.push(`/student/${uuid}/${sessionName}`);
    }

    // check if the user is the instructor or the student

    
  };

  return (
    <TableContainer component={Paper} variant="outlined" style={{ borderColor: '#474a2c' }}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell className={classes.colLabel}>NAME</StyledTableCell>
            <StyledTableCell align="right" className={classes.colLabel}>CREATOR</StyledTableCell>
            <StyledTableCell align="right" className={classes.colLabel}>DATE</StyledTableCell>
            <StyledTableCell align="right" className={classes.colLabel}>TIME</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* rows.forEach((sessionArray) => { */}
          {sessionPage.map((session) => (
            <StyledTableRow key={session.name}>
              <StyledTableCell component="th" scope="row" className={classes.rowText}>
                {session.name}
              </StyledTableCell>
              <StyledTableCell align="right" className={classes.rowText}>{`${session.namefirst} ${session.namelast}`}</StyledTableCell>
              <StyledTableCell align="right" className={classes.rowText}>{session.date}</StyledTableCell>
              <StyledTableCell align="right" className={classes.rowText}>
                {doWeNeedButton(session.date, session.time) && <Fab color="primary" aria-label="add" style={{ marginLeft: '30px' }} onClick={() => placeInSession(session.uuid, session.date, session.name, session.users_id )} >
                  <VoiceChatIcon fontSize="large" />
                </Fab> || session.time}
              </StyledTableCell>
            </StyledTableRow>
          ))}
          {/* }) */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


// INSERT INTO event (zip, name, topic, description, duration, date, time, users_id, classLimit, capacityCount, privacy, uuid) VALUES ('70063', 'Fake Session 3', 'Food', 'FakeDescription 3', '45 mins', '07/25/2020', '7:30 pm', 1, 25, 10, 'public', 'cc8f09f1-cd77-11ea-b352-1795043c4790');

export default UpcomingTable;
