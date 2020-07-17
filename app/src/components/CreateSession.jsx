import React, { useState, useEffect } from 'react';
import Cleave from 'cleave.js/react';
import CounterInput from 'react-counter-input';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid } from '@material-ui/core';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness3';

import AddDocuments from './AddDocuments.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
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

const CreateSession = () => {
  const [sessionDate, setSessionDate] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [capacity, setCapacity] = useState(1);
  const [zip, setZip] = useState(0);
  const [subject, setSubject] = useState('');
  const [document, setDocument] = useState('');

  // for now hardcoded user
  const user_id = 3;
  console.log(document);
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
    axios.post('/event', {
      user_id, topic: subject, date: sessionDate, time: sessionTime, classLimit: capacity,
    })
      .then(() => {
        axios.post('/event/documents', {
          type: 'google docs', link: document, user_id, event_id: 3,
        })
          .then(response => {
            console.log(response.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // const onZipChange = (e) => {
  //   setZip(e.target.rawValue);
  // };

  const classes = useStyles();
  return (
    <div className="Create">
      {/* <div>Create Session</div> */}
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

                {/* session zip */}
                {/* <Form.Field>
                  <Cleave
                    placeholder="ZIP"
                    options={{
                      blocks: [5],
                      numericOnly: true,
                    }}
                    onChange={onZipChange}
                    className="form-field"
                  />
                </Form.Field> */}
                <AddDocuments setDoc={setDocument} />
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
