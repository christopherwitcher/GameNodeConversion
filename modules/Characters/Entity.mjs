class Entity {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.worldX = x; //initial worldX is the same as x
        this.worldY = y; //initial worldY is the same as y
        this.removeFromWorld = false;
    }
    update() {

    }
    draw(ctx) {
        if (this.game.showOutlines && this.radius) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.closePath();
        }
    }
}


