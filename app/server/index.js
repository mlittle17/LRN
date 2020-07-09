const express = require("express");
const app = express(); // create express app
const authRoutes = require('./auth-routes');
const passportSetup = require('./config/passport-setup');

app.use(express.json());
// auth route
app.use('/auth', authRoutes);

app.post('/test', async(req, res) => {
  try {
    console.log('i am hitting post test');
    res.send("This is from test route");
  } catch (err) {
    console.log('problem', err);
  }
});

app.get("/", (req, res) => {
  res.send("This is from express.js");
});

app.get("/test", (req, res) => {
  res.send("This is from test get");
});

app.get('/authTest', (req, res) => {
  res.send('Logged In!')
});

// start express server on port 5000
app.listen(8000, () => {
  console.log("server started on port 8000");
});
