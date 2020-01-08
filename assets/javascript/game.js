// --- Variables ---
// Create an array to display the Guess Word as a series of underscores for the length
var hiddenWord = [];
//Create a constant for the maximum number of wrong guesses
var allowedGuesses = 8;
// create a variable for number of guesses remaining and initialize it to the max
var remainingGuesses = allowedGuesses;


// Creates an array that lists out all of the possible words to be guessed.
// start with one word for testing to be added onto later
var words = ["hangman"];

// Choose a Secret Word from the list
function getSecretWord () {
	return words[Math.floor(Math.random() * words.length)]
};

// Populate the word to be guessed from the array of possibilities
var answer = getSecretWord();

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

// create a function to change the hiddenword from an underscore to a correctly guessed letter
function correctGuess(hidden, guess, letter) {
	// traverse the entire length of the array to find a match and replace with that letter
	for (i=0; i < guess.length; i++) {

		if(guess[i] === letter) {
			hidden[i] = letter;
		}
	
	}

	return hidden;
}

// This function is run whenever the user presses a key.
document.onkeyup = function(event) {

	// Only perform this processing while there are guesses allowed!
	if (remainingGuesses > 0) {
		// Determines which key was pressed and converts to lowercase for ease of comparison
		var userGuess = event.key.toLowerCase();  
		
		// check to see if the letter was already guessed or already found
		if (guessLetters.indexOf(userGuess) === -1 && hiddenWord.indexOf(userGuess) ){

			// Search the guess word to see if character is found
			if (answer.indexOf(userGuess) != -1){

				// see if the letter matches any positions in the answer and change those positions 
				correctGuess(hiddenWord, answer, userGuess);

				// update the page with the new results
				document.querySelector('#hiddenword').innerHTML = dispArray(hiddenWord);

			}
			else {

				// Only populate a guess array with the values input when the letter is not found
				guessLetters.push(userGuess); 

				// update the display with the incorrectly guessed letters
				document.querySelector('#guesses').innerHTML = dispArray(guessLetters);

				// Calculate the number of remaining guesses allowed as the difference between the max and the wrong guesses
				remainingGuesses = allowedGuesses - guessLetters.length;
		
			}
		
		};
	}
	// Too many guesses so this is a loss
	else {
		alert("Sorry, you lose!");
	}

};

