// djDeskComponent.js
AFRAME.registerComponent("dj-desk", {
    init: function ()
    {
        // DJ Desk
        const djDesk = document.createElement("a-entity");
        djDesk.setAttribute("geometry", {
            primitive: "box",
            height: 0.5,
            width: 1,
            depth: 0.5,
        });
        djDesk.setAttribute("material", { color: "#888888" });
        djDesk.setAttribute("position", "0 10 -2");

        // Volume Knob
        const volumeKnob = document.createElement("a-entity");
        volumeKnob.setAttribute("geometry", {
            primitive: "cylinder",
            radius: 0.1,
            height: 0.2,
        });
        volumeKnob.setAttribute("material", { color: "#FFFFFF" });
        volumeKnob.setAttribute("position", "-0.4 0.1 -0.4");
        volumeKnob.addEventListener("click", function ()
        {
            this.setAttribute(
                "rotation",
                "0 " + ((this.getAttribute("rotation").y + 90) % 360) + " 0"
            );
        });
        djDesk.appendChild(volumeKnob);

        // Play Button
        const playButton = document.createElement("a-entity");
        playButton.setAttribute("geometry", {
            primitive: "box",
            height: 0.1,
            width: 0.2,
            depth: 0.05,
        });
        playButton.setAttribute("material", { color: "#00FF00" });
        playButton.setAttribute("position", "0.4 0.1 -0.4");
        playButton.addEventListener("click", function ()
        {
            this.setAttribute("material", "color", "#0000FF");
        });
        djDesk.appendChild(playButton);

        // Pause Button
        const pauseButton = document.createElement("a-entity");
        pauseButton.setAttribute("geometry", {
            primitive: "box",
            height: 0.1,
            width: 0.2,
            depth: 0.05,
        });
        pauseButton.setAttribute("material", { color: "#FF0000" });
        pauseButton.setAttribute("position", "0.4 0.1 -0.6");
        pauseButton.addEventListener("click", function ()
        {
            this.setAttribute("material", "color", "#FFFF00");
        });
        djDesk.appendChild(pauseButton);

        this.el.appendChild(djDesk);
    },
});
