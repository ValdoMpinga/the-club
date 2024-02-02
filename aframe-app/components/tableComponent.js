AFRAME.registerComponent('table', {
    schema: {
        rows: { type: 'array', default: [] }, // Array of rows, each row contains an array of cell values
        src: { type: 'string' } // Source URL for the audio file
    },

    init: function ()
    {
        var el = this.el; // Reference to the entity to which this component is attached
        var data = this.data; // Component schema data

        // Create the table
        var tableEl = document.createElement('a-entity');
        tableEl.setAttribute('position', '0 0 0'); // Adjust position as needed

        // Ensure that data.rows is an array
        if (Array.isArray(data.rows))
        {
            // Create rows
            data.rows.forEach(function (row, rowIndex)
            {
                var rowEl = document.createElement('a-entity');
                rowEl.setAttribute('position', '0 ' + (-0.2 * rowIndex) + ' 0'); // Adjust row spacing as needed

                // Ensure that each row is an array
                if (Array.isArray(row))
                {
                    // Create cells in the row
                    row.forEach(function (cell, cellIndex)
                    {
                        var cellEl = document.createElement('a-text');
                        cellEl.setAttribute('value', cell);
                        cellEl.setAttribute('align', 'center');
                        cellEl.setAttribute('color', '#000');
                        cellEl.setAttribute('width', '1');
                        cellEl.setAttribute('position', (cellIndex - row.length / 2) + ' 0 0'); // Adjust cell positioning
                        rowEl.appendChild(cellEl);
                    });

                    tableEl.appendChild(rowEl);
                } else
                {
                    console.error('Row at index ' + rowIndex + ' is not an array');
                }
            });
        } else
        {
            console.error('Data.rows is not an array');
        }

        // Add play button
        var playButton = document.createElement('a-entity');
        playButton.setAttribute('geometry', 'primitive: plane; width: 0.3; height: 0.3');
        playButton.setAttribute('material', 'color: green');
        playButton.setAttribute('position', '-0.8 0.2 0');
        playButton.setAttribute('class', 'clickable');
        playButton.addEventListener('click', function ()
        {
            audioEl.play();
        });
        tableEl.appendChild(playButton);

        // Add pause button
        var pauseButton = document.createElement('a-entity');
        pauseButton.setAttribute('geometry', 'primitive: plane; width: 0.3; height: 0.3');
        pauseButton.setAttribute('material', 'color: red');
        pauseButton.setAttribute('position', '-0.4 0.2 0');
        pauseButton.setAttribute('class', 'clickable');
        pauseButton.addEventListener('click', function ()
        {
            audioEl.pause();
        });
        tableEl.appendChild(pauseButton);

        el.appendChild(tableEl); // Append the table to the entity

        // Create audio element
        var audioEl = new Audio(data.src);
    }
});
