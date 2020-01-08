// --- Variables ---
// Create an array to display the Guess Word as a series of underscores for the length
var hiddenWord = [];
//Create a constant for the maximum number of wrong guesses
var allowedGuesses = 8;
// create a variable for number of guesses remaining and initialize it to the max
var remainingGuesses = allowedGuesses;


// Creates an array that lists out all of the possible words to be guessed.
// start with one word for testing to be added onto later
var words = ["hangman", "extroverted"];

// Choose a Secret Word from the list
function getSecretWord () {
	return words[Math.floor(Math.random() * words.length)]
};

// Populate the word to be guessed from the array of possibilities
var answer = getSecretWord();

// Calculate the number of unique letters in the word to determine number of correct guesses needed to win
function getWinningNumber (str) {
	// create a new array from the string but only when the letter is unique
	var unique = [];
	// the first letter always needs to be counted at least once
	unique.push(str[0]);
	// loop through the rest of the string
	for (i=1; i < str.length; i++) {
		// see if there is a match already in the unique array
		if (unique.indexOf(str[i]) === -1) {
			unique.push(str[i]);	
		}
	}
	return unique.length;
}

// create a variable to be used to see if all the correct letters were found 
var correctLettersNeeded = getWinningNumber(answer);
console.log(correctLettersNeeded);

// Initialize the hiddenWord array with the underscores for the length of the guess word
for (i=0; i < answer.length; i++){
		hiddenWord.push("_");
};

// function to display an array with spaces in between characters instead of commas
function dispArray (arr, style=0) {
	var toDisplay = "";

	// Allow for function to work in multiple case scenarios
	// 0 - default to existing case
	// 1 - convert to upper case for display
	// 2 - convert to lower case for display

	if (style === 1){
		for (i=0; i < arr.length; i++) {
			toDisplay = toDisplay + " " + arr[i].toUpperCase();
		}
	}
	else if (style === 2){
		for (i=0; i < arr.length; i++) {
			toDisplay = toDisplay + " " + arr[i].toLowerCase();
		}	
	}
	// default to existing case 
	else {
		for (i=0; i < arr.length; i++) {
			toDisplay = toDisplay + " " + arr[i];
		}
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
};

// Make the main processing into a function so it can be called for any guess situation!
function checkGuess(letter) {
		
	// check to see if the letter was already guessed or already found
	if (guessLetters.indexOf(letter) === -1 && hiddenWord.indexOf(letter) ){

		// Search the guess word to see if character is found
		if (answer.indexOf(letter) != -1){

			// see if the letter matches any positions in the answer and change those positions 
			correctGuess(hiddenWord, answer, letter);

			// update the page with the new results
			document.querySelector('#hiddenword').innerHTML = dispArray(hiddenWord);

		}
		else {

			// Only populate a guess array with the values input when the letter is not found
			guessLetters.push(letter); 

			// update the display with the incorrectly guessed letters
			document.querySelector('#guesses').innerHTML = dispArray(guessLetters, 1);

			// Calculate the number of remaining guesses allowed as the difference between the max and the wrong guesses
			remainingGuesses = allowedGuesses - guessLetters.length;
	
		}
	
	};

	// update the display with the Number of Remaining Guesses
	document.querySelector('#guessesRemaining').innerHTML = "<p>Guesses Remaining: " +  remainingGuesses + "</p>";

	return remainingGuesses;
}

// This function is run whenever the user presses a key.
document.onkeyup = function(event) {

	// Determines which key was pressed and converts to lowercase for ease of comparison
	var userGuess = event.key.toLowerCase();

	// Only perform this processing while there are guesses allowed!
	if (remainingGuesses > 1) {	

		checkGuess(userGuess);

	}
	// Last Guess! Calls the alert on the loss if the last guess is WRONG!
	else {
		if (checkGuess(userGuess) === 0) {
			alert("Sorry, you lose!");
		}
	}

};



