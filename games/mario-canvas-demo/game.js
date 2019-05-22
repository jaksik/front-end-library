document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed");
    gameCanvas.start();
});


var arrowKey = false;

var characterBeingSelected = false;
var characterSelected = false;
var gameActive = false;
var falling = false;
var jumping = false;

var selectedCharacter;
var componentFourTimer;
var selectIndicatorLocation = 0;
var characterInitiated = false;

var background;
var componentOne;
var componentTwo;
var componentThree;
var componentFour;

var currentScene = 0;
var rendered = false;

var characterArray = [
    {
        name: "luigi",
        staticImage: "./images/character/luigi.png",
        runningImage: "./images/character/luigiRunning.png",
    },
    {
        name: "mario",
        staticImage: "./images/character/mario.png",
        runningImage: "./images/character/marioWalking.png",
    }, {
        name: "toad",
        staticImage: "",
        runningImage: "",
    }

]
var characterImages;

var gameCanvas = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 1500;
        this.canvas.height = 625
        this.context = this.canvas.getContext("2d");
        document.getElementById("canvas").insertBefore(this.canvas, document.getElementById("canvas").childNodes[0]);
        this.interval = setInterval(serverOne, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function Component(width, height, color, x, y, type) {
    //This allows us to define the type of Component we want to make to allow us to more easily manipulate it later in the construction process
    this.type = type;
    //If the type is image or background this is what is actually allowing us to create, next we manipulate its properties
    if (type == "image" || type == "background") {
        this.image = new Image();
        this.image.src = color;
    }
    //This specifies the dimensions of the Component based on the Values passed in when creating a new Component
    this.width = width;
    this.height = height;
    //This stores the current speed of the Component so it can be accesed when updating the cordinate locations
    this.speedX = 0;
    this.speedY = 0;
    //This is the Components current cordinate location
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    //This function renders 
    this.renderComponent = function () {
        ctx = gameCanvas.context;
        //This draws the images for Components FYI this is also drawing the original image for the background
        if (type == "image" || type == "background") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
            //If background this draws a second background image at the current X location plus the width of the original image
            //to display the background looping effect
            if (type == "background") {
                if (!falling) {
                    ctx.drawImage(this.image,
                        this.x + this.width,
                        this.y = 0,
                        this.width, this.height);
                } if (falling) {
                    ctx.drawImage(this.image,
                        this.x = 0,
                        this.y + height,
                        this.width, this.height)
                }
            }
            //If the Components type was not defined as image or background it will fill the size of the Component with a solid color
        } else if (type == "text") {
            ctx.font = "30px Comic Sans MS";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("color", canvas.width / 2, canvas.height / 2);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    //this is updating the Components X location based on how long the arrow keyValue is pressed. After this function is called the renderComponent function is 
    //called to display the components new location
    this.posUdate = function () {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        if (this.type == "background") {
            if (this.x == -(this.width)) { this.x = 0 };
            if (this.y == -(this.height)) { this.y = 0 };
        } if (this.type == "image") {
            this.hitBottom();
        }
    }
    this.touching = function (otherobj) {
        var myTop = this.y;
        var otherBottom = otherobj.y + (otherobj.height);
        var touching = false;
        if (myTop == otherBottom) {
            touching = true;
        }
        return touching;
    }
    this.hitBottom = function () {
        var rockbottom = gameCanvas.canvas.height - this.height;
        if (this.y > rockbottom) {
            gameActive = true;
            this.y = rockbottom;
        }
    }
}


function serverOne() {
    //-------------running scene zero-----------------
    if (currentScene === 0) {
        if (!rendered) {
            renderSceneZero();
            rendered = true;
        }
        if (!characterSelected) {
            return updateSelectScreen();
        } else if (!gameActive) {
            falling = true;
            background.speedX = 0;
            background.speedY = -20;
            return initiateCharacter();
        } else {
            falling = false;
            updateScene();
        }
        //-------------running scene one-----------------
    } else if (currentScene === 1) {
        if (!rendered) {
            renderSceneOne();
            rendered = true;
        }
        updateSceneOne();
        //-------------running scene two-----------------
    } else if (currentScene === 2) {
        if (!rendered) {
            renderSceneTwo();
            rendered = true;
        }
        updateSceneTwo();
        //-------------running scene three-----------------
    } else if (currentScene === 3) {
        console.log("scene 3");
        if (!rendered) {
            renderSceneThree();
            rendered = true;
        }
        updateSceneTwo();

    } else if (currentScene === 4) {
        console.log("scene 3");
        if (!rendered) {
            renderSceneFour();
            rendered = true;
        }
        updateSceneFour();

    } else {
        console.log("Error no scene rendered");
    }
}


//============================================================================
//=================================RENDER SCENE FUNCTIONS===========================
//=========================================================================================
function renderSceneZero() {
    background = new Component(1500, 625, "./images/background/clouds.jpg", 0, 0, "background");
    componentOne = new Component(200, 200, "./images/character/luigi.png", 300, 75, "image");
    componentTwo = new Component(200, 200, "./images/character/mario.png", 650, 75, "image");
    componentThree = new Component(200, 200, "./images/character/toad.png", 1000, 75, "image");
    componentFour = new Component(250, 250, "red", 275, 50, "color");
}
//----------render scene one components---------------
function renderSceneOne() {
    background = new Component(1500, 625, "./images/background/snowForest.jpg", 0, 0, "background");
    componentOne = new Component(100, 100, "white", 1400, 525, "color");
    componentTwo = new Component(100, 100, "white", 1300, 525, "color");
    componentThree = new Component(100, 100, "white", 1200, 525, "color");
    componentFour = new Component(100, 100, "white", 1100, 525, "color");
    componentFive = new Component(100, 100, "./images/character/mario.png", 1400, 425, "color");
    componentSix = new Component(100, 100, "./images/character/toad.png", 1300, 425, "color");
    componentSeven = new Component(100, 1000, "./images/character/luigi.png", 1200, 425, "color");
    componentEight = new Component(100, 100, "./images/character/mario.png", 1400, 325, "color");
    componentNine = new Component(100, 100, "./images/character/toad.png", 1300, 325, "color");
}
//-------------render scene two comonents-----------------------
function renderSceneTwo() {
    background = new Component(1500, 625, "./images/background/woodWall.jpg", 0, 0, "background");
    componentOne = new Component(350, 250, "./images/portfolio/crystal.png", 125, 75, "image");
    componentTwo = new Component(350, 250, "./images/portfolio/giftastic.png", 575, 75, "image");
    componentThree = new Component(350, 250, "./images/portfolio/trivia.png", 1075, 75, "image");
    componentFour = new Component(1500, 625, "Jump and touch a project to explore", 0, 300, "text");
}
//------------render scene three components--------------------------------
function renderSceneThree() {
    console.log("function: render scene three");
    background = new Component(1500, 625, "./images/background/woodWall.jpg", 0, 0, "background");
    componentOne = new Component(350, 250, "./images/portfolio/group.png", 125, 75, "image");
    componentTwo = new Component(350, 250, "./images/portfolio/group.png", 575, 75, "image");
    componentThree = new Component(350, 250, "./images/portfolio/group.png", 1075, 75, "image");
}

//-------------------------------render scene four components
function renderSceneFour() {
    background = new Component(1500, 625, "./images/background/jaksik.png", 0, 0, "background");
}
//============================================================================================
//=====================================CONSTANT GAME UPDATE FUNCTIONS===================================
//=====================================================================================================================
//-------------Easily update the background--------
function updateBackground() {
    gameCanvas.clear();
    background.posUdate();
    background.renderComponent();
}
//-----------Update The Selected Character----------------------
function updateSelectedCharacter() {
    // console.log("selected character speed Y", selectedCharacter.speedY);
    if (jumping) {
        selectedCharacter.gravitySpeed = 0;
        selectedCharacter.Y = 200;
    } else {
        selectedCharacter.Y = 400;
    }
    selectedCharacter.gravity = 1;
    selectedCharacter.posUdate();
    selectedCharacter.renderComponent();
}
//--------------Check to see if a new scene needs to be rendered--------------------
function checkSceneUpdate() {
    if (selectedCharacter.x > gameCanvas.canvas.width) {
        currentScene++;
        rendered = false;
        console.log("scene up called");
        selectedCharacter.x = 0;
    } if (selectedCharacter.x < 0) {
        currentScene--;
        rendered = false;
        selectedCharacter.x = 1000;
    } if (selectedCharacter.speedX > 0) {
        selectedCharacter.image.src = characterImages.runningImage;
        background.speedX = -5;
    } else if (selectedCharacter.speedX < 0) {
        selectedCharacter.image.src = characterImages.runningImage;
        background.speedX = 5;
    } else {
        selectedCharacter.image.src = characterImages.staticImage;
        background.speedX = 0;
    }

}
//==================================================
//===========================================SCENE ZERO UPDATE FUNCTION====================
//=======================================================================================================
//----Update the character Selection Screen-------------
function updateSelectScreen() {
    if (selectIndicatorLocation == 0) { componentFour.x = 275 };
    if (selectIndicatorLocation == 1) { componentFour.x = 625 };
    if (selectIndicatorLocation == 2) { componentFour.x = 975 };
    updateBackground();
    componentFour.posUdate();
    componentFour.renderComponent();
    componentOne.renderComponent();
    componentTwo.renderComponent();
    componentThree.renderComponent();
}
//----UPDATE CHARACTER FALLING IN TO GAME PLAY SCREEN-------------------------------------------------------------
function initiateCharacter() {
    if (selectIndicatorLocation == 0) {
        selectedCharacter = componentOne
        characterImages = characterArray[0];
    } else if (selectIndicatorLocation == 1) {
        selectedCharacter = componentTwo
        characterImages = characterArray[1];
    } else if (selectIndicatorLocation == 2) {
        selectedCharacter = componentThree
        characterImages = characterArray[2];
    } else {
        console.log("initiate charater error");
    }
    updateBackground();
    characterInitiated = true;
    updateSelectedCharacter();
}
//---------------------NORMAL GAMEPLAY UPDATE SCREEN-----------------------------
function updateScene() {
    checkSceneUpdate();
    updateBackground();
    updateSelectedCharacter();
}
//==========================================================================
//=====================================SCENE ONE UPDATE FUNCTION==========================
function updateSceneOne() {
    checkSceneUpdate();
    updateBackground();
    updateSelectedCharacter();
    componentOne.renderComponent();
    componentTwo.renderComponent();
    componentThree.renderComponent();
    componentFour.renderComponent();
    componentFive.renderComponent();
    componentSix.renderComponent();
    componentSeven.renderComponent();
    componentEight.renderComponent();
    componentNine.renderComponent();
}
//==========================================================================
//=====================================SCENE Two UPDATE FUNCTION==========================
function updateSceneTwo() {
    if (selectedCharacter.touching(componentOne)) {
        console.log("touching Project One");
        window.open("https://fierce-dusk-91170.herokuapp.com/");

    } else if (selectedCharacter.touching(componentTwo)) {
        console.log("touching Project Two");
        window.open("https://www.w3schools.com");

    } else if (selectedCharacter.touching(componentThree)) {
        console.log("touching Project Three");
        window.open("https://www.w3schools.com");

    } else if (selectedCharacter.touching(componentFour)) {
        console.log("touching Project One");
        window.open("https://www.w3schools.com");

    } else if (selectedCharacter.touching(componentFive)) {
        console.log("touching Project One");
        window.open("https://www.w3schools.com");

    } else if (selectedCharacter.touching(componentSix)) {
        console.log("touching Project One");
        window.open("https://www.w3schools.com");
    }
    checkSceneUpdate();
    updateBackground();
    updateSelectedCharacter();
    componentOne.renderComponent();
    componentTwo.renderComponent();
    componentThree.renderComponent();
    componentFour.renderComponent();
}
//==========================================================================
//===========================UPDATE SCENE FOUR============================================
function updateSceneFour() {
    checkSceneUpdate();
    updateBackground();
    updateSelectedCharacter();
}
//=============================================================================
//------------------------KEY EVENT LISTENERS---------------------------------------------------------------
//=============================================================================================================================
window.addEventListener('keydown', function (value) {
    if (gameActive) {
        if (value.keyCode == 37) { selectedCharacter.speedX = -5; }
        if (value.keyCode == 39) { selectedCharacter.speedX = 30; }
        if (value.keyCode == 38) { 
            jumping = true;
            selectedCharacter.speedY = -10; 
        }
    } else if (!gameActive) {
        if (value.keyCode === 37 && selectIndicatorLocation > 0) { selectIndicatorLocation-- };
        if (value.keyCode === 39 && selectIndicatorLocation < 2) { selectIndicatorLocation++ };
        if (value.keyCode === 13 && !characterSelected) { characterSelected = true };
    }
})

window.addEventListener('keyup', function () {
    if (gameActive) {
        jumping = false;
        selectedCharacter.speedX = 0;
        selectedCharacter.speedY = 0;
    }
})


