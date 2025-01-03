const express = require('express');
const { createServer } = require('node:http');
const app = express();
const cors = require('cors');
app.use(cors);

const server = createServer(app);
const PORT = 8000;
const { Server } = require("socket.io");

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {
    console.log(`User with id ${socket.id} connected!`);

    socket.on("disconnect", () => {
        console.log(`User with id ${socket.id} disconnected!`);
    });

});

app.get('/', (req, res) => {
    res.send("Hello world");
});

server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
})