const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); // Use the cors middleware
app.use(express.static(__dirname + '/..'));

const server = http.createServer(app);
const io = socketIo(server);

let spheres = []; // Array to store sphere positions

app.get('/', (req, res) =>
{
    res.sendFile(__dirname + '/../index.html');
});

server.listen(3000, () =>
{
    console.log('Listening on port 3000');
});

// Inside the 'connection' event listener
io.on('connection', (socket) =>
{
    console.log('New client connected');

    // Send the current state (spheres array) to the newly connected client
    socket.emit('state', spheres);

    // Emit event to all clients when a new user joins
    io.emit('newUser');

    // Listen for disconnection events
    socket.on('disconnect', () =>
    {
        console.log('Client disconnected');
    });

    // Listen for 'addEntity' events from the client and add the entity to the spheres array
    socket.on('addEntity', (entity) =>
    {
        spheres.push(entity);
        // Broadcast the updated spheres array to all clients
        io.emit('state', spheres);
    });
});
