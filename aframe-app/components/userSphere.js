AFRAME.registerComponent('user-sphere', {
    schema: {
        name: { type: 'string' },
        color: { type: 'color', default: '#AAA' },
        position: { type: 'vec3', default: '0 0 0' },
        textColor: { type: 'color', default: '#FFF' }, // Default white color for the text
        fontSize: { type: 'number', default: 0.5 } // Default font size
    },

    init: function ()
    {
        const data = this.data;
        const el = this.el;

        // Create a sphere
        el.setAttribute('geometry', { primitive: 'sphere', radius: 1 });
        el.setAttribute('material', { color: data.color });
        el.setAttribute('position', data.position);

        // Create a text entity for the name
        const textEl = document.createElement('a-text');
        textEl.setAttribute('value', data.name);
        textEl.setAttribute('position', '0 3 0'); // Position the text above the sphere
        textEl.setAttribute('scale', `${data.fontSize} ${data.fontSize} ${data.fontSize}`); // Set the font size
        textEl.setAttribute('color', data.textColor); // Set the text color
        textEl.setAttribute('align', 'center'); // Center align the text
        textEl.setAttribute('anchor', 'center'); // Anchor the text to the center
        textEl.setAttribute('look-at', '[camera]'); // Make the text always face the camera
        el.appendChild(textEl);
    }
});
