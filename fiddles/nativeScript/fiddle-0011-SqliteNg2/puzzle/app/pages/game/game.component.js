"use strict";
var Dialogs = require('ui/dialogs'), frame = require('ui/frame');
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var config_1 = require("../../shared/config");
var base_1 = require("../../base");
var score_service_1 = require("../../shared/score/score.service");
var state_service_1 = require("../../shared/state/state.service");
var GameComponent = (function (_super) {
    __extends(GameComponent, _super);
    function GameComponent(_router, _page, _scoreService, _stateService) {
        var _this = _super.call(this) || this;
        _this._router = _router;
        _this._page = _page;
        _this._scoreService = _scoreService;
        _this._stateService = _stateService;
        _this.isLoading = true;
        _this.isHighScoreButton = false;
        _this.isDev = config_1.Config.isDev;
        _this.subscriptions.push(_stateService.stateChange$
            .subscribe(function (state) { return _this.onStateServiceDataChange(state); }));
        _this.subscriptions.push(_scoreService.dataChange$
            .subscribe(function (scores) { return _this.onScoreServiceDataChange(scores); }));
        return _this;
    }
    GameComponent.prototype.ngOnInit = function () {
        this.title = config_1.Config.title;
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
                this._router.navigate(['/level-three']);
                break;
            case 2:
                this._router.navigate(['/level-two']);
                break;
            default:
                this._router.navigate(['/level-one']);
                break;
        }
    };
    GameComponent.prototype.onAboutTap = function () {
        this.consoleLogMsg('game.component', 'onAboutTap');
        this._router.navigate(["/about"]);
    };
    GameComponent.prototype.onHighScoreTap = function () {
        this.consoleLogMsg('game.component', 'onHighScoreTap');
        this._router.navigate(["/high-score"]);
    };
    return GameComponent;
}(base_1.Base));
__decorate([
    core_1.ViewChild("container"),
    __metadata("design:type", core_1.ElementRef)
], GameComponent.prototype, "container", void 0);
GameComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        templateUrl: "pages/game/game.component.html",
        providers: [state_service_1.StateService, score_service_1.ScoreService],
        styleUrls: ["pages/game/game-common.css", "pages/game/game.css"],
        encapsulation: core_1.ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [router_1.Router,
        page_1.Page,
        score_service_1.ScoreService,
        state_service_1.StateService])
], GameComponent);
exports.GameComponent = GameComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYW1lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUNuQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRTlCLHNDQUEwRjtBQUUxRiwwQ0FBdUM7QUFDdkMsZ0NBQTZCO0FBRzdCLDhDQUEyQztBQUMzQyxtQ0FBZ0M7QUFDaEMsa0VBQThEO0FBRzlELGtFQUE4RDtBQVU5RCxJQUFhLGFBQWE7SUFBUyxpQ0FBSTtJQVNyQyx1QkFBb0IsT0FBZSxFQUNmLEtBQVcsRUFDWCxhQUEyQixFQUMzQixhQUEyQjtRQUgvQyxZQUlFLGlCQUFPLFNBY1I7UUFsQm1CLGFBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixXQUFLLEdBQUwsS0FBSyxDQUFNO1FBQ1gsbUJBQWEsR0FBYixhQUFhLENBQWM7UUFDM0IsbUJBQWEsR0FBYixhQUFhLENBQWM7UUFFN0MsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsS0FBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMvQixLQUFJLENBQUMsS0FBSyxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUM7UUFFMUIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVk7YUFDL0MsU0FBUyxDQUNSLFVBQUMsS0FBVSxJQUFLLE9BQUEsS0FBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxFQUFwQyxDQUFvQyxDQUNyRCxDQUFDLENBQUM7UUFFTCxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVzthQUM5QyxTQUFTLENBQ1IsVUFBQyxNQUFXLElBQUssT0FBQSxLQUFJLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDLEVBQXJDLENBQXFDLENBQ3ZELENBQUMsQ0FB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LFNBQVMsRUFBRSxDQUFDLDRCQUE0QixFQUFFLHFCQUFxQixDQUFDO1FBQ2hFLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO0tBRXRDLENBQUM7cUNBVTZCLGVBQU07UUFDUixXQUFJO1FBQ0ksNEJBQVk7UUFDWiw0QkFBWTtHQVpwQyxhQUFhLENBZ0Z6QjtBQWhGWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERpYWxvZ3MgPSByZXF1aXJlKCd1aS9kaWFsb2dzJyksXG4gIGZyYW1lID0gcmVxdWlyZSgndWkvZnJhbWUnKTtcblxuaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIFZpZXdFbmNhcHN1bGF0aW9uLCBPbkluaXQsIFZpZXdDaGlsZH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Vmlld30gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7UGFnZX0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7Q29sb3J9IGZyb20gXCJjb2xvclwiO1xuXG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi4vLi4vc2hhcmVkL2NvbmZpZyc7XG5pbXBvcnQge0Jhc2V9IGZyb20gJy4uLy4uL2Jhc2UnO1xuaW1wb3J0IHtTY29yZVNlcnZpY2V9IGZyb20gJy4uLy4uL3NoYXJlZC9zY29yZS9zY29yZS5zZXJ2aWNlJztcbmltcG9ydCB7U2NvcmV9IGZyb20gJy4uLy4uL3NoYXJlZC9zY29yZS9zY29yZSc7XG5pbXBvcnQge1N0YXRlfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RhdGUvU3RhdGUnO1xuaW1wb3J0IHtTdGF0ZVNlcnZpY2V9IGZyb20gJy4uLy4uL3NoYXJlZC9zdGF0ZS9zdGF0ZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxuICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9nYW1lL2dhbWUuY29tcG9uZW50Lmh0bWxcIixcbiAgcHJvdmlkZXJzOiBbU3RhdGVTZXJ2aWNlLCBTY29yZVNlcnZpY2VdLFxuICBzdHlsZVVybHM6IFtcInBhZ2VzL2dhbWUvZ2FtZS1jb21tb24uY3NzXCIsIFwicGFnZXMvZ2FtZS9nYW1lLmNzc1wiXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxuXG59KVxuZXhwb3J0IGNsYXNzIEdhbWVDb21wb25lbnQgZXh0ZW5kcyBCYXNlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZChcImNvbnRhaW5lclwiKSBjb250YWluZXI6IEVsZW1lbnRSZWY7XG4gIGlzSGlnaFNjb3JlQnV0dG9uOiBCb29sZWFuO1xuICBpc0RldjogQm9vbGVhbjtcbiAgdGl0bGU6IHN0cmluZztcbiAgaGlnaFNjb3JlczogU2NvcmVbXTtcbiAgbGV2ZWw6IG51bWJlcjtcbiAgaXNMb2FkaW5nOiBCb29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlcjogUm91dGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIF9wYWdlOiBQYWdlLFxuICAgICAgICAgICAgICBwcml2YXRlIF9zY29yZVNlcnZpY2U6IFNjb3JlU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfc3RhdGVTZXJ2aWNlOiBTdGF0ZVNlcnZpY2UpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmlzSGlnaFNjb3JlQnV0dG9uID0gZmFsc2U7XG4gICAgdGhpcy5pc0RldiA9IENvbmZpZy5pc0RldjtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKF9zdGF0ZVNlcnZpY2Uuc3RhdGVDaGFuZ2UkXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoc3RhdGU6IGFueSkgPT4gdGhpcy5vblN0YXRlU2VydmljZURhdGFDaGFuZ2Uoc3RhdGUpXG4gICAgICApKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKF9zY29yZVNlcnZpY2UuZGF0YUNoYW5nZSRcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIChzY29yZXM6IGFueSkgPT4gdGhpcy5vblNjb3JlU2VydmljZURhdGFDaGFuZ2Uoc2NvcmVzKVxuICAgICAgKSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnRpdGxlID0gQ29uZmlnLnRpdGxlO1xuICB9XG5cbiAgb25TdGF0ZVNlcnZpY2VEYXRhQ2hhbmdlKHN0YXRlOiBTdGF0ZVtdKSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdnYW1lLmNvbXBvbmVudCcsICdvblN0YXRlU2VydmljZURhdGFDaGFuZ2UnKTtcbiAgICBsZXQgbGV2ZWw6IHN0cmluZyA9IHRoaXMuX3N0YXRlU2VydmljZS5nZXRLZXlWYWx1ZSgnbGV2ZWwnKTtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2dhbWUuY29tcG9uZW50JywgJ2xldmVsID0gJyArIGxldmVsKTtcbiAgICBpZiAobGV2ZWwpIHtcbiAgICAgIHRoaXMuX3Njb3JlU2VydmljZS5sZXZlbCA9IHRoaXMubGV2ZWwgPSBOdW1iZXIobGV2ZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zY29yZVNlcnZpY2UubGV2ZWwgPSB0aGlzLmxldmVsID0gQ29uZmlnLmRlZmF1bHRMZXZlbDtcbiAgICB9XG4gIH1cblxuICBvblNjb3JlU2VydmljZURhdGFDaGFuZ2Uoc2NvcmVzOiBTY29yZVtdKSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdnYW1lLmNvbXBvbmVudCcsICdvblNjb3JlU2VydmljZURhdGFDaGFuZ2UnKTtcbiAgICBpZiAoc2NvcmVzKSB7XG4gICAgICB0aGlzLmhpZ2hTY29yZXMgPSBzY29yZXM7XG4gICAgICBpZiAodGhpcy5oaWdoU2NvcmVzICYmIHRoaXMuaGlnaFNjb3Jlcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5pc0hpZ2hTY29yZUJ1dHRvbiA9IHRydWU7XG4gICAgICB9XG4gICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG9uUGxheVRhcCgpIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2dhbWUuY29tcG9uZW50JywgJ29uUGxheVRhcCcpO1xuICAgIHN3aXRjaCh0aGlzLmxldmVsKSB7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJy9sZXZlbC10aHJlZSddKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJy9sZXZlbC10d28nXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnL2xldmVsLW9uZSddKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgb25BYm91dFRhcCgpIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2dhbWUuY29tcG9uZW50JywgJ29uQWJvdXRUYXAnKTtcbiAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW1wiL2Fib3V0XCJdKTtcbiAgfVxuXG4gIG9uSGlnaFNjb3JlVGFwKCkge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnZ2FtZS5jb21wb25lbnQnLCAnb25IaWdoU2NvcmVUYXAnKTtcbiAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW1wiL2hpZ2gtc2NvcmVcIl0pO1xuICB9XG5cbn1cbiJdfQ==