import { Platform } from './Platform.mjs'
import { Enemy } from './Enemy.mjs'
import { getGameItems } from './gameItems.mjs';
import { Item } from './Item.mjs';


var spacerSection = (game, x, y, width, height) => {
    var size = 50;
    let gameItems = getGameItems;
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            var tempX = j * size + x;
            var tempY = i * size + y;
            var current = Math.floor(Math.random() * gameItems.length)
            var item = new Item(game, tempX, tempY - 60, gameItems[current].points, gameItems[current].clipX, gameItems[current].clipY,
                gameItems[current].frameWidth, gameItems[current].frameHeight, 0.3);
            game.addEntity(item);

        }
    }

    return width * size;
};

var rectPlatform = function (game, x, y, width, height, createItems) {
    var size = 50;
    let gameItems = getGameItems;
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            var tempX = j * size + x;
            var tempY = i * size + y;

            var crate = new Platform(game, tempX, tempY, game.canvasWidth, 1450, 4900, size, size);
            game.addEntity(crate);
            if (i === 0 && createItems) {
                var current = Math.floor(Math.random() * gameItems.length)
                var item = new Item(game, tempX, tempY - 60, gameItems[current].points, gameItems[current].clipX, gameItems[current].clipY,
                    gameItems[current].frameWidth, gameItems[current].frameHeight, 0.3);
                    console.log("the items: " + item);
                game.addEntity(item);
            }
        }
    }
    //var item = new Item(game, x + 75, y - 60, 10, 0, 0, 50, 50);
    //game.addEntity(item);

    return width * size;
};

var endLevelSection = (startX, game) => {
    var sectOne = rectPlatform(game, startX, 0, 1, 8, false);
    startX = startX + 50;
    var sectTwo = rectPlatform(game, startX, 300, 4, 1, false);
    startX = startX + 400;
    var sectThree = rectPlatform(game, startX, 450, 4, 1, false);
    var sectFour = rectPlatform(game, startX + 50, 150, 4, 1, false);
    startX = startX + 375;
    var sectFive = rectPlatform(game, startX, 275, 8, 1, false);
    var enemyOne = new Enemy(game, startX, 135, false);
    game.addEntity(enemyOne);
    startX = startX + 50 * 7;
    var sectSix = rectPlatform(game, startX, 125, 1, 10, false);
    startX = startX + 50;
    var sectSix = rectPlatform(game, startX, 125, 2, 1, false);
    var sectEight = rectPlatform(game, startX, 325, 5, 1, false);
    var zeroEnemy = new Enemy(game, startX + 100, 180, true);
    game.addEntity(zeroEnemy);
    startX = startX + 200;

    var sectSeven = rectPlatform(game, startX, 125, 2, 1, false);

    var stairOne = rightCrateSteps(game, startX + 450, 125, 9);
    startX = startX + 900;
    var sectTen = rectPlatform(game, startX + 150, 0, 4, 3, false);
    startX = startX + 400;
    rectPlatform(game, startX, 450, 4, 1, true);
    startX = startX + 350;
    rectPlatform(game, startX, 325, 4, 1, true);
    startX = startX + 350;
    rectPlatform(game, startX, 200, 4, 1, true);
    startX = startX + 400;
    var lastBuilding = new Platform(game, startX, 100, game.canvasWidth, 900, 4400, 270, 580, 0.8);
    game.addEntity(lastBuilding);
    startX = startX + 450;
    var sectEleven = rectPlatform(game, startX, -100, 4, 4, false);


    return startX + 500;
}

var buildMovingPlatform = (startX, game, width, position, range, speed) => {
    var size = 50;
    for (let i = 0; i < width; i++) {
        var mover = new MovingPlatform(game, startX + (size * i), position, game.canvasWidth, 1450, 4900, size, size, range, speed);
        game.addEntity(mover);
    }

    return (size * width) + startX;

}

var buildGround = (game, width) => {
    for (var x = -100; x <= (width / 160); x++) {
        var ground = new Platform(game, x * 160, 580, game.canvasWidth, 0, 4000, 1200, 37);
        game.addEntity(ground);
    }

}


