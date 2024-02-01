const socket = io('http://localhost:3000');

// socket.on('state', (spheres) => {
//     spheres.forEach((sphere) => {
//         const { x, y, z } = sphere.position;
//         const sphereElement = document.createElement('a-sphere');
//         sphereElement.setAttribute('position', `${x} 4 4`);

//         document.querySelector('a-scene').appendChild(sphereElement);
//     });
// });

// function generateAndAddSphere() {
//     const x = Math.random() * 20 - 10;
//     const y = Math.random() * 20 - 10;
//     const z = Math.random() * 20 - 10;

//     const sphere = { position: { x, y, z } };
//     socket.emit('addEntity', sphere);
// }

// generateAndAddSphere();

// Listen for initial state (spheres array) from the server
socket.on('state', (spheres) =>
{
    // Render existing spheres based on positions in the spheres array
    spheres.forEach((sphere) =>
    {
        const { x, y, z } = sphere.position;
        const sphereElement = document.createElement('a-entity');
        sphereElement.setAttribute('user-sphere', `name: ${sphere.name}; color: ${sphere.color}; position: ${x} 4 4; textColor: ${sphere.textColor || 'green'}; fontSize: ${sphere.fontSize || 8}`);
        // Add the sphere to your A-Frame scene
        document.querySelector('a-scene').appendChild(sphereElement);
    });
});

// Example code for generating and adding a new userSphere
// You can call this whenever you want to add a new userSphere
function generateAndAddUserSphere()
{
    const x = Math.random() * 20 - 10;
    const y = Math.random() * 20 - 10;
    const z = Math.random() * 20 - 10;

    const userSphereData = {
        position: { x, y, z },
        name: 'Generated User',
        color: '#FF0000', // Red color for generated users
        textColor: 'purple',
        fontSize: 8
    };

    // Emit the event to the server with the userSphere data
    socket.emit('addEntity', userSphereData);
}

generateAndAddUserSphere();
