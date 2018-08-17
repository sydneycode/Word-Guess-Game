// JavaScript for the Hangman Game
console.log("here");

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

var wordIndex = 0;
var word = "";
var repOfWord = "";
var wins = 0;
var guessesRemaining = 12;
var lettersGuessed = [];
var lettersToBeGuessed = [];
var gameOver = false;

// Initialize the page with the first word to be guessed
setUpPageWithNewWord();
updatePage();

document.onkeyup = function (event) {
    var userKey = event.key.toUpperCase();
    console.log(userKey);

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
            guessesRemaining--;
            lettersGuessed.push(userKey);

            // If there are no more letters to be guessed, then you have
            // won the game for this word!
            if (lettersToBeGuessed.length === 0) {
                wins++;
                lettersGuessed = [];
                guessesRemaining = 12;
                setUpPageWithNewWord();
            }
            else if (guessesRemaining === 0) {
                // pick a new question, but don't increment the number of wins
                lettersGuessed = [];
                guessesRemaining = 12;
                setUpPageWithNewWord();
            }
            updatePage();

        }
    }
}

function setUpPageWithNewWord() {
    // Randomly select the index of the new word 
    wordIndex = Math.floor(Math.random() * wordBank.length);
    console.log(wordIndex);

    word = wordBank[wordIndex];
    convertWordToListOfLetters();
    createRepresentationOfWord();
    console.log(word);
}

// Update the page with the correct information
function updatePage() {
    document.querySelector("#number-of-wins").innerHTML = wins;
    document.querySelector("#word-in-progress").innerHTML = repOfWord;
    document.querySelector("#number-of-guesses-remaining").innerHTML = guessesRemaining;
    document.querySelector("#letters-already-guessed").innerHTML = lettersGuessed;
}

function convertWordToListOfLetters() {
    var listOfLetters = [];
    for (var i = 0; i < word.length; i++) {
        // if the current word is not yet in the list of letters...
        if (listOfLetters.indexOf(word[i]) === -1) {
            // add the current letter to the list of letters in the word
            listOfLetters.push(word[i]);
        }
    }
    lettersToBeGuessed = listOfLetters;
    console.log(lettersToBeGuessed);
}

function isLetterInListOfLetters(letter) {
    for (var i = 0; i < lettersGuessed.length; i++) {
        if (letter === lettersGuessed[i]) {
            return true;
        }
    }
}

function compareLetterToListOfLetters(letter) {
    for (var i = 0; i < lettersToBeGuessed.length; i++) {
        // if the current letter is in the list of letters...
        if (letter === lettersToBeGuessed[i]) {
            // delete the current letter from the list of letters to be guessed
            // (at position i, remove 1 item from the list)
            lettersToBeGuessed.splice(i, 1);
            console.log(lettersToBeGuessed);

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
    for (var i = 0; i < word.length; i++) {
        rep += "_";
    }
    repOfWord = rep;
    console.log(repOfWord);
}

// Go through the current representation of the current word
// and, for each character in the current word that matches the 
// given letter, replace each underscore with the given letter
function updateRepresentationOfWord(letter) {
    var updatedRepOfWord = "";
    for (var i = 0; i < word.length; i++) {
        if (letter === word.charAt(i)) {
            updatedRepOfWord += letter;
        }
        else {
            updatedRepOfWord += repOfWord[i];
        }
    }
    repOfWord = updatedRepOfWord;
    console.log(repOfWord);
}