let heroSpriteSheet = '..img/runboySprite.png';
let backImg = './img/neighBackgroundext.png';
var gameEngine;

var ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload(backImg);
ASSET_MANAGER.queueDownload(heroSpriteSheet);
window.onload = initialize;
function initialize() {

    ASSET_MANAGER.downloadAll(function () {

        var canvas = document.getElementById('world');
        canvas.setAttribute("tabindex", 0);
        canvas.focus();
        var ctx = canvas.getContext('2d');
        let gameWorld = {width: 21000 , height: canvasHeight};
        gameEngine = new GameEngine();
        
        //var gameWorld = {width: 21000 , height: canvasHeight}; moved locations to add to gameEngine //new Background(gameEngine, canvasWidth);
        this.finishLine = new FinishLine(gameEngine, gameWorld.width, ctx);
        var current_player = new Player(gameEngine, canvasWidth, gameWorld.width);
        
        var nextWidth = 900;
        //var rand = Math.floor((Math.random() * boardPieces.length));
        //var extra = Math.floor((Math.random() * 2)) === 0 ? true : false;
        //var rand = boardPieces.length - 1;
        //nextWidth = boardPieces[boardPieces.length-1](nextWidth, gameEngine, true);
        //nextWidth += 500;
        //var sect = endLevelSection(nextWidth, gameEngine);
        //nextWidth = nextWidth + sect;
        for (var i = 0; i < boardPieces.length; i++) {
            //while(nextWidth < gameWorld.width - 200){ 
            //extra = extra ? false : true;
            //var random = Math.floor((Math.random() * boardPieces.length));
               
            //created.push(random);
            //console.log(random);
            nextWidth = boardPieces[i](nextWidth, gameEngine, true);
            nextWidth += 500;
        }
        nextWidth = boardPieces[0](nextWidth, gameEngine, true);
        nextWidth += 500;
        spacerSection(gameEngine, nextWidth, 400, 10, 2);
        nextWidth = nextWidth + 500;
        var sect = endLevelSection(nextWidth, gameEngine);
        //nextWidth = nextWidth + sect;
        buildGrown(gameEngine, gameWorld.width);
        gameEngine.addEntity(this.finishLine);
        gameEngine.addEntity(current_player);
        
        var viewPort = new Viewport(current_player, canvasWidth, canvas.height, gameWorld.width, gameWorld.height);
        gameEngine.setViewPort(viewPort);

        gameEngine.init(ctx);
        //gameEngine.addEntity(gameWorld);
    });
}
