const passport = require('passport');
// const User = require();
const User = null;

const GoogleStrategy = require('passport-google-oauth2');
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
  clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
  // passport callback function
  console.log('passport cb fired');
  console.log(profile);
  // check if user already exists in database
  if(currentUser) {
    console.log(currentUser, 'already here');
    //done(null, currentUser);
  } else {
    // need to call add method here to save profile
    console.log('user is added to DB')

    // calling done once done with new user record
    //done(null, newUser);
  }


})
);
