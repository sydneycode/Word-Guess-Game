// JavaScript for the Hangman Game
console.log("here");

// The word bank we'll be using for this game
var wordBank = ["APPLE", "BANANA", "ORANGE"];

// Representation of Game as an object
// var game = {
//     currentWordIndex: 0,
//     currentWord: "",
//     currentRepresentationOfWord: "",
//     wins: 0,
//     guessesRemaining: 12,
//     lettersGuessed: [],
//     lettersToBeGuessed: []
// };

var currentWordIndex= 0;
var currentWord= "";
var currentRepresentationOfWord= "";
var wins= 0;
var guessesRemaining= 12;
var lettersGuessed= [];
var lettersToBeGuessed= [];

pickANewQuestion();
setUpPageWithNewQuestion(currentWordIndex);

document.onkeyup = function(event) {
    var userKey = event.key.toUpperCase();
    console.log(userKey);

    compareLetterToListOfLetters(userKey);
    guessesRemaining--;
    lettersGuessed.push(userKey);
    
    if (lettersToBeGuessed.length === 0) {
        wins++;
        lettersGuessed = [];
        guessesRemaining = 12;
    }

    if (guessesRemaining <= 0 || lettersToBeGuessed.length === 0) {
        pickANewQuestion();
        setUpPageWithNewQuestion(currentWordIndex);
    }
    else {
        updatePage();
    }

}

function pickANewQuestion() {
    //pick a random number
    //set current word index equal to the random number
    //for now, current word index is 0
    currentWordIndex = 0;

    currentWord = wordBank[currentWordIndex];
    lettersToBeGuessed = convertWordToListOfLetters(currentWord);
    currentRepresentationOfWord = createRepresentationOfWord(currentWord);
}

function setUpPageWithNewQuestion(num) {
    // Set up the a new question on the page
    document.querySelector("#number-of-wins").innerHTML = wins;
    document.querySelector("#word-in-progress").innerHTML = currentRepresentationOfWord;
    document.querySelector("#number-of-guesses-remaining").innerHTML = guessesRemaining;
    document.querySelector("#letters-already-guessed").innerHTML = lettersGuessed;
}

function updatePage() {
    document.querySelector("#number-of-wins").innerHTML = wins;
    document.querySelector("#word-in-progress").innerHTML = currentRepresentationOfWord;
    document.querySelector("#number-of-guesses-remaining").innerHTML = guessesRemaining;
    document.querySelector("#letters-already-guessed").innerHTML = lettersGuessed;
}

function convertWordToListOfLetters(word) {
    var listOfLetters = [];
    for (var i = 0; i < word.length; i++)
    {
        // if the current word is not yet in the list of letters...
        if (listOfLetters.indexOf(word[i]) === -1)
        {
            // add the current letter to the list of letters in the word
            listOfLetters.push(word[i]);
        }
    }
    console.log(listOfLetters);
    return listOfLetters;
}

// var currentWord = "apple";
// var currentRepresentationOfWord = "_____";
// var lettersToBeGuessed = ["a", "p", "l", "e"];
// compareLetterToListOfLetters("a");
// console.log(currentRepresentationOfWord);

// compareLetterToListOfLetters("l");
// console.log(currentRepresentationOfWord);

function compareLetterToListOfLetters(letter) {
    for (var i = 0; i < lettersToBeGuessed.length; i++) {
        // if the current letter is in the list of letters...
        if (letter === lettersToBeGuessed[i])
        {
            // delete the current letter from the list of letters to be guessed
            // (at position i, remove 1 item from the list)
            lettersToBeGuessed.splice(i, 1);
            console.log(lettersToBeGuessed);

            // update current representation of the word
            updatedRepresentationOfWord = "";
            for (var i = 0; i < currentWord.length; i++) {
                if (letter === currentWord[i]) {
                    updatedRepresentationOfWord += letter;
                }
                else {
                    updatedRepresentationOfWord += currentRepresentationOfWord[i];
                }
            }
            currentRepresentationOfWord = updatedRepresentationOfWord;
        }
    }
}

function createRepresentationOfWord(word) {
    var rep = "";
    for (var i = 0; i < word.length; i++) {
        rep += "_";
    }
    return rep;
}