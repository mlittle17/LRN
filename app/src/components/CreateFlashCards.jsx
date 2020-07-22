import React, { useState, useEffect } from 'react';
import Cleave from 'cleave.js/react';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardContent, Grid, TableContainer, Table, TableHead, TableRow, TableBody,
} from '@material-ui/core';

import '../styles/Form.css';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 40,
    maxWidth: 620,
    minWidth: 620,
    minHeight: 340,
    // maxHeight: 340,
  },
  docsButton: {
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

  const createCard = () => {
    const card = {
      front,
      back,
    };
    flashCards.push(card);
  };

  const addCards = () => {
    const pack = {
      name: packName,
      cards: flashCards
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
                  fluid
                  label="Front"
                  placeholder="Question"
                  onChange={addFront}
                />

                {/* session date */}
                <Form.Input
                  label="Back"
                  placeholder="Answer"
                  onChange={addBack}
                />

              </Form> <br />
              <Button type="submit" onClick={addFlashCard}>Create Flash Card</Button>
              <Button type="submit" onClick={addCards}>Add Cards to Session</Button>
            </CardContent>
          </Card>
        </Grid>
      </div>
      <div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow />

            </TableHead>
            <TableBody>
              {flashCards.map(fc => (
                <div>{fc.front}</div>
              ))}
            </TableBody>
          </Table>

        </TableContainer>

      </div>
    </div>

  );
};

export default CreateFlashCards;
