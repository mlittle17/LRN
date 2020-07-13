/* eslint-disable object-shorthand */
import React from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
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
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>NAME</StyledTableCell>
            <StyledTableCell align="right">CREATOR</StyledTableCell>
            <StyledTableCell align="right">DATE</StyledTableCell>
            <StyledTableCell align="right">TIME</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* rows.forEach((sessionArray) => { */}
          {sessionPage.map((session) => (
            <StyledTableRow key={session.name}>
              <StyledTableCell component="th" scope="row">
                {session.name}
              </StyledTableCell>
              <StyledTableCell align="right">{session.creator}</StyledTableCell>
              <StyledTableCell align="right">{session.date}</StyledTableCell>
              <StyledTableCell align="right">{session.time}</StyledTableCell>
            </StyledTableRow>
          ))}
          {/* }) */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UpcomingTable;
