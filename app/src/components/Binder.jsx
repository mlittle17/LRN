import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Paper, Table, TableBody, TableRow, TableCell,
  TableContainer, TableHead, Typography,
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
    maxWidth: 500,
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 500,
    maxHeight: 200,
  },
  colLabel: {
    color: '#2d2e2e',
  },
  rowText: {
    color: '#474a2c',
  },
}));

const Binder = ({ userInfo, documents }) => {
  const classes = useStyles();

  return (
    <div className="Binder" style={{ marginTop: '35px' }}>
      <Typography gutterBottom variant="h4" component="h6" style={{ color: '#2d2e2e' }}><b>MY BINDER</b></Typography>

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
              <StyledTableRow key={document.id}>
                <StyledTableCell component="th" scope="row" className={classes.rowText}>
                  {document.documenttype}
                </StyledTableCell>
                <StyledTableCell align="right" className={classes.rowText}><a href={document.linkto}> {document.title} </a></StyledTableCell>
                <StyledTableCell align="right" className={classes.rowText}>{`${document.namefirst} ${document.namelast}`}</StyledTableCell>
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
