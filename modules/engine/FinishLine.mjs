function FinishLine(game, gameWidth, ctx) {
    // this.game = game;
     this.ctx = ctx;
     //console.log(gameWidth);
     //this.x = gameWidth;
     //this.y = 125;
     //this.width = 394;
     //this.height = 446;
     this.x = gameWidth + 240;
     this.y = 140;
     this.width = 150;
     this.height = 200;
     this.boundingBoxOffSetX = 210;
     this.boundingBoxOffSetY = 225;
     this.runUpStairsCompleted = false;
     this.doorClosed = false;
     this.finishLineAnimation = new Animation(ASSET_MANAGER.getAsset(heroSpriteSheet), 0, 3000, 394, 446, 0.076, 30, false, false);
     this.finishLineDoorOpen = new Animation(ASSET_MANAGER.getAsset(heroSpriteSheet), 0, 3000, 394, 446, 0.01, 1, true, false);
     this.runInsideAnimation = new Animation(ASSET_MANAGER.getAsset(heroSpriteSheet), 0, 3500, 60, 180, 0.011, 120, false, false);
 
     this.boundingBox = new BoundingBox(this.x + this.boundingBoxOffSetX, this.y + +this.boundingBoxOffSetY, this.width, this.height + 75);
     this.runInsideCounter = 0;
     this.doorClosingCounter = 0;
     this.finishLineCompleted = false;
     Entity.call(this, game, this.x, this.y);
 }
 
 FinishLine.prototype = new Entity();
 FinishLine.prototype.constructor = FinishLine;
 
 FinishLine.prototype.isCompleted = function () {
     return this.finishLineCompleted;
 }
 
 FinishLine.prototype.update = function () {
     if (this.game.running === false && this.game.runInsideComplete === false) {
         return;
     }
     this.boundingBox = new BoundingBox(this.x + this.boundingBoxOffSetX, this.y + this.boundingBoxOffSetY, this.width, this.height);
     Entity.prototype.update.call(this);
 };
 
 FinishLine.prototype.draw = function (ctx, game) {
     //ctx.fillStyle = "white";
     //ctx.fillRect(this.x, this.y, this.width, this.height);
     //ctx.strokeStyle = "red";
     //ctx.strokeRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
     if (this.game.running === true) {
         this.finishLineDoorOpen.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
     } else if (this.game.running === false && this.runInsideAnimation.completed === false) {
         var canvasX = this.x + this.boundingBoxOffSetX;
         var canvasY = this.y + this.boundingBoxOffSetY;
         this.finishLineDoorOpen.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
         this.runInsideAnimation.drawFrame(this.game.clockTick, this.ctx, this.x + 250,
             this.y + 313);
         this.runUpStairsCompleted = this.runInsideAnimation.completed;
         console.log("running inside");
     } else if (this.game.running === false && this.runUpStairsCompleted === true && this.doorClosed === false) {
         this.finishLineAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
         this.doorClosed = this.finishLineAnimation.completed;
     } else if (this.game.running === false && !gameOver) {
         
         this.game.endGame();
         gameOver = true;
     }
    
     
 };
 