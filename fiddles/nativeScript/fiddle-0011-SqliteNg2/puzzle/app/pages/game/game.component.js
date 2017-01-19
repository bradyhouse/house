"use strict";
var Dialogs = require('ui/dialogs'), frame = require('ui/frame');
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
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
                this._router.navigate(['/level-three'], config_1.Config.transitionWithHistory);
                break;
            case 2:
                this._router.navigate(['/level-two'], config_1.Config.transitionWithHistory);
                break;
            default:
                this._router.navigate(['/level-one'], config_1.Config.transitionWithHistory);
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
        selector: "my-app",
        templateUrl: "pages/game/game.component.html",
        providers: [state_service_1.StateService, score_service_1.ScoreService],
        styleUrls: ["pages/game/game-common.css", "pages/game/game.css"],
        encapsulation: core_1.ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [router_1.RouterExtensions,
        page_1.Page,
        score_service_1.ScoreService,
        state_service_1.StateService])
], GameComponent);
exports.GameComponent = GameComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYW1lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUNuQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRTlCLHNDQUEwRjtBQUUxRixzREFBK0Q7QUFFL0QsZ0NBQTZCO0FBRzdCLDhDQUEyQztBQUMzQyxtQ0FBZ0M7QUFDaEMsa0VBQThEO0FBRzlELGtFQUE4RDtBQVU5RCxJQUFhLGFBQWE7SUFBUyxpQ0FBSTtJQVNyQyx1QkFBb0IsT0FBeUIsRUFDekIsS0FBVyxFQUNYLGFBQTJCLEVBQzNCLGFBQTJCO1FBSC9DLFlBSUUsaUJBQU8sU0FjUjtRQWxCbUIsYUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFDekIsV0FBSyxHQUFMLEtBQUssQ0FBTTtRQUNYLG1CQUFhLEdBQWIsYUFBYSxDQUFjO1FBQzNCLG1CQUFhLEdBQWIsYUFBYSxDQUFjO1FBRTdDLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDL0IsS0FBSSxDQUFDLEtBQUssR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFDO1FBRTFCLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZO2FBQy9DLFNBQVMsQ0FDUixVQUFDLEtBQVUsSUFBSyxPQUFBLEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsRUFBcEMsQ0FBb0MsQ0FDckQsQ0FBQyxDQUFDO1FBRUwsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVc7YUFDOUMsU0FBUyxDQUNSLFVBQUMsTUFBVyxJQUFLLE9BQUEsS0FBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxFQUFyQyxDQUFxQyxDQUN2RCxDQUFD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bG9ncycpLFxuICBmcmFtZSA9IHJlcXVpcmUoJ3VpL2ZyYW1lJyk7XG5cbmltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBWaWV3RW5jYXBzdWxhdGlvbiwgT25Jbml0LCBWaWV3Q2hpbGR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1ZpZXd9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7UGFnZX0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7Q29sb3J9IGZyb20gXCJjb2xvclwiO1xuXG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi4vLi4vc2hhcmVkL2NvbmZpZyc7XG5pbXBvcnQge0Jhc2V9IGZyb20gJy4uLy4uL2Jhc2UnO1xuaW1wb3J0IHtTY29yZVNlcnZpY2V9IGZyb20gJy4uLy4uL3NoYXJlZC9zY29yZS9zY29yZS5zZXJ2aWNlJztcbmltcG9ydCB7U2NvcmV9IGZyb20gJy4uLy4uL3NoYXJlZC9zY29yZS9zY29yZSc7XG5pbXBvcnQge1N0YXRlfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RhdGUvU3RhdGUnO1xuaW1wb3J0IHtTdGF0ZVNlcnZpY2V9IGZyb20gJy4uLy4uL3NoYXJlZC9zdGF0ZS9zdGF0ZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxuICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9nYW1lL2dhbWUuY29tcG9uZW50Lmh0bWxcIixcbiAgcHJvdmlkZXJzOiBbU3RhdGVTZXJ2aWNlLCBTY29yZVNlcnZpY2VdLFxuICBzdHlsZVVybHM6IFtcInBhZ2VzL2dhbWUvZ2FtZS1jb21tb24uY3NzXCIsIFwicGFnZXMvZ2FtZS9nYW1lLmNzc1wiXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxuXG59KVxuZXhwb3J0IGNsYXNzIEdhbWVDb21wb25lbnQgZXh0ZW5kcyBCYXNlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZChcImNvbnRhaW5lclwiKSBjb250YWluZXI6IEVsZW1lbnRSZWY7XG4gIGlzSGlnaFNjb3JlQnV0dG9uOiBCb29sZWFuO1xuICBpc0RldjogQm9vbGVhbjtcbiAgdGl0bGU6IHN0cmluZztcbiAgaGlnaFNjb3JlczogU2NvcmVbXTtcbiAgbGV2ZWw6IG51bWJlcjtcbiAgaXNMb2FkaW5nOiBCb29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfcGFnZTogUGFnZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfc2NvcmVTZXJ2aWNlOiBTY29yZVNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3N0YXRlU2VydmljZTogU3RhdGVTZXJ2aWNlKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5pc0hpZ2hTY29yZUJ1dHRvbiA9IGZhbHNlO1xuICAgIHRoaXMuaXNEZXYgPSBDb25maWcuaXNEZXY7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChfc3RhdGVTZXJ2aWNlLnN0YXRlQ2hhbmdlJFxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKHN0YXRlOiBhbnkpID0+IHRoaXMub25TdGF0ZVNlcnZpY2VEYXRhQ2hhbmdlKHN0YXRlKVxuICAgICAgKSk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChfc2NvcmVTZXJ2aWNlLmRhdGFDaGFuZ2UkXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoc2NvcmVzOiBhbnkpID0+IHRoaXMub25TY29yZVNlcnZpY2VEYXRhQ2hhbmdlKHNjb3JlcylcbiAgICAgICkpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy50aXRsZSA9IENvbmZpZy50aXRsZTtcbiAgfVxuXG4gIG9uU3RhdGVTZXJ2aWNlRGF0YUNoYW5nZShzdGF0ZTogU3RhdGVbXSkge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnZ2FtZS5jb21wb25lbnQnLCAnb25TdGF0ZVNlcnZpY2VEYXRhQ2hhbmdlJyk7XG4gICAgbGV0IGxldmVsOiBzdHJpbmcgPSB0aGlzLl9zdGF0ZVNlcnZpY2UuZ2V0S2V5VmFsdWUoJ2xldmVsJyk7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdnYW1lLmNvbXBvbmVudCcsICdsZXZlbCA9ICcgKyBsZXZlbCk7XG4gICAgaWYgKGxldmVsKSB7XG4gICAgICB0aGlzLl9zY29yZVNlcnZpY2UubGV2ZWwgPSB0aGlzLmxldmVsID0gTnVtYmVyKGxldmVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2NvcmVTZXJ2aWNlLmxldmVsID0gdGhpcy5sZXZlbCA9IENvbmZpZy5kZWZhdWx0TGV2ZWw7XG4gICAgfVxuICB9XG5cbiAgb25TY29yZVNlcnZpY2VEYXRhQ2hhbmdlKHNjb3JlczogU2NvcmVbXSkge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnZ2FtZS5jb21wb25lbnQnLCAnb25TY29yZVNlcnZpY2VEYXRhQ2hhbmdlJyk7XG4gICAgaWYgKHNjb3Jlcykge1xuICAgICAgdGhpcy5oaWdoU2NvcmVzID0gc2NvcmVzO1xuICAgICAgaWYgKHRoaXMuaGlnaFNjb3JlcyAmJiB0aGlzLmhpZ2hTY29yZXMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuaXNIaWdoU2NvcmVCdXR0b24gPSB0cnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBvblBsYXlUYXAoKSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdnYW1lLmNvbXBvbmVudCcsICdvblBsYXlUYXAnKTtcblxuICAgIHN3aXRjaCh0aGlzLmxldmVsKSB7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJy9sZXZlbC10aHJlZSddLCBDb25maWcudHJhbnNpdGlvbldpdGhIaXN0b3J5KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJy9sZXZlbC10d28nXSwgQ29uZmlnLnRyYW5zaXRpb25XaXRoSGlzdG9yeSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnL2xldmVsLW9uZSddLCBDb25maWcudHJhbnNpdGlvbldpdGhIaXN0b3J5KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==