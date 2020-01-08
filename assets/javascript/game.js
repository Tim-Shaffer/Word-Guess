// Creates an array that lists out all of the possible words to be guessed.
var wordsArray = ["hangman"];

// Choose a Secret Word from the list
function getSecretWord () {
	return wordsArray[Math.floor(Math.random() * wordsArray.length)]
};

console.log(getSecretWord());