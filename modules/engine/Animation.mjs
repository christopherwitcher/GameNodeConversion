export class Animation {
    elapsedTime = 0;
    frameDuration = 0;
    totalTime = 0;
    constructor(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
        this.spriteSheet = spriteSheet;
        this.startX = startX;
        this.startY = startY;
        this.frameWidth = frameWidth;
        this.frameDuration = frameDuration;
        this.frameHeight = frameHeight;
        this.frames = frames;
        this.totalTime = frameDuration * frames;
        this.elapsedTime = 0;
        this.loop = loop;
        this.reverse = reverse;
        this.completed = false;


    }
    //Draws an image on the canvas
    drawFrame(tick, ctx, x, y, scaleBy) {
        var scaleBy = scaleBy || 1;
        this.elapsedTime += tick;
        if (this.loop) {
            if (this.isDone()) {
                this.elapsedTime = 0;
                this.completed = true;
            }
        } else if (this.isDone()) {
            this.completed = true;
            return;
        }
        var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
        var vindex = 0;
        if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
            index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
            vindex++;
        }
        while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
            index -= Math.floor(this.spriteSheet.width / this.frameWidth);
            vindex++;
        }

        this.locX = x;
        this.locY = y;
        var offset = vindex === 0 ? this.startX : 0;
        this.clipX = index * this.frameWidth + offset;
        this.clipY = vindex * this.frameHeight + this.startY;


        ctx.drawImage(this.spriteSheet,
            index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,
            this.frameWidth, this.frameHeight,
            this.locX, this.locY,
            this.frameWidth * scaleBy,
            this.frameHeight * scaleBy);

    }
    
    //
    currentFrame() {
        let output;
        this.isValid(this.elapsedTime);
        if(this.frameDuration <= 0) {
            throw new Error('Frame Duration must be greater than 0');
        }
        
        output = Math.floor(this.elapsedTime / this.frameDuration);

        return output;
    }

    isDone() {

        this.isValid(this.elapsedTime);
        this.isValid(this.totalTime);
       
        return this.elapsedTime >= this.totalTime;
        
    }

    isValid (input) {
        if(isNaN(input)) {
            throw new Error('Not CorrectFormat');
        } else {
            return true;
        }
    }
}



