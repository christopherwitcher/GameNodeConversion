import { Entity } from '../modules/engine/Entity'
export class Background extends Entity {
    constructor(game, height) {
        this.width = 10000; //the width of the level or world
        this.height = height;
        this.game = game;
        //this.worldX = 0;
        //this.worldY = 0;
        //this.drawBackDrop = new Animation(ASSET_MANAGER.getAsset(heroSpriteSheet), 3700, 4300, 1754, 700, 0.01, 1, true, false);
        Entity.call(this, game, 0, 0);

    }
    update() {
        this.x = 0;
        this.y = 0;
        Entity.prototype.update.call(this);
    }
    draw(ctx) {
        // this.drawBackDrop.drawFrame(this.game.clockTick, ctx, this.x, this.y,0.8);
    }
}

