import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table, TableBody, TableRow, TableCell,
  TableContainer, TableHead, Card, CardContent, CardActionArea, CardActions, Grid, Typography, IconButton, CardHeader,
} from '@material-ui/core';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(() => ({
  table: {
    maxWidth: 150,
    minWidth: 100,
  },
}));

function Binder() {
  // const[]
  const classes = useStyles();

  return (
    <div className="Binder">
      <h1 style={{ color: 'red' }}>My Binder</h1>

      <Card align="center" className={classes.root}>
        <CardContent>
          <CardActionArea>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
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
