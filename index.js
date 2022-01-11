//Import Modules
import express from 'express';
import * as http from 'http';
import {Server} from 'socket.io';

const app = express();
const server = http.createServer(app);
const port = process.env.port || 8080;
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

/* io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
}); */

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log("message sent" + msg);
        io.emit('chat message', msg);
    });
  });

server.listen(port, () => {
  console.log('I Am the Socket Window listening on *:' + port);
});