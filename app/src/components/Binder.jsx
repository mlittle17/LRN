import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Paper, Table, TableBody, TableRow, TableCell,
  TableContainer, TableHead, Typography,
} from '@material-ui/core';

// const [documents, setDocuments] = useState([])
/*
// request to get data
axios.get('event/documents')
   .then(response => {
    console.log(response.data)
    setDocuments(response.data)
   })
   .catch(err => {
     console.log(err);
   })
 */

const documents = [
  {
    type: 'Word Document',
    name: 'Lasagna Recipe',
    creator: 'Rya Sicily',
    dateSaved: '08/03/2020',
  },
  {
    type: 'Word Document',
    name: 'Packing Ess. List',
    creator: 'Greg Sanzen',
    dateSaved: '08/10/2020',
  },
];

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
    maxWidth: 750,
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles(() => ({
  table: {
    // maxWidth: 700,
    // minWidth: 700,
    maxHeight: 200,
  },
  colLabel: {
    color: '#2d2e2e',
  },
  rowText: {
    color: '#474a2c',
  },
}));

const Binder = () => {
  const classes = useStyles();

  return (
    <div className="Binder">
      <Typography gutterBottom variant="h4" component="h6" style={{ marginLeft: '35px', color: '#2d2e2e' }}><b>MY BINDER</b></Typography>

      <TableContainer component={Paper} variant="outlined" style={{ borderColor: '#474a2c' }}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.colLabel}>Type</StyledTableCell>
              <StyledTableCell align="right" className={classes.colLabel}>Name</StyledTableCell>
              <StyledTableCell align="right" className={classes.colLabel}>Creator</StyledTableCell>
              <StyledTableCell align="right" className={classes.colLabel}>Saved Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((document) => (
              <StyledTableRow key={document.name}>
                <StyledTableCell component="th" scope="row" className={classes.rowText}>
                  {document.type}
                </StyledTableCell>
                <StyledTableCell align="right" className={classes.rowText}>{document.name}</StyledTableCell>
                <StyledTableCell align="right" className={classes.rowText}>{document.creator}</StyledTableCell>
                <StyledTableCell align="right" className={classes.rowText}>{document.dateSaved}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <div />
    </div>
  );
};

export default Binder;
