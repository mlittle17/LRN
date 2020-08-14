import React, { useState } from 'react';

import { Form } from 'semantic-ui-react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Button, Card, CardContent, Dialog, Fade, Grid, Table, Paper,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
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
    margin: 'auto',
    maxWidth: 620,
    // minWidth: 700,
    maxHeight: 200,
  },
  root: {
    marginTop: 40,
    maxWidth: 620,
    minWidth: 620,
    minHeight: 300,
    marginBottom: 40,
  },
  docsButton: {
    marginTop: 10,
    width: 586,
    backgroundColor: '#474a2c',
    color: '#f6fef5',
    '&:hover': {
      backgroundColor: '#a58e57',
      color: '#2d2e2e',
    },
  },
  dialog: {
    minWidth: 620,
    minHeight: 545,
  },
  cardsButton: {
    margin: 10,
    width: 500,
    backgroundColor: '#474a2c',
    color: '#f6fef5',
    '&:hover': {
      backgroundColor: '#a58e57',
      color: '#2d2e2e',
    },
  },
  save: {
    float: 'right',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    width: 100,
    backgroundColor: '#474a2c',
    color: '#f6fef5',
    '&:hover': {
      backgroundColor: '#a58e57',
      color: '#2d2e2e',
    },
  },
}));

const CreateFlashCards = ({ setCards }) => {
  const [open, setOpen] = useState(false);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [packName, setPackName] = useState('');
  const [flashCard, setFlashCard] = useState({});
  const [flashCards, setFlashCards] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    console.log(flashCards);
  };

  const handleNameChange = (e) => {
    setPackName(e.target.value);
  };

  const handleFrontChange = (e) => {
    setFront(e.target.value);
  };

  const handleBackChange = (e) => {
    setBack(e.target.value);
  };

  const addCards = () => {
    const pack = {
      name: packName,
      cards: flashCards,
    };

    setCards(pack);
    console.log(pack);
    handleClose();
  };

  const classes = useStyles();

  return (
    <div className="Create">
      <Button className={classes.docsButton} onClick={handleOpen}>
        Add FlashCards to Session
      </Button>
      <div>
        <Dialog
          maxHeight="md"
          border={2}
          borderColor="primary"
          fullWidth="true"
          className={classes.dialog}
          maxWidth="md"
          scroll="paper"
          open={open}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <Grid container justify="space-around">
            <Card className={classes.root}>
              <CardContent>
                <Form.Input
                  fluid
                  label="Pack Name"
                  placeholder="Pack Name"
                  onChange={handleNameChange}
                />
                <Form>
                  {/* subject select */}
                  <Form.Input
                    class="flash"
                    fluid
                    label="Front"
                    placeholder="Question"
                    value={front}
                    onChange={handleFrontChange}
                  />

                  {/* session date */}
                  <Form.Input
                    class="flash"
                    label="Back"
                    placeholder="Answer"
                    value={back}
                    onChange={handleBackChange}
                  />

                </Form> <br />
                <Button className={classes.cardsButton} onClick={addFlashCard}>Create Flash Card</Button>
              </CardContent>
            </Card>
          </Grid>
          {flashCards.length > 0 && (
            // <Fade>
              <div>
                <TableContainer className={classes.table} component={Paper} variant="outlined" style={{ borderColor: '#474a2c' }}>
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
                <Button className={classes.cardsButton, classes.save} onClick={addCards}>
                  Save Pack
                </Button>

              </div>
            // </Fade>
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default CreateFlashCards;
