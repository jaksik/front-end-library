document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed");
startGame();
});

    var myScore;
    var leprechaun;
    var goldCoinOne;
    var goldCoinTwo;
    var componentWidth = window.innerWidth/30;
    var screenWidth = window.innerWidth/4;
    var touchingCoinOne = false;
    var touchingCoinTwo = false;

    function startGame() {
        if (window.innerWidth < 960) {
            componentWidth = window.innerWidth/8;
            screenWidth = window.innerWidth * .8;
        }
        myScore = new component("30px", "Consolas", "white", 200, 40, "text");
        leprechaun = new component(componentWidth, componentWidth, "./images/leprechaun.png", 10, (window.innerHeight/3) - componentWidth, "image");
        goldCoinOne = new component(componentWidth, componentWidth, "./images/gold-coin.png", Math.floor((Math.random() * screenWidth) + 1), -(componentWidth), "image");
        goldCoinTwo = new component(componentWidth, componentWidth, "./images/gold-coin.png", Math.floor((Math.random() * screenWidth) + 1), (componentWidth * 2), "image");
        myGameArea.start();
    }

    var myGameArea = {
        canvas: document.createElement("canvas"),
        start: function () {
            this.canvas.width = screenWidth;
            this.canvas.height = window.innerHeight/3;
            this.context = this.canvas.getContext("2d");
            document.getElementById("canvas").insertBefore(this.canvas, document.getElementById("canvas").childNodes[0]);
            this.frameNo = 0;
            this.interval = setInterval(updateGameArea, 20);
        },
        clear: function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    function component(width, height, color, x, y, type) {
        this.type = type;
        if (type == "image") {
            this.image = new Image();
            this.image.src = color;
        }
        this.text = "";
        this.score = 0;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.gravity = 0;
        this.gravitySpeed = 0;
        this.update = function () {
            ctx = myGameArea.context;
            if (this.type == "text") {
                ctx.font = this.width + " " + this.height;
                ctx.fillStyle = color;
                ctx.fillText(this.text, this.x, this.y);
            } else if (type == "image") {
                ctx.drawImage(this.image, 
                    this.x, 
                    this.y,
                    this.width, this.height);
            } else {
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }
        this.touching = function() {
            if (touchingCoinOne === false && (this.x + this.width) > goldCoinOne.x && this.x < (goldCoinOne.x + goldCoinOne.width) && this.y < (goldCoinOne.y + goldCoinOne.height)) {
                touchingCoinOne = true;
                goldCoinOne.y = -(componentWidth);
                goldCoinOne.x = Math.floor((Math.random() * screenWidth) + 1);
                myScore.score += 1;
                touchingCoinOne = false;
            }
            if (touchingCoinTwo === false && (this.x + this.width) > goldCoinTwo.x && this.x < (goldCoinTwo.x + goldCoinTwo.width) && this.y < (goldCoinTwo.y + goldCoinTwo.height)) {
                touchingCoinTwo = true;
                goldCoinTwo.y = -(componentWidth);
                goldCoinTwo.x = Math.floor((Math.random() * screenWidth) + 1);
                myScore.score += 1;
                touchingCoinTwo = false;
            }
        }
    }

    function updateGameArea() {
        if (goldCoinOne.y > window.innerHeight/3) {
            goldCoinOne.y = -(componentWidth);
            goldCoinOne.x = Math.floor((Math.random() * screenWidth) + 1);
        }
        if (goldCoinTwo.y > window.innerHeight/3) {
            goldCoinTwo.y = -(componentWidth);
            goldCoinTwo.x = Math.floor((Math.random() * screenWidth) + 1);
        }
        goldCoinOne.y += 3;
        goldCoinTwo.y += 3;
        myGameArea.clear();
        myScore.update();
        myScore.text = "SCORE: " + myScore.score;
        leprechaun.touching();
        leprechaun.update();
        goldCoinOne.update();
        goldCoinTwo.update();
    }

    window.addEventListener('keydown', function (value) {
            if (value.keyCode == 37) { leprechaun.x -= 15; };
            if (value.keyCode == 39) { leprechaun.x += 15; };
    })
    