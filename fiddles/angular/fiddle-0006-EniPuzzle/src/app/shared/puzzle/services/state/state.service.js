"use strict";
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/share");
var sqlite_database_service_1 = require("./../database/sqlite-database.service");
var StateService = (function () {
    function StateService(databaseService) {
        var _this = this;
        this.databaseService = databaseService;
        this._stateEvent = 'init';
        this.stateEventChange$ = new Observable_1.Observable(function (observer) { return _this._stateEventObserver = observer; }).share();
    }
    Object.defineProperty(StateService.prototype, "stateEvent", {
        get: function () {
            return this._stateEvent;
        },
        set: function (value) {
            if (this.stateEvent !== value) {
                this.stateEvent = value;
                if (this._stateEventObserver) {
                    this._stateEventObserver.next(value);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    return StateService;
}());
StateService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [sqlite_database_service_1.SqliteDatabaseService])
], StateService);
exports.StateService = StateService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0YXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUF5QztBQUN6Qyw4Q0FBMkM7QUFFM0MsbUNBQWlDO0FBQ2pDLGlGQUE0RTtBQUk1RSxJQUFhLFlBQVk7SUFTdkIsc0JBQVksZUFBc0M7UUFBbEQsaUJBU0M7UUFQQyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUN2QyxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztRQUUxQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSx1QkFBVSxDQUNyQyxVQUFDLFFBQVksSUFBSyxPQUFBLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxRQUFRLEVBQW5DLENBQW1DLENBQ3RELENBQUMsS0FBSyxFQUFFLENBQUM7SUFFWixDQUFDO0lBRUQsc0JBQUksb0NBQVU7YUFBZDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzFCLENBQUM7YUFFRCxVQUFlLEtBQWE7WUFDMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztnQkFDeEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdkMsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDOzs7T0FUQTtJQVdILG1CQUFDO0FBQUQsQ0FBQyxBQWpDRCxJQWlDQztBQWpDWSxZQUFZO0lBRHhCLGlCQUFVLEVBQUU7cUNBVWtCLCtDQUFxQjtHQVR2QyxZQUFZLENBaUN4QjtBQWpDWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQge09ic2VydmVyfSBmcm9tICdyeGpzL09ic2VydmVyJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3Ivc2hhcmUnO1xuaW1wb3J0IHtTcWxpdGVEYXRhYmFzZVNlcnZpY2V9IGZyb20gJy4vLi4vZGF0YWJhc2Uvc3FsaXRlLWRhdGFiYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHtTdGF0ZVNlcnZpY2VJbnRlcmZhY2V9IGZyb20gJy4vc3RhdGUtc2VydmljZS5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RhdGVTZXJ2aWNlIGltcGxlbWVudHMgU3RhdGVTZXJ2aWNlSW50ZXJmYWNlIHtcblxuICBkYXRhYmFzZVNlcnZpY2U6IFNxbGl0ZURhdGFiYXNlU2VydmljZTtcblxuICBzdGF0ZUV2ZW50Q2hhbmdlJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIHByaXZhdGUgX3N0YXRlRXZlbnQ6IHN0cmluZztcbiAgcHJpdmF0ZSBfc3RhdGVFdmVudE9ic2VydmVyOiBPYnNlcnZlcjxzdHJpbmc+O1xuXG4gIGNvbnN0cnVjdG9yKGRhdGFiYXNlU2VydmljZTogU3FsaXRlRGF0YWJhc2VTZXJ2aWNlKSB7XG5cbiAgICB0aGlzLmRhdGFiYXNlU2VydmljZSA9IGRhdGFiYXNlU2VydmljZTtcbiAgICB0aGlzLl9zdGF0ZUV2ZW50ID0gJ2luaXQnO1xuXG4gICAgdGhpcy5zdGF0ZUV2ZW50Q2hhbmdlJCA9IG5ldyBPYnNlcnZhYmxlPHN0cmluZz4oXG4gICAgICAob2JzZXJ2ZXI6YW55KSA9PiB0aGlzLl9zdGF0ZUV2ZW50T2JzZXJ2ZXIgPSBvYnNlcnZlclxuICAgICkuc2hhcmUoKTtcblxuICB9XG5cbiAgZ2V0IHN0YXRlRXZlbnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdGVFdmVudDtcbiAgfVxuXG4gIHNldCBzdGF0ZUV2ZW50KHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5zdGF0ZUV2ZW50ICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5zdGF0ZUV2ZW50ID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5fc3RhdGVFdmVudE9ic2VydmVyKSB7XG4gICAgICAgIHRoaXMuX3N0YXRlRXZlbnRPYnNlcnZlci5uZXh0KHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuIl19