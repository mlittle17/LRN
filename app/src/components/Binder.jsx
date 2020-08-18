import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Paper, Table, TableBody, TableRow, TableCell,
  TableContainer, TableHead, Typography,
} from '@material-ui/core';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'; // for document
import SlideshowTwoToneIcon from '@material-ui/icons/SlideshowTwoTone'; // two-toned for pp
import ViewCarouselTwoToneIcon from '@material-ui/icons/ViewCarouselTwoTone'; // flash cards


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

const Binder = ({ userInfo, binder }) => {
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
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log(binder)}
            {binder.map((document) => (
              <StyledTableRow key={document.id}>
                <StyledTableCell component="th" scope="row" className={classes.rowText}>
                  {document.documenttype === 'Google Doc' && (
                    <InsertDriveFileIcon />
                  )}
                  {document.documenttype === 'slides' && (
                    <SlideshowTwoToneIcon />
                  )}
                  {document.documenttype === 'flash cards' && (
                    <ViewCarouselTwoToneIcon />
                  )}
                </StyledTableCell>
                <StyledTableCell align="right" className={classes.rowText}><a href={document.linkto}> {document.name}</a></StyledTableCell>
                <StyledTableCell align="right" className={classes.rowText}>{`${document.namefirst} ${document.namelast}`}</StyledTableCell>
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
