//Add Constructors

var inquirer = require('inquirer');
var chalk = require('chalk');
var Word = require('./Word');
var workkouts = require('./workkouts');


//Game Methods
function Game(){
  var move = this;


//Play Function for # of Guesses and Random Words

this.play = function() {
  this.choicesLeft = 6;
  this.nextWord();
};




//Chosing Random Words

this.nextWord =  function() {
  var randWord = workkouts[Math.floor(Math.random() * workkouts.length)];
  this.currentWord = new Word(randWord);
  console.log('\n' + this.currentWord + '\n');
  this.yourGuess();
};



//Reaction after each guess is made (correct or incorrect)
this.yourGuess = function() {
    this.nextLetter().then(function() {

//After there are no more guesses left
  if(move.choicesLeft < 1) {
    console.log("You Ran Out Of Guesses... The Word was \"" + move.currentWord.getSolution() + "\"\n");

  move.doYouWantToPlayAgain();
}
else if (move.currentWord.guessedCorrectly()) {
  console.log("Correct!");
  move.choicesLeft = 6;
  move.nextWord();
}
else {
  move.guess();
    }
  });
};

//fucntion for next game

this.doYouWantToPlayAgain = function() {
  inquirer.prompt([
    {
      type: "continue",
      name: "pick",
      message: "Start Over?"
    }
  ])
  .then(function(val) {
    if (val.choice) {
      move.play();
    }
    else {
      move.quit();
    }
  });
};

//Fucntion to ask for a letter using inquirer
this.guessNextLetter = function() {
  return inquirer.prompt([
    {
      type: "input",
      name: "choice",
      message: "Guess the next letter",
      validate: function(val) {
        return /[a-z1-5]/gi.test(val);
      }
    }
])
  .then(function(val) {
    var guessCorrect = move.currentWord.guessLetter(val.choice);
    if (guessCorrect) {
      console.log(chalk.blue("\nGood Job!\n"));
    }
    else {
      move.choicesLeft --;
      console.log(chalk.red("\nOops Incorrect\n"));
      console.log(move.choicesLeft + " Guesses Remaining\n");
    }
  });
};

//Quit  or Restart (afer 10 incorrect letter guesses)
this.quit = function() {
  console.log("\nPlay again soon...!");
  process.exit(0)
  };
}


module.exports = Game;
