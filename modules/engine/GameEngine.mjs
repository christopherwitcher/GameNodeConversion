//The game engine.
class GameEngine {
    constructor() {
        this.entities = [];
        this.ctx = null;
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.surfaceWidth = null;
        this.surfaceHeight = null;
        this.LeftLimit = null;
        this.rightLimit = null;
        this.canvasWidth = canvasWidth;
        this.viewPort = null;
        this.addListeners = true;
        this.score = 0;
        this.numItems = 0;
        this.running = true;
        this.finishLineCompleted = false;
        this.runInsideComplete = false;
        this.closeDoorCompleted = false;

        var channel_max = 8; // number of channels
        this.audiochannels = new Array();
        for (a = 0; a < channel_max; a++) { // prepare the channels
            this.audiochannels[a] = new Array();
            this.audiochannels[a]['channel'] = new Audio(); // create a new audio object
            this.audiochannels[a]['finished'] = -1; // expected end time for this channel
        }

    }
    //Intilizes the game engine. Sets up things to start the game.
    init(ctx) {
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.startInput();
        //this.timer = new Timer();
        this.LeftLimit = 0;
        this.rightLimit = 1450;
        document.getElementById("score").innerHTML = this.score;
        console.log('game initialized');
    }
    //What the games does during a loop of the game.
    loop() {

        this.clockTick = this.timer.tick();
        this.update();
        this.viewPort.update(); // update the viewPort with Runboy's new coordinates
        this.draw();

    }
    playSounds(audioElement) {

        for (a = 0; a < this.audiochannels.length; a++) {
            var now = new Date();
            if (this.audiochannels[a]['finished'] < now.getTime()) { // is this channel finished?

                this.audiochannels[a]['finished'] = now.getTime() + audioElement.duration * 1000;
                this.audiochannels[a]['channel'].src = audioElement.src;
                this.audiochannels[a]['channel'].load();
                this.audiochannels[a]['channel'].play();
                break;
            }
        }
    }
    setViewPort(viewPort) {
        this.viewPort = viewPort;
    }
    
