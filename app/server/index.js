const express = require('express');
const path = require('path');
const app = express();

const passport = require('passport');
const auth = require('./auth');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');


auth(passport);
app.use(cookieSession({
  name: 'session',
  keys: ['123']
}));

app.use(cookieParser);
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());

app.use(passport.initialize());

app.get('/', (req, res) => {
  if (req.session.token) {
      res.cookie('token', req.session.token);
      res.json({
          status: 'session cookie set'
      });
  } else {
      res.cookie('token', '')
      res.json({
          status: 'session cookie not set'
      });
  }
});

app.get('/logout', (req, res) => {
  req.logout();
  req.session = null;
  res.redirect('/');
});


app.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));
app.get('/auth/google/callback',
  passport.authenticate('google', {
      failureRedirect: '/'
  }),
  (req, res) => {
    req.session.token = req.user.token;
    res.redirect('/');
  }
);


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
