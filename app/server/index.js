const express = require('express');

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

// start express server on port 5000
app.listen(8000, () => {
  console.log('server started on port 8000');
});
