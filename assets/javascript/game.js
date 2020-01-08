// Creates an array that lists out all of the possible words to be guessed.
// start with one word for testing to be added onto later
var words = ["hangman"];

// Choose a Secret Word from the list
function getSecretWord () {
	return words[Math.floor(Math.random() * words.length)]
};

// Populate the word to be guessed from the array of possibilities
var answer = getSecretWord();

// Create an array to display the Guess Word as a series of underscores for the length
var hiddenWord = [];

// Initialize the hiddenWord array with the underscores for the length of the guess word
for (i=0; i < answer.length; i++){
		hiddenWord.push("_");
};

// function to display an array with spaces in between characters instead of commas
function dispArray (arr) {
	var toDisplay = "";

	for (i=0; i < arr.length; i++) {
		toDisplay = toDisplay + " " + arr[i];
	}
	return "<p>" + toDisplay + "</p>"
};

// link the answer to the HTML so it is displayed
document.querySelector('#hiddenword').innerHTML = dispArray(hiddenWord);

// Create an array to store the letters guessed
var guessLetters = [];

// This function is run whenever the user presses a key.
document.onkeyup = function(event) {

	// Determines which key was pressed and converts to lowercase for ease of comparison
	var userGuess = event.key.toLowerCase();   

	// Populate a guess array with the values input
	guessLetters.push(userGuess); 

	document.querySelector('#guesses').innerHTML = dispArray(guessLetters);

};
