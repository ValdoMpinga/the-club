AFRAME.registerComponent('dj-deck', {
    init: function ()
    {
        const el = this.el;

        // Create the deck model
        const deckModel = document.createElement('a-entity');
        deckModel.setAttribute('position', '0 1.2 -3');

        const deckBase = document.createElement('a-box');
        deckBase.setAttribute('color', 'black');
        deckBase.setAttribute('width', '20');
        deckBase.setAttribute('height', '0.8');
        deckBase.setAttribute('depth', '3');
        deckBase.setAttribute('position', '3 4 4');
        deckModel.appendChild(deckBase);

        const deckPlatter = document.createElement('a-cylinder');
        deckPlatter.setAttribute('color', 'gray');
        deckPlatter.setAttribute('radius', '1.2');
        deckPlatter.setAttribute('height', '0.05');
        deckPlatter.setAttribute('position', '0 0.1 0');
        deckModel.appendChild(deckPlatter);

        const playButton = document.createElement('a-box');
        playButton.setAttribute('color', 'green');
        playButton.setAttribute('width', '0.2');
        playButton.setAttribute('height', '0.2');
        playButton.setAttribute('depth', '0.2');
        playButton.setAttribute('position', '-0.6 0.1 0.9');
        playButton.addEventListener('click', () =>
        {
            const song = document.querySelector('#song');
            if (song.paused)
            {
                song.play();
            } else
            {
                song.pause();
            }
        });
        deckModel.appendChild(playButton);

        el.appendChild(deckModel);
    }
});
