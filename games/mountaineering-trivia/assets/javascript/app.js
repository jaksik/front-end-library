// ----pseudo code overall summary-----
//
// there will be an array of objects
//-------the objects will have a question, answer choices, correct answer, and image
//
//There will be several global variables
//---Vars: wins, loses



//There will be an initial playGame function
//-----the playGame function will randomly select an object from the array
//-----append the selected object to the screen


//---This is the question array---

$(document).ready(function () {

    var options = [

        {
            question: "What are the spikes on the bottom of your boots called?",
            choice: ["Skis", "Crampons", "Tread", "Boots"],
            answer: "Crampons",
            image: "assets/images/crampons.jpg"
        },

        {
            question: "What is the device that measures your altitude called?",
            choice: ["Altimeter", "Barometer", "Thermometer", "Measuring Stick"],
            answer: "Altimeter",
            image: "assets/images/altimeter.jpg"
        },

        {
            question: "What is the highest mountain in South America?",
            choice: ["Denali", "Mont Blanc", "Anconcagua", "Mt Everest"],
            answer: "Anconcagua",
            image: "assets/images/anconcagua.jpg"
        },

        {
            question: "What is the highest mountain in Colorado?",
            choice: ["Mt Whitney", "Mt Colorado", "Pikes Peak", "Mt Elbert"],
            answer: "Mt Elbert",
            image: "assets/images/elbert.jpg"
        },

        {
            question: "What is yelled when rocks are falling?",
            choice: ["Heads Up!", "Stone!", "Rock!", "Watch Out!"],
            answer: "Rock!",
            image: "assets/images/rock.jpg"
        },

        {
            question: "When is the best time to plan on summiting a mountain?",
            choice: ["Late Afternoon", "Early Afternoon", "Early Morning", "Mid Night"],
            answer: "Early Morning",
            image: "assets/images/morning.JPG"
        },

        {
            question: "What is used to prevent snow from getting in your boots?",
            choice: ["Gaiters", "Socks", "Boots", "Covers"],
            answer: "Gaiters",
            image: "assets/images/gaiters.jpg"
        }
    ];

    var correct = 0;
    var incorrect = 0;
    var timer = 20;
    var intervalId;
    var userGuess = "";
    var pick;
    var questionIndex = 0;
    
//play again that would append play again here

    //ON BUTTON CLICK START TIMER AND DISPLAY QUESTION
    $("#startgame").on("click", function() {
        startGame();
    });
 
    $(document).on("click", "#playAgain", function () {
        startGame();
    }) 

    function startGame() {
        if (correct + incorrect === options.length) {
            $("#questionblock").html("<p> Final Score:<br>Correct: " + correct + "<br>Incorrect: " + incorrect + "</p><br>");
            $("#timerblock").empty();
            $("#answerblock").empty();
            $(".scoreboard").hide();
            clearInterval(intervalId);
            correct=0;
            incorrect=0;
            var playAgain = $("<button id='playAgain'>")
            playAgain.text("Play Again")
            $("#questionblock").append(playAgain);
            
            //play again call
        } else {
        $(".scoreboard").show();
        $("#questionblock").empty();
        $("#answerblock").empty();
        startTimer();
        questionDisplay();
        displayScore();
        }
    };

    //====TIMER FUNCTION AND DISPLAY====
    function startTimer() {
        timer = 20;
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000)
    }
    function decrement() {
        timer --;
        $("#timerblock").text("Time Remaining:" + timer);
        if (timer === 0) {
            incorrect ++;
            displayScore();
            $("#questionblock").empty();
            $("#answerblock").empty();
            $("#questionblock").html("<p> Out of Time! The Correct Answer Is..." + pick.answer + "</p>");
            var answerImage = $("<img>").attr("src", pick.image);
            $("#answerblock").append(answerImage);
           setTimeout (startGame, 3000) 
            // hideQuestion();
        }
    }

    //===PICK RANDOM OPTION AND DISPLAY ON SCREEN
    function questionDisplay() {

        //===RANDOM OPTION CHOSEN HERE
       
        if (questionIndex > options.length -1) {
            questionIndex = 0;
        }    
            pick = options[questionIndex];
            questionIndex++,
        console.log(pick);

            //===Picked OPTIONS.QUESTION displayed here
            $("#questionblock").html(pick.question);

            //===Give each OPTIONS.CHOICE a data value to allow user to select a choice
            //===.HTML each OPTIONS.CHOICE to html
            for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<button>");
                userChoice.addClass("answerchoice");
                userChoice.text(pick.choice[i]);
                userChoice.attr("data-choicevalue", pick.choice[i]);
                console.log($(this).attr(""));
                $("#answerblock").append(userChoice);
            }    
    }    
   
    //===RECORD USER CLICK

    $(document).on("click", ".answerchoice", recordClick);


    function recordClick() {
        userGuess = ($(this).attr("data-choicevalue"));
        console.log(userGuess);
        if (userGuess === pick.answer) {
            correct ++;
            displayScore();
            $("#questionblock").empty();
            $("#answerblock").empty();
            $("#questionblock").html("<p> Correct! </p>");
            var answerImage = $("<img>").attr("src", pick.image);
            $("#answerblock").append(answerImage);
           setTimeout (startGame, 3000)       
         } else {
            incorrect ++;
            displayScore();
            $("#questionblock").empty();
            $("#answerblock").empty();
            $("#questionblock").html("<p> Wrong! The Correct Answer Is... " + pick.answer + "</p>");
            var answerImage = $("<img>").attr("src", pick.image);
            $("#answerblock").append(answerImage);
           setTimeout (startGame, 3000)        }
    }


    //===DISPLAY SCORE BOARD HERE
    function displayScore () {
            $("#correct").html("<p>" + "Correct: " + correct + "</p>");
            $("#incorrect").html("<p>" + "Incorrect: " + incorrect + "</p>");
    }

})
