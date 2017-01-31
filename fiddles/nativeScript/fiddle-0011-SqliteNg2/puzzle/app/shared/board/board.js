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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9hcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJib2FyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBS0E7SUFnREksZUFBWSxLQUFhLEVBQUUsS0FBYSxFQUFFLEtBQWEsRUFBRSxVQUFrQjtRQUN2RSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBOUNELHNCQUFJLHdCQUFLO2FBQVQ7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO2FBRUQsVUFBVSxLQUFhO1lBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUM7OztPQUpBO0lBTUQsc0JBQUksd0JBQUs7YUFBVDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7YUFFRCxVQUFVLEtBQWE7WUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQzs7O09BSkE7SUFNRCxzQkFBSSx3QkFBSzthQUFUO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzthQUVELFVBQVUsS0FBYTtZQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDOzs7T0FKQTtJQU1ELHNCQUFJLDZCQUFVO2FBQWQ7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDO2FBRUQsVUFBZSxLQUFhO1lBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQzdCLENBQUM7OztPQUpBO0lBTUQsc0JBQUksMEJBQU87YUFBWDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7YUFFRCxVQUFZLEtBQWU7WUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDMUIsQ0FBQzs7O09BSkE7SUFjRCx3QkFBUSxHQUFSO1FBQ0UsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVc7WUFDdEUsSUFBSSxDQUFDLEtBQUssR0FBRyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUMzRCxDQUFDO0lBRUwsWUFBQztBQUFELENBQUMsQUE3REQsSUE2REM7QUE3RFksc0JBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IFNxdWFyZSB9IGZyb20gJy4vc3F1YXJlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsSW50ZXJmYWNlIH0gZnJvbSAnLi4vbW9kZWwuaW50ZXJmYWNlJztcblxuZXhwb3J0IGNsYXNzIEJvYXJkIGltcGxlbWVudHMgTW9kZWxJbnRlcmZhY2Uge1xuICAgIHByaXZhdGUgX3RpdGxlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfbW92ZXM6IG51bWJlcjtcbiAgICBwcml2YXRlIF9sZXZlbDogbnVtYmVyO1xuICAgIHByaXZhdGUgX25leHRTY3JlZW46IHN0cmluZztcbiAgICBwcml2YXRlIF9zcXVhcmVzOiBTcXVhcmVbXTtcblxuXG4gICAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aXRsZTtcbiAgICB9XG5cbiAgICBzZXQgdGl0bGUodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl90aXRsZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBtb3ZlcygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbW92ZXM7XG4gICAgfVxuXG4gICAgc2V0IG1vdmVzKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fbW92ZXMgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgbGV2ZWwoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xldmVsO1xuICAgIH1cblxuICAgIHNldCBsZXZlbCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2xldmVsID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IG5leHRTY3JlZW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25leHRTY3JlZW47XG4gICAgfVxuXG4gICAgc2V0IG5leHRTY3JlZW4odmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9uZXh0U2NyZWVuID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHNxdWFyZXMoKTogU3F1YXJlW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3F1YXJlcztcbiAgICB9XG5cbiAgICBzZXQgc3F1YXJlcyh2YWx1ZTogU3F1YXJlW10pIHtcbiAgICAgICAgdGhpcy5fc3F1YXJlcyA9IHZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHRpdGxlOiBzdHJpbmcsIG1vdmVzOiBudW1iZXIsIGxldmVsOiBudW1iZXIsIG5leHRTY3JlZW46IHN0cmluZykge1xuICAgICAgICB0aGlzLl90aXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLl9tb3ZlcyA9IG1vdmVzO1xuICAgICAgICB0aGlzLl9sZXZlbCA9IGxldmVsO1xuICAgICAgICB0aGlzLl9uZXh0U2NyZWVuID0gbmV4dFNjcmVlbjtcbiAgICAgICAgdGhpcy5fc3F1YXJlcyA9IFtdO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCk6c3RyaW5nIHtcbiAgICAgIHJldHVybiAneyB0aXRsZTogJyArIHRoaXMudGl0bGUgKyAnLCBtb3ZlczogJyArIHRoaXMubW92ZXMgKyAnLCBsZXZlbDogJyArXG4gICAgICAgIHRoaXMubGV2ZWwgKyAnLCBuZXh0U2NyZWVuOiAnICsgdGhpcy5uZXh0U2NyZWVuICsgJyB9JztcbiAgICB9XG5cbn1cbiJdfQ==