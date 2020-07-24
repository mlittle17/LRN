/* eslint-disable object-shorthand */
import React from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';

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
  sessionPage,
}) => {
  // const {
  //   name, creator, date, time,
  // } = sessions;
  const classes = useStyles();

  // const rows = sessions.chunk(3);
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
              <StyledTableCell align="right" className={classes.rowText}>{session.time}</StyledTableCell>
            </StyledTableRow>
          ))}
          {/* }) */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UpcomingTable;
