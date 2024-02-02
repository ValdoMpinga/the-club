AFRAME.registerComponent('button-component', {
    schema: {
        text: { type: 'string' },
        handler: { type: 'string' },
        color: { type: 'color', default: '#FFF' },
        x: { type: 'number', default: 0 },
        y: { type: 'number', default: 0 },
        z: { type: 'number', default: 0 }
    },

    init: function ()
    {
        var data = this.data;
        var el = this.el;

        // Set the position of the button
        el.setAttribute('position', data.x + ' ' + data.y + ' ' + data.z);

        // Create the button geometry
        el.setAttribute('geometry', 'primitive: plane; height: 1; width: 2');
        el.setAttribute('material', 'color: ' + data.color);

        // Create the button text
        var textEl = document.createElement('a-text');
        textEl.setAttribute('value', data.text);
        textEl.setAttribute('align', 'center');
        textEl.setAttribute('position', '0 0.05 0'); // Position slightly above the center of the button
        textEl.setAttribute('rotation', '0 0 0');
        el.appendChild(textEl);

        // Attach the click event listener
        el.addEventListener('click', function ()
        {
            // Execute the handler function
            if (typeof window[data.handler] === 'function')
            {
                window[data.handler]();
            } else
            {
                console.error('Handler function "' + data.handler + '" not found.');
            }
        });
    }
});
