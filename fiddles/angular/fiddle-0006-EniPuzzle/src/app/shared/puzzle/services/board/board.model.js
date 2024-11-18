"use strict";
var Board = (function () {
    function Board(rowCount, colCount, isSolved, sequence, expectedSequence) {
        if (rowCount === void 0) { rowCount = 0; }
        if (colCount === void 0) { colCount = 0; }
        if (isSolved === void 0) { isSolved = false; }
        if (sequence === void 0) { sequence = null; }
        if (expectedSequence === void 0) { expectedSequence = null; }
        this.rowCount = rowCount;
        this.colCount = colCount;
        this.isSolved = isSolved;
        this.sequence = sequence;
        this.expectedSequence = expectedSequence;
        this._squares = [];
    }
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
        return '{ rows: ' + this.rowCount + ', cols: ' + this.colCount + ', isSolved: ' +
            this.isSolved + ', sequence: ' + JSON.stringify(this.sequence) +
            ', expectedSequence: ' + JSON.stringify(this.expectedSequence) +
            ', squares:' + this._squares.length + ' }';
    };
    return Board;
}());
exports.Board = Board;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9hcmQubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJib2FyZC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0E7SUFZRSxlQUNTLFFBQW9CLEVBQ3BCLFFBQW9CLEVBQ3BCLFFBQXlCLEVBQ3pCLFFBQXlCLEVBQ3pCLGdCQUFpQztRQUpqQyx5QkFBQSxFQUFBLFlBQW9CO1FBQ3BCLHlCQUFBLEVBQUEsWUFBb0I7UUFDcEIseUJBQUEsRUFBQSxnQkFBeUI7UUFDekIseUJBQUEsRUFBQSxlQUF5QjtRQUN6QixpQ0FBQSxFQUFBLHVCQUFpQztRQUpqQyxhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQ3BCLGFBQVEsR0FBUixRQUFRLENBQVk7UUFDcEIsYUFBUSxHQUFSLFFBQVEsQ0FBaUI7UUFDekIsYUFBUSxHQUFSLFFBQVEsQ0FBaUI7UUFDekIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUV4QyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBaEJELHNCQUFJLDBCQUFPO2FBQVg7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixDQUFDO2FBRUQsVUFBWSxLQUFlO1lBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUM7OztPQUpBO0lBZ0JELHdCQUFRLEdBQVI7UUFDRSxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsY0FBYztZQUM3RSxJQUFJLENBQUMsUUFBUSxHQUFHLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDOUQsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7WUFDOUQsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUMvQyxDQUFDO0lBRUgsWUFBQztBQUFELENBQUMsQUE3QkQsSUE2QkM7QUE3Qlksc0JBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTcXVhcmUgfSBmcm9tICcuL3NxdWFyZS5tb2RlbCc7XG5pbXBvcnQgeyBNb2RlbEludGVyZmFjZSB9IGZyb20gJy4uLy4uLy4uL21vZGVsLmludGVyZmFjZSc7XG5cbmV4cG9ydCBjbGFzcyBCb2FyZCBpbXBsZW1lbnRzIE1vZGVsSW50ZXJmYWNlIHtcblxuICBwcml2YXRlIF9zcXVhcmVzOiBTcXVhcmVbXTtcblxuICBnZXQgc3F1YXJlcygpOiBTcXVhcmVbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NxdWFyZXM7XG4gIH1cblxuICBzZXQgc3F1YXJlcyh2YWx1ZTogU3F1YXJlW10pIHtcbiAgICB0aGlzLl9zcXVhcmVzID0gdmFsdWU7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgcm93Q291bnQ6IG51bWJlciA9IDAsXG4gICAgcHVibGljIGNvbENvdW50OiBudW1iZXIgPSAwLFxuICAgIHB1YmxpYyBpc1NvbHZlZDogYm9vbGVhbiA9IGZhbHNlLFxuICAgIHB1YmxpYyBzZXF1ZW5jZTogbnVtYmVyW10gPSBudWxsLFxuICAgIHB1YmxpYyBleHBlY3RlZFNlcXVlbmNlOiBudW1iZXJbXSA9IG51bGxcbiAgKSB7XG4gICAgdGhpcy5fc3F1YXJlcyA9IFtdO1xuICB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ3sgcm93czogJyArIHRoaXMucm93Q291bnQgKyAnLCBjb2xzOiAnICsgdGhpcy5jb2xDb3VudCArICcsIGlzU29sdmVkOiAnICtcbiAgICAgIHRoaXMuaXNTb2x2ZWQgKyAnLCBzZXF1ZW5jZTogJyArIEpTT04uc3RyaW5naWZ5KHRoaXMuc2VxdWVuY2UpICtcbiAgICAgICcsIGV4cGVjdGVkU2VxdWVuY2U6ICcgKyBKU09OLnN0cmluZ2lmeSh0aGlzLmV4cGVjdGVkU2VxdWVuY2UpICtcbiAgICAgICcsIHNxdWFyZXM6JyArIHRoaXMuX3NxdWFyZXMubGVuZ3RoICsgJyB9JztcbiAgfVxuXG59XG4iXX0=