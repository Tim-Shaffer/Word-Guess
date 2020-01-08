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

// link the answer to the HTML so it is displayed
document.querySelector('#hiddenword').innerHTML = answer;
console.log(answer);
console.log(hiddenWord);
