import { Entity } from "./Entity.mjs";
import { Animation } from "./Animation.mjs";
import { BoundingBox } from "./BoundingBox.mjs"
import { enemiesList } from "./enemies.mjs"


//Sets up different animation of runboy and initializes the controls
export class Enemy extends Entity {

    constructor(game, startingX, startingY, jump) {
        super(game, startingX, startingY);
        this.enemyList = enemiesList;
        this.enemyMoveDistance = 3;
        this.maxMove = 100;
        var randomEnemy = Math.floor(Math.random() * 3);
        var globalCurrentEnemy = randomEnemy;
        var spriteSheet = game.spriteSheet;
        //this.currentEnemy = Math.floor(Math.random() * enemyList.length);
        // #TODO Get Files from JSON file
        /* fetch('./enemies.json').then(response => {
            return response.json();
        }).then(data => enemyList = data); */

        if (globalCurrentEnemy >= 2) {
            globalCurrentEnemy = 0;
        } else {
            globalCurrentEnemy += 1;
        }
        this.currentEnemy = globalCurrentEnemy;

        //Animations for the enemy.
        this.runRight = new Animation(spriteSheet, this.enemyList[this.currentEnemy].runRightX, this.enemyList[this.currentEnemy].runRightY,
            this.enemyList[this.currentEnemy].runWidth, this.enemyList[this.currentEnemy].runHeight,
            0.008, 120, true, false);

        this.runLeft = new Animation(spriteSheet, this.enemyList[this.currentEnemy].runLeftX, this.enemyList[this.currentEnemy].runLeftY, this.enemyList[this.currentEnemy].runWidth, this.enemyList[this.currentEnemy].runHeight,
            0.008, 120, true, false);


        // 5/27/2014 Need to change to actual jumping animation.
        this.jumpRight = new Animation(spriteSheet, this.enemyList[this.currentEnemy].jumpRightX, this.enemyList[this.currentEnemy].jumpRightY,
            this.enemyList[this.currentEnemy].jumpWidth, this.enemyList[this.currentEnemy].jumpHeight, 0.015, 89, false);

        this.jumpLeft = new Animation(spriteSheet, this.enemyList[this.currentEnemy].jumpLeftX, this.enemyList[this.currentEnemy].jumpLeftY,
            this.enemyList[this.currentEnemy].jumpWidth, this.enemyList[this.currentEnemy].jumpHeight, 0.015, 89, false);

        this.standingRight = new Animation(spriteSheet, this.enemyList[this.currentEnemy].standingRightX, this.enemyList[this.currentEnemy].standingRightY,
            this.enemyList[this.currentEnemy].standingWidth, this.enemyList[this.currentEnemy].standingHeight, 1, 1, true);

        this.standingLeft = new Animation(spriteSheet, this.enemyList[this.currentEnemy].standingLeftX, this.enemyList[this.currentEnemy].standingLeftY,
            this.enemyList[this.currentEnemy].standingWidth, this.enemyList[this.currentEnemy].standingHeight, 1, 1, true);
        // set the sprite's starting position on the canvas
        this.canPass = true;
        this.jump = jump;
        this.standing = jump; //will start at standing if jump is true.
        this.height = 0;
        this.baseHeight = startingY;
        this.scaleBy = this.enemyList[this.currentEnemy].scaleBy;
        this.standingScale = this.enemyList[this.currentEnemy].standingScale;
        this.myDirection = true;
        this.moveCount = 0;

        this.boundingBox = new BoundingBox(this.worldX, this.worldY, 90, 145);

    }

    update() {

        var maxHeight = 310;

        ///Adding in jumping. 5/27/2014
        if (this.jump) {

            //start jump
            if (this.moveCount === this.maxMove) {

                this.standing = false;

                if (this.myDirection) { // Right
                    var duration = this.jumpRight.elapsedTime + this.game.clockTick; //the duration of the jump.
                    if (duration > this.jumpRight.totalTime / 2) {
                        duration = this.jumpRight.totalTime - duration;
                    }
                    duration = duration / this.jumpRight.totalTime;
                    this.height = (4 * duration - 4 * duration * duration) * maxHeight + 17;

                    this.y = this.baseHeight - this.height / 2;
                    //console.log(this.jumpRight.isDone());
                    if (this.jumpRight.isDone()) {
                        //console.log("here");
                        this.y = this.baseHeight;
                        this.jumpRight.elapsedTime = 0;
                        this.moveCount = 0;
                        //console.log(this.moveCount);
                        this.myDirection = false;
                        this.standing = true;
                    }

                } else { // Left

                    var duration = this.jumpLeft.elapsedTime + this.game.clockTick;
                    if (duration > this.jumpLeft.totalTime / 2) {
                        duration = this.jumpLeft.totalTime - duration;
                    }
                    duration = duration / this.jumpLeft.totalTime;
                    this.height = (4 * duration - 4 * duration * duration) * maxHeight + 17;

                    this.y = this.baseHeight - this.height / 2;

                    if (this.jumpLeft.isDone()) {
                        this.y = this.baseHeight;
                        this.jumpLeft.elapsedTime = 0;
                        this.moveCount = 0;
                        this.myDirection = true;
                        this.standing = true;
                    }

                }
            }
            else {
                this.moveCount++;
            }
            //console.log(this.moveCount);
        } //The end of jumping being added 5/27/2014
        else {
            if (this.moveCount > this.maxMove) {
                this.myDirection = !this.myDirection;
                this.moveCount = 0;
            }
            if (this.myDirection) {
                this.worldX = this.worldX + this.enemyMoveDistance;
                this.moveCount++;
            }
            else {
                this.worldX = this.worldX - this.enemyMoveDistance;
                this.moveCount++;
            }
        }
        this.boundingBox = new BoundingBox(this.x, this.y, 90, 145);
        Entity.prototype.update.call(this);
    }
    draw(ctx) {

        if (this.standing) {
            if (this.myDirection) {
                //Animation for standing to the right
                this.standingRight.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.standingScale);
            }
            else {
                //Animation for standing to the left.
                this.standingLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.standingScale);
            }
        }
        else if (this.jump) {
            if (this.myDirection) {
                this.jumpRight.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.enemyList[this.currentEnemy].jumpScaleBy);
            }
            else {
                this.jumpLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.enemyList[this.currentEnemy].jumpScaleBy);
            }
        }
        else {
            //walking right
            if (this.myDirection) {
                this.runRight.drawFrame(this.game.clockTick, ctx, this.x, this.y + this.enemyList[this.currentEnemy].runOffSet, this.scaleBy);
            }

            //walking left
            else {
                this.runLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y + this.enemyList[this.currentEnemy].runOffSet, this.scaleBy);
            }
        }

        //ctx.strokeStyle = "green";
        //ctx.strokeRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
    }
    didICollide() {
        boundingBox;
        //console.log("check if they collide");
        this.canPass = true;

        for (var i = 0; i < this.game.entities.length; i++) {

            var entity = this.game.entities[i];
            var result = this.boundingBox.collide(entity.boundingBox);

            if (this.canPass && entity.hasOwnProperty('boundingBox')) {
                this.canPass = !result;
            }
        }

    }
}





