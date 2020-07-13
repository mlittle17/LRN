import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Table, TableBody, TableRow, TableCell,
  TableContainer, TableHead, Card, CardContent,
  CardActionArea, CardActions, Grid, Typography,
  IconButton, CardHeader, Paper,
} from '@material-ui/core';

import axios from 'axios';

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

const useStyles = makeStyles(() => ({
  table: {
    maxWidth: 700,
    minWidth: 700,
    maxHeight: 200,
  },
}));

const Binder = () => {
  const classes = useStyles();

  return (
    <div className="Binder">
      {/* <h1 style={{ color: 'red' }}>My Binder</h1> */}
      <Typography gutterBottom variant="h6" component="h6" style={{ marginLeft: '35px' }}><b>MY BINDER</b></Typography>

      <Card align="left" className={classes.root}>
        <CardContent style={{ marginLeft: '20px' }}>
          <CardActionArea>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Type</StyledTableCell>
                    <StyledTableCell align="right">Name</StyledTableCell>
                    <StyledTableCell align="right">Creator</StyledTableCell>
                    <StyledTableCell align="right">Saved Date</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {documents.map((document) => (
                    <StyledTableRow key={document.name}>
                      <StyledTableCell component="th" scope="row">
                        {document.type}
                      </StyledTableCell>
                      <StyledTableCell align="right">{document.name}</StyledTableCell>
                      <StyledTableCell align="right">{document.creator}</StyledTableCell>
                      <StyledTableCell align="right">{document.dateSaved}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <br />
            <div />

          </CardActionArea>
        </CardContent>
        {/* <CardActions>

      </CardActions> */}

      </Card>;

      {/* <TableContainer component={Paper}>
          <Table style={{ position: 'absolute', top: 5, right: 5 }} className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell size="small" align="right">Type</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Creator</TableCell>
                <TableCell align="right">Created Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row" />
                <TableCell align="right">will be data</TableCell>
                <TableCell align="right">will be data</TableCell>
                <TableCell align="right">will be data</TableCell>
                <TableCell align="right">will be data</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer> */}
    </div>
  );
}

export default Binder;
