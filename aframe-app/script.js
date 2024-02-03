const socket = io('http://localhost:3000');

// Function to generate a random letter from the alphabet
function getRandomLetter()
{
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const index = Math.floor(Math.random() * alphabet.length);
    return alphabet[index].toUpperCase();
}

// Function to generate and add a new userSphere
function generateAndAddUserSphere()
{
    const x = Math.random() * 20 - 10;
    const y = Math.random() * 20 - 10;
    const z = Math.random() * 20 - 10;

    // Generate two random letters for the name
    const namePart1 = getRandomLetter();
    const namePart2 = getRandomLetter();
    const name = namePart1 + namePart2;

    const userSphereData = {
        position: { x, y, z },
        name: name,
        color: 'yellow', // Red color for generated users
        textColor: 'purple',
        fontSize: 8
    };

    // Emit the event to the server with the userSphere data
    socket.emit('addEntity', userSphereData);
}

generateAndAddUserSphere();

// Listen for initial state (spheres array) from the server
socket.on('state', (spheres) =>
{
    // Render existing spheres based on positions in the spheres array
    spheres.forEach((sphere) =>
    {
        const { x, y, z } = sphere.position;
        const sphereElement = document.createElement('a-entity');
        sphereElement.setAttribute('user-sphere', `name: ${sphere.name}; color: ${sphere.color}; position: ${x} 2 4; textColor: ${sphere.textColor || 'green'}; fontSize: ${sphere.fontSize || 8}`);
        // Add the sphere to your A-Frame scene
        document.querySelector('a-scene').appendChild(sphereElement);
    });
});

// Listen for the 'addEntity' event to add new spheres
socket.on('addEntity', (userSphereData) =>
{
    console.log("added sphere data: ");
    console.log(userSphereData.clientId);
    const { x, y, z } = userSphereData.position;
    const sphereElement = document.createElement('a-entity');
    sphereElement.setAttribute('user-sphere', `name: ${userSphereData.name}; color: ${userSphereData.color}; position: ${x} 2 4; textColor: ${userSphereData.textColor || 'green'}; fontSize: ${userSphereData.fontSize || 8}`);
    sphereElement.setAttribute('client-id', userSphereData.clientId);
    document.querySelector('a-scene').appendChild(sphereElement);

    // showAlertMessage('User joined!');
    // alertEntity.setAttribute('visible', true); // Make the alert visible
    // alertEntity.emit('fadeIn'); // Trigger the fadeIn animation
});

// Listen for the 'removeEntity' event to remove spheres
socket.on('removeEntity', (clientId) =>
{
    console.log("someone got removed!");
    console.log("id: " + clientId);

    // showAlertMessage('User left!');

    // Select the <a-entity> element with the specified attributes
    var entityToRemove = document.querySelector(`a-entity[client-id="${clientId}"]`);

    // Check if the element is found
    if (entityToRemove)
    {
        // Remove the element from its parent node
        entityToRemove.parentNode.removeChild(entityToRemove);
    } else
    {
        console.log("Element not found.");
    }

});

socket.on('playMusic', () =>
{
    var audioElement = document.getElementById('music');
    audioElement.play();
});

socket.on('pauseMusic', () =>
{
    var audioElement = document.getElementById('music');
    audioElement.pause();
});

function showAlertMessage(message)
{
    var alertEntity = document.getElementById('alertMessage');
    alertEntity.setAttribute('text', 'value', message);
    alertEntity.setAttribute('visible', true); // Make the alert visible
    alertEntity.emit('fadeIn'); // Trigger the fadeIn animation
    setTimeout(() =>
    {
        alertEntity.emit('fadeOut'); // Trigger the fadeOut animation after a delay
    }, 3000); // Adjust delay as needed
}


function playMusic()
{
    socket.emit('playMusic');
    var audioElement = document.getElementById('music');
    audioElement.play();
}

function pauseMusic()
{
    socket.emit('pauseMusic');
    var audioElement = document.getElementById('music');
    audioElement.pause();
}

//this should trigger the fireworks
function playFireworks()
{
    console.log("kabooom!!!!");
}
