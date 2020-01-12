// Creates an array that lists out all of the possible words to be guessed.
// start with one word for testing to be added onto later
// var words = ["hangman"];  // used for testing the functionality
var words = ["robert", "marie", "frank", "debra", "raymond", "geoffrey", "michael", "ally", "amy", "shamsky",
"barone", "macdougall", "stefania"];

// --------------------------------------------------------------------------------------
// create a game object
// --------------------------------------------------------------------------------------
var game = {
    answer: "",
    index: 0,
    hiddenWord: [],
    guessLetters: [],
    correctLettersNeeded: 0,
    remainingGuesses: -1,
    lettersFound: 0,
    startNewGame: true,
    inGame: false,
    decision: " ",

    // --------------------------------------------------------------------------------------
    // method to populate the word to be guessed from the array of possibilities
    // --------------------------------------------------------------------------------------
    initializeNewGame: function () {

        // get index of the answer to use for sounds and images arrays
        this.index = Math.floor(Math.random() * words.length);

        // Populate the word to be guessed from the array of possibilities
        // convert to lowercase in case it was entered into the list with any capitals
        this.answer = words[this.index].toLowerCase();

        // populate the variable to be used to see how many letters are in the word 
        this.correctLettersNeeded = getWinningNumber(this.answer);

        // initialize arrays used for guessing
        this.guessLetters = [];
        this.hiddenWord = [];

        // initialize the result message
        this.decision  = "none";

        // initialize the remainingGuesses
        this.remainingGuesses = allowedGuesses;

        // initialize the letters found
        this.lettersFound = 0;

        // Initialize the hiddenWord array with the underscores for the length of the guess word
        for (i=0; i < this.answer.length; i++){
            this.hiddenWord.push("_");
        };

        this.startNewGame = false;  
        
        this.inGame = true;

    },
    // --------------------------------------------------------------------------------------
    // end of initializeNewGame method
    // --------------------------------------------------------------------------------------

    // --------------------------------------------------------------------------------------
    // method to take the letter entered and process against the rules of the game
    // --------------------------------------------------------------------------------------
    checkGuess: function (letter) {

        // check to see if the letter was already guessed or already found
        if (this.guessLetters.indexOf(letter) === -1 && this.hiddenWord.indexOf(letter) === -1 ){

            // Search the guess word to see if character is found
            if (this.answer.indexOf(letter) != -1){

                // match was found - increment the lettersFound variable
                this.lettersFound++;

                // see if the letter matches any positions in the answer and change those positions 
                correctGuess(this.hiddenWord, this.answer, letter);

                // if the number of letters correctly found === correctLettersNeeded (WINNER!!!)
                if (this.correctLettersNeeded === this.lettersFound) {

                    this.decision = "win";

                    // get ready for the next game
                    this.startNewGame = true;
                };

            }
            else {

                // Only populate the guess array with the values input when the letter is not found
                this.guessLetters.push(letter); 

                // Calculate the number of remaining guesses allowed as the difference between the max and the wrong guesses
                this.remainingGuesses = allowedGuesses - this.guessLetters.length;

                // when this wrong guess takes the reamining guesses allowed to 0  (LOSS)
                if (this.remainingGuesses === 0) {
                    
                    this.decision = "loss";
                    
                    // get ready for the next game
                    this.startNewGame = true;
                }
        
            }
        
        }

    },
    // --------------------------------------------------------------------------------------
    // end of checkGuess method
    // --------------------------------------------------------------------------------------

};
// --------------------------------------------------------------------------------------
// end of game object
// --------------------------------------------------------------------------------------

// Global Variables
var scoreSheet = "";

// Keep track of Wins and Loses
var win = 0;
var loss = 0;

//Create a variable for the maximum number of wrong guesses and initialize
var allowedGuesses = 8;

// --------------------------------------------------------------------------------------
// function to change the hiddenword from an underscore to a correctly guessed letter
// --------------------------------------------------------------------------------------
function correctGuess(hidden, guess, letter) {
	// traverse the entire length of the array to find a match and replace with that letter
	for (i=0; i < guess.length; i++) {

		if(guess[i] === letter) {
			hidden[i] = letter;
		}
	
	}

	return hidden;
};
// --------------------------------------------------------------------------------------
// end of correctGuess function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// function to display an array with spaces in between characters instead of commas
// --------------------------------------------------------------------------------------
function dispArray(arr, style=0) {
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
// --------------------------------------------------------------------------------------
// end of dispArray function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// function to calculate the number of unique letters in the word for the number of correct guesses needed to win
// --------------------------------------------------------------------------------------
function getWinningNumber(str) {
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
};
// --------------------------------------------------------------------------------------
// end of getWinningNumber function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// function to u[date the message for the result section  
// --------------------------------------------------------------------------------------
function valueResult(str) {
	if (str === "win") {
		return "<h3>Congratulations.  You Won!!!</h3>";
	} 
	else if (str === "loss") {
		return "<h3>Too bad.  You Lost.</h3>";
	} 
	else if (str === "none") {
		return "<h3>What's your Guess?</h3>";
    }
    else {
        return "";
    };

};
// --------------------------------------------------------------------------------------
// end of valueResult function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// This functionality is run whenever the user presses a key.
// --------------------------------------------------------------------------------------
document.onkeyup = function(event) {

    // check if the spacebar was pressed (unicode 32) so that we can present the hidden word without using a guess
    var x = event.keyCode;
    if (x === 32) {
        
        // Check to see if we need to start a new game     
        if (game.startNewGame) {

            game.initializeNewGame();

            // display the page with the hidden word
            document.querySelector('#hiddenword').innerHTML = dispArray(game.hiddenWord);

            // hide the instructions for starting a new game
            document.getElementById("game").style.display = 'none';

            // display the hidden word
            document.getElementById("hiddenword").style.display = 'block';

        };
    }

    else if (game.inGame) {

        // Determines which key was pressed and converts to lowercase for ease of comparison
        var userGuess = event.key.toLowerCase();
        
        // Only perform this processing while there are guesses allowed!
        if (game.remainingGuesses > 0) {	

            game.checkGuess(userGuess);

            // Determine what to do next
            if (game.decision === "none") {
                // continue playing
                
                // display the page with the hidden word
                document.querySelector('#hiddenword').innerHTML = dispArray(game.hiddenWord);

            } 
            else if (game.decision === "win") {
                // process a win
                win++;
                
                // update the scoresheet
                scoreSheet = "<h3>Wins: " + win + "     Losses: " + loss + "</h3>";

                // display the page with the hidden word
                document.querySelector('#hiddenword').innerHTML = dispArray(game.hiddenWord);

                // show the instructions to start a new game
                document.getElementById("game").style.display = 'block';

                // no longer in a game until the user presses the spacebar again
                game.inGame = false;

            } else if (game.decision === "loss"){
                // process a loss
                loss++;

                // update the scoresheet
                scoreSheet = "<h3>Wins: " + win + " Losses: " + loss + "</h3>";

                // display the page with the answer
                document.querySelector('#hiddenword').innerHTML = dispArray(game.answer.toUpperCase());

                // show the instructions to start a new game
                document.getElementById("game").style.display = 'block';

                // no longer in a game until the user presses the spacebar again
                game.inGame = false;
            }

        };

    };
    
    // update the display with the incorrectly guessed letters
    document.querySelector('#guesses').innerHTML = dispArray(game.guessLetters, 1);

    // update the display with the number of remaining guesses
    // adding logic to only display after game has been started in case user presses something other than spacebar
    if (game.remainingGuesses > -1) {
        document.querySelector('#guessesRemaining').innerHTML = "<p>Guesses Remaining: " +  game.remainingGuesses + "</p>";
    }

    // update the display with the result information
    document.querySelector('#result').innerHTML = valueResult(game.decision);

    // update the display with the scoresheet information
    document.querySelector('#scoresheet').innerHTML = scoreSheet;
    
};


