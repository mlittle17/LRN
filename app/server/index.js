<<<<<<< HEAD
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
=======
const { app } = require('./app');

const http = require('http');
>>>>>>> 74d964153d946be085bec4a7d8598dadd313e140

const server = http.createServer(app);
const socket = require('socket.io');

<<<<<<< HEAD
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
=======
const io = socket(server);
>>>>>>> 74d964153d946be085bec4a7d8598dadd313e140


// start express server
// Creating your own HTTP server to allow us the ability to reuse the server
// Useful for running socket.io in the same server instance
server.listen(8000, () => console.log('server is running on port 8000'));

// room id from uuid as the key
// an array of socket ids will be the value
const rooms = {};

// user connects - this connection event will fire
// then generate a unique socket object for this individual person
io.on('connection', socket => {
  // attach an event listener
  // Grab the room ID from the browser
  socket.on('join room', roomID => {
    // check if roomID exists
    if (rooms[roomID]) {
      // if so add the joining users socket id to the ids array
      // (each socket will have a unique id)
      rooms[roomID].push(socket.id);
    } else {
      // else create the key/value pair
      rooms[roomID] = [socket.id];
    }
    // check if you are currently user a joining or user b
    const otherUser = rooms[roomID].find(id => id !== socket.id);
    if (otherUser) {
      // if the other user exists in the room..
      // (user b) emit a 'current' back up to ourselves with the other users socket id
      socket.emit('other user', otherUser);
      // emit to user a our socket.id
      socket.to(otherUser).emit('user joined', socket.id);
      // you can see how this plays out more on the front end.
    }
  });

  // Now let us create a 'handshake'

  // when offer gets fired
  socket.on('offer', payload => {
    io.to(payload.target).emit('offer', payload);
  });

  // the payload contains who we are as a user and the 'offer' object.

<<<<<<< HEAD
app.get('/authTest', (req, res) => {
  res.send('Logged In!');
});
app.post('/user', createUser);
app.post('/user', createUser);
app.post('/topic', createTopic);
app.get('/user', getAllUser);
app.post('/event', createEvent);
=======
  // listen for the answer event
  socket.on('answer', payload => {
    io.to(payload.target).emit('answer', payload);
  });
>>>>>>> 74d964153d946be085bec4a7d8598dadd313e140

  // what is ice canidate?
  // each peer will come up with an 'ice server'
  socket.on('ice-candidate', incoming => {
    io.to(incoming.target).emit('ice-candidate', incoming.candidate);
  });
});