var leftCrateSteps = function (game, x, y, height) {
    var size = 50;
    let gameItems = getGameItems;
    for (let i = 1; i <= height; i++) {
        var tempX;
        var tempY;
        for (let j = 1; j <= i; j++) {
            tempX = (j - 1) * size + x;
            tempY = (i - 1) * size + y;
            var crate = new Platform(game, tempX, tempY, game.canvasWidth, 1450, 4900, size, size);
            game.addEntity(crate);
        }
        var current = Math.floor(Math.random() * gameItems.length)
        var item = new Item(game, tempX, tempY - 60, gameItems[current].points, gameItems[current].clipX, gameItems[current].clipY,
            gameItems[current].frameWidth, gameItems[current].frameHeight, 0.3);
        game.addEntity(item);
    }
};

var rightCrateSteps = function (game, x, y, height) {
    var size = 50;
    var start = 1;
    let gameItems = getGameItems;
    for (let j = height; j >= 1; j--) {
        var tempX;
        var tempY;
        for (let i = start; i <= height; i++) {
            tempX = (i - 1) * size + x;
            tempY = (j - 1) * size + y;
            if (i === start) {
                var current = Math.floor(Math.random() * gameItems.length);
                var item = new Item(game, tempX, tempY - 60, gameItems[current].points, gameItems[current].clipX,
                    gameItems[current].clipY, gameItems[current].frameWidth, gameItems[current].frameHeight, 0.3);
                game.addEntity(item);
            }

            var crate = new Platform(game, tempX, tempY, game.canvasWidth, 1450, 4900, size, size);
            game.addEntity(crate);
        }



        start++;
    }
};



var getBoardPieces = (game, startX) => {
    let boardPieces = [];

    boardPieces[0] = (startX, game) => {
        //var zeroEnemy = new Enemy(game, startX + 650, 435, true);
        var zeroEnemy = new Enemy(game, startX + 650, 435, true);

        var levelOne = rectPlatform(game, startX, 534, 5, 1, true);
        var levelTwo = rectPlatform(game, startX += 400, 415, 4, 1, true);
        var levelThree = rectPlatform(game, startX += 375, 296, 4, 1, true);
        var tallCrates = rectPlatform(game, startX += 455, 150, 4, 5, true);
        var sectionF = rectPlatform(game, startX += 500, 150, 8, 1, true);
        var dumpster = new Platform(game, startX - 100, 455, game.canvasWidth, 1200, 4700, 175, 118);
        game.addEntity(dumpster);

        //spacerSection(game, sectWidth += 250, 415, 4,2);
        game.addEntity(zeroEnemy);
        return startX;
    };


    boardPieces[1] = (startX, game) => {
        var stairsOne = rightCrateSteps(game, startX, 380, 4);
        var platTwo = rectPlatform(game, startX += 200, 380, 4, 4, true);
        var stairsThree = leftCrateSteps(game, startX += 200, 380, 4);

        return startX;
    };

    boardPieces[2] = (startX, game) => {
        var levelOne = rectPlatform(game, startX - 425, 150, 8, 1, true);
        var levelTwo = rectPlatform(game, startX += 200, 484, 4, 2, true);
        var levelThree = rectPlatform(game, startX += 50, 209, 4, 1, true);
        return startX;
    };

    boardPieces[3] = (startX, game) => {
        var sectOne = rightCrateSteps(game, startX += 50, 425, 3);
        var sectTwo = rectPlatform(game, startX += 150, 425, 2, 3, true);
        var sectFour = rectPlatform(game, startX += 300, 350, 4, 1, true);
        var enemyFive = new Enemy(game, startX - 50, 435);
        var sectThree = new Platform(game, startX += 400, 455, game.canvasWidth, 1200, 4700, 175, 118);
        game.addEntity(sectThree);
        game.addEntity(enemyFive);

        return startX;
    };

    boardPieces[4] = (startX, game, twoBuildings) => {

        var sectTwo = rectPlatform(game, startX, 150, 1, 4, false);
        var sectOne = rectPlatform(game, startX, 300, 4, 1, false);
        var sectThree = rectPlatform(game, startX += 350, 425, 4, 1, true);
        var sectFour = rectPlatform(game, startX += 100, 175, 5, 1, true);
        var sectFivea = new Platform(game, startX += 500, 158, game.canvasWidth, 20, 4505, 248, 422);
        game.addEntity(sectFivea);

        if (twoBuildings) {
            var sectFiveb = new Platform(game, startX += 250, 171, game.canvasWidth, 275, 4518, 187, 409);
            game.addEntity(sectFiveb);
        }
        var sectFivec = rectPlatform(game, startX += 275, 275, 3, 1);
        var enemySeven = new Enemy(game, startX, 125);
        var sectSix = rectPlatform(game, startX += 150, 275, 8, 1);
        game.addEntity(enemySeven);
        var specialItem = new Item(game, startX + 150, 400, 750, 2600, 4750, 82, 148, 0.8);
        game.addEntity(specialItem);
        var sectEight = rectPlatform(game, startX += 350, 325, 1, 2);
        var enemyNine = new Enemy(game, startX += 50, game.startingHeight);
        var sectTen = rectPlatform(game, startX += 200, 300, 4, 1);

        game.addEntity(enemyNine);


        return startX;
    };

    boardPieces[5] = (startX, game) => {
        startX -= 200;
        startX += spacerSection(game, startX, 375, 12, 3);
        startX += rectPlatform(game, startX, 450, 5, 1, true);
        startX += 200;
        startX += rectPlatform(game, startX, 350, 5, 1, true);
        var lastEnemy = new Enemy(game, startX - 250, 435);
        game.addEntity(lastEnemy);

        return startX;
    }

    boardPieces[6] = (startX, game, extra) => {
        var randomEnemy = Math.floor(Math.random() * 33);
        var check = randomEnemy % 2;
        var enemy = (check === 0) ? true : false;
        console.log('Enemy: ' + enemy);
        startX -= 500

        startX = startX + 75;
        var sectOne = rectPlatform(game, startX + 100, 470, 4, 2, extra);
        startX += spacerSection(game, startX, 250, 5, 1);
        startX = startX + 200;
        startX += rectPlatform(game, startX, 350, 5, 1, true);
        startX = startX + 300;
        startX += rectPlatform(game, startX, 250, 3, 1, true);
        startX += 300;
        startX += rectPlatform(game, startX, 175, 3, 1, true);
        startX += 500;
        //startX += rectPlatform(game, startX + 75, 380, 4, 1, false);
        var specialItem = new Item(game, startX + 150, 35, 750, 2600, 4750, 82, 148, 0.8);
        if (enemy === true) {
            var lastEnemy = new Enemy(game, startX + 75, 35);
            game.addEntity(lastEnemy);
        }
        rectPlatform(game, startX + 75, 175, 8, 1, false);
        startX += rectPlatform(game, startX + 25, 425, 8, 1, true);
        //startX += rectPlatform(game, startX + 25, 225, 1, 4, false);
        game.addEntity(specialItem);

        return startX;
    }

    return boardPieces;
}

var initAudio = () => {

    var bgAudio = document.createElement('audio');
    bgAudio.id = "bgSound";
    document.body.appendChild(bgAudio);
    bgAudio.src = "bgMusic.mp3";
    bgAudio.volume = "0.4";
    bgAudio.preload = "auto";

    var jumpAudio = document.createElement('audio');
    jumpAudio.id = "jumpSound";
    document.body.appendChild(jumpAudio);
    jumpAudio.src = "Jump18.wav";

    var itemAudio = document.createElement('audio');
    itemAudio.id = "itemSound";
    document.body.appendChild(itemAudio);
    itemAudio.src = "ItemPickup.wav";

    var rewindAudio = document.createElement('audio');
    rewindAudio.id = "rewindSound";
    document.body.appendChild(rewindAudio);
    rewindAudio.src = "rewindSound3.wav";
}

var convertTime = (miliseconds) => {

    var totalSeconds = (gameTimeLength / 1000) - Math.floor(miliseconds / 1000);

    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds - minutes * 60;
    if (seconds === 0) {
        seconds = "0" + seconds;
    } else if (seconds % 10 === seconds) {
        seconds = "0" + seconds;
    }
    return minutes + ':' + seconds;
}







export { spacerSection, endLevelSection, buildMovingPlatform, rectPlatform, buildGround, getBoardPieces, initAudio, convertTime };