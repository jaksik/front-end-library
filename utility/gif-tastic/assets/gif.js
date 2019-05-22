$(document).ready (function() {
    
    var topics = ["mountain", "ocean", "forest", "desert", "river", "lake", "sky", "snow", "rain", "sunset", "lightning", "storm", "typhoon", "winter", "fall"];

//===ajax call and display gifs here===
function displayGifs() {

    $("#topic-view").empty();
    var topic = $(this).attr("data-name");
    var queryURL = ("https://api.giphy.com/v1/gifs/search?api_key=6PqBCz1tYrh1sCZ1k1HU57jYP6J2X3pK&q=" + topic + "&limit=10&offset=0&rating=G&lang=en");

    // Creating an AJAX call for the specific topic button being clicked
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(queryURL);

        var results = response.data;


        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); //div for the gifs to go inside
            gifDiv.addClass("gifDiv");

            // pulling gif
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
            gifImage.attr("data-state", "still"); // set the image state
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            // pulling still image of gif
            // adding div of gifs to gifsView div
            var rating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(rating);
            $("#topic-view").prepend(gifDiv);
        }
    });
};

//===create buttons here===
    function renderButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("topic-btn");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#buttons-view").append(a);
        }
    }
//===take user form input here===
    $("#add-topic").on("click", function(event) {
        event.preventDefault();
        var topic = $("#topic-input").val().trim();
        // if (topic === indexOf(topics).alert("Button Exists, Try New Topic"));
        if (topics.includes(topic)) {
            alert("already exists");
            return;
        }
        topics.push(topic);
        renderButtons();
        $("#topic-input").val("");
    });

//===call functions here===
    $(document).on("click", ".image", function() {
      var state = $(this).attr("data-state");
 
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

    $(document).on("click", ".topic-btn", displayGifs);
    
    renderButtons();
})