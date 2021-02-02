const http = require('http');
const express = require('express');
const socket = require('socket.io');
const process = require('process');
const os = require('os');
const cors = require('cors');
const PORT = 4000;


const app = express();

const server = app.listen(PORT, function() {
  console.log(`Server start on ${PORT} port`);
  console.log(`Process pid are ${process.pid}`);
});

app.use(express.static('public'));


app.get('/user', function(req, res) {
  res.send(['Nikita', 'Tati', 'Gina'])
})

//Socket setup
var io = socket(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', function(socket) {
  console.log(`Make socket connection. Socket id: ${socket.id}`);

  socket.emit('start', `Your account is ${socket.id}`);
  
  socket.on('disconnect', function() {
    console.log(`Client are disconnected`);
  });

  socket.on('chat', function(data) {
    io.sockets.emit('chat', data)
  })
});
