  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAryQ9vl3hfuHd-KQnxkgCB4HnKTzXZjik",
    authDomain: "traintimes-e77ff.firebaseapp.com",
    databaseURL: "https://traintimes-e77ff.firebaseio.com",
    storageBucket: "traintimes-e77ff.appspot.com",
    messagingSenderId: "309003869991"
  };

  firebase.initializeApp(config);

  // This makes the firebase easier to call later in the code
  var database = firebase.database();

  // Button for adding Trains
  $("#add-train-btn").on("click", function(){

  	// This takes the user input
  	var trainName = $("#train-name-input").val().trim();
  	var trainDest = $("#destination-input").val().trim();
  	var trainStart0 = $("#train-time-input").val().trim();
  })