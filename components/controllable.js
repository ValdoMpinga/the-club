AFRAME.registerComponent('controllable', {
    schema: {
        ownerId: { type: 'string' },
        id: { type: 'string' }
    },

    init: function ()
    {
        this.el.addEventListener('click', () => this.moveSphere());
    },

    moveSphere: function ()
    {
        // Generate a random x-coordinate between -10 and 10
        const x = Math.random() * 20 - 10;

        // Move the sphere
        this.el.setAttribute('position', `${x} 4 -4`);

        // Emit a 'moveEntity' event to the server
        window.socket.emit('moveEntity', {
            id: this.data.id,
            position: `${x} 4 -4`
        });
    }
});
