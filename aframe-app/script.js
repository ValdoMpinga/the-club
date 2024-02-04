const socket = io('http://localhost:3000');
const firstNames = [
    'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph',
    'Thomas', 'Charles', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Donald', 'Mark',
    'Paul', 'Steven', 'Andrew', 'Kenneth', 'Joshua', 'George', 'Kevin', 'Brian', 'Edward',
    'Ronald', 'Timothy', 'Jason', 'Jeffrey', 'Ryan', 'Jacob', 'Gary', 'Nicholas', 'Eric'
];

const clientIdToUsernameMap = {};

function getRandomFirstName()
{
    const index = Math.floor(Math.random() * firstNames.length);
    return firstNames[index];
}


function generateAndAddUserSphere()
{
    const x = Math.random() * 20 - 10;
    const y = Math.random() * 20 - 10;
    const z = Math.random() * 20 - 10;

    const name = getRandomFirstName();

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

    clientIdToUsernameMap[userSphereData.clientId] = userSphereData.name;


    showAlert(userSphereData.name, true)
});

socket.on('removeEntity', (clientId) =>
{
    console.log("someone got removed!");
    console.log("id: " + clientId);

    let username = getUsernameFromClientId(clientId);
    showAlert(username, false); // Pass the username and false for leaving

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

socket.on('userCount', (count) =>
{
    try
    {
        // Recursive function to wait for the user-counter component
        function waitForUserCounterComponent()
        {
            const userCounterEl = document.querySelector('#userCounter');
            if (userCounterEl && userCounterEl.components && userCounterEl.components['user-counter'])
            {
                // Component is mounted and ready, update the text
                console.log("Component is now mounted.");
                console.log("Calling updateText with count:", count);
                userCounterEl.components['user-counter'].updateText(count);
            } else
            {
                // Component is not mounted yet, wait and try again
                console.log("Waiting for user-counter component to mount...");
                setTimeout(waitForUserCounterComponent, 100); // Retry every 100 milliseconds
            }
        }

        // Start the waiting process
        waitForUserCounterComponent();
    } catch (e)
    {
        console.log("Error in userCount event handler:", e);
    }
});




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

function showAlert(username, isJoining, alertContainerId = 'alertContainer')
{
    // Create a new div element
    let div = document.createElement('div');

    // Set the class attribute to 'alert' and add either 'alert-success' or 'alert-danger'
    div.className = 'alert ' + (isJoining ? 'alert-success' : 'alert-danger');

    // Set the role attribute to 'alert'
    div.setAttribute('role', 'alert');

    // Set the text inside the div
    div.innerHTML = isJoining ? `${username} has joined!` : `${username} has left.`;

    // Append the div to the alert container
    let alertContainer = document.getElementById(alertContainerId);
    alertContainer.appendChild(div);

    // After 3 seconds, remove the alert
    setTimeout(() =>
    {
        div.remove();
    }, 3000);
}


function getUsernameFromClientId(clientId)
{
    return clientIdToUsernameMap[clientId] || 'Unknown User';
}
