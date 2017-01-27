"use strict";
var Board = (function () {
    function Board(title, moves, level, nextScreen) {
        this._title = title;
        this._moves = moves;
        this._level = level;
        this._nextScreen = nextScreen;
        this._squares = [];
    }
    Object.defineProperty(Board.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            this._title = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Board.prototype, "moves", {
        get: function () {
            return this._moves;
        },
        set: function (value) {
            this._moves = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Board.prototype, "level", {
        get: function () {
            return this._level;
        },
        set: function (value) {
            this._level = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Board.prototype, "nextScreen", {
        get: function () {
            return this._nextScreen;
        },
        set: function (value) {
            this._nextScreen = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Board.prototype, "squares", {
        get: function () {
            return this._squares;
        },
        set: function (value) {
            this._squares = value;
        },
        enumerable: true,
        configurable: true
    });
    Board.prototype.toString = function () {
        return '{ title: ' + this.title + ', moves: ' + this.moves + ', level: ' +
            this.level + ', nextScreen: ' + this.nextScreen + ' }';
    };
    return Board;
}());
exports.Board = Board;
