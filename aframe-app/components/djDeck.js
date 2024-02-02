AFRAME.registerComponent('dj-deck', {
    schema: {
        src: { type: 'string' }
    },

    init: function ()
    {
        var el = this.el; // Reference to the entity to which this component is attached

        // Set up the sound component
        el.setAttribute('sound', {
            src: this.data.src,
            autoplay: false
        });

        // Play song and log message on click
        el.addEventListener('click', function ()
        {
            console.log("DJ Deck Clicked!");
            var soundComponent = el.components.sound;
            if (soundComponent.isPlaying)
            {
                soundComponent.stopSound();
                console.log("Song paused");
            } else
            {
                soundComponent.playSound();
                console.log("Song started playing");
            }
        });
    }
});
