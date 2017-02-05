"use strict";
var Square = (function () {
    function Square(id, row, col, value, expectedValue, cssClass) {
        this._id = id;
        this._row = row;
        this._col = col;
        this._value = value;
        this._expectedValue = expectedValue;
        this._cssClass = cssClass;
    }
    Object.defineProperty(Square.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Square.prototype, "row", {
        get: function () {
            return this._row;
        },
        set: function (value) {
            this._row = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Square.prototype, "col", {
        get: function () {
            return this._col;
        },
        set: function (value) {
            this._col = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Square.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Square.prototype, "expectedValue", {
        get: function () {
            return this._expectedValue;
        },
        set: function (value) {
            this._expectedValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Square.prototype, "cssClass", {
        get: function () {
            return this._cssClass;
        },
        set: function (value) {
            this._cssClass = value;
        },
        enumerable: true,
        configurable: true
    });
    return Square;
}());
exports.Square = Square;
