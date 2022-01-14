import { Entity } from './Entity.mjs'
import { BoundingBox } from './BoundingBox.mjs'
import { Animation } from './Animation.mjs'

/*
* An item that the character can interact with in the world.
*/
export class Item extends Entity {
    constructor(game, x, y, point, clipX, clipY, frameWidth, frameHeight, scale) {
        super(game, x, y);
        this.game = game;
        this.worldX = x;
        this.worldY = y;
        this.points = point;
        //sprite information goes here.
        this.drawItem = new Animation(game.spriteSheet, clipX, clipY, frameWidth, frameHeight, 0.01, 1, true);
        this.width = frameWidth;
        this.height = frameHeight;
        this.scaleBy = scale;
        this.limitIndex = Math.floor((Math.random() * 15) + 7);
        this.movingUp = true;
        //made both width and height 50 because  the frameWidtha and framHeight are way to large.
        this.boundingBox = new BoundingBox(this.worldX, this.worldY, this.width * scale, this.height * scale);

        this.upperLimit = this.y - this.limitIndex;
        this.lowerLimit = this.y + this.limitIndex;
    }
    /*
    * updates the item.
    */
    update() {
        if (this.movingUp && this.y > this.upperLimit) {
            this.y -= 1;
        } else if (this.movingUp && this.y <= this.upperLimit) {
            this.y += 1;
            this.movingUp = false;
        } else if (!this.movingUp && this.y < this.lowerLimit) {
            this.y += 1;
        } else if (!this.movingUp && this.y >= this.lowerLimit) {
            this.y -= 1;
            this.movingUp = true;
        }

        this.boundingBox = new BoundingBox(this.x, this.y, this.boundingBox.width, this.boundingBox.height);
    }
    /*
    * draws the item
    */
    draw(ctx) {
        //ctx.fillStyle = "purple";
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        this.drawItem.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scaleBy);
        //ctx.strokeStyle = "red";
        //ctx.strokeRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
    }
};
