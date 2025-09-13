"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
// const cors = require('cors');
// app.use(cors()); 
// this is an express server, but with the docker we already have a server serving the files...
// we now just need one 
// const express = require('express'); 
// const { createServer } = require('node:http'); 
// //  const path = require('node:path'); 
//  const { Server } = require('socket.io');
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(server);
const port = 3000; // Used to be 3000, hopefully doesn't break anything
//CORS REQUEST DID NOT SUCCEED.
//FOR REACT
// app.use(express.static(path.join(__dirname, '../client/build')));
////////// TESTING CODE ///////////
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/index.html'));
// });
///////////////////////////////////
//Og code
// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//         console.log(msg);
//         io.emit('message server', msg);
//     });
// });
//Going to store messages and drawing in the database
//code so you can join rooms and message within the message
io.on('connection', (socket) => {
    socket.on('join room', (roomName) => {
        socket.join(roomName);
        // console.log("going to try to join the room", roomName);
    });
    socket.on('chat message', ({ roomName, username, message }) => {
        // console.log(roomName, username, message);
        // io.to(roomName).emit('message server', msg);
        io.to(roomName).emit('message server', { username: username, message: message });
    });
    // handle draw:start
    socket.on("draw:start", ({ roomName, x, y, color, size }) => {
        socket.to(roomName).emit("draw:start", { x, y, color, size });
    });
    // handle draw:move
    socket.on("draw:move", ({ roomName, x, y }) => {
        socket.to(roomName).emit("draw:move", { x, y });
    });
    // handle draw:end
    socket.on("draw:end", ({ roomName }) => {
        socket.to(roomName).emit("draw:end");
    });
    // //client is not emitting correctly
    // socket.on('introduction', ({roomName, username}) => {
    //         console.log("exit", roomName, username);
    //         io.to(roomName).emit('intro message server', `${username} has joined the room!`);
    // });
    // //client is not emitting correctly
    // socket.on('exit room', ({roomName, username}) => {
    //     console.log("exit",roomName,username)
    //     io.to(roomName).emit('exit message server', `${username} has left the room.`);
    //     socket.leave(roomName);
    // });
});
server.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log('Press Ctrl+C to quit.');
});
// io.on('message', socket => { 
//     console.log("We received a message fr!!")
//     socket.emit("Holy balls a new message")
//     //Maybe this function, upon a MESSAGE
// });
// const { createServer } = require('node:http');
// const cors = require('cors');
// /*
// what is a postgres pool?
// */
// const postgresPool = require('pg').Pool;
// app.use(cors);
// const port = process.env.port || 8000;
// const server = createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"],
//     }
// });
// io.on("connection", (socket) => {
//     console.log(`User with id ${socket.id} connected!`);
//     socket.on("disconnect", () => {
//         console.log(`User with id ${socket.id} disconnected!`);
//     });
// });
// app.get('/', (req, res) => {
//     res.send("Hello world");
// });
// io.listen(port, ()=> {
//     console.log(`server listening on port ${port}`);
// });
