const express = require('express');
const path = require('path');

const app = express();
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('hello');
});
// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
  const list = ['item1', 'item2', 'item3'];
  res.json(list);
  console.log('Sent list of items');
});

// an endpoint to test
app.post('/test', async(req, res) => {
  try {
    console.log(req.body);
  } catch (err) {
    console.log('problem', err);
  }
});
// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});
const port = process.env.PORT || 8000;
app.listen(port);
console.log(`App is listening on port ${port}`);
