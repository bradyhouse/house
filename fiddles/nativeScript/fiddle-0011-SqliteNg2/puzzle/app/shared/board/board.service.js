"use strict";
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/share");
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
            return this._emptySquare;
        },
        set: function (square) {
            if (this._emptySquare !== square) {
                this._emptySquare = square;
            }
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
    BoardService.prototype.initBoard = function (cols, rows) {
        var board = new board_1.Board(), range = cols * rows, lastRow = rows - 1, lastCol = cols - 1, col = 0, row = 0, squareCount = range - 1, buttonId = null, buttonCls = null, i = 0, expectedValue = 0, value = 0, square = null;
        try {
            this.startingSequence = shared_utils_1.SharedUtils.generateGameSequence(1, squareCount, squareCount);
            for (; row < rows; row++) {
                for (; col < cols; col++) {
                    buttonId = 'b' + (i + 1);
                    buttonCls = buttonId + 'Cls';
                    expectedValue = i + 1;
                    value = this.startingSequence[i];
                    square = new square_1.Square();
                    square.id = buttonId;
                    square.row = row;
                    square.col = col;
                    square.value = "" + value;
                    square.expectedValue = "" + expectedValue;
                    square.class = i < squareCount ? value === expectedValue ? 'correct' : 'incorrect' : buttonCls;
                    if (i < squareCount) {
                        this.printSquare(i, square);
                        board.squares.push(square);
                        i++;
                    }
                }
                col = 0;
            }
            buttonId = 'b' + range;
            buttonCls = buttonId + 'Cls';
            square = new square_1.Square();
            square.id = buttonId;
            square.row = lastRow;
            square.col = lastCol;
            square.value = '  ';
            square.expectedValue = '  ';
            square.class = buttonCls;
            this.printSquare(i++, square);
            board.squares.push(square);
            this.gameBoard = board;
        }
        catch (err) {
            this.handleErrors(err);
        }
    };
    BoardService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return Observable_1.Observable.throw(error);
    };
    BoardService.prototype.printSquare = function (i, square) {
        console.log('Square' + (i + 1) + ' = { id: ' + square.id + ', row: ' + square.row + ', col: ' + square.col + ', value: ' + square.value + ', ' + square.expectedValue + ', class: ' + square.class + ' }');
    };
    return BoardService;
}());
BoardService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], BoardService);
exports.BoardService = BoardService;
//# sourceMappingURL=board.service.js.map