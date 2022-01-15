import { AssetManager } from './js/AssetManager.mjs';
import { Viewport} from './js/Viewport.mjs';
import { FinishLine } from './js/FinishLine.mjs';
import { Player } from './js/Player.mjs'
import { spacerSection, endLevelSection, buildMovingPlatform, rectPlatform, buildGround, getBoardPieces, initAudio } from './js/Game.mjs';
import { GameEngine } from './js/GameEngine.mjs';
import { GameTimer } from './js/GameTimer.mjs';

const socket = io("https://sibling-engine.azurewebsites.net");
//const socket = io("http://localhost:8080");
const ASSET_MANAGER = new AssetManager();
var socketId = null;
var direction = true;
let heroSpriteSheet = '../runboySprite.png';
heroSpriteSheet = "runboySprite.png";
//var direction = true;
//ar screenOffSet = 0;
//var backImg = "neighBackgroundext.png";
var gameEngine;
var canvasWidth;
var canvasHeight;
var boardPieces = [];
//var rewindFrame;
var finishLine;
var sdParentNode = null;
var startDisplay = null;
var timer;
//var gameOver = false;
//var gameTimeLength = 120000;


ASSET_MANAGER.queueDownload(heroSpriteSheet);


socket.on('chat message', function (msg) {
    console.log(msg);
});

socket.on('initialize', (msg) => {
    socketId = socket.id;

    console.log(msg.message + ' ' + socket.id);
})

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
        canvasWidth = 1250;
        canvasHeight = 700;
        var canvas = document.getElementById('world');
        canvas.setAttribute("tabindex", 0); 
        canvas.focus();
        var ctx = canvas.getContext('2d');
        let gameWorld = { width: 21000, height: canvasHeight };
        
        window.gameEngine = new GameEngine(canvasWidth,ASSET_MANAGER.getAsset(heroSpriteSheet));
        var finishLine = new FinishLine(window.gameEngine, gameWorld.width, ctx, ASSET_MANAGER.getAsset(heroSpriteSheet));
        window.gameEngine.finishLine = finishLine;
        var the_player = new Player(window.gameEngine, canvasWidth, gameWorld.width, ASSET_MANAGER.getAsset(heroSpriteSheet));
        
        var nextWidth = 900;
        boardPieces = getBoardPieces(window.gameEngine, nextWidth)
        for (let i = 0; i < boardPieces.length; i++) {
            
            nextWidth = boardPieces[i](nextWidth, window.gameEngine, true);
            nextWidth += 500;
        }

        nextWidth = boardPieces[0](nextWidth, window.gameEngine, true);
        nextWidth += 500;
        spacerSection(window.gameEngine, nextWidth, 400, 10, 2);
        nextWidth = nextWidth + 500;
        var sect = endLevelSection(nextWidth, window.gameEngine);
        //nextWidth = nextWidth + sect;
        buildGround(window.gameEngine, gameWorld.width);
        window.gameEngine.addEntity(finishLine);
        window.gameEngine.addEntity(the_player);
        
        var viewPort = new Viewport(the_player, canvasWidth, canvas.height, gameWorld.width, gameWorld.height);
        window.gameEngine.setViewPort(viewPort);

        window.gameEngine.init(ctx);
        let sender = { firstName: "Christopher", lastName: "Witcher" };
        //.onclick = startGame();
        socket.emit('initialize', sender);
    })
}

const startButton = document.getElementById("startButton");
startButton.addEventListener('click', (e) =>{
    {
        console.log("Click Start Button");
        initAudio();
        document.getElementById('bgSound').play();
    
        if (document.getElementById("startDisplay")) {
            sdParentNode = document.getElementById("startDisplay").parentNode;
            startDisplay = document.getElementById("startDisplay");
            sdParentNode.removeChild(startDisplay);
        }
        window.gameEngine.start();
        window.gameEngine.ctx.canvas.focus();
        window.timer = new GameTimer(window.gameEngine);
        window.gameEngine.addEntity(window.timer);
        socket.emit('chat message', "Start Button Clicked");
    }
})

