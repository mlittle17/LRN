const { app } = require('./app');
const http = require('http');
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);
// start express server
// Creating your own HTTP server to allow us the ability to reuse the server
// Useful for running socket.io in the same server instance
const port = 8080;
server.listen(port, () => console.log(`server is running on port ${port}`));
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
  // listen for the answer event
  socket.on('answer', payload => {
    io.to(payload.target).emit('answer', payload);
  });
  // what is ice canidate?
  // each peer will come up with an 'ice server'
  socket.on('ice-candidate', incoming => {
    io.to(incoming.target).emit('ice-candidate', incoming.candidate);
  });
});