const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2');
const { getUser, createUser } = require('../db/methods');

const keys = require('./keys');

passport.serializeUser((user, done) => {
  // calling done method once we get the user from the db
  // done(null, user.id)
});

passport.deserializeUser((id, done) => {
  // meed to find user by id
  // calling once we've found the user
  done(null, user.id);
});

passport.use(new GoogleStrategy({
  // options for the google strategy
  callbackURL: '/auth/google/redirect',
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,
}, (accessToken, refreshToken, profile, done) => {
  // passport callback function

  const answer = getUser('me@jerry.com');

  console.log(answer, 'here is the answer')

  // check if user already exists in database

  // if (false) {
  //   // console.log(currentUser, 'already here');
  //   // done(null, currentUser);
  // } else {
    // need to call add method here to save profile
    //createUser(profile);

    // calling done once done with new user record
    //done(null, newUser);
  }
));
