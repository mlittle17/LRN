const express = require('express');
const app = express(); // create express app
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

app.use(express.json());

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

io.on("connection", socket => {
  socket.on("join room", roomID => {
      if (rooms[roomID]) {
          rooms[roomID].push(socket.id);
      } else {
          rooms[roomID] = [socket.id];
      }
      const otherUser = rooms[roomID].find(id => id !== socket.id);
      if (otherUser) {
          socket.emit("other user", otherUser);
          socket.to(otherUser).emit("user joined", socket.id);
      }
  });







// start express server
app.listen(8000, () => {
  console.log('server started on port 8000');
});
