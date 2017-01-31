"use strict";
var Dialogs = require('ui/dialogs'), frame = require('ui/frame');
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var router_2 = require("@angular/router");
var page_1 = require("ui/page");
var config_1 = require("../../shared/config");
var base_1 = require("../../base");
var score_service_1 = require("../../shared/score/score.service");
var state_service_1 = require("../../shared/state/state.service");
var GameComponent = (function (_super) {
    __extends(GameComponent, _super);
    function GameComponent(_router, _page, _route, _scoreService, _stateService) {
        var _this = _super.call(this) || this;
        _this._router = _router;
        _this._page = _page;
        _this._route = _route;
        _this._scoreService = _scoreService;
        _this._stateService = _stateService;
        _this.isLoading = true;
        _this.isHighScoreButton = false;
        _this.isDev = config_1.Config.isDev;
        _page.className = 'page';
        _this.subscriptions.push(_stateService.stateChange$
            .subscribe(function (state) { return _this.onStateServiceDataChange(state); }));
        _this.subscriptions.push(_scoreService.dataChange$
            .subscribe(function (scores) { return _this.onScoreServiceDataChange(scores); }));
        _route.params.subscribe(function (params) {
            _this.isLoading = false;
            if (params && params.hasOwnProperty('target')) {
                _this._router.navigate([params['target']], config_1.Config.transition);
            }
        });
        return _this;
    }
    GameComponent.prototype.ngOnInit = function () {
        this.title = config_1.Config.title;
        if (config_1.Config.isDev) {
            this.title += ' (Dev Mode)';
        }
    };
    GameComponent.prototype.onStateServiceDataChange = function (state) {
        this.consoleLogMsg('game.component', 'onStateServiceDataChange');
        var level = this._stateService.getKeyValue('level');
        this.consoleLogMsg('game.component', 'level = ' + level);
        if (level) {
            this._scoreService.level = this.level = Number(level);
        }
        else {
            this._scoreService.level = this.level = config_1.Config.defaultLevel;
        }
    };
    GameComponent.prototype.onScoreServiceDataChange = function (scores) {
        this.consoleLogMsg('game.component', 'onScoreServiceDataChange');
        if (scores) {
            this.highScores = scores;
            if (this.highScores && this.highScores.length) {
                this.isHighScoreButton = true;
            }
            this.isLoading = false;
        }
    };
    GameComponent.prototype.onPlayTap = function () {
        this.consoleLogMsg('game.component', 'onPlayTap');
        switch (this.level) {
            case 3:
                this._router.navigate(['/level-three'], config_1.Config.transition);
                break;
            case 2:
                this._router.navigate(['/level-two'], config_1.Config.transition);
                break;
            default:
                this._router.navigate(['/level-one'], config_1.Config.transition);
                break;
        }
    };
    return GameComponent;
}(base_1.Base));
__decorate([
    core_1.ViewChild("container"),
    __metadata("design:type", core_1.ElementRef)
], GameComponent.prototype, "container", void 0);
GameComponent = __decorate([
    core_1.Component({
        selector: "game",
        templateUrl: "pages/game/game.component.html",
        providers: [state_service_1.StateService, score_service_1.ScoreService],
        styleUrls: ["pages/game/game-common.css", "pages/game/game.css"],
        encapsulation: core_1.ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [router_1.RouterExtensions,
        page_1.Page,
        router_2.ActivatedRoute,
        score_service_1.ScoreService,
        state_service_1.StateService])
], GameComponent);
exports.GameComponent = GameComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYW1lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUNuQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRTlCLHNDQUEwRjtBQUUxRixzREFBOEQ7QUFDOUQsMENBQStDO0FBQy9DLGdDQUE2QjtBQUU3Qiw4Q0FBMkM7QUFDM0MsbUNBQWdDO0FBQ2hDLGtFQUE4RDtBQUc5RCxrRUFBOEQ7QUFVOUQsSUFBYSxhQUFhO0lBQVMsaUNBQUk7SUFTckMsdUJBQW9CLE9BQXlCLEVBQ3pCLEtBQVcsRUFDWCxNQUFzQixFQUN0QixhQUEyQixFQUMzQixhQUEyQjtRQUovQyxZQUtFLGlCQUFPLFNBdUJSO1FBNUJtQixhQUFPLEdBQVAsT0FBTyxDQUFrQjtRQUN6QixXQUFLLEdBQUwsS0FBSyxDQUFNO1FBQ1gsWUFBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDdEIsbUJBQWEsR0FBYixhQUFhLENBQWM7UUFDM0IsbUJBQWEsR0FBYixhQUFhLENBQWM7UUFFN0MsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsS0FBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMvQixLQUFJLENBQUMsS0FBSyxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUM7UUFDMUIsS0FBSyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7UUFFekIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVk7YUFDL0MsU0FBUyxDQUNSLFVBQUMsS0FBVSxJQUFLLE9BQUEsS0FBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxFQUFwQyxDQUFvQyxDQUNyRCxDQUFDLENBQUM7UUFFTCxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVzth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Z0JBQ3pELEtBQUssQ0FBQztRQUNWLENBQUM7SUFDSCxDQUFDO0lBRUgsb0JBQUM7QUFBRCxDQUFDLEFBbkZELENBQW1DLFdBQUksR0FtRnRDO0FBbEZ5QjtJQUF2QixnQkFBUyxDQUFDLFdBQVcsQ0FBQzs4QkFBWSxpQkFBVTtnREFBQztBQURuQyxhQUFhO0lBUnpCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsTUFBTTtRQUNoQixXQUFXLEVBQUUsZ0NBQWdDO1FBQzdDLFNBQVMsRUFBRSxDQUFDLDRCQUFZLEVBQUUsNEJBQVksQ0FBQztRQUN2QyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxxQkFBcUIsQ0FBQztRQUNoRSxhQUFhLEVBQUUsd0JBQWlCLENBQUMsSUFBSTtLQUV0QyxDQUFDO3FDQVU2Qix5QkFBZ0I7UUFDbEIsV0FBSTtRQUNILHVCQUFjO1FBQ1AsNEJBQVk7UUFDWiw0QkFBWTtHQWJwQyxhQUFhLENBbUZ6QjtBQW5GWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERpYWxvZ3MgPSByZXF1aXJlKCd1aS9kaWFsb2dzJyksXG4gIGZyYW1lID0gcmVxdWlyZSgndWkvZnJhbWUnKTtcblxuaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIFZpZXdFbmNhcHN1bGF0aW9uLCBPbkluaXQsIFZpZXdDaGlsZH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Vmlld30gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7UGFnZX0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7Q29sb3J9IGZyb20gXCJjb2xvclwiO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4uLy4uL3NoYXJlZC9jb25maWcnO1xuaW1wb3J0IHtCYXNlfSBmcm9tICcuLi8uLi9iYXNlJztcbmltcG9ydCB7U2NvcmVTZXJ2aWNlfSBmcm9tICcuLi8uLi9zaGFyZWQvc2NvcmUvc2NvcmUuc2VydmljZSc7XG5pbXBvcnQge1Njb3JlfSBmcm9tICcuLi8uLi9zaGFyZWQvc2NvcmUvc2NvcmUnO1xuaW1wb3J0IHtTdGF0ZX0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0YXRlL1N0YXRlJztcbmltcG9ydCB7U3RhdGVTZXJ2aWNlfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RhdGUvc3RhdGUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJnYW1lXCIsXG4gIHRlbXBsYXRlVXJsOiBcInBhZ2VzL2dhbWUvZ2FtZS5jb21wb25lbnQuaHRtbFwiLFxuICBwcm92aWRlcnM6IFtTdGF0ZVNlcnZpY2UsIFNjb3JlU2VydmljZV0sXG4gIHN0eWxlVXJsczogW1wicGFnZXMvZ2FtZS9nYW1lLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9nYW1lL2dhbWUuY3NzXCJdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG5cbn0pXG5leHBvcnQgY2xhc3MgR2FtZUNvbXBvbmVudCBleHRlbmRzIEJhc2UgaW1wbGVtZW50cyBPbkluaXQge1xuICBAVmlld0NoaWxkKFwiY29udGFpbmVyXCIpIGNvbnRhaW5lcjogRWxlbWVudFJlZjtcbiAgaXNIaWdoU2NvcmVCdXR0b246IEJvb2xlYW47XG4gIGlzRGV2OiBCb29sZWFuO1xuICB0aXRsZTogc3RyaW5nO1xuICBoaWdoU2NvcmVzOiBTY29yZVtdO1xuICBsZXZlbDogbnVtYmVyO1xuICBpc0xvYWRpbmc6IEJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICAgICAgICBwcml2YXRlIF9wYWdlOiBQYWdlLFxuICAgICAgICAgICAgICBwcml2YXRlIF9yb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3Njb3JlU2VydmljZTogU2NvcmVTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIF9zdGF0ZVNlcnZpY2U6IFN0YXRlU2VydmljZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMuaXNIaWdoU2NvcmVCdXR0b24gPSBmYWxzZTtcbiAgICB0aGlzLmlzRGV2ID0gQ29uZmlnLmlzRGV2O1xuICAgIF9wYWdlLmNsYXNzTmFtZSA9ICdwYWdlJztcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKF9zdGF0ZVNlcnZpY2Uuc3RhdGVDaGFuZ2UkXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoc3RhdGU6IGFueSkgPT4gdGhpcy5vblN0YXRlU2VydmljZURhdGFDaGFuZ2Uoc3RhdGUpXG4gICAgICApKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKF9zY29yZVNlcnZpY2UuZGF0YUNoYW5nZSRcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIChzY29yZXM6IGFueSkgPT4gdGhpcy5vblNjb3JlU2VydmljZURhdGFDaGFuZ2Uoc2NvcmVzKVxuICAgICAgKSk7XG5cbiAgICBfcm91dGUucGFyYW1zLnN1YnNjcmliZSgocGFyYW1zOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5oYXNPd25Qcm9wZXJ0eSgndGFyZ2V0JykpIHtcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFtwYXJhbXNbJ3RhcmdldCddXSwgQ29uZmlnLnRyYW5zaXRpb24pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnRpdGxlID0gQ29uZmlnLnRpdGxlO1xuICAgIGlmIChDb25maWcuaXNEZXYpIHtcbiAgICAgIHRoaXMudGl0bGUgKz0gJyAoRGV2IE1vZGUpJztcbiAgICB9XG4gIH1cblxuICBvblN0YXRlU2VydmljZURhdGFDaGFuZ2Uoc3RhdGU6IFN0YXRlW10pIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2dhbWUuY29tcG9uZW50JywgJ29uU3RhdGVTZXJ2aWNlRGF0YUNoYW5nZScpO1xuICAgIGxldCBsZXZlbDogc3RyaW5nID0gdGhpcy5fc3RhdGVTZXJ2aWNlLmdldEtleVZhbHVlKCdsZXZlbCcpO1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnZ2FtZS5jb21wb25lbnQnLCAnbGV2ZWwgPSAnICsgbGV2ZWwpO1xuICAgIGlmIChsZXZlbCkge1xuICAgICAgdGhpcy5fc2NvcmVTZXJ2aWNlLmxldmVsID0gdGhpcy5sZXZlbCA9IE51bWJlcihsZXZlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3Njb3JlU2VydmljZS5sZXZlbCA9IHRoaXMubGV2ZWwgPSBDb25maWcuZGVmYXVsdExldmVsO1xuICAgIH1cbiAgfVxuXG4gIG9uU2NvcmVTZXJ2aWNlRGF0YUNoYW5nZShzY29yZXM6IFNjb3JlW10pIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2dhbWUuY29tcG9uZW50JywgJ29uU2NvcmVTZXJ2aWNlRGF0YUNoYW5nZScpO1xuICAgIGlmIChzY29yZXMpIHtcbiAgICAgIHRoaXMuaGlnaFNjb3JlcyA9IHNjb3JlcztcbiAgICAgIGlmICh0aGlzLmhpZ2hTY29yZXMgJiYgdGhpcy5oaWdoU2NvcmVzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLmlzSGlnaFNjb3JlQnV0dG9uID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgb25QbGF5VGFwKCkge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnZ2FtZS5jb21wb25lbnQnLCAnb25QbGF5VGFwJyk7XG4gICAgc3dpdGNoKHRoaXMubGV2ZWwpIHtcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnL2xldmVsLXRocmVlJ10sIENvbmZpZy50cmFuc2l0aW9uKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJy9sZXZlbC10d28nXSwgQ29uZmlnLnRyYW5zaXRpb24pO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJy9sZXZlbC1vbmUnXSwgQ29uZmlnLnRyYW5zaXRpb24pO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxufVxuIl19