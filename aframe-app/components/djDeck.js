AFRAME.registerComponent('dj-desk', {
    schema: {
        width: { type: 'number', default: 5 },
        height: { type: 'number', default: 5 }
    },

    init: function ()
    {
        var data = this.data;
        var el = this.el;

        // Create the box for the DJ desk
        var box = document.createElement('a-box');
        box.setAttribute('width', data.width);
        box.setAttribute('height', data.height);
        box.setAttribute('depth', 0.1); // Set a small depth so it looks like a flat surface
        box.setAttribute('position', '0 0 -0.05'); // Position slightly in front to avoid z-fighting
        el.appendChild(box);

        // Create the text for "DJ Deck"
        var text = document.createElement('a-text');
        text.setAttribute('value', 'DJ Deck');
        text.setAttribute('align', 'center');
        text.setAttribute('position', '0 ' + (data.height / 2) + ' -0.05'); // Position just in front of the box
        text.setAttribute('rotation', '-90 0 0'); // Rotate to face upwards
        el.appendChild(text);

        // Create the green play button
        var playButton = document.createElement('a-entity');
        playButton.setAttribute('geometry', 'primitive: plane; height: 1; width: 1');
        playButton.setAttribute('material', 'color: green');
        playButton.setAttribute('position', '-1.5 ' + (-data.height / 2) + ' -0.05'); // Position just in front of the box
        el.appendChild(playButton);

        // Create the red pause button
        var pauseButton = document.createElement('a-entity');
        pauseButton.setAttribute('geometry', 'primitive: plane; height: 1; width: 1');
        pauseButton.setAttribute('material', 'color: red');
        pauseButton.setAttribute('position', '1.5 ' + (-data.height / 2) + ' -0.05'); // Position just in front of the box
        el.appendChild(pauseButton);
    }
});
