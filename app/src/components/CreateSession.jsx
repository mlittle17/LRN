import React, { useState } from 'react';
import axios from 'axios';
import Cleave from 'cleave.js/react';
import { v1 as generateUuid } from 'uuid';
import CounterInput from 'react-counter-input';

import AddDocuments from './AddDocuments.jsx';
import CreateFlashCards from './CreateFlashCards.jsx';
import { Button, Form } from 'semantic-ui-react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardContent, FormControlLabel, Grid, Switch, Typography,
} from '@material-ui/core';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness3';

import '../styles/Form.css';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 40,
    maxWidth: 620,
    minWidth: 620,
    minHeight: 340,
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
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionDesc, setSessionDesc] = useState('');
  const [subject, setSessionSubject] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [sessionMeridiem, setSessionMeridiem] = useState('');
  const [sessionLength, setSessionLength] = useState('');
  const [capacity, setCapacity] = useState(1);
  const [documents, setDocuments] = useState([]);
  const [document, setDocument] = useState('');
  const [cards, setCards] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const onSessionNameChange = (e) => {
    setSessionTitle(e.target.value);
  };
  const onSessionDescChange = (e) => {
    setSessionDesc(e.target.value);
  };
  const onSessionSubjectChange = (e, result) => {
    const { value } = result;
    setSessionSubject(value);
  };
  const onSessionDateChange = (e) => {
    setSessionDate(e.target.value);
  };

  const onSessionTimeChange = (e) => {
    setSessionTime(e.target.value);
  };
  const onSessionMeridiemChange = (e, result) => {
    const { value } = result;
    setSessionMeridiem(value);
  };

  const onSessionLengthChange = (e) => {
    setSessionLength(e.target.value);
  };

  const addEvent = () => {
    const uuid = generateUuid();
    return axios.post('/event', {
      user_id: id, name: sessionTitle, topic: subject, description: sessionDesc, duration: sessionLength, date: sessionDate, time: `${sessionTime} ${sessionMeridiem}`, classLimit: capacity, zip: user.zip, uuid: uuid
    })
      .then(response => response.data[0].id)
      .then(eventId => {
        axios.post(`event/${id}/student`, { user: id, event: eventId })
          .then(() => {
            console.log('Successfully registered you for your session')
          })
        axios.post('/event/documents', {
          type,
          name,
          link: document,
          user_id: id,
          event_id: eventId,
        })
          .then(response => {
            return response.data[0].id;
          })
          .then(documentId => {
            axios.post(`/users/:${id}/binder`, {
              users_id: id, document_id: documentId,
            });
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
                });
                window.location.replace('/');
              })
          )
      })
      .catch(err => console.log(err));
  };

  const classes = useStyles();
  return (
    <div className="Create">
      <div>
        <Grid container justify="space-around" style={{ marginTop: 40 }}>
          <Typography gutterBottom variant="h4" component="h6" style={{ color: '#2d2e2e' }}><b>CREATE SESSION</b></Typography>
        </Grid>
        <Grid container justify="space-around" style={{ marginBottom: 40 }}>
          <Card className={classes.root}>
            <CardContent>
              <Form>
                {/* session name */}
                <Form.Field>
                  <label>Name</label>
                  <input onChange={onSessionNameChange} />
                </Form.Field>

                {/* subject select */}
                <Form.Select
                  fluid
                  label="Subject"
                  options={subOptions}
                  placeholder="Subject"
                  onChange={onSessionSubjectChange}
                  value={subject}
                />

                {/* session description */}
                <Form.TextArea label="Description" maxLength="250" onChange={onSessionDescChange} />

                {/* session date */}
                <Form.Field>
                  <label>Date</label>
                  <Cleave
                    placeholder="MM/DD/YYYY"
                    options={{ date: true, datePattern: ['m', 'd', 'Y'] }}
                    onChange={onSessionDateChange}
                  />
                </Form.Field>

                {/* session time */}
                <Form.Group>
                  <Form.Field>
                    <label>Time</label>
                    <Cleave
                      placeholder="HH:MM"
                      options={{ time: true, timePattern: ['h', 'm'] }}
                      onChange={onSessionTimeChange}
                    />
                  </Form.Field>
                  {/* am / pm */}
                  <Form.Select
                    fluid
                    label={<span><WbSunnyIcon /><Brightness3Icon /></span>}
                    options={timeOptions}
                    placeholder="AM"
                    onChange={onSessionMeridiemChange}
                  />

                  {/* session length */}
                  <Form.Field style={{ float: 'right' }}>
                    <label>Est. Duration</label>
                    <Cleave
                      placeholder="H:MM"
                      options={{ delimiters: [' hr ', ' mins'], blocks: [1, 2, 0] }}
                      onChange={onSessionLengthChange}
                    />
                  </Form.Field>
                </Form.Group>

                <Grid container justify="space-between">
                  {/* session size limit */}
                  <Form.Field>
                    <label>Session Capacity</label>
                    <CounterInput
                      count={1}
                      min={1}
                      max={25}
                      onCountChange={count => setCapacity(count)}
                      inputStyle={{ fontSize: 18 }}
                      btnStyle={{ color: '#a58e57', fontSize: 30 }}
                    />
                  </Form.Field>
                  <FormControlLabel
                    control={<Switch size="large" color="primary" />}
                    labelPlacement="end"
                    label={<b>Private</b>}
                  />
                </Grid>
                <AddDocuments setDocs={setDocuments} setName={setName} setType={setType} />
                <CreateFlashCards setCards={setCards} />
              </Form> <br />
              <Button
                type="submit"
                onClick={addEvent}
                style={{
                  float: 'right', border: 'none', backgroundColor: '#ffffff', color: '#a58e57',
                }}
              >DONE
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </div>
    </div>
  );
};

export default CreateSession;
