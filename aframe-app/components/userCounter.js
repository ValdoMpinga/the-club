AFRAME.registerComponent('user-counter', {
    schema: {
        initialCount: { type: 'number', default: 1 },
        x: { type: 'number', default: -3 },
        y: { type: 'number', default: 4.5 },
        z: { type: 'number', default: -3 }
    },

    init: function ()
    {
        var el = this.el;
        var data = this.data;

        // Initialize the text with the initial user count
        this.updateCounterText(data.initialCount);

        // Set the position of the text entity
        el.object3D.position.set(data.x, data.y, data.z);
    },

    updateCounterText: function (userCount)
    {
        var el = this.el;
        var text = "Users in the party: " + userCount;

        // Update the text geometry with the new user count
        el.setAttribute('text-geometry', 'value', text);
    },

    // Example method to increment the user count
    incrementUserCount: function ()
    {
        var currentCount = this.el.getAttribute('text-geometry').value.split(' ')[3];
        var newCount = parseInt(currentCount, 10) + 1;
        this.updateCounterText(newCount);
    }
});
