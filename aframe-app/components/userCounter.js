AFRAME.registerComponent('user-counter', {
    schema: {
        count: { type: 'number', default: 0 }
    },

    init: function ()
    {
        var data = this.data;
        var el = this.el;

        // Create a text entity
        this.textEntity = document.createElement('a-text');
        this.textEntity.setAttribute('value', 'There are ' + data.count + ' players in this party');
        this.textEntity.setAttribute('color', 'black');
        this.textEntity.setAttribute('position', '-3 4.5 -3');

        // Append the text entity to the current entity
        el.appendChild(this.textEntity);
    },

    updateText: function (newCount)
    {
        console.log("setting count to " + newCount);
        this.textEntity.setAttribute('value', 'There are ' + newCount + ' players in this party');
    }
});
