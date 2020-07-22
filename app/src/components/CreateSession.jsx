import React, { useState, useEffect } from 'react';
import Cleave from 'cleave.js/react';
import CounterInput from 'react-counter-input';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid } from '@material-ui/core';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'; // for document
import SlideshowTwoToneIcon from '@material-ui/icons/SlideshowTwoTone'; // two-toned for pp
import ViewCarouselTwoToneIcon from '@material-ui/icons/ViewCarouselTwoTone'; // flash cards

import AddDocuments from './AddDocuments.jsx';
import CreateFlashCards from './CreateFlashCards.jsx';
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
const subOptions = [
  { key: 'fi', text: 'Finance', value: 'finance' },
  { key: 'fd', text: 'Food', value: 'food' },
  { key: 'hs', text: 'History', value: 'history' },
  { key: 'lt', text: 'Literature', value: 'literature' },
  { key: 'ma', text: 'Math', value: 'math' },
  { key: 'mu', text: 'Music', value: 'music' },
  { key: 'sc', text: 'Science', value: 'science' },
  { key: 'sk', text: 'Skill', value: 'skill' },
  { key: 'ot', text: 'Other', value: 'other' },
];

const timeOptions = [
  { key: 'am', text: 'AM', value: 'am' },
  { key: 'pm', text: 'PM', value: 'pm' },
];

const CreateSession = ({ user }) => {
  const { id } = user;
  const [sessionDate, setSessionDate] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [capacity, setCapacity] = useState(1);
  const [subject, setSubject] = useState('');
  const [document, setDocument] = useState('');
  const [cards, setCards] = useState('');
  // const [eventId, setEventId] = useState(1);

  // for now hardcoded user
  // const user_id = '1'

  const onSessionDateChange = (e) => {
    setSessionDate(e.target.rawValue);
  };

  const onSessionTimeChange = (e) => {
    setSessionTime(e.target.rawValue);
  };
  const onSessionSubjectChange = (e, result) => {
    const { value } = result;
    setSubject(value);
  };

  const addEvent = () => {
    return axios.post('/event', {
      user_id: id, topic: subject, date: sessionDate, time: sessionTime, classLimit: capacity,
    })
      .then(response => { return response.data[0].id; })
      .then(eventId => {
        axios.post('/event/documents', {
          type: 'google docs',
          link: document,
          user_id: id,
          event_id: eventId,
        })
          .then(
            axios.post('/event/flashCards', {
              user_id: id,
              event_id: eventId,
              packName: cards.name,
            })
              .then(res => {
                axios.post('/event/cards', {
                  packId: res.data[0].id,
                  cards: cards.cards,
                })
                  .catch(err => console.log(err))
                  .catch(err => {
                    console.log(err);
                  });
              }),
          )
          .catch(error => {
            console.log(error);
          .then(response => {
            console.log(response);
            return response.data[0].id;
          })
          .then(documentId => {
            console.log(documentId);
            axios.post(`/users/:${id}/binder`, {
              users_id: id, document_id: documentId,
            });
          });
      });
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
                <Form.Select
                  fluid
                  label="Subject"
                  options={subOptions}
                  placeholder="Subject"
                  onChange={onSessionSubjectChange}
                  value={subject}
                />

                {/* session date */}
                <Form.Field>
                  <label>Date</label>
                  <Cleave
                    placeholder="MM/DD/YYYY"
                    options={{ date: true, datePattern: ['m', 'd', 'Y'] }}
                    onChange={onSessionDateChange}
                    className="form-field"
                  />
                </Form.Field>

                {/* session time */}
                <Form.Group>
                  <Form.Field>
                    <label>Time</label>
                    <Cleave
                      placeholder="00:00"
                      options={{ time: true, timePattern: ['h', 'm'] }}
                      onChange={onSessionTimeChange}
                      className="form-field"
                    />
                  </Form.Field>
                  <Form.Select
                    fluid
                    label={<span><WbSunnyIcon /><Brightness3Icon /></span>}
                    options={timeOptions}
                    placeholder="AM"
                  />
                </Form.Group>

                {/* session size limit */}
                <Form.Field>
                  <label>Session Capacity</label>
                  <CounterInput
                    count={1}
                    min={1}
                    max={25}
                    onCountChange={count => setCapacity(count)}
                  />
                </Form.Field>
                <AddDocuments setDoc={setDocument} />
                <CreateFlashCards setCards={setCards} />
              </Form> <br />
              <Button type="submit" onClick={addEvent}>Submit</Button>
            </CardContent>
          </Card>
        </Grid>
      </div>
    </div>
  );
};

export default CreateSession;
