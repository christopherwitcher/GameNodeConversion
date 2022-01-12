//Import Modules
import express from 'express';
import * as http from 'http';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {Server} from 'socket.io';
import { SocketAddress } from 'net';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const server = http.createServer(app);
const port = process.env.port || 8080;
const io = new Server(server);
let homepage = __dirname + '/index.html';

app.use(express.static(__dirname + '/public')); //Used to load files on front end

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
    console.log('My Socket' + socket.id);
  socket.on('chat message', (msg) => {
        console.log("message sent" + msg);
        io.emit('chat message', "Server Received Message to Start");
    });

    socket.on('initialize', (receiver) => {
        console.log(receiver.firstName + ' ' + receiver.lastName + ' ' + socket.id);
        let body = { message: 'Initialized ' + socket.id };
        io.to(socket.id).emit('initialize', body);
    })
  });


server.listen(port, () => {
  console.log('I Am the Socket Window listening on *:' + port);
});