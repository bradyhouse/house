"use strict";
var core_1 = require("@angular/core");
var base_component_1 = require("../base.component");
var index_1 = require("../../index");
var RowComponent = (function (_super) {
    __extends(RowComponent, _super);
    function RowComponent() {
        var _this = _super.call(this) || this;
        _this.squares = [];
        _this.squareClick = new core_1.EventEmitter();
        _this.leftClick = new core_1.EventEmitter();
        _this.rightClick = new core_1.EventEmitter();
        return _this;
    }
    Object.defineProperty(RowComponent.prototype, "emptySquare", {
        get: function () {
            var emptySquares = this.squares.filter(function (square) {
                return square.isEmpty;
            });
            if (emptySquares && emptySquares.length) {
                return emptySquares[0];
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    ;
    RowComponent.prototype.ngOnChanges = function (changes) {
        if (this.options) {
            this.squares = this.transform(this.options);
        }
    };
    RowComponent.prototype.onSquareClick = function ($event) {
        this.squareClick.emit([this, $event]);
    };
    RowComponent.prototype.onLeftClick = function () {
        this.shift(true);
        this.leftClick.emit(this);
    };
    RowComponent.prototype.onRightClick = function () {
        this.shift();
        this.rightClick.emit(this);
    };
    RowComponent.prototype.shift = function (left) {
        if (left === void 0) { left = false; }
        if (this.squares && this.squares.length === 8) {
            if (left) {
                index_1.Utils.swap(this.squares[0], this.squares[1]);
                index_1.Utils.swap(this.squares[1], this.squares[2]);
                index_1.Utils.swap(this.squares[2], this.squares[3]);
                index_1.Utils.swap(this.squares[3], this.squares[4]);
                index_1.Utils.swap(this.squares[4], this.squares[5]);
                index_1.Utils.swap(this.squares[5], this.squares[6]);
                index_1.Utils.swap(this.squares[6], this.squares[7]);
            }
            else {
                index_1.Utils.swap(this.squares[7], this.squares[6]);
                index_1.Utils.swap(this.squares[6], this.squares[5]);
                index_1.Utils.swap(this.squares[5], this.squares[4]);
                index_1.Utils.swap(this.squares[4], this.squares[3]);
                index_1.Utils.swap(this.squares[3], this.squares[2]);
                index_1.Utils.swap(this.squares[2], this.squares[1]);
                index_1.Utils.swap(this.squares[1], this.squares[0]);
            }
            this.persist();
        }
    };
    Object.defineProperty(RowComponent.prototype, "database", {
        get: function () {
            var stateService = this.options &&
                this.options.hasOwnProperty('stateService') ? this.options.stateService : null;
            return stateService ? stateService.databaseService : null;
        },
        enumerable: true,
        configurable: true
    });
    RowComponent.prototype.persist = function () {
        var _this = this;
        this.squares.forEach(function (square) {
            _this.persistSquareOptions(square);
        });
    };
    RowComponent.prototype.isSquarePersisted = function (id) {
        var databaseService = this.database;
        if (databaseService) {
            return databaseService.exists(id);
        }
        return false;
    };
    RowComponent.prototype.restoreSquareOptions = function (id) {
        var databaseService = this.database, squareState = null;
        if (databaseService) {
            squareState = databaseService.pull(id);
        }
        return squareState;
    };
    RowComponent.prototype.transform = function (options) {
        var _this = this;
        var squares = [];
        if (options.sequence && options.expectedSequence && options.sequence.length === options.expectedSequence.length) {
            options.sequence.map(function (num, i) {
                var colClass = index_1.Utils.mapColClass(num), squareValue = i < (options.sequence.length - 1) ||
                    (i < options.sequence.length && !options.isLast) ? num : null, squareIsEmpty = squareValue ? false : true, squareClass = squareValue ? 'btn ' + colClass : 'btn empty', squareExpectedValue = options.expectedSequence[i], squareId = 'row-' + options.index + '-square-' + squareExpectedValue, squareRow = options.index, squareCol = i + 1, squareOptions = _this.isSquarePersisted(squareId) ?
                    _this.restoreSquareOptions(squareId) :
                    {
                        id: squareId,
                        isEmpty: squareIsEmpty,
                        row: squareRow,
                        col: squareCol,
                        value: squareValue,
                        expectedValue: squareExpectedValue,
                        cssClass: squareClass
                    };
                _this.persistSquareOptions(squareOptions);
                squares.push(squareOptions);
                if (squareOptions.isEmpty) {
                    options.emptySquare = squareOptions;
                }
            });
        }
        return squares;
    };
    RowComponent.prototype.persistSquareOptions = function (options) {
        var databaseService = this.database;
        if (databaseService) {
            databaseService.push(options.id, options);
        }
    };
    return RowComponent;
}(base_component_1.BaseComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], RowComponent.prototype, "options", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RowComponent.prototype, "squareClick", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RowComponent.prototype, "leftClick", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RowComponent.prototype, "rightClick", void 0);
RowComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'pz-row',
        templateUrl: 'row.component.html',
        styleUrls: [
            'row.component.css',
        ],
    }),
    __metadata("design:paramtypes", [])
], RowComponent);
exports.RowComponent = RowComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJvdy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUErRjtBQUcvRixvREFBZ0Q7QUFHaEQscUNBQWtDO0FBV2xDLElBQWEsWUFBWTtJQUFTLGdDQUFhO0lBc0I3QztRQUFBLFlBQ0UsaUJBQU8sU0FLUjtRQUpDLEtBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxtQkFBWSxFQUEwQyxDQUFDO1FBQzlFLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxtQkFBWSxFQUFnQixDQUFDO1FBQ2xELEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxtQkFBWSxFQUFnQixDQUFDOztJQUNyRCxDQUFDO0lBbkJELHNCQUFJLHFDQUFXO2FBQWY7WUFDRSxJQUFJLFlBQVksR0FBNkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBQyxNQUE4QjtnQkFDOUYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsQ0FBQyxZQUFZLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFFZCxDQUFDOzs7T0FBQTtJQVFBLENBQUM7SUFFRixrQ0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxDQUFDO0lBQ0gsQ0FBQztJQUVELG9DQUFhLEdBQWIsVUFBYyxNQUE4QjtRQUMxQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxrQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsbUNBQVksR0FBWjtRQUNFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFHRCw0QkFBSyxHQUFMLFVBQU0sSUFBcUI7UUFBckIscUJBQUEsRUFBQSxZQUFxQjtRQUN6QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVCxhQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxhQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxhQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxhQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxhQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxhQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxhQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixhQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxhQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxhQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxhQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxhQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxhQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVB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Q1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFdBQVcsRUFBRSxvQkFBb0I7UUFDakMsU0FBUyxFQUFFO1lBQ1QsbUJBQW1CO1NBQ3BCO0tBQ0YsQ0FBQzs7R0FDVyxZQUFZLENBbUp4QjtBQW5KWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBPdXRwdXQsIEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NxdWFyZU9wdGlvbnNJbnRlcmZhY2V9IGZyb20gJy4uL2luZGV4JztcbmltcG9ydCB7RGF0YWJhc2VTZXJ2aWNlSW50ZXJmYWNlLCBTdGF0ZVNlcnZpY2VJbnRlcmZhY2V9IGZyb20gJy4uLy4uL2luZGV4JztcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnLi4vYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHtSb3dJbnRlcmZhY2V9IGZyb20gJy4vcm93LmludGVyZmFjZSc7XG5pbXBvcnQge1Jvd09wdGlvbnNJbnRlcmZhY2V9IGZyb20gJy4vcm93LW9wdGlvbnMuaW50ZXJmYWNlJztcbmltcG9ydCB7VXRpbHN9IGZyb20gJy4uLy4uL2luZGV4JztcblxuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdwei1yb3cnLFxuICB0ZW1wbGF0ZVVybDogJ3Jvdy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogW1xuICAgICdyb3cuY29tcG9uZW50LmNzcycsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFJvd0NvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBSb3dJbnRlcmZhY2UsIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgb3B0aW9uczogUm93T3B0aW9uc0ludGVyZmFjZTtcbiAgQE91dHB1dCgpIHNxdWFyZUNsaWNrOiBFdmVudEVtaXR0ZXI8W1Jvd0NvbXBvbmVudCwgU3F1YXJlT3B0aW9uc0ludGVyZmFjZV0+O1xuICBAT3V0cHV0KCkgbGVmdENsaWNrOiBFdmVudEVtaXR0ZXI8Um93Q29tcG9uZW50PjtcbiAgQE91dHB1dCgpIHJpZ2h0Q2xpY2s6IEV2ZW50RW1pdHRlcjxSb3dDb21wb25lbnQ+O1xuXG4gIHNxdWFyZXM6IFNxdWFyZU9wdGlvbnNJbnRlcmZhY2VbXTtcblxuICBnZXQgZW1wdHlTcXVhcmUoKTogU3F1YXJlT3B0aW9uc0ludGVyZmFjZSB7XG4gICAgbGV0IGVtcHR5U3F1YXJlczogU3F1YXJlT3B0aW9uc0ludGVyZmFjZVtdID0gdGhpcy5zcXVhcmVzLmZpbHRlcigoc3F1YXJlOiBTcXVhcmVPcHRpb25zSW50ZXJmYWNlKSA9PiB7XG4gICAgICByZXR1cm4gc3F1YXJlLmlzRW1wdHk7XG4gICAgfSk7XG5cbiAgICBpZiAoZW1wdHlTcXVhcmVzICYmIGVtcHR5U3F1YXJlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBlbXB0eVNxdWFyZXNbMF07XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zcXVhcmVzID0gW107XG4gICAgdGhpcy5zcXVhcmVDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8W1Jvd0NvbXBvbmVudCwgU3F1YXJlT3B0aW9uc0ludGVyZmFjZV0+KCk7XG4gICAgdGhpcy5sZWZ0Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPFJvd0NvbXBvbmVudD4oKTtcbiAgICB0aGlzLnJpZ2h0Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPFJvd0NvbXBvbmVudD4oKTtcbiAgfTtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgdGhpcy5zcXVhcmVzID0gdGhpcy50cmFuc2Zvcm0odGhpcy5vcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBvblNxdWFyZUNsaWNrKCRldmVudDogU3F1YXJlT3B0aW9uc0ludGVyZmFjZSk6IHZvaWQge1xuICAgIHRoaXMuc3F1YXJlQ2xpY2suZW1pdChbdGhpcywgJGV2ZW50XSk7XG4gIH1cblxuICBvbkxlZnRDbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLnNoaWZ0KHRydWUpO1xuICAgIHRoaXMubGVmdENsaWNrLmVtaXQodGhpcyk7XG4gIH1cblxuICBvblJpZ2h0Q2xpY2soKTogdm9pZCB7XG4gICAgdGhpcy5zaGlmdCgpO1xuICAgIHRoaXMucmlnaHRDbGljay5lbWl0KHRoaXMpO1xuICB9XG5cblxuICBzaGlmdChsZWZ0OiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zcXVhcmVzICYmIHRoaXMuc3F1YXJlcy5sZW5ndGggPT09IDgpIHtcbiAgICAgIGlmIChsZWZ0KSB7XG4gICAgICAgIFV0aWxzLnN3YXAodGhpcy5zcXVhcmVzWzBdLCB0aGlzLnNxdWFyZXNbMV0pO1xuICAgICAgICBVdGlscy5zd2FwKHRoaXMuc3F1YXJlc1sxXSwgdGhpcy5zcXVhcmVzWzJdKTtcbiAgICAgICAgVXRpbHMuc3dhcCh0aGlzLnNxdWFyZXNbMl0sIHRoaXMuc3F1YXJlc1szXSk7XG4gICAgICAgIFV0aWxzLnN3YXAodGhpcy5zcXVhcmVzWzNdLCB0aGlzLnNxdWFyZXNbNF0pO1xuICAgICAgICBVdGlscy5zd2FwKHRoaXMuc3F1YXJlc1s0XSwgdGhpcy5zcXVhcmVzWzVdKTtcbiAgICAgICAgVXRpbHMuc3dhcCh0aGlzLnNxdWFyZXNbNV0sIHRoaXMuc3F1YXJlc1s2XSk7XG4gICAgICAgIFV0aWxzLnN3YXAodGhpcy5zcXVhcmVzWzZdLCB0aGlzLnNxdWFyZXNbN10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgVXRpbHMuc3dhcCh0aGlzLnNxdWFyZXNbN10sIHRoaXMuc3F1YXJlc1s2XSk7XG4gICAgICAgIFV0aWxzLnN3YXAodGhpcy5zcXVhcmVzWzZdLCB0aGlzLnNxdWFyZXNbNV0pO1xuICAgICAgICBVdGlscy5zd2FwKHRoaXMuc3F1YXJlc1s1XSwgdGhpcy5zcXVhcmVzWzRdKTtcbiAgICAgICAgVXRpbHMuc3dhcCh0aGlzLnNxdWFyZXNbNF0sIHRoaXMuc3F1YXJlc1szXSk7XG4gICAgICAgIFV0aWxzLnN3YXAodGhpcy5zcXVhcmVzWzNdLCB0aGlzLnNxdWFyZXNbMl0pO1xuICAgICAgICBVdGlscy5zd2FwKHRoaXMuc3F1YXJlc1syXSwgdGhpcy5zcXVhcmVzWzFdKTtcbiAgICAgICAgVXRpbHMuc3dhcCh0aGlzLnNxdWFyZXNbMV0sIHRoaXMuc3F1YXJlc1swXSk7XG4gICAgICB9XG4gICAgICB0aGlzLnBlcnNpc3QoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgZGF0YWJhc2UoKTogRGF0YWJhc2VTZXJ2aWNlSW50ZXJmYWNlIHtcbiAgICBsZXQgc3RhdGVTZXJ2aWNlOiBTdGF0ZVNlcnZpY2VJbnRlcmZhY2UgPSB0aGlzLm9wdGlvbnMgJiZcbiAgICB0aGlzLm9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3N0YXRlU2VydmljZScpID8gdGhpcy5vcHRpb25zLnN0YXRlU2VydmljZSA6IG51bGw7XG4gICAgcmV0dXJuIHN0YXRlU2VydmljZSA/IHN0YXRlU2VydmljZS5kYXRhYmFzZVNlcnZpY2UgOiBudWxsO1xuICB9XG5cbiAgcGVyc2lzdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlOiBTcXVhcmVPcHRpb25zSW50ZXJmYWNlKSA9PiB7XG4gICAgICB0aGlzLnBlcnNpc3RTcXVhcmVPcHRpb25zKHNxdWFyZSk7XG4gICAgfSk7XG4gIH1cblxuICBpc1NxdWFyZVBlcnNpc3RlZChpZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgbGV0IGRhdGFiYXNlU2VydmljZTogRGF0YWJhc2VTZXJ2aWNlSW50ZXJmYWNlID0gdGhpcy5kYXRhYmFzZTtcbiAgICBpZiAoZGF0YWJhc2VTZXJ2aWNlKSB7XG4gICAgICByZXR1cm4gZGF0YWJhc2VTZXJ2aWNlLmV4aXN0cyhpZCk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJlc3RvcmVTcXVhcmVPcHRpb25zKGlkOiBzdHJpbmcpOiBTcXVhcmVPcHRpb25zSW50ZXJmYWNlIHtcbiAgICBsZXQgZGF0YWJhc2VTZXJ2aWNlOiBEYXRhYmFzZVNlcnZpY2VJbnRlcmZhY2UgPSB0aGlzLmRhdGFiYXNlLFxuICAgICAgc3F1YXJlU3RhdGU6IFNxdWFyZU9wdGlvbnNJbnRlcmZhY2UgPSBudWxsO1xuICAgIGlmIChkYXRhYmFzZVNlcnZpY2UpIHtcbiAgICAgIHNxdWFyZVN0YXRlID0gZGF0YWJhc2VTZXJ2aWNlLnB1bGwoaWQpO1xuICAgIH1cbiAgICByZXR1cm4gc3F1YXJlU3RhdGU7XG4gIH1cblxuICBwcml2YXRlIHRyYW5zZm9ybShvcHRpb25zOiBSb3dPcHRpb25zSW50ZXJmYWNlKTogU3F1YXJlT3B0aW9uc0ludGVyZmFjZVtdIHtcbiAgICBsZXQgc3F1YXJlczogU3F1YXJlT3B0aW9uc0ludGVyZmFjZVtdID0gW107XG4gICAgaWYgKG9wdGlvbnMuc2VxdWVuY2UgJiYgb3B0aW9ucy5leHBlY3RlZFNlcXVlbmNlICYmIG9wdGlvbnMuc2VxdWVuY2UubGVuZ3RoID09PSBvcHRpb25zLmV4cGVjdGVkU2VxdWVuY2UubGVuZ3RoKSB7XG4gICAgICBvcHRpb25zLnNlcXVlbmNlLm1hcCgobnVtLCBpKSA9PiB7XG4gICAgICAgIGxldCBjb2xDbGFzczogc3RyaW5nID0gVXRpbHMubWFwQ29sQ2xhc3MobnVtKSxcbiAgICAgICAgICBzcXVhcmVWYWx1ZTogbnVtYmVyID0gaSA8IChvcHRpb25zLnNlcXVlbmNlLmxlbmd0aCAtIDEpIHx8XG4gICAgICAgICAgKGkgPCBvcHRpb25zLnNlcXVlbmNlLmxlbmd0aCAmJiAhb3B0aW9ucy5pc0xhc3QpID8gbnVtIDogbnVsbCxcbiAgICAgICAgICBzcXVhcmVJc0VtcHR5OiBib29sZWFuID0gc3F1YXJlVmFsdWUgPyBmYWxzZSA6IHRydWUsXG4gICAgICAgICAgc3F1YXJlQ2xhc3M6IHN0cmluZyA9IHNxdWFyZVZhbHVlID8gJ2J0biAnICsgY29sQ2xhc3MgOiAnYnRuIGVtcHR5JyxcbiAgICAgICAgICBzcXVhcmVFeHBlY3RlZFZhbHVlOiBudW1iZXIgPSBvcHRpb25zLmV4cGVjdGVkU2VxdWVuY2VbaV0sXG4gICAgICAgICAgc3F1YXJlSWQ6IHN0cmluZyA9ICdyb3ctJyArIG9wdGlvbnMuaW5kZXggKyAnLXNxdWFyZS0nICsgc3F1YXJlRXhwZWN0ZWRWYWx1ZSxcbiAgICAgICAgICBzcXVhcmVSb3c6IG51bWJlciA9IG9wdGlvbnMuaW5kZXgsXG4gICAgICAgICAgc3F1YXJlQ29sOiBudW1iZXIgPSBpICsgMSxcbiAgICAgICAgICBzcXVhcmVPcHRpb25zOiBTcXVhcmVPcHRpb25zSW50ZXJmYWNlID0gdGhpcy5pc1NxdWFyZVBlcnNpc3RlZChzcXVhcmVJZCkgP1xuICAgICAgICAgICAgdGhpcy5yZXN0b3JlU3F1YXJlT3B0aW9ucyhzcXVhcmVJZCkgOlxuICAgICAgICAgICAgPFNxdWFyZU9wdGlvbnNJbnRlcmZhY2U+e1xuICAgICAgICAgICAgICBpZDogc3F1YXJlSWQsXG4gICAgICAgICAgICAgIGlzRW1wdHk6IHNxdWFyZUlzRW1wdHksXG4gICAgICAgICAgICAgIHJvdzogc3F1YXJlUm93LFxuICAgICAgICAgICAgICBjb2w6IHNxdWFyZUNvbCxcbiAgICAgICAgICAgICAgdmFsdWU6IHNxdWFyZVZhbHVlLFxuICAgICAgICAgICAgICBleHBlY3RlZFZhbHVlOiBzcXVhcmVFeHBlY3RlZFZhbHVlLFxuICAgICAgICAgICAgICBjc3NDbGFzczogc3F1YXJlQ2xhc3NcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5wZXJzaXN0U3F1YXJlT3B0aW9ucyhzcXVhcmVPcHRpb25zKTtcblxuICAgICAgICBzcXVhcmVzLnB1c2goc3F1YXJlT3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKHNxdWFyZU9wdGlvbnMuaXNFbXB0eSkge1xuICAgICAgICAgIG9wdGlvbnMuZW1wdHlTcXVhcmUgPSBzcXVhcmVPcHRpb25zO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gc3F1YXJlcztcbiAgfVxuXG4gIHByaXZhdGUgcGVyc2lzdFNxdWFyZU9wdGlvbnMob3B0aW9uczogU3F1YXJlT3B0aW9uc0ludGVyZmFjZSk6IHZvaWQge1xuICAgIGxldCBkYXRhYmFzZVNlcnZpY2U6IERhdGFiYXNlU2VydmljZUludGVyZmFjZSA9IHRoaXMuZGF0YWJhc2U7XG4gICAgaWYgKGRhdGFiYXNlU2VydmljZSkge1xuICAgICAgZGF0YWJhc2VTZXJ2aWNlLnB1c2gob3B0aW9ucy5pZCwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG59XG4iXX0=