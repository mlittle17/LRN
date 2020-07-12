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
  socket.on('join room', roomID => {
    if (users[roomID]) {
      const { length } = users[roomID];
      if (length === 4) {
        socket.emit('room full');
        return;
      }
      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

    socket.emit('all users', usersInThisRoom);
  });

  socket.on('sending signal', payload => {
    io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
  });

  socket.on('returning signal', payload => {
    io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
  });

  socket.on('disconnect', () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter(id => id !== socket.id);
      users[roomID] = room;
    }
  });
});

