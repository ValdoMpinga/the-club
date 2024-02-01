// Inside your A-Frame app script
const socket = io('http://localhost:3000');

// Listen for initial state (spheres array) from the server
socket.on('state', (spheres) =>
{
    // Render existing spheres based on positions in the spheres array
    spheres.forEach((sphere) =>
    {
        const { x, y, z } = sphere.position;
        const sphereElement = document.createElement('a-sphere');
        sphereElement.setAttribute('position', `${x} 4 4`);
        // Add the sphere to your A-Frame scene
        document.querySelector('a-scene').appendChild(sphereElement);
    });
});

// Example code for generating and adding a new sphere
// You can call this whenever you want to add a new sphere
function generateAndAddSphere()
{
    const x = Math.random() * 20 - 10;
    const y = Math.random() * 20 - 10;
    const z = Math.random() * 20 - 10;

    const sphere = { position: { x, y, z } };
    socket.emit('addEntity', sphere);
}

generateAndAddSphere();
