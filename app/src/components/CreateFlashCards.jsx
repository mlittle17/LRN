import React, { useState, useEffect } from 'react';
import Cleave from 'cleave.js/react';
import axios from 'axios';
import { Form } from 'semantic-ui-react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Button, TableCell, Paper, Card, CardContent, Grid, TableContainer, Table, TableHead, TableRow, TableBody,
} from '@material-ui/core';

import '../styles/Form.css';

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
  body: {
    fontSize: 30,
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    // maxWidth: 700,
    // minWidth: 700,
    maxHeight: 200,
  },
  root: {
    marginTop: 40,
    maxWidth: 620,
    minWidth: 620,
    minHeight: 340,
    // maxHeight: 340,
  },
  docsButton: {
    margin: 10,
    width: 500,
    backgroundColor: '#474a2c',
    color: '#f6fef5',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const CreateFlashCards = ({ setCards }) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [packName, setPackName] = useState('');
  const [flashCard, setFlashCard] = useState({});
  const [flashCards, setFlashCards] = useState([]);

  const addFlashCard = () => {
    // this will add to Flash Card to flashCards state
    const card = {
      front,
      back,
    };
    setFlashCard(card);
    flashCards.push(card);
    setFront('');
    setBack('');
  };

  const addName = (e) => {
    setPackName(e.target.value);
  };

  const addFront = (e) => {
    setFront(e.target.value);
  };

  const addBack = (e) => {
    setBack(e.target.value);
  };


  const addCards = () => {
    const pack = {
      name: packName,
      cards: flashCards,
    };

    setCards(pack);
    console.log(pack);
  };

  const classes = useStyles();

  return (
    <div className="Create">
      <div>
        <Grid container justify="space-around">
          <Card className={classes.root}>
            <CardContent>
              <Form.Input
                fluid
                label="Pack Name"
                placeholder="Pack Name"
                onChange={addName}
              />
              <Form>
                {/* subject select */}
                <Form.Input
                  class="flash"
                  fluid
                  label="Front"
                  placeholder="Question"
                  value={front}
                  onChange={addFront}
                />

                {/* session date */}
                <Form.Input
                  class="flash"
                  label="Back"
                  placeholder="Answer"
                  value={back}
                  onChange={addBack}
                />

              </Form> <br />
              <Button className={classes.docsButton} onClick={addFlashCard}>Create Flash Card</Button>
            </CardContent>
          </Card>
        </Grid>
      </div>
      <div>
        <TableContainer component={Paper} variant="outlined" style={{ borderColor: '#474a2c' }}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="middle" className={classes.colLabel}>Front</StyledTableCell>
                <StyledTableCell align="middle" className={classes.colLabel}>Back</StyledTableCell>
                <StyledTableCell align="middle" className={classes.colLabel}>Pack</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {flashCards.map(fc => (
                <StyledTableRow key={document.id}>
                  <StyledTableCell align="middle" className={classes.rowText}> {fc.front} </StyledTableCell>
                  <StyledTableCell align="middle" className={classes.rowText}> {fc.back} </StyledTableCell>
                  <StyledTableCell align="middle" className={classes.rowText}> {packName} </StyledTableCell>
                </StyledTableRow>

              ))}
            </TableBody>
          </Table>

        </TableContainer>
        <Button className={classes.docsButton} onClick={addCards}>Add Cards to Session</Button>

      </div>
    </div>

  );
};

export default CreateFlashCards;
