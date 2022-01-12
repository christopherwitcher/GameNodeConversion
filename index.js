//Import Modules
import express from 'express';
import * as http from 'http';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {Server} from 'socket.io';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const server = http.createServer(app);
const port = process.env.port || 8080;
const io = new Server(server);
let homepage = __dirname + '/index.html';
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(homepage);
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
        io.emit('chat message', "Server Received Message to Start");
    });
  });

server.listen(port, () => {
  console.log('I Am the Socket Window listening on *:' + port);
});