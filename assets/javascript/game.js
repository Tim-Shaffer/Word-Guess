// Creates an array that lists out all of the possible words to be guessed.
// start with one word for testing to be added onto later
var answer = ["hangman"];

// Choose a Secret Word from the list
function getSecretWord () {
	return answer[Math.floor(Math.random() * answer.length)]
};

// Populate the word to be guessed from the array of possibilities
var guessWord = getSecretWord();
console.log(guessWord);