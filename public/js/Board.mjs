import { Entity } from './Entity.mjs'

export class Board extends Entity {
    obstacles;
    legos;
    constructor(game) {
        this.backDrop = new Animation(ASSET_MANAGER.getAsset(backImg), 0, 0, 1036, 735, .01, 1, true, false);
        Entity.call(this, game, 0, 0);
        this.game = game;
        this.obstacles = [];
        this.legos = [];
    }
    update() {

        Entity.prototype.update.call(this);
    }
    draw(ctx) {
        this.image = ASSET_MANAGER.getAsset(backImg);
        this.backDrop.drawFrame(this.game.clockTick, ctx, 0, 0);

    }
}



