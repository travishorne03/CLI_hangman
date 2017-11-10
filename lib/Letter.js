//Constructor for user guesses and return the string to be displayed
function Letter(char) {

  this.visible = !/[a-z1-5]/i.test(char);

  this.char = char;
}

// Prototypes for game

Letter.prototype.toString = function() {
  if (this.visible === true) {
    return this.char;
  }
  return "_";
};

Letter.prototype.getSolution = function() {
  return this.char;
};

// guesses
Letter.prototype.guess = function(charGuess) {
  if (charGuess.toUpperCase() === this.char.toUpperCase()) {
    this.visible = true;
    return true;
  }


  return false;
};

module.exports = Letter;
