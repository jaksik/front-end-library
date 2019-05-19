$(document).ready(function (){ 

    //=====================Firebase Config and vairables===========================
    var config = {
        apiKey: "AIzaSyCxIqZjDAYDiOppq53l3GpMNEMnMRYrHe4",
        authDomain: "the-train-279f7.firebaseapp.com",
        databaseURL: "https://the-train-279f7.firebaseio.com",
        projectId: "the-train-279f7",
        storageBucket: "",
        messagingSenderId: "728658204101"
    };
    firebase.initializeApp(config);
    
    var dataRef = firebase.database();
    
    var train = "";
    var destination = "";
    var first = 0;
    var frequency = "";
    var converted = "";
    
    // =================Capture Button Click============================
    $("#add-train").on("click", function(event) {
            event.preventDefault();
    
            train = $("#train-input").val().trim();
            destination = $("#destination-input").val().trim();
            first = $("#first-input").val().trim();
            frequency = $("#frequency-input").val().trim();
    
        dataRef.ref().push({
    
            train:train,
            destination:destination,
            first:first,
            frequency:frequency,
    
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    });
    
    // ============Calculate NEXT TRAIN and Update page on firebase value change=========================
          dataRef.ref().on("child_added", function(childSnapshot) {
            event.preventDefault();
            
            var currentTime = moment().format('LT');
              console.log("CURRENT TIME: " + currentTime);
            var startTimeConverted = moment(childSnapshot.val().first, "hh:mm").subtract(1, "years");
              console.log(startTimeConverted);
            var timeDiff = moment().diff(moment(startTimeConverted), "minutes");
            var timeRemain = timeDiff % childSnapshot.val().frequency;
            var minToArrival = childSnapshot.val().frequency - timeRemain;
            var nextTrain = moment().add(minToArrival, "minutes").format("hh:mm");
            console.log(nextTrain);
            
            // $("tbody").append("<tr><td>" + (childSnapshot.val().train) + "</td><td>" + 
            // (childSnapshot.val().destination) + "</td><td>" + 
            // (childSnapshot.val().frequency) + "</td><td>" + 
            // (nextTrain) + "</td><td>" + (minToArrival) + "</td></tr>" )
            
            var trainRow = $("<tr>")
            trainRow.append($("<td>").text(childSnapshot.val().train));
            trainRow.append($("<td>").text(childSnapshot.val().destination));
            trainRow.append($("<td>").text(childSnapshot.val().frequency));
            trainRow.append($("<td>").text(nextTrain));
            trainRow.append($("<td>").text(minToArrival));
    
            $("tbody").append(trainRow);
    
            $("#currentTime").text(currentTime);
    
    // ======== Console log errors ============================
       
          }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
          });    

          function infoUpdate() {
            dataRef.ref().once("value").then(function(snapshot) {
                console.log(snapshot.val())
            })

          }
            intervalId = setInterval(infoUpdate, 1000)

})