

var getEnemies = () => {
    return [
        {
            "runRightX" : 100,
            "runRightY" : 1350,
            "runLeftX" : 100,
            "runLeftY" : 1515,
            "runHeight" : 140,
            "runWidth" : 100,
            "jumpLeftX" : 0,
            "jumpLeftY" : 1650,
            "jumpRightX" : 0,
            "jumpRightY" : 1815,
            "jumpHeight" : 140,
            "jumpWidth" : 100,
            "runOffSet" : 8,
            "standingRightX" : 0,
            "standingRightY" : 1350,
            "standingLeftX" : 0,
            "standingLeftY" : 1515,
            "standingWidth" : 100,
            "standingHeight" : 150,
            "scaleBy" : 1.1,
            "jumpScaleBy" : 1.1,
            "standingScale" : 1.1
        },
        {
            "runRightX" : 100,
            "runRightY" : 2100,
            "runLeftX" : 100,
            "runLeftY" : 2250,
            "runHeight" : 150,
            "runWidth" : 100,
            "jumpLeftX" : 0,
            "jumpLeftY" : 2560,
            "jumpRightX" : 0,
            "jumpRightY" : 2400,
            "jumpHeight" : 160,
            "jumpWidth" : 114,
            "runOffSet" : 10,
            "standingRightX" : 0,
            "standingRightY" : 2100,
            "standingLeftX" : 0,
            "standingLeftY" : 2250,
            "standingWidth" : 100,
            "standingHeight" : 150,
            "scaleBy" : 0.9,
            "jumpScaleBy" : 1.2,
            "standingScale" : 1.1
        },
        {
            "runRightX" : 100,
            "runRightY" : 800,
            "runLeftX" : 100,
            "runLeftY" : 640,
            "runHeight" : 150,
            "runWidth" : 99,
            "jumpLeftX" : 0,
            "jumpLeftY" : 1120,
            "jumpRightX" : 0,
            "jumpRightY" : 960,
            "jumpHeight" : 160,
            "jumpWidth" : 114,
            "runOffSet" : 10,
            "standingRightX" : 0,
            "standingRightY" : 800,
            "standingLeftX" : 0,
            "standingLeftY" : 640,
            "standingWidth" : 100,
            "standingHeight" : 150,
            "scaleBy" :1,
            "jumpScaleBy" : 1.1,
            "standingScale" : 1.1
        }
    ];
};

const enemiesList = getEnemies();

export { enemiesList };