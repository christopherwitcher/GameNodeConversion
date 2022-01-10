/*
* A simple object to test scrolling
*/
function Block(game, x, y, width, height) {
    this.game = game;
    this.worldX = x;
    this.worldY = y;
    this.width = width;
    this.height = height;

    this.boundingBox = new BoundingBox(this.worldX, this.worldY, this.width, this.height);
    // set the block's initial position in the world
    Entity.call(this, game, this.worldX, this.worldY);
};

Block.prototype = new Entity();
Block.prototype.constructor = Block;

Block.prototype.update = function () {
    this.boundingBox = new BoundingBox(this.worldX, this.worldY, this.width, this.height);
    Entity.prototype.update.call(this);
};

Block.prototype.draw = function (ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    //ctx.strokeStyle = "red";
    //ctx.strokeRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
};