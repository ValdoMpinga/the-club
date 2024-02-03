const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); // Use the cors middleware
app.use(express.static(__dirname + '/../aframe-app/'));

const server = http.createServer(app);
const io = socketIo(server);

let spheres = []; // Array to store sphere positions

server.listen(3000, () =>
{
    console.log('Listening on port 3000');
});


io.on('connection', (socket) =>
{
    console.log('New client connected');

    // Send the current state to the newly connected client
    socket.emit('state', spheres);

    // Handle the 'addEntity' event
    socket.on('addEntity', (userSphereData) =>
    {
        // Associate the generated name with the client
        userSphereData.clientId = socket.id;
        spheres.push(userSphereData);

        // Broadcast the new sphere to all clients
        io.emit('addEntity', userSphereData);
    });

    // Handle the disconnect event
    socket.on('disconnect', () =>
    {
        console.log('Client disconnected');
        // Remove the sphere associated with the disconnected client
        const index = spheres.findIndex(sphere => sphere.clientId === socket.id);
        if (index !== -1)
        {
            const removedSphere = spheres.splice(index, 1)[0];
            // Broadcast the removal to all clients
            io.emit('removeEntity', removedSphere.clientId);
        }
    });

    socket.on('playMusic', () =>
    {
        io.emit('playMusic');
    });

    socket.on('pauseMusic', () =>
    {
        io.emit('pauseMusic');
    });
});
