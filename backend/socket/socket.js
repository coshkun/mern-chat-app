import { Server } from 'socket.io';
import http from 'http';
import express from "express";

const PORT = 5173 //process.env.PORT || 3000;

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [ `http://localhost:${PORT}` ],
        methods: [ "GET", "POST" ],
    },
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId : socketId}

io.on('connection', (socket) => {
    console.log("A user CONNECTED with socket: ", socket.id);

    const userId = socket.handshake.query.userId;
    if(userId != "undefined") userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all connected client
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    // socket.on() is used to lisiten to the events, can be used on both server & client side.
    socket.on('disconnect', () => {
        console.log("A user DISCONNECTED from socket: ", socket.id);
        delete userSocketMap[userId];
        // publish updated list
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});

export { app, io, server, express };

