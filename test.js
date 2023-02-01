const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/node_modules/'));

app.get('/node_modules', (req, res) => {
    res.sendFile(__dirname + '/node_modules/');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(8000, '139.180.188.231', () => {
  console.log('Server started on http://139.180.188.231:8000');
});
