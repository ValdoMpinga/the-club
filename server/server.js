const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); // Use the cors middleware
app.use(express.static(__dirname + '/..'));

const server = http.createServer(app);

let io; // Declare io variable here

app.get('/', (req, res) =>
{
    res.sendFile(__dirname + '/../index.html');
});

server.listen(3000, () =>
{
    console.log('Listening on port 3000');

    // Initialize Socket.IO server after the HTTP server starts listening for connections
    io = socketIo(server);

    let state = []; // This will hold the state of the scene

    // Inside the 'connection' event listener
    // Inside the 'connection' event listener
    io.on('connection', (socket) =>
    {
        console.log('New client connected');

        // Send the current state to the newly connected client
        socket.emit('state', state);

        socket.emit('newUser');


        // Generate random coordinates for the new sphere
        const randomX = Math.random() * 10 - 5; // Range: -5 to 5

        // Create a new sphere entity object
        const newSphere = {
            type: 'sphere',
            position: { x: randomX}
        };

        // Add the new sphere to the state
        state.push(newSphere);

        // Broadcast the updated state to all clients
        io.emit('state', state);

        // Listen for 'addEntity' events from the client and add the entity to the state
        socket.on('addEntity', (entity) =>
        {
            state.push(entity);
            // Broadcast the updated state to all other clients
            socket.broadcast.emit('state', state);
        });
    });


});
