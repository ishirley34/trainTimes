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

  	// This keeps the page from refreshing when the submit button is clicked
  	event.preventDefault();

  	// This takes the user input
  	var trainName = $("#train-name-input").val().trim();
  	var trainDest = $("#destination-input").val().trim();
  	var trainStart0 = moment($("#train-time-input").val().trim(), "HH:mm").format("X");
  	var freq = $("#freq-input").val().trim();

  	// This creates a lolcal temp object for the database
  	var newTrain = {
  		train: trainName,
  		dest: trainDest,
  		start0: trainStart0,
  		frequency: freq
  	}; // closes newTrain object

  	// Uploads the data to the database
  	database.ref().push(newTrain);

  	// Alerts that a train has been added
  	$("#myModal").modal();

  	// Clears Textboxes
  	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#train-time-input").val("");
	$("#freq-input").val("");

	// This keeps the page form refreshing if enter is hit
	return false;
  }); // This closes the add-train-btn listener

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  	// Stores everything into a variable
  	var trainName = childSnapshot.val().train;
	var trainDest = childSnapshot.val().dest;
	var trainStart0 = childSnapshot.val().start0;
	var freq = childSnapshot.val().freq;

	// MATH
  })