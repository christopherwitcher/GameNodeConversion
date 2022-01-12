const socket = io("https://sibling-engine.azurewebsites.net");
//const socket = io("http://localhost:8080");
socket.on('chat message', function (msg) {
    console.log(msg);
});

var startGame = () => {
    console.log("Click Start Button");

    socket.emit('chat message', "Start Button Clicked");
}

window.requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

window.onload = () => {
    console.log("on load and initialize");
}