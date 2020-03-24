const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const port = 3000;
const hostname = '127.0.0.1';

const app = express();

const server = http.createServer(app);
const io = socketio(server);

const events = ['keypress', 'scroll', 'syncMutation', 'isMobile', 'syncScroll', 'syncDeviceType', 'setScreenSize', 'syncElementScroll'];

io.on('connection', function (socket) {
    let roomToken;
    socket.on('join', token => {
        
        if (!token) {
            socket.disconnect(true);
        }
        roomToken = token;
        socket.join(roomToken);
        socket.emit('ready');
        console.log(`user joined room - ${roomToken}`);
    });
    
    // socket.on('scroll', (top) => {
    //     console.log('top:', top);
    //     socket.broadcast.to(roomToken)('scroll', top);
    // });

    socket.on('disconnect', () => {
        console.log(`user disconnected! from room - ${roomToken}`);
    });


    socket.use(([event, payload], next) => {
        
        if (events.includes(event)) {
          console.log(`User sent '${event}' in room '${roomToken} %O'`, payload);
          socket.broadcast.to(roomToken).emit(event, payload);
        }
  
        next();
      });
});

server.listen(port, hostname, () => {
    console.log(`server running @ http://${hostname}:${port}`);
});