    //GameEngine.prototype.running = true;
    //Starts looping through the game.
    start() {
        console.log("starting game");
        var that = this;
        this.timer = new Timer();
        (function gameLoop() {
            that.loop();
            requestAnimFrame(gameLoop, that.ctx.canvas);
        })();
    }
    //Sets up addListeners for input from the user.
    startInput() {
        console.log('Starting input');

        var getXandY = function (e) {
            var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
            var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top + 23; //canvas top is 23 pixels from top

            return { x: x, y: y };
        };

        var that = this;

        this.ctx.canvas.addEventListener("click", function (e) {
            that.click = getXandY(e);

            //GetButtonCoordinates();
            //function GetButtonCoordinates() {
            //    var button = document.getElementById("startButton");
            //    var p = GetScreenCoordinates(button);
            //    if (that.click.x > p.x && that.click.x < p.x + button.offsetWidth &&
            //        that.click.y > p.y && that.click.y < p.y + button.offsetHeight) {
            //        //button.setAttribute("hidden", true);
            //        ////button.setAttribute("disabled", true);
            //        //this.gameEngine.start();
            //    }
            //}
        }, false);

        this.ctx.canvas.addEventListener("mousemove", function (e) {
            that.mouse = getXandY(e);
        }, false);

        this.ctx.canvas.addEventListener("mouseleave", function (e) {
            that.mouse = null;
        }, false);

        this.ctx.canvas.addEventListener("mousewheel", function (e) {
            that.wheel = e;
            e.preventDefault();
        }, false);

        this.keyDown = function (e) {
            if (e.keyCode === 39) {
                that.rightArrow = true;
                that.isRightArrowUp = false;
                direction = true; // true = right
            }

            if (e.keyCode === 37) {
                that.leftArrow = true;
                that.isLeftArrowUp = false;
                direction = false; // false = left
            }

            if (e.keyCode === 32) {
                that.space = true;
                // 5/28 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                that.playSounds(document.getElementById('jumpSound'));
                // 5/28 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            }
            e.preventDefault();
        };

        this.ctx.canvas.addEventListener("keydown", this.keyDown, false);

        this.ctx.canvas.addEventListener("keyup", function (e) {
            if (e.keyCode === 39) {
                that.rightArrow = false;
                that.isRightArrowUp = true;
            }
            if (e.keyCode === 37) {
                that.leftArrow = false;
                that.isLeftArrowUp = true;
            }
            e.preventDefault();
        }, false);

        console.log('Input started');
    }
    //Adds and entity to the game engine.
    addEntity(entity) {
        //console.log('added entity');
        this.entities.push(entity);
    }
    //Draws all entities onto the canvas.
    draw(drawCallback) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.save();
        if (this.running === true) {
            for (var i = 0; i < this.entities.length; i++) {

                // Only draw an entity if it is within the Viewport
                if (this.entities[i].worldX > this.viewPort.leftX && this.entities[i].worldX < this.viewPort.rightX) {
                    this.entities[i].draw(this.ctx);
                }

            }
        } else {
            finishLine.draw(this.ctx);
        }
        if (drawCallback) {
            drawCallback(this);
        }
        this.ctx.restore();
    }
    /*
    Update all entities
    */
    update() {

        // add or remove keydown addListeners depending on whether Runboy is currently jumping
        if (this.addListeners) {
            this.ctx.canvas.addEventListener("keydown", this.keyDown, false);
        } else {
            this.ctx.canvas.removeEventListener("keydown", this.keyDown, false);
        }

        var entitiesCount = this.entities.length;

        for (var i = 0; i < entitiesCount; i++) {
            var entity = this.entities[i];

            // 5/28 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // check to see if time has run out
            if (entity instanceof GameTimer && !gameOver) {
                if (Number(entity.time) > gameTimeLength) {
                    this.running = false;
                    gameOver = true;
                    this.endGame();
                }
                var backCanvas = document.getElementById('backColor');
                if (Number(entity.time) < 30000) {
                    backCanvas.className = "morningBG";
                } else if (Number(entity.time) >= 30000 && Number(entity.time) < 60000) {
                    backCanvas.className = "noonBG";
                } else if (Number(entity.time) >= 60000 && Number(entity.time) < 90000) {
                    backCanvas.className = "eveningBG";
                } else {
                    backCanvas.className = "nightBG";
                }
            }

            // 5/28 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // Update all entities' x value except Runboy
            if (!(entity instanceof RunBoy)) {
                entity.x = canvasWidth + (entity.worldX - this.viewPort.rightX);
            }

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (var i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    }
    endGame() {
        timer.stopped = true;
        var timeLeft = timer.time;
        // 5/28 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var timeBonus = Math.ceil((gameTimeLength - Number(timeLeft)) / 1000) * 10;
        // 5/28 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var element = document.createElement('div');
        element.id = "endDisplay";
        document.body.appendChild(element);
        element.appendChild(document.createTextNode("Game Over"));
        element.style.position = "absolute";
        element.style.left = "500px";
        element.style.top = "130px";
        element.style.fontSize = "65px";
        //element.style.color = "#D0F8FF";
        element.style.color = "red";
        element.style.textShadow = "0 0 5px #A5F1FF, 0 0 10px #A5F1FF, 0 0 20px #A5F1FF, 0 0 30px #A5F1FF, 0 0 40px #A5F1FF";

        var element2 = document.createElement('ul');
        element2.id = "list";
        document.body.appendChild(element2);
        element2.style.position = "absolute";
        element2.style.left = "500px";
        element2.style.top = "270px";
        element2.style.fontSize = "25px";
        //element2.style.color = "#D0F8FF";
        element2.style.color = "red";
        element2.style.textShadow = "0 0 5px #A5F1FF, 0 0 10px #A5F1FF, 0 0 20px #A5F1FF, 0 0 30px #A5F1FF, 0 0 40px #A5F1FF";

        var elem3 = document.createElement('li');
        elem3.appendChild(document.createTextNode("Score: " + (gameEngine.score + timeBonus)));

        var elem4 = document.createElement('li');
        elem4.appendChild(document.createTextNode("Items Collected: " + gameEngine.numItems));

        var elem5 = document.createElement('li');
        elem5.appendChild(document.createTextNode("Time Bonus: " + timeBonus));

        element2.appendChild(elem3);
        element2.appendChild(elem4);
        element2.appendChild(elem5);

        var resetButton = document.createElement('input');
        document.body.appendChild(resetButton);
        resetButton.id = "rb";
        resetButton.type = "button";
        resetButton.value = "Play Again";
        resetButton.style.position = "absolute";
        resetButton.style.left = "540px";
        resetButton.style.top = "470px";
        resetButton.style.display = "inline-block";
        resetButton.style.width = "200px";
        resetButton.style.border = "1px solid red";
        resetButton.style.backgroundColor = "#A5F1FF";
        resetButton.style.fontSize = "150%";
        resetButton.style.color = "red";
        resetButton.style.borderRadius = "5px";
        resetButton.onclick = function () { location.reload(); };

        // 5/28 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        document.getElementById('bgSound').pause();
        document.getElementById('rewindSound').pause();
        // 5/28 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}












