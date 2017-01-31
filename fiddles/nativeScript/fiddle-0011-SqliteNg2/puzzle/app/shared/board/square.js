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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3F1YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3F1YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtJQXlERSxnQkFBWSxFQUFVLEVBQUUsR0FBVyxFQUFFLEdBQVcsRUFBRSxLQUFhLEVBQUUsYUFBcUIsRUFBRSxRQUFnQjtRQUN0RyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0lBQzVCLENBQUM7SUF2REQsc0JBQUksc0JBQUU7YUFBTjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ2xCLENBQUM7YUFFRCxVQUFPLEtBQWE7WUFDbEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7UUFDbkIsQ0FBQzs7O09BSkE7SUFNRCxzQkFBSSx1QkFBRzthQUFQO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkIsQ0FBQzthQUVELFVBQVEsS0FBYTtZQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNwQixDQUFDOzs7T0FKQTtJQU1ELHNCQUFJLHVCQUFHO2FBQVA7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNuQixDQUFDO2FBRUQsVUFBUSxLQUFhO1lBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLENBQUM7OztPQUpBO0lBTUQsc0JBQUkseUJBQUs7YUFBVDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JCLENBQUM7YUFFRCxVQUFVLEtBQWE7WUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDdEIsQ0FBQzs7O09BSkE7SUFNRCxzQkFBSSxpQ0FBYTthQUFqQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzdCLENBQUM7YUFFRCxVQUFrQixLQUFhO1lBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzlCLENBQUM7OztPQUpBO0lBTUQsc0JBQUksNEJBQVE7YUFBWjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLENBQUM7YUFFRCxVQUFhLEtBQWE7WUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDekIsQ0FBQzs7O09BSkE7SUFjSCxhQUFDO0FBQUQsQ0FBQyxBQWpFRCxJQWlFQztBQWpFWSx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBTcXVhcmUge1xuICBwcml2YXRlIF9pZDogc3RyaW5nO1xuICBwcml2YXRlIF9yb3c6IG51bWJlcjtcbiAgcHJpdmF0ZSBfY29sOiBudW1iZXI7XG4gIHByaXZhdGUgX3ZhbHVlOiBzdHJpbmc7XG4gIHByaXZhdGUgX2V4cGVjdGVkVmFsdWU6IHN0cmluZztcbiAgcHJpdmF0ZSBfY3NzQ2xhc3M6IHN0cmluZztcblxuXG4gIGdldCBpZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9pZDtcbiAgfVxuXG4gIHNldCBpZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5faWQgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCByb3coKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcm93O1xuICB9XG5cbiAgc2V0IHJvdyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fcm93ID0gdmFsdWU7XG4gIH1cblxuICBnZXQgY29sKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbDtcbiAgfVxuXG4gIHNldCBjb2wodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2NvbCA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IGV4cGVjdGVkVmFsdWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZXhwZWN0ZWRWYWx1ZTtcbiAgfVxuXG4gIHNldCBleHBlY3RlZFZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9leHBlY3RlZFZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBnZXQgY3NzQ2xhc3MoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY3NzQ2xhc3M7XG4gIH1cblxuICBzZXQgY3NzQ2xhc3ModmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2Nzc0NsYXNzID0gdmFsdWU7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCByb3c6IG51bWJlciwgY29sOiBudW1iZXIsIHZhbHVlOiBzdHJpbmcsIGV4cGVjdGVkVmFsdWU6IHN0cmluZywgY3NzQ2xhc3M6IHN0cmluZykge1xuICAgIHRoaXMuX2lkID0gaWQ7XG4gICAgdGhpcy5fcm93ID0gcm93O1xuICAgIHRoaXMuX2NvbCA9IGNvbDtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX2V4cGVjdGVkVmFsdWUgPSBleHBlY3RlZFZhbHVlO1xuICAgIHRoaXMuX2Nzc0NsYXNzID0gY3NzQ2xhc3M7XG4gIH1cbn1cbiJdfQ==