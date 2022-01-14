import { Platform } from "./Platform.mjs";

export class MovingPlatform extends Platform {
    constructor(game, the_x, the_y, canvasWidth, clipX, clipY, frameWidth, frameHeight, range, speed) {
        super(this, game, this.worldX, this.worldY, canvasWidth, clipX, clipY, frameWidth, frameHeight);
        this.game = game;
        this.worldX = the_x;
        this.worldY = the_y;
        this.width = frameWidth;
        this.height = frameHeight;
        this.canvasWidth = canvasWidth;
        this.drawPlatform = new Animation(ASSET_MANAGER.getAsset(heroSpriteSheet), clipX, clipY, 1, 1, true);

        this.myDirection = false;
        this.mySpeed = speed;
        this.myRange = range;
        this.miniX = the_x - range;
        this.maxX = the_x + range;
        this.boundingBox = new BoundingBox(this.worldX, this.worldY, this.width, this.height);
    }

    update() {
        if (this.myDirection && this.worldX < this.maxX) {
            this.worldX += this.mySpeed;
        } else if (this.myDirection && this.worldX >= this.maxX) {
            this.myDirection = false;
            this.worldX -= this.mySpeed;
        } else if (this.myDirection === false && this.worldX >= this.miniX) {
            this.worldX -= this.mySpeed;
        } else if (this.myDirection === false && this.worldX < this.miniX) {
            this.myDirection = true;
            this.worldX += this.mySpeed;
        }


        this.boundingBox = new BoundingBox(this.worldX, this.worldY, this.height, this.width); //this.platformWidth * this.width, this.platformHeight * this.height);
        Platform.prototype.update.call(this);
    }

    draw(ctx) {

        this.drawPlatform.drawFrame(this.game.clockTick, ctx, this.x, this.y);

    }
}