const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2');
const { getUser, createUser } = require('../db/methods');

const keys = require('./keys');

passport.serializeUser((user, done) => {
  // calling done method once we get the user from the db
  const me = user;
  done(null, user.googleid);
});

passport.deserializeUser((id, done) => {
  // meed to find user by id
  // calling once we've found the user
  getUser(id)
    .then(currentUser => {
      currentUser[0];
      done(null, currentUser[0]);
    });
});

passport.use(new GoogleStrategy({
  // options for the google strategy
  callbackURL: '/auth/google/redirect',
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,
}, (accessToken, refreshToken, profile, done) => {
  // passport callback function
  const {
    id: googleId, displayName: username, given_name: firstName, family_name: lastName, picture: photo, email: email,
  } = profile;

  const user = {
    googleId,
    username,
    firstName,
    lastName,
    photo,
    email,
  };

  getUser(googleId)
    .then(currentUser => {
      currentUser;
      // if the response includes a user object from our databse
      if (currentUser.length) {
        console.log('hello');
        console.log(currentUser[0]);
        done(null, currentUser[0]);
      } else {
      // if not, create a new user in the database
        createUser(user);
        console.log('this is a test');
        getUser(googleId)
          .then(newUser => {
            newUser;
            done(null, newUser[0]);
          })
          .catch(err => console.log(err));
      }
    });
}));
