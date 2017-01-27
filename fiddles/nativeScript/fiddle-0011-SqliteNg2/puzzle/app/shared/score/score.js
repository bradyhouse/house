"use strict";
var Score = (function () {
    function Score(id, user, time, moves, level, cssClass) {
        this._id = id;
        this._user = user;
        this._time = time;
        this._moves = moves;
        this._level = level;
        this._cssClass = cssClass;
        this._row = 1;
    }
    Object.defineProperty(Score.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Score.prototype, "user", {
        get: function () {
            return this._user;
        },
        set: function (value) {
            this._user = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Score.prototype, "time", {
        get: function () {
            return this._time;
        },
        set: function (value) {
            this._time = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Score.prototype, "moves", {
        get: function () {
            return this._moves;
        },
        set: function (value) {
            this._moves = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Score.prototype, "level", {
        get: function () {
            return this._level;
        },
        set: function (value) {
            this._level = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Score.prototype, "cssClass", {
        get: function () {
            return this._cssClass;
        },
        set: function (value) {
            this._cssClass = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Score.prototype, "row", {
        get: function () {
            return this._row;
        },
        set: function (value) {
            this._row = value;
        },
        enumerable: true,
        configurable: true
    });
    Score.prototype.toString = function () {
        return '{ row: ' + this.row +
            ', id: ' + this.id +
            ', user: ' + this.user +
            ', time: ' + this.time +
            ', moves: ' + this.moves +
            ', level: ' + this.level +
            ', cssClass: ' + this.cssClass + ' }';
    };
    return Score;
}());
exports.Score = Score;
