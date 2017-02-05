"use strict";
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/share");
var config_1 = require("../config");
var board_1 = require("./board");
var square_1 = require("./square");
var shared_utils_1 = require("../shared-utils");
var BoardService = (function () {
    function BoardService() {
        var _this = this;
        this.gameBoardChange$ = new Observable_1.Observable(function (observer) { return _this._gameBoardObserver = observer; }).share();
    }
    Object.defineProperty(BoardService.prototype, "gameBoard", {
        get: function () {
            return this._gameBoard;
        },
        set: function (board) {
            if (this._gameBoard !== board) {
                this._gameBoard = board;
                if (this._gameBoardObserver) {
                    this._gameBoardObserver.next(board);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoardService.prototype, "emptySquare", {
        get: function () {
            if (this._gameBoard && this._gameBoard.squares.length) {
                var matches = this._gameBoard.squares.filter(function (square) {
                    return square.cssClass === 'empty';
                });
                if (matches && matches.length) {
                    return matches[0];
                }
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoardService.prototype, "startingSequence", {
        get: function () {
            return this._startingSequence;
        },
        set: function (sequence) {
            if (this._startingSequence !== sequence) {
                this._startingSequence = sequence;
            }
        },
        enumerable: true,
        configurable: true
    });
    BoardService.prototype.initBoard = function (cols, rows, title, level, moves, nextScreen) {
        try {
            var board = new board_1.Board(title, moves, level, nextScreen), range = cols * rows, lastRow = rows - 1, lastCol = cols - 1, col = 0, row = 0, squareCount = range - 1, buttonId = null, buttonCls = null, i = 0, expectedValue = 0, value = 0, square = null;
            this.startingSequence = shared_utils_1.SharedUtils.generateGameSequence(1, squareCount, squareCount);
            for (; row < rows; row++) {
                for (; col < cols; col++) {
                    buttonId = 'b' + (i + 1);
                    buttonCls = buttonId + 'Cls';
                    expectedValue = i + 1;
                    value = this.startingSequence[i];
                    square = new square_1.Square(buttonId, row, col, "" + value, "" + expectedValue, i < squareCount ? value === expectedValue ? 'square correct' : 'square incorrect' : buttonCls);
                    if (i < squareCount) {
                        this.printSquare(i, square);
                        board.squares.push(square);
                        i++;
                    }
                }
                col = 0;
            }
            buttonId = 'b' + range;
            buttonCls = 'empty';
            square = new square_1.Square(buttonId, lastRow, lastCol, '  ', '  ', buttonCls);
            this.printSquare(i++, square);
            board.squares.push(square);
            this.gameBoard = board;
        }
        catch (err) {
            this.handleErrors(err);
        }
    };
    BoardService.prototype.isValidMove = function (squareA, squareB) {
        var rowDelta = Math.abs(squareA.row - squareB.row), colDelta = Math.abs(squareA.col - squareB.col), rc = false;
        this.printSquare(0, squareA);
        this.printSquare(1, squareB);
        if (squareA.row == squareB.row || squareA.col == squareB.col) {
            rc = (rowDelta == 0 || rowDelta == 1) && (colDelta == 0 || colDelta == 1);
        }
        return rc;
    };
    BoardService.prototype.isEmpty = function (square) {
        return square.cssClass === 'empty' ? true : false;
    };
    BoardService.prototype.moveSquare = function (squareA, squareB) {
        var newMoves = this._gameBoard.moves + 1, newGameBoard = new board_1.Board(this._gameBoard.title, newMoves, this._gameBoard.level, this._gameBoard.nextScreen);
        this._gameBoard.squares.map(function (square) {
            if (square.row === squareA.row && square.col === squareA.col) {
                var newSquareA = new square_1.Square(squareA.id, squareA.row, squareA.col, squareB.value, squareA.expectedValue, squareB.cssClass);
                if (newSquareA.cssClass !== 'empty') {
                    if (newSquareA.value === newSquareA.expectedValue) {
                        newSquareA.cssClass = 'square correct';
                    }
                    else {
                        newSquareA.cssClass = 'square incorrect';
                    }
                }
                newGameBoard.squares.push(newSquareA);
            }
            else if (square.row === squareB.row && square.col === squareB.col) {
                var newSquareB = new square_1.Square(squareB.id, squareB.row, squareB.col, squareA.value, squareB.expectedValue, squareA.cssClass);
                if (newSquareB.cssClass !== 'empty') {
                    if (newSquareB.value === newSquareB.expectedValue) {
                        newSquareB.cssClass = 'square correct';
                    }
                    else {
                        newSquareB.cssClass = 'square incorrect';
                    }
                }
                newGameBoard.squares.push(newSquareB);
            }
            else {
                var newSquare = new square_1.Square(square.id, square.row, square.col, square.value, square.expectedValue, square.cssClass);
                newGameBoard.squares.push(newSquare);
            }
        });
        this.gameBoard = newGameBoard;
    };
    BoardService.prototype.isGameOver = function () {
        var moves = this._gameBoard.squares.filter(function (square) {
            return square.value === square.expectedValue;
        });
        return moves && moves.length === this._gameBoard.squares.length ? true : false;
    };
    BoardService.prototype.handleErrors = function (error) {
        if (config_1.Config.isDev) {
            console.log(error);
        }
        return Observable_1.Observable.throw(error);
    };
    BoardService.prototype.printSquare = function (i, square) {
        if (config_1.Config.isDev) {
            console.log('Square' + (i + 1) + ' = { id: ' + square.id + ', row: ' + square.row + ', col: ' + square.col + ', value: ' + square.value + ', ' + square.expectedValue + ', class: ' + square.cssClass + ' }');
        }
    };
    return BoardService;
}());
BoardService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], BoardService);
exports.BoardService = BoardService;
