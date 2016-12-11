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

// Global variables declared
var trainName;
var trainDest;
var trainTime0;
var freq;
var nextTrain;
var nextTrainTime;

// Button for adding Trains
$("#add-train-btn").on("click", function(){

	// This keeps the page from refreshing when the submit button is clicked
  	event.preventDefault();

  	// This takes the user input
  	trainName = $("#train-name-input").val().trim();
  	trainDest = $("#destination-input").val().trim();
  	trainTime0 = $("#train-time-input").val().trim();
  	freq = $("#freq-input").val().trim();

  	// This creates a lolcal temp object for the database
  	var newTrain = {
  		train: trainName,
  		dest: trainDest,
  		time0: trainTime0,
  		frequency: freq,
  		// train1: nextTrain,
  		// trainTime1: nextTrainTime

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

  	// Stores objects from firebase into a variable
  	var trainName = childSnapshot.val().train;
	var trainDest = childSnapshot.val().dest;
	var trainTime0 = childSnapshot.val().time0;
	var trainFreq = childSnapshot.val().frequency;
	// var nextTrain = childSnapshot.val().train1;
	// var nextTrainTime = childSnapshot.val().trainTime1;

	// Formats the time back to HH:mm
	var timeFormat = moment(trainTime0, "HH:mm").subtract(1, "years");

	// Does the math to convert the time
	var diffTime = moment().diff(moment(timeFormat), "minutes");
	// var diffTime = moment().diff(moment.unix(timeFormat), "minutes");

	// Takes the remainder of the division 
	var tRemainder = diffTime % trainFreq;

	// Subtracts the remainder from teh frequency
	var minutes = trainFreq - tRemainder;

	// Adds the minutes to the current time
	nextTrain = moment().add(minutes, "minutes");

	// Formats the next train's time
	nextTrainTime = moment(nextTrain).format("hh:mm A");

	// This appends everything to the DOM
	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  trainFreq + "</td><td>" + nextTrainTime + "</td><td>" + minutes + "</td></tr>");




}) //closes the child added listener