// Require the Observable class and create a new Model from it
var Observable = require("data/observable").Observable,
    mainViewModel = new Observable(),
    frame = require('ui/frame'),
    Button = require("ui/button").Button;

// Setup our default values
mainViewModel.counter = 5;
mainViewModel.set("message", mainViewModel.counter + " taps left");

// Setup the function that runs when a tap is detected.
mainViewModel.tapAction = function() {
  frame.topmost().navigate('settings');
  this.counter--;
  if (this.counter <= 0) {
    this.set("message", "Hoorraaay! You unlocked the NativeScript clicker achievement!");
  } else {
    this.set("message", this.counter + " taps left");
  }
};

// Export our already instantiated model class as the variable name that the main-page.js is expecting on line 4.
exports.mainViewModel = mainViewModel;
