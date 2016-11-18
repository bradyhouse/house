var application = require("application"),
  createViewModel = require("../../shared/main-view-model").createViewModel,
  completeLevel = require("../../shared/main-view-model").completeLevel,
  emptySquare = require("../../shared/main-view-model").emptySquare,
  isValidMove = require("../../shared/main-view-model").isValidMove,
  isEmpty = require("../../shared/main-view-model").isEmpty,
  isGameSolved = require("../../shared/main-view-model").isGameSolved,
  updateViewModel = require("../../shared/main-view-model").updateViewModel,
  updateGameBoard = require("../../shared/main-view-model").updateGameBoard,
  updateButtonColors = require("../../shared/main-view-model").updateColors,
  startClock = require("../../shared/main-view-model").startClock,
  stopClock = require("../../shared/main-view-model").stopClock,
  getElapsedTime = require("../../shared/main-view-model").getElapsedTime,
  isHighScore = require("../../shared/main-view-model").isHighScore,
  frame = require('ui/frame'),
  Dialogs = require('ui/dialogs'),
  page = null,
  moves = 0,
  level = 1,
  nextScreen = "/view/level-two/level-two";


function onPageLoaded(args) {
  page = args.object;
  page.bindingContext = createViewModel(3, 3);
  page.bindingContext.set("title", application.title + " - Level 1");
  updateButtonColors(page.bindingContext);
  startClock();
}

function onLowScore() {
  completeLevel(level, function(level) {
    Dialogs.alert({ title: 'W i n n e r', message: 'You solved the puzzle in ' + moves + ' moves!'}).then(function() {
      frame.topmost().navigate(nextScreen);
    });
  }, frame);
}

function onHighScore() {
  var myContext = {
    moves: moves,
      level: level,
      callingModuleName: nextScreen
  };
  completeLevel(level, function(level) {
    frame.topmost().navigate({
      moduleName: "view/high-score/add-high-score/add-high-score",
      context: myContext,
      animated: false
    });
  }, frame);
}

function onSquareTap(args) {

  var btn = args.object,
      idPieces = btn.id.split('-'),
      btnName = idPieces[0],
      btnRow = idPieces[1],
      btnCol = idPieces[2],
      squareB = emptySquare(),
      btnCls = btnName + 'Cls',
      squareA = {
        id: btnName,
        value: btn.text,
        row: btnRow,
        col: btnCol,
        class: btnCls
      };

  if (!isEmpty(squareA) && isValidMove(squareA, squareB)) {
    updateViewModel(squareA.id, squareB.value, page.bindingContext);
    updateGameBoard(squareA.id, squareB.value);
    updateViewModel(squareB.id, squareA.value, page.bindingContext);
    updateGameBoard(squareB.id, squareA.value);
    updateButtonColors(page.bindingContext);
    moves++;
    updateViewModel('moves', 'Moves: ' + moves, page.bindingContext);
    if(isGameSolved()) {
      stopClock();
      if (isHighScore(moves, level)) {
        onHighScore();
      } else {
        onLowScore();
      }
    }
  }

}

function onResetTap(args) {
  btn = args.object;
  page.bindingContext = createViewModel(3, 3);
  page.bindingContext.set("title", application.title + " - Level 1");
  updateButtonColors(page.bindingContext);
  startClock();
  moves = 0;
}


exports.squareTap = onSquareTap;
exports.resetTap = onResetTap;
exports.pageLoaded = onPageLoaded;
