const express = require('express');
const {
  createUser, getAllUser, createTopic, createEvent, getUser,
} = require('./db/methods');

const app = express(); // create express app
const authRoutes = require('./auth-routes');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

app.use(express.json());

//
app.use(cookieSession({
  // cookie will last for one day
  maxAge: 24 * 60 * 60 * 1000,
  // being stored in keys.js
  keys: [keys.session.cookieKey],
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// auth route
app.use('/auth', authRoutes);

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

app.get('/authTest', (req, res) => {
  res.send('Logged In!');
});
app.post('/user', createUser);
app.post('/user', createUser);
app.post('/topic', createTopic);
app.get('/user', getAllUser);
app.post('/event', createEvent);

// start express server on port 5000
app.listen(8000, () => {
  console.log('server started on port 8000');
});
