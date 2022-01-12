//const AssetManager = require('./js/AssetManager.js');

class AssetManager {
    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.cache = [];
        this.downloadQueue = [];
    }
    //
    queueDownload(path) {
        console.log(path.toString());
        this.downloadQueue.push(path);
    }
    isDone() {
        return (this.downloadQueue.length === this.successCount + this.errorCount);
    }
    //loads all the image files.
    downloadAll(callback) {
        if (this.downloadQueue.length === 0)
            window.setTimeout(callback, 100);
        for (var i = 0; i < this.downloadQueue.length; i++) {
            var path = this.downloadQueue[i];
            var img = new Image();
            var that = this;
            img.addEventListener("load", function () {
                console.log("done: " + this.src.toString());
                that.successCount += 1;
                if (that.isDone()) { callback(); }
            });
            img.addEventListener("error", function () {
                that.errorCount += 1;
                if (that.isDone()) { callback(); }
            });
            img.src = path;
            this.cache[path] = img;
        }
    }
    //gets an asset to add to the cache.
    getAsset(path) {
        console.log(path.toString());
        return this.cache[path];
    }
}

const socket = io("https://sibling-engine.azurewebsites.net");
//const socket = io("http://localhost:8080");

let heroSpriteSheet = '../runboySprite.png';

var ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload(heroSpriteSheet);


socket.on('chat message', function (msg) {
    console.log(msg);
});

socket.on('initialize', (msg) => {
    console.log(msg.message + ' ' + socket.id);
})

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

    ASSET_MANAGER.downloadAll(() => {
        var canvasHeight = 50000;
        var canvas = document.getElementById('world');
        canvas.setAttribute("tabindex", 0);
        canvas.focus();
        var ctx = canvas.getContext('2d');
        let gameWorld = { width: 21000, height: canvasHeight };

        let sender = { firstName: "Christopher", lastName: "Witcher"};

        socket.emit('initialize', sender);
    })
}