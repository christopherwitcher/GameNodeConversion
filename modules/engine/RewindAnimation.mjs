
function RewindAnimation(spriteSheet, rewindStack) {
    this.spriteSheet = spriteSheet;
    this.myRewindStack = rewindStack;
    this.previousFrame = null;
    this.currentLineInterval = 0;
    this.movingUp = true;
}

RewindAnimation.prototype.drawFrame = function (tick, ctx, scaleBy) {
         
    if (this.myRewindStack.length > 0) {
        var current = this.myRewindStack.pop();

        ctx.drawImage(this.spriteSheet,
                         current.clipX, current.clipY, current.frameWidth, current.frameHeight,
                         current.canvasX, current.canvasY, current.frameWidth, current.frameHeight);
        this.previousFrame = current;
       ctx.drawImage(this.spriteSheet, 5565, 4550, 302, 310, 625, 250, 302*.33, 310*.33)
        
        for (var i = 1; i <= 10; i++) {
            if (this.currentLineInterval < 10 && this.movingUp) {
            this.currentLineInterval += 1;
        } else if (this.currentLineInterval >= 10 && this.movingUp) {
            this.movingUp = false;
            this.currentLineInterval -= 1;
        } else if (this.currentLineInterval > -10 && !this.movingUp) {
            this.currentLineInterval -= 1;
        } else {
            this.movingUp = true;
            this.currentLineInterval += 1;
        }
            ctx.strokeStyle = "#000";
            ctx.beginPath();
            ctx.moveTo(0, i*70 + this.currentLineInterval);
            ctx.lineTo(canvasWidth, i*70 + this.currentLineInterval);
            ctx.stroke();
        }

        return current;
    }

       
    return this.previousFrame;


}