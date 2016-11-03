var createViewModel = require("../../shared/main-view-model").createViewModel,
  emptySquare = require("../../shared/main-view-model").emptySquare,
  isValidMove = require("../../shared/main-view-model").isValidMove,
  isEmpty = require("../../shared/main-view-model").isEmpty,
  isGameSolved = require("../../shared/main-view-model").isGameSolved,
  updateViewModel = require("../../shared/main-view-model").updateViewModel,
  updateGameBoard = require("../../shared/main-view-model").updateGameBoard,
  updateButtonColors = require("../../shared/main-view-model").updateColors,
  frame = require('ui/frame'),
  Dialogs = require('ui/dialogs'),
  page = null,
  moves = 0;


function onPageLoaded(args) {
  page = args.object;
  page.bindingContext = createViewModel(3, 3);
  updateButtonColors(page.bindingContext);
}

function onSquareClick(args) {
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
      Dialogs.alert({ title: 'W i n n e r', message: 'You solved the puzzle in ' + moves + ' moves!'}).then(function() {
        page.bindingContext = createViewModel(3, 3);
        moves = 0;
      });
    }
  }

}

function onResetClick(args) {
  btn = args.object;
  page.bindingContext = createViewModel(3, 3);
  moves = 0;
}


exports.squareTap = onSquareClick;
exports.resetTap = onResetClick;
exports.pageLoaded = onPageLoaded;
