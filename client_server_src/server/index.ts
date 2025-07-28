const express = require('express');
const { createServer } = require('node:http'); 
const path = require('node:path');
const { Server } = require('socket.io');
// const cors = require('cors');
// app.use(cors()); 

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = 3000;

//CORS REQUEST DID NOT SUCCEED.

//FOR REACT
app.use(express.static(path.join(__dirname, '../client/build')));
////////// TESTING CODE ///////////
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/index.html'));
// });
///////////////////////////////////

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('message server', msg);
    });
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
