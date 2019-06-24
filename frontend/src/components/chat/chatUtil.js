const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// our localhost port
const port = 4001;

const app = express();

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);

// This is what the socket.io syntax is like, we will work this later


// io.on('connection', function (client) {
//     console.log('New client connected');
    // client.on('join', handleJoin);

    // client.on('message', handleMessage);

    // client.on('leave', handleLeave);

    // client.on('players', handleGetPlayers);

    // client.on('disconnect', function () {
    //     console.log('client disconnected...', client.id);
    //     // handleDisconnect();
    // });

    // client.on('error', function(err) {
    //     console.log('received error from client:', client.id);
    //     console.log(err);
    // });
// });

io.on('connection', socket => {
    console.log('New client connected');

    socket.on('chat message', msg => {
        socket.emit('chat message', msg);
    });


    // disconnect is fired when a client leaves the server
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, function (err) {
    if (err) throw err;
    console.log(`Listening on port ${port}`)
});