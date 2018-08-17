// JavaScript for the Hangman Game

// The word bank we'll be using for this game
var wordBank = ["APPLE", "BANANA", "ORANGE"];

//Representation of Game as an object
var game = {
    wordIndex: 0,
    word: "",
    repOfWord: "",
    wins: 0,
    guessesRemaining: 12,
    lettersGuessed: [],
    lettersToBeGuessed: []
};

// Initialize the page with the first word to be guessed
setUpPageWithNewWord();
updatePage();

document.onkeyup = function (event) {
    var userKey = event.key.toUpperCase();

    // Detect if the user pressed a key not representing a letter
    if (event.keyCode < 65 || event.keyCode > 90) {
        alert("Please press a letter key to play!");
    }
    else {
        // If the user pressed a key not already in the list of letters guessed, 
        // then proceed with comparing the key pressed to the list of letters to 
        // be guessed and updating the page as necessary
        if (!isLetterInListOfLetters(userKey)) {
            compareLetterToListOfLetters(userKey);
            game.guessesRemaining--;
            game.lettersGuessed.push(userKey);

            // If there are no more letters to be guessed, then you have
            // won the game for this word!
            if (game.lettersToBeGuessed.length === 0) {
                game.wins++;
                game.lettersGuessed = [];
                game.guessesRemaining = 12;
                setUpPageWithNewWord();
            }
            else if (game.guessesRemaining === 0) {
                // pick a new question, but don't increment the number of wins
                game.lettersGuessed = [];
                game.guessesRemaining = 12;
                setUpPageWithNewWord();
            }
            updatePage();
        }
    }
}

function setUpPageWithNewWord() {
    // Randomly select the index of the new word 
    game.wordIndex = Math.floor(Math.random() * wordBank.length);

    game.word = wordBank[game.wordIndex];
    convertWordToListOfLetters();
    createRepresentationOfWord();
}

// Update the page with the correct information
function updatePage() {
    document.querySelector("#number-of-wins").innerHTML = game.wins;
    document.querySelector("#word-in-progress").innerHTML = game.repOfWord;
    document.querySelector("#number-of-guesses-remaining").innerHTML = game.guessesRemaining;
    document.querySelector("#letters-already-guessed").innerHTML = game.lettersGuessed;
}

function convertWordToListOfLetters() {
    var listOfLetters = [];
    for (var i = 0; i < game.word.length; i++) {
        // if the current word is not yet in the list of letters...
        if (listOfLetters.indexOf(game.word[i]) === -1) {
            // add the current letter to the list of letters in the word
            listOfLetters.push(game.word[i]);
        }
    }
    game.lettersToBeGuessed = listOfLetters;
}

function isLetterInListOfLetters(letter) {
    for (var i = 0; i < game.lettersGuessed.length; i++) {
        if (letter === game.lettersGuessed[i]) {
            return true;
        }
    }
}

function compareLetterToListOfLetters(letter) {
    for (var i = 0; i < game.lettersToBeGuessed.length; i++) {
        // if the current letter is in the list of letters...
        if (letter === game.lettersToBeGuessed[i]) {
            // delete the current letter from the list of letters to be guessed
            // (at position i, remove 1 item from the list)
            game.lettersToBeGuessed.splice(i, 1);

            // update current representation of the word
            updateRepresentationOfWord(letter);
        }
    }
}

// Create a representation of the current word to display,
// where each letter is replaced with an underscore, i.e.
// "APPLE" is represented by "_____"
function createRepresentationOfWord() {
    var rep = "";
    for (var i = 0; i < game.word.length; i++) {
        rep += "_";
    }
    game.repOfWord = rep;
}

// Go through the current representation of the current word
// and, for each character in the current word that matches the 
// given letter, replace each underscore with the given letter
function updateRepresentationOfWord(letter) {
    var updatedRepOfWord = "";
    for (var i = 0; i < game.word.length; i++) {
        if (letter === game.word.charAt(i)) {
            updatedRepOfWord += letter;
        }
        else {
            updatedRepOfWord += game.repOfWord[i];
        }
    }
    game.repOfWord = updatedRepOfWord;
}