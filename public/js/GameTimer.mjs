/*
* A time for the game clock.
*/
import { Entity } from './Entity.mjs'

export class GameTimer extends Entity {
    constructor(game) {
        super();
        this.game = game;
        this.time = 0;
        this.startTime = Date.now();
        this.stopped = false;
    }

    var = convertTime = (miliseconds) => {
        // 5/28 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var totalSeconds = (gameTimeLength / 1000) - Math.floor(miliseconds / 1000);
        // 5/28 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds - minutes * 60;
        if (seconds === 0) {
            seconds = "0" + seconds;
        } else if (seconds % 10 === seconds) {
            seconds = "0" + seconds;
        }
        return minutes + ':' + seconds;
    };

    update() {
        var formattedTime;
        if (!this.stopped) {
            this.time = (Date.now() - this.startTime);
            formattedTime = convertTime(this.time);
            document.getElementById("timer").innerHTML = formattedTime;  //#TODO this should be moved to somewhere else
        }

        return formattedTime;
    }
    
    /*
    * Starts the game. This function is called by the HTML button called "startButton".
    */
    startGame() {
        // 5/28 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        initAudio();
        document.getElementById('bgSound').play();
        // 5/28 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
        if (document.getElementById("startDisplay")) {
            sdParentNode = document.getElementById("startDisplay").parentNode;
            startDisplay = document.getElementById("startDisplay");
            sdParentNode.removeChild(startDisplay);
        }
        gameEngine.start();
        gameEngine.ctx.canvas.focus();
        timer = new GameTimer(gameEngine);
        gameEngine.addEntity(timer);
    };
}
