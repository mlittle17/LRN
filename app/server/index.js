const express = require('express');
const { createUser, getAllUser, createTopic, createEvent, getUser } = require('./db/methods');

const app = express(); // create express app

app.use(express.json());

app.post('/test', async(req, res) => {
  try {
    console.log('i am hitting post test');
    res.send('This is from test route');
  } catch (err) {
    console.log('problem', err);
  }
});

app.get('/', (req, res) => {
  res.send('This is from express.js');
});

app.get('/test', (req, res) => {
  res.send('This is from test get');
});

app.post('/user', createUser);
app.post('/topic', createTopic);
app.get('/user', getAllUser)
app.post('/event', createEvent)

// start express server on port 5000
app.listen(8000, () => {
  console.log('server started on port 8000');
});
