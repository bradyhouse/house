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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0E7SUErQkUsZUFBWSxFQUFVLEVBQUUsR0FBVyxFQUFFLEtBQWE7UUFDaEQsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBNUJELHNCQUFJLHFCQUFFO2FBQU47WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNsQixDQUFDO2FBRUQsVUFBTyxLQUFhO1lBQ2xCLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ25CLENBQUM7OztPQUpBO0lBTUQsc0JBQUksc0JBQUc7YUFBUDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ25CLENBQUM7YUFFRCxVQUFRLEtBQWE7WUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDcEIsQ0FBQzs7O09BSkE7SUFNRCxzQkFBSSx3QkFBSzthQUFUO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzthQUVELFVBQVUsS0FBYTtZQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FKQTtJQVlELHdCQUFRLEdBQVI7UUFDRSxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3JGLENBQUM7SUFDSCxZQUFDO0FBQUQsQ0FBQyxBQXhDRCxJQXdDQztBQXhDWSxzQkFBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kZWxJbnRlcmZhY2V9IGZyb20gJy4uL21vZGVsLmludGVyZmFjZSc7XG5cblxuZXhwb3J0IGNsYXNzIFN0YXRlIGltcGxlbWVudHMgTW9kZWxJbnRlcmZhY2Uge1xuXG4gIHByaXZhdGUgX2lkOiBudW1iZXI7XG4gIHByaXZhdGUgX2tleTogc3RyaW5nO1xuICBwcml2YXRlIF92YWx1ZTogc3RyaW5nO1xuXG5cbiAgZ2V0IGlkKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG5cbiAgc2V0IGlkKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9pZCA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IGtleSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9rZXk7XG4gIH1cblxuICBzZXQga2V5KHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9rZXkgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGlkOiBudW1iZXIsIGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5faWQgPSBpZDtcbiAgICB0aGlzLl9rZXkgPSBrZXk7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICd7IGlkOiAnICsgdGhpcy5pZCArICcsIGtleTogJyArIHRoaXMua2V5ICsgJywgdmFsdWU6ICcgKyB0aGlzLnZhbHVlICsgJyB9JztcbiAgfVxufVxuIl19