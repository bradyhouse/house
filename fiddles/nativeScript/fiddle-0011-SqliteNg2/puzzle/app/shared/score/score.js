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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY29yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUE7SUFVRSxlQUFZLEVBQVUsRUFBRSxJQUFZLEVBQUUsSUFBWSxFQUFFLEtBQWEsRUFBRSxLQUFhLEVBQUUsUUFBZ0I7UUFDaEcsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBR0Qsc0JBQUkscUJBQUU7YUFBTjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ2xCLENBQUM7YUFFRCxVQUFPLEtBQWE7WUFDbEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7UUFDbkIsQ0FBQzs7O09BSkE7SUFNRCxzQkFBSSx1QkFBSTthQUFSO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQzthQUVELFVBQVMsS0FBYTtZQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNyQixDQUFDOzs7T0FKQTtJQU1ELHNCQUFJLHVCQUFJO2FBQVI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDO2FBRUQsVUFBUyxLQUFhO1lBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLENBQUM7OztPQUpBO0lBTUQsc0JBQUksd0JBQUs7YUFBVDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JCLENBQUM7YUFFRCxVQUFVLEtBQWE7WUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDdEIsQ0FBQzs7O09BSkE7SUFNRCxzQkFBSSx3QkFBSzthQUFUO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzthQUVELFVBQVUsS0FBYTtZQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FKQTtJQU1ELHNCQUFJLDJCQUFRO2FBQVo7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QixDQUFDO2FBRUQsVUFBYSxLQUFhO1lBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUM7OztPQUpBO0lBTUQsc0JBQUksc0JBQUc7YUFBUDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ25CLENBQUM7YUFFRCxVQUFRLEtBQWE7WUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDcEIsQ0FBQzs7O09BSkE7SUFNRCx3QkFBUSxHQUFSO1FBQ0UsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRztZQUN6QixRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUU7WUFDbEIsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJO1lBQ3RCLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSTtZQUN0QixXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUs7WUFDeEIsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLO1lBQ3hCLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFFLElBQUksQ0FBQztJQUN6QyxDQUFDO0lBRUgsWUFBQztBQUFELENBQUMsQUF2RkQsSUF1RkM7QUF2Rlksc0JBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZGVsSW50ZXJmYWNlfSBmcm9tICcuLi9tb2RlbC5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY2xhc3MgU2NvcmUgaW1wbGVtZW50cyBNb2RlbEludGVyZmFjZSB7XG4gIHByaXZhdGUgX2lkOiBudW1iZXI7XG4gIHByaXZhdGUgX3VzZXI6IHN0cmluZztcbiAgcHJpdmF0ZSBfdGltZTogc3RyaW5nO1xuICBwcml2YXRlIF9tb3ZlczogbnVtYmVyO1xuICBwcml2YXRlIF9sZXZlbDogbnVtYmVyO1xuICBwcml2YXRlIF9jc3NDbGFzczogc3RyaW5nO1xuICBwcml2YXRlIF9yb3c6bnVtYmVyO1xuXG5cbiAgY29uc3RydWN0b3IoaWQ6IG51bWJlciwgdXNlcjogc3RyaW5nLCB0aW1lOiBzdHJpbmcsIG1vdmVzOiBudW1iZXIsIGxldmVsOiBudW1iZXIsIGNzc0NsYXNzOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9pZCA9IGlkO1xuICAgIHRoaXMuX3VzZXIgPSB1c2VyO1xuICAgIHRoaXMuX3RpbWUgPSB0aW1lO1xuICAgIHRoaXMuX21vdmVzID0gbW92ZXM7XG4gICAgdGhpcy5fbGV2ZWwgPSBsZXZlbDtcbiAgICB0aGlzLl9jc3NDbGFzcyA9IGNzc0NsYXNzO1xuICAgIHRoaXMuX3JvdyA9IDE7XG4gIH1cblxuXG4gIGdldCBpZCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9pZDtcbiAgfVxuXG4gIHNldCBpZCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5faWQgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCB1c2VyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3VzZXI7XG4gIH1cblxuICBzZXQgdXNlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fdXNlciA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHRpbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdGltZTtcbiAgfVxuXG4gIHNldCB0aW1lKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl90aW1lID0gdmFsdWU7XG4gIH1cblxuICBnZXQgbW92ZXMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbW92ZXM7XG4gIH1cblxuICBzZXQgbW92ZXModmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX21vdmVzID0gdmFsdWU7XG4gIH1cblxuICBnZXQgbGV2ZWwoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbGV2ZWw7XG4gIH1cblxuICBzZXQgbGV2ZWwodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2xldmVsID0gdmFsdWU7XG4gIH1cblxuICBnZXQgY3NzQ2xhc3MoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY3NzQ2xhc3M7XG4gIH1cblxuICBzZXQgY3NzQ2xhc3ModmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2Nzc0NsYXNzID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcm93KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3JvdztcbiAgfVxuXG4gIHNldCByb3codmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3JvdyA9IHZhbHVlO1xuICB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ3sgcm93OiAnICsgdGhpcy5yb3cgK1xuICAgICAgJywgaWQ6ICcgKyB0aGlzLmlkICtcbiAgICAgICcsIHVzZXI6ICcgKyB0aGlzLnVzZXIgK1xuICAgICAgJywgdGltZTogJyArIHRoaXMudGltZSArXG4gICAgICAnLCBtb3ZlczogJyArIHRoaXMubW92ZXMgK1xuICAgICAgJywgbGV2ZWw6ICcgKyB0aGlzLmxldmVsICtcbiAgICAgICcsIGNzc0NsYXNzOiAnICsgdGhpcy5jc3NDbGFzcyArJyB9JztcbiAgfVxuXG59XG4iXX0=