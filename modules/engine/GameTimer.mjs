/*
* A time for the game clock.
*/
function GameTimer(game) {
    this.game = game;
    this.time = 0;
    this.startTime = Date.now();
    this.stopped = false;
}

GameTimer.prototype = new Entity();
GameTimer.prototype.constructor = GameTimer;

GameTimer.prototype.update = function () {
    if (!this.stopped) { 
        this.time = (Date.now() - this.startTime);
        var formattedTime = convertTime(this.time);
        document.getElementById("timer").innerHTML = formattedTime;
    }
};