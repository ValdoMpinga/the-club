AFRAME.registerComponent('test-component', {
    init: function ()
    {
        console.log('testComponent initialized'); // Add this line

        var el = this.el; // Reference to the entity to which this component is attached

        // Change color on click
        el.addEventListener('click', function ()
        {
            console.log("Clicked!");
            el.setAttribute('color', getRandomColor());
        });

        // Function to generate a random color
        function getRandomColor()
        {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++)
            {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    }
});
