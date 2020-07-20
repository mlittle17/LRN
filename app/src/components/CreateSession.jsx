import React, { useState, useEffect } from 'react';
import Cleave from 'cleave.js/react';
import CounterInput from 'react-counter-input';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardContent, FormControlLabel, Grid, Switch, Typography,
} from '@material-ui/core';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness3';

import AddDocuments from './AddDocuments.jsx';
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
  //  console.log(user);
  // console.log(id)
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionDesc, setSessionDesc] = useState('');
  const [subject, setSessionSubject] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [sessionMeridiem, setSessionMeridiem] = useState('');
  const [sessionLength, setSessionLength] = useState('');
  const [capacity, setCapacity] = useState(1);
  const [document, setDocument] = useState('');
  //const [eventId, setEventId] = useState(1);

  // for now hardcoded user
  // const user_id = '1'
  // console.log(document);

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
    return axios.post('/event', {
      user_id: id, name: sessionTitle, topic: subject, description: sessionDesc, duration: sessionLength, date: sessionDate, time: `${sessionTime} ${sessionMeridiem}`, classLimit: capacity,
    })
      .then(response => {
        return response.data[0].id;
      })
      .then(eventId => {
        console.log(eventId);
        axios.post('/event/documents', {
          type: 'google docs', link: document, user_id: id, event_id: eventId,
        })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(error => {
        console.log(error);
      });
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
                  // className="form-field"
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
                    // className="form-field"
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
                    // className="form-field"
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
                    // <Switch checked={state.checkedA} onChange={handleChange} name="checkedA" />
                    labelPlacement="end"
                    label={<b>Private</b>}
                  />
                </Grid>
                <AddDocuments setDoc={setDocument} />
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
