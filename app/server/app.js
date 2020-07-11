
const express = require('express');
//const cors = require('cors');
const { routes } = require('./routes')
const authRoutes = require('./auth-routes');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const app = express();
app.use(express.json());


// this will tell the server to use your build files
app.use(express.static(`${path.resolve('./')}/build`));
// this will serve files from the build when you refresh on endpoints from react router
app.get('*', (req, res) => {
  res.sendFile(`${path.resolve('./')}/build/index.html`);
});

app.use('/', routes);
app.get('/', (req, res) => {
  res.send('This is from express.js');
});
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
module.exports = {
  app,
}