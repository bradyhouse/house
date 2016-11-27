var dbConnect = require("./db.service").open,
  dbSelectMin = require("./db.service").selectMin,
  dbUpdateLevel = require("./db.service").updateLevel,
  Observable = require("data/observable").Observable,
  util = require('./util'),
  startingSequence = [],
  gameboard = [],
  viewModel = null,
  emptyValue = '  ',
  startTime = null,
  endTime = null,
  elapsedTime = null;

function printSquare(i, square) {
  //console.log('Square' + (i + 1) + ' = { id: ' + square.id + ', row: ' + square.row + ', col: ' + square.col + ', value: ' + square.value + ', ' + square.expectedValue + ', class: ' + square.class + ' }');
}

function createViewModel(cols, rows, suffix) {
  var range = cols * rows,
    lastRow = rows - 1,
    lastCol = cols - 1,
    col = 0,
    row = 0,
    squareCount = range - 1,
    buttonId = null,
    buttonCls = null,
    i = 0,
    expectedValue = 0,
    value = 0,
    square = {};

  gameboard = [];
  viewModel = new Observable();
  startingSequence = util.generateGameSequence(1, squareCount, squareCount),
  square = {};


  for (; row < rows; row++) {
    for (; col < cols; col++) {
      buttonId = 'b' + (i + 1);
      buttonCls = buttonId + 'Cls';
      expectedValue = i + 1;
      value = startingSequence[i];
      square = {
        id: buttonId,
        row: row,
        col: col,
        value: value,
        expectedValue: expectedValue,
        class: buttonCls
      };
      if (i < squareCount) {
        printSquare(i, square);
        gameboard.push(square);
        viewModel.set(buttonId, startingSequence[i]);
        if (value === expectedValue) {
          viewModel.set(buttonCls, 'correct');
        } else {
          viewModel.set(buttonCls, 'incorrect');
        }
        i++;
      }

    }
    col = 0;
  }

  buttonId = 'b' + range;
  buttonCls = buttonId + 'Cls';
  square = {
    id: buttonId,
    row: lastRow,
    col: lastCol,
    value: '  ',
    expectedValue: '  ',
    class: buttonCls
  };
  viewModel.set(buttonCls, 'correct');
  printSquare(i++, square);
  gameboard.push(square);
  viewModel.set(buttonId, '  ');
  viewModel.set('moves', 'Moves:   ' + 0);

  return viewModel;
}

function onCompleteLevel(level, fn, scope) {
  if (level < 3) {
    var newLevel = level+1;
    dbConnect(function(db){
      dbUpdateLevel(db, newLevel, fn, scope);
    }, scope);
  } else {
    util.callBack([level], fn, scope);
  }
}

function updateColors(pageContext) {

  for(var i = 0; i < gameboard.length; i++) {
    var square = gameboard[i];
    if (square.value === emptyValue) {
      pageContext.set(square.class, 'empty');
    } else {
      if (square.value === square.expectedValue) {
        pageContext.set(square.class, 'correct');
      } else {
        pageContext.set(square.class, 'incorrect');
      }
    }

  }
}

function emptySquare() {
  return gameboard.filter(function (square) {
    return square.value === '  ';
  }).pop();
}

function isValidMove(squareA, squareB) {
  var rowDelta = Math.abs(squareA.row - squareB.row),
    colDelta = Math.abs(squareA.col - squareB.col),
    rc = false;
  printSquare('A', squareA);
  printSquare('B', squareB);
  if (squareA.row == squareB.row || squareA.col == squareB.col) {
    rc = (rowDelta == 0 || rowDelta == 1) && (colDelta == 0 || colDelta == 1);
  }
  return rc;
}

function isEmpty(square) {
  return square.value === emptyValue ? true : false;
}

function updateGameBoard(id, value) {
  var newGameBoard = gameboard.filter(function (square) {
      return square.id !== id;
    }),
    updatedSquares = gameboard.filter(function (square) {
      return square.id == id;
    }),
    updatedSquare = updatedSquares && updatedSquares.length ? updatedSquares[0] : null;
  if (newGameBoard && newGameBoard.length && updatedSquare) {
    newGameBoard.push({
      id: updatedSquare.id,
      row: updatedSquare.row,
      col: updatedSquare.col,
      expectedValue: updatedSquare.expectedValue,
      value: value,
      class: updatedSquare.class
    });
    gameboard = newGameBoard;
  }

}

function updateViewModel(id, value, pageContext) {
  pageContext.set(id, value);
}

function isCorrect(square) {
  return square.expectedValue === square.value ? true : false;
}

function isGameSolved() {
  var moves = gameboard.filter(function (square) {
    return isCorrect(square);
  });
  return moves && moves.length === gameboard.length ? true : false;
}

function onIsHighScore(moves, level) {
  var scope = {
    moves: moves,
    level: level
  },
  rc = true;
  dbConnect(function(db) {
    dbSelectMin(db, scope.level, function(data) {
      var minHighScore = data && data.hasOwnProperty("moves") ? data.moves : 0;
      if (minHighScore > 0) {
        if (minHighScore < scope.moves) {
          rc=true;
        } else {
          rc=false;
        }
      } else {
        rc=true;
      }
    }, scope);
  }, scope);
  return rc;
}

function startClock() {
  var date = new Date();
  startTime = date.getTime();
}

function stopClock() {
  var date = new Date();
  endTime = date.getTime();
  if (!startTime) {
    startClock();
  }
  elapsedTime = endTime - startTime;
}

function getElapsedTime() {
  if(!endTime) {
    stopClock();
  }
  return elapsedTime;
}


exports.createViewModel = createViewModel;
exports.completeLevel = onCompleteLevel;
exports.emptySquare = emptySquare;
exports.isValidMove = isValidMove;
exports.isEmpty = isEmpty;
exports.updateViewModel = updateViewModel;
exports.updateGameBoard = updateGameBoard;
exports.updateColors = updateColors;
exports.isGameSolved = isGameSolved;
exports.startClock = startClock;
exports.stopClock = stopClock;
exports.getElapsedTime = getElapsedTime;
exports.isHighScore = onIsHighScore;