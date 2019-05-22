    // Global Variables

    var targetNumber = Math.floor(Math.random() * 101) + 19;
        $("#number-to-guess").text(targetNumber);

    var counter = 0;
    var wins = 0;
    var loses = 0;
//-------------------------------------------------------------------------
    //CRYSTALS ASSIGNED VALUE HERE
    //CRYSTALS ASSIGNED VALUE HERE



  var images = ["./assets/images/blue.png", "./assets/images/green.png","./assets/images/red.png","./assets/images/yellow.png"];

    function resetCrystals () {
      
		  for (var i = 0; i < images.length; i++) {
			var crystal = $("<img>");
			  crystal.addClass("crystal");
			  crystal.attr("src", images[i]);
        crystal.attr("value", (Math.floor(Math.random() * 12) + 1));
			  $(".crystal-images").append(crystal);
        
		}
	}

  	resetCrystals ();


	  function reset () {
		  // targetNumber ();
      targetNumber = Math.floor(Math.random() * 101) + 19;
      $("#number-to-guess").text(targetNumber);
		  counter = 0;
      $(".crystal-images").html("");
		  resetCrystals ();
      playGame();
	}

//-----------------------------------------------------------------------

  function playGame() {
    $(".crystal").on("click", function () {

      var crystalValue = ($(this).attr("value"));
      crystalValue = parseInt(crystalValue);
      console.log(crystalValue);

      counter += crystalValue;
      $("#counter").text(counter);

      if (counter === targetNumber) {
        wins++;
        if (wins === 3) {
          alert("You Win!")
          loses = 0;
          wins = 0;
          couter = 0;
        }
        reset();
      }

      else if (counter > targetNumber) {
        loses++;
        if (loses === 5) {
          alert("Game Over!")
          loses = 0;
          wins = 0;
          couter = 0;
        }
        reset();
      }


      $("#wins").text(wins);
      $("#loses").text(loses);
      

    

    });
  }

  reset();

