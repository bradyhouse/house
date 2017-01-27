"use strict";
var State = (function () {
    function State(id, key, value) {
        this._id = id;
        this._key = key;
        this._value = value;
    }
    Object.defineProperty(State.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "key", {
        get: function () {
            return this._key;
        },
        set: function (value) {
            this._key = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    State.prototype.toString = function () {
        return '{ id: ' + this.id + ', key: ' + this.key + ', value: ' + this.value + ' }';
    };
    return State;
}());
exports.State = State;
