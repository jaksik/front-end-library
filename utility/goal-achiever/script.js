var genArray = [];
//localStorage.clear()
var dateArray = [];
var weightArray = [];
var goalWeightArray = [];
var netWeightArray = [];
var goalWeightHolder;
var currentDate = moment().format('YYYY-MM-DD');
console.log(currentDate);
displaData();

// $(document).ready( function() {
$('#date-input').val(currentDate);
// });​

function displaData() {
    var len;
    // local values
    console.log("1st", localStorage.Data);
    if (localStorage.Data) {
        genArray = JSON.parse(localStorage.getItem("Data"));
        console.log(genArray);
        len = genArray.length;
        dateArray = [];
        weightArray = [];
        goalWeightArray = [];
        netWeightArray = [];
        console.log("date " + dateArray);
        console.log("weight " + weightArray);
        console.log("goal " + goalWeightArray);
        console.log("net: " + netWeightArray);
        $("#goal-input").hide();
        for (var i = 0; i < len; i++) {
            dateArray.push(genArray[i].date);
            weightArray.push(genArray[i].currentWeight);
            goalWeightArray.push(genArray[i].goalWeight);
            netWeightArray.push(genArray[i].netWeight);
            goalWeightHolder = genArray[i].goalWeight;
            console.log("goalweightholder: " + goalWeightHolder)
        }
        $("#goalWeightDisplay").html("<h2>" + "Your Goal Weight Is: " + goalWeightHolder + " pounds" + "</h2>")
    } else {
        $("#goalWeightDisplay").html("<h2>" + "Fill Out The Form To Begin" + "</h2>");
        len = 0
    };


    $("#data-table").html("");

    for (var i = 0; i < len; i++) {

        $("#data-table").append(
            "<tr><td>" + genArray[i].date +
            "</td><td>" + genArray[i].currentWeight +
            "</td><td>" + genArray[i].netWeight + "</td>"); // appending data to table on right
    };

    // $("#myChart").update();

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: dateArray,
            datasets: [{
                label: "My Current Weight",
                backgroundColor: 'transparent',
                borderColor: 'rgb(255, 99, 132)',
                data: weightArray,
            }, {
                label: "My Goal Weight",
                backgroundColor: 'transparent',
                borderColor: 'blue',
                data: goalWeightArray,
            }]
        },

        // Configuration options go here
        options: {}
    });
}

$("#add-weight-btn").on("click", function (event) {
    event.preventDefault() // prevents page from refreshing when hitting submit button
    var goalWeight;
    var date = $("#date-input").val().trim(); // setting vars for user date input from form
    var currentWeight = $("#weight-input").val().trim();
    var netWeight;

    if ($("#goal-weight-input").val().trim() === "") {
        goalWeight = goalWeightHolder
    } else {
        goalWeight = $("#goal-weight-input").val().trim()
    }

    if ($.trim($("#date-input").val()) === "" || $.trim($("#weight-input").val()) === "") {
        $("#error-message").text("Please fill out ALL fields ☺")
        return false;
    }

    $("#date-input").val(""); // clears the textbox when done
    $("#weight-input").val("");
    $("#goal-weight-input").val("");

    currentWeight = parseInt(currentWeight);
    goalWeight = parseInt(goalWeight);
    netWeight = goalWeight - currentWeight;

    if (currentWeight < goalWeight) {
        netWeight = "+" + netWeight;
    }

    genArray.push({
        date: date,
        currentWeight: currentWeight,
        goalWeight: goalWeight,
        netWeight: netWeight
    });

    console.log("Array", genArray);
    // Store all content into localStorage
    localStorage.setItem("Data", JSON.stringify(genArray));
    console.log("2nd", localStorage.Data);
    console.log("Array", genArray);
    displaData();

    var pNumber = 1;
    if (currentWeight > goalWeight) {

        console.log("this part works");

        var queryURL = "https://www.food2fork.com/api/search?key=afcdbd2008087c20c031ea2f831cc8a9&q=broccoli,beef&page=" + pNumber;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            response = JSON.parse(response);
            console.log(response.recipes);

            $("#Recipes").empty();

            for (var i = 0; i < 3; i++) {
                var randomNumber = [Math.floor(Math.random() *  30)];
                console.log("this is a random number: " + randomNumber);

                var recipeDiv = $("<div>");
                recipeDiv.addClass("recipeDiv");

                var title = $("<h5>")
                title.addClass("title");
                title.text(response.recipes[randomNumber].title);
                recipeDiv.append(title);

                var recipeImage = $("<img>");
                recipeImage.addClass("recipeImage");
                recipeImage.attr("src", response.recipes[randomNumber].image_url);
                recipeDiv.append(recipeImage);

                recipeImage.wrap("<a target='_blank' href='" + response.recipes[randomNumber].source_url + "'</a>");
                $("#Recipes").prepend(recipeDiv);
            };
        });
    }

    else {
        var queryURL = "https://www.food2fork.com/api/search?key=07ffefdb900b05233883177a85254be2&q=pasta&sort=r&page=" + pNumber;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            response = JSON.parse(response);
            console.log(response.recipes[i]);

            $("#Recipes").empty();

            for (var i = 0; i < 3; i++) {
                var randomNumber = [Math.floor(Math.random() *  30)];
                var recipeDiv = $("<div>");
                recipeDiv.addClass("recipeDiv");

                var title = $("<h5>")
                title.addClass("title");
                title.text(response.recipes[randomNumber].title);
                recipeDiv.append(title);

                var recipeImage = $("<img>");
                recipeImage.addClass("recipeImage");
                recipeImage.attr("src", response.recipes[randomNumber].image_url);
                recipeDiv.append(recipeImage);

                recipeImage.wrap("<a target='_blank' href='" + response.recipes[randomNumber].source_url + "'</a>");
                $("#Recipes").prepend(recipeDiv);
            };
        });
    };

    $("#reset-data-btn").on("click", function () {
        localStorage.clear(); // to clear everything in local storage
        window.location.reload(); // page refresh to clear out table data
    });
});
