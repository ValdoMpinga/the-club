AFRAME.registerComponent('dj-deck', {
    schema: {
        src: { type: 'string' }
    },

    init: function ()
    {
        var audioEl = new Audio(this.data.src);

        var el = this.el; // Reference to the entity to which this component is attached

        // Play song and log message on click
        el.addEventListener('click', function ()
        {
            console.log("DJ Deck Clicked!");
            if (audioEl.paused)
            {
                audioEl.play().then(() =>
                {
                    console.log("Song started playing");
                }).catch((error) =>
                {
                    console.error("Error starting song:", error);
                });
            } else
            {
                audioEl.pause();
                console.log("Song paused");
            }
        });
    }
});
