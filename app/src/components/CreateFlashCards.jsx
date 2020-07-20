import React, { useState, useEffect } from 'react';
import Cleave from 'cleave.js/react';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid, TableContainer, Table, TableHead, TableRow, TableBody } from '@material-ui/core';

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

const CreateFlashCards = () => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [flashCard, setFlashCard] = useState({});
  const [flashCards, setFlashCards] = useState([]);

  const addFlashCard = () => {
    // this will add to Flash Card to flashCards state
    const card = {
      front,
      back
    };
    setFlashCard(card);
    flashCards.push(card);
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
    console.log(card)
    flashCards.push(card);
  };

  const classes = useStyles();

  return (
    <div className="Create">
      <div>
        <Grid container justify="space-around">
          <Card className={classes.root}>
            <CardContent>
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
              <Button type="submit" onClick={addFlashCard}>Submit</Button>
            </CardContent>
          </Card>
        </Grid>
      </div>
      <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>

            </TableRow>

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
