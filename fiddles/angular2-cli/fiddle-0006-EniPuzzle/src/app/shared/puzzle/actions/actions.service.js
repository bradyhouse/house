"use strict";
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/share");
var actions_enum_1 = require("./actions.enum");
var ActionsService = (function () {
    function ActionsService() {
        var _this = this;
        this._action = actions_enum_1.ActionsEnum.START;
        this.actionChange$ = new Observable_1.Observable(function (observer) { return _this.actionObserver = observer; }).share();
    }
    Object.defineProperty(ActionsService.prototype, "actionObserver", {
        get: function () {
            return this._actionObserver;
        },
        set: function (value) {
            this._actionObserver = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionsService.prototype, "action", {
        get: function () {
            return this._action;
        },
        set: function (value) {
            if (this._action !== value) {
                this._action = value;
                if (this.actionObserver) {
                    this.actionObserver.next(value);
                }
            }
            value = null;
        },
        enumerable: true,
        configurable: true
    });
    return ActionsService;
}());
ActionsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ActionsService);
exports.ActionsService = ActionsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWN0aW9ucy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBeUM7QUFDekMsOENBQTJDO0FBRTNDLGlDQUErQjtBQUMvQixtQ0FBaUM7QUFDakMsK0NBQTJDO0FBSTNDLElBQWEsY0FBYztJQThCekI7UUFBQSxpQkFLQztRQUpDLElBQUksQ0FBQyxPQUFPLEdBQUcsMEJBQVcsQ0FBQyxLQUFLLENBQUM7UUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLHVCQUFVLENBQ2pDLFVBQUMsUUFBYSxJQUFLLE9BQUEsS0FBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLEVBQTlCLENBQThCLENBQ2xELENBQUMsS0FBSyxFQUFFLENBQUM7SUFDWixDQUFDO0lBM0JELHNCQUFJLDBDQUFjO2FBQWxCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDOUIsQ0FBQzthQUVELFVBQW1CLEtBQTRCO1lBQzdDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQy9CLENBQUM7OztPQUpBO0lBTUQsc0JBQUksa0NBQU07YUFBVjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENBQUM7YUFFRCxVQUFXLEtBQWtCO1lBQzNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO29CQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEMsQ0FBQztZQUNILENBQUM7WUFDRCxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2YsQ0FBQzs7O09BVkE7SUFtQkgscUJBQUM7QUFBRCxDQUFDLEFBckNELElBcUNDO0FBckNZLGNBQWM7SUFEMUIsaUJBQVUsRUFBRTs7R0FDQSxjQUFjLENBcUMxQjtBQXJDWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQge09ic2VydmVyfSBmcm9tICdyeGpzL09ic2VydmVyJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3Ivc2hhcmUnO1xuaW1wb3J0IHtBY3Rpb25zRW51bX0gZnJvbSAnLi9hY3Rpb25zLmVudW0nO1xuaW1wb3J0IHtBY3Rpb25zU2VydmljZUludGVyZmFjZX0gZnJvbSAnLi9hY3Rpb25zLXNlcnZpY2UuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFjdGlvbnNTZXJ2aWNlIGltcGxlbWVudHMgQWN0aW9uc1NlcnZpY2VJbnRlcmZhY2Uge1xuXG4gIGFjdGlvbkNoYW5nZSQ6IE9ic2VydmFibGU8QWN0aW9uc0VudW0+O1xuXG4gIHByaXZhdGUgX2FjdGlvbjogQWN0aW9uc0VudW07XG4gIHByaXZhdGUgX2FjdGlvbk9ic2VydmVyOiBPYnNlcnZlcjxBY3Rpb25zRW51bT47XG5cblxuICBnZXQgYWN0aW9uT2JzZXJ2ZXIoKTogT2JzZXJ2ZXI8QWN0aW9uc0VudW0+IHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aW9uT2JzZXJ2ZXI7XG4gIH1cblxuICBzZXQgYWN0aW9uT2JzZXJ2ZXIodmFsdWU6IE9ic2VydmVyPEFjdGlvbnNFbnVtPikge1xuICAgIHRoaXMuX2FjdGlvbk9ic2VydmVyID0gdmFsdWU7XG4gIH1cblxuICBnZXQgYWN0aW9uKCk6IEFjdGlvbnNFbnVtIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aW9uO1xuICB9XG5cbiAgc2V0IGFjdGlvbih2YWx1ZTogQWN0aW9uc0VudW0pIHtcbiAgICBpZiAodGhpcy5fYWN0aW9uICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fYWN0aW9uID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5hY3Rpb25PYnNlcnZlcikge1xuICAgICAgICB0aGlzLmFjdGlvbk9ic2VydmVyLm5leHQodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICB2YWx1ZSA9IG51bGw7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9hY3Rpb24gPSBBY3Rpb25zRW51bS5TVEFSVDtcbiAgICB0aGlzLmFjdGlvbkNoYW5nZSQgPSBuZXcgT2JzZXJ2YWJsZTxBY3Rpb25zRW51bT4oXG4gICAgICAob2JzZXJ2ZXI6IGFueSkgPT4gdGhpcy5hY3Rpb25PYnNlcnZlciA9IG9ic2VydmVyXG4gICAgKS5zaGFyZSgpO1xuICB9XG5cbn1cbiJdfQ==