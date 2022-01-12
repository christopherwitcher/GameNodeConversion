import { Entity } from '../modules/engine/Enity.mjs'

export class Platform extends Entity{
    constructor(game, the_x, the_y, canvasWidth, clipX, clipY, frameWidth, frameHeight) {
        this.game = game;
        this.worldX = the_x;
        this.worldY = the_y;
        this.width = frameWidth;
        this.height = frameHeight;
        this.canvasWidth = canvasWidth;
        this.drawPlatform = new Animation(ASSET_MANAGER.getAsset(heroSpriteSheet), clipX, clipY, this.width, this.height, 0.01, 1, true);
        this.boundingBox = new BoundingBox(this.worldX, this.worldY, this.width, this.height);


        Entity.call(this, game, this.worldX, this.worldY);
        //this.game.addEntity(this);
    }
    update() {
        this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
        Entity.prototype.update.call(this);
    }
    draw(ctx) {

        //ctx.strokeStyle = "red";
        //ctx.strokeRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
        this.drawPlatform.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
}



