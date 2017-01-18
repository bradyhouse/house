"use strict";
var Dialogs = require('ui/dialogs'), frame = require('ui/frame');
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var base_1 = require("../../base");
var config_1 = require("../../shared/config");
var score_service_1 = require("../../shared/score/score.service");
var state_service_1 = require("../../shared/state/state.service");
var HighScoreComponent = (function (_super) {
    __extends(HighScoreComponent, _super);
    function HighScoreComponent(_router, _page, _scoreService, _stateService) {
        var _this = _super.call(this) || this;
        _this._router = _router;
        _this._page = _page;
        _this._scoreService = _scoreService;
        _this._stateService = _stateService;
        _this.highScores = [];
        _this.isHighScores = false;
        _this.isLoading = true;
        _this.lastRow = 2;
        _this.isDev = config_1.Config.isDev === true ? true : false;
        _this.title = config_1.Config.title + ' - High Scores';
        _this.subscriptions.push(_stateService.stateChange$
            .subscribe(function (state) { return _this.onStateServiceDataChange(state); }));
        _this.subscriptions.push(_scoreService.dataChange$
            .subscribe(function (scores) { return _this.onScoreServiceDataChange(scores); }));
        _this.subscriptions.push(_scoreService.nextRowChange$
            .subscribe(function (row) { return _this.onNextRowChange(row); }));
        return _this;
    }
    HighScoreComponent.prototype.onStateServiceDataChange = function (state) {
        this.consoleLogMsg('high-score.component', 'onStateServiceDataChange');
        var level = this._stateService.getKeyValue('level');
        this.consoleLogMsg('high-score.component', 'level = ' + level);
        if (level) {
            this._scoreService.level = this.level = Number(level);
        }
        else {
            this._scoreService.level = this.level = config_1.Config.defaultLevel;
        }
    };
    HighScoreComponent.prototype.onScoreServiceDataChange = function (scores) {
        this.consoleLogMsg('high-score.component', 'onScoreServiceDataChange');
        if (scores) {
            this.isHighScores = scores.length > 0 ? true : false;
            this.highScores = scores;
            this.consoleLogArray(this.highScores);
            this.isLoading = false;
        }
    };
    HighScoreComponent.prototype.onNextRowChange = function (row) {
        this.consoleLogMsg('high-score.component', 'onNextRowChange');
        this.lastRow = row;
    };
    HighScoreComponent.prototype.onResetButtonTap = function () {
        var _this = this;
        this.consoleLogMsg('high-score.component', 'onResetButtonTap');
        Dialogs.confirm("Are you sure you want delete all high scores?").then(function (result) {
            if (result) {
                _this.isLoading = true;
                _this._scoreService.truncate();
                _this._stateService.truncate();
                _this._router.navigate(['']);
            }
        });
    };
    HighScoreComponent.prototype.onAddButtonTap = function () {
        this.consoleLogMsg('high-score.component', 'onAddButtonTap');
        this._router.navigate([
            'add-high-score/:level:moves:caller', {
                moves: '49',
                level: '1',
                caller: 'high-score'
            }
        ]);
    };
    HighScoreComponent.prototype.onHighScore = function () {
        console.log('onHighScore');
        /*var navigationEntry = {
         moduleName: "view/high-score/add-high-score/add-high-score",
         context: {
         moves: 43,
         level: 1,
         callingModuleName: "view/high-score/high-score"
         },
         animated: false
         };
         frame.topmost().navigate(navigationEntry);*/
    };
    return HighScoreComponent;
}(base_1.Base));
HighScoreComponent = __decorate([
    core_1.Component({
        selector: 'high-score',
        templateUrl: 'pages/high-score/high-score.component.html',
        styleUrls: ['pages/high-score/high-score-common.css', 'pages/high-score/high-score.css'],
        providers: [state_service_1.StateService, score_service_1.ScoreService]
    }),
    __metadata("design:paramtypes", [router_1.Router,
        page_1.Page,
        score_service_1.ScoreService,
        state_service_1.StateService])
], HighScoreComponent);
exports.HighScoreComponent = HighScoreComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaC1zY29yZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoaWdoLXNjb3JlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUNuQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRTlCLHNDQUF1RTtBQUV2RSwwQ0FBdUM7QUFDdkMsZ0NBQTZCO0FBRzdCLG1DQUFnQztBQUNoQyw4Q0FBMkM7QUFFM0Msa0VBQThEO0FBRTlELGtFQUE4RDtBQVE5RCxJQUFhLGtCQUFrQjtJQUFTLHNDQUFJO0lBUzFDLDRCQUFvQixPQUFlLEVBQ2YsS0FBVyxFQUNYLGFBQTJCLEVBQzNCLGFBQTJCO1FBSC9DLFlBSUUsaUJBQU8sU0FxQlI7UUF6Qm1CLGFBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixXQUFLLEdBQUwsS0FBSyxDQUFNO1FBQ1gsbUJBQWEsR0FBYixhQUFhLENBQWM7UUFDM0IsbUJBQWEsR0FBYixhQUFhLENBQWM7UUFYL0MsZ0JBQVUsR0FBaUIsRUFBRSxDQUFDO1FBYTVCLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzFCLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLEtBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxLQUFLLEdBQUcsZUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNsRCxLQUFJLENBQUMsS0FBSyxHQUFHLGVBQU0sQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUM7UUFFN0MsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVk7YUFDL0MsU0FBUyxDQUNSLFVBQUMsS0FBVSxJQUFLLE9BQUEsS0FBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxFQUFwQyxDQUFvQyxDQUNyRCxDQUFDLENBQUM7UUFFTCxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVzthQUM5QyxTQUFTLENBQ1IsVUFBQyxNQUFXLElBQUssT0FBQSxLQUFJLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDLEVBQXJDLENBQXFDLENBQ3ZELENBQUMsQ0FBQztRQUVMLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjO2FBQ2pELFNBQVMsQ0FDUixVQUFDLEdBQVEsSUFBSyxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEVBQXpCLENBQXlCLENBQ3hDLENBQUMsQ0FBQzs7SUFDUCxDQUFDO0lBRUQscURBQXdCLEdBQXhCLFVBQXlCLEtBQWM7UUFDckMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksS0FBSyxHQUFXLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxhQUFhLENBQUMsc0JBQXNCLEVBQUUsVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQy9ELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDVixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLGVBQU0sQ0FBQyxZQUFZLENBQUM7UUFDOUQsQ0FBQztJQUNILENBQUM7SUFFRCxxREFBd0IsR0FBeEIsVUFBeUIsTUFBZTtRQUN0QyxJQUFJLENBQUMsYUFBYSxDQUFDLHNCQUFzQixFQUFFLDBCQUEwQixDQUFDLENBQUM7UUFDdkUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUNyRCxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztZQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDO0lBQ0gsQ0FBQztJQUVELDRDQUFlLEdBQWYsVUFBZ0IsR0FBVTtRQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLHNCQUFzQixFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7SUFDckIsQ0FBQztJQUVELDZDQUFnQixHQUFoQjtRQUFBLGlCQVVDO1FBVEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQy9ELE9BQU8sQ0FBQyxPQUFPLENBQUMsK0NBQStDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFXO1lBQ2hGLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLEtBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzlCLEtBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzlCLEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM5QixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsMkNBQWMsR0FBZDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsc0JBQXNCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUNwQixvQ0FBb0MsRUFBRTtnQkFDcEMsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsTUFBTSxFQUFFLFlBQVk7YUFDckI7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsd0NBQVcsR0FBWDtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFHM0I7Ozs7Ozs7OztxREFTNkM7SUFDL0MsQ0FBQztJQUVILHlCQUFDO0FBQUQsQ0FBQyxBQXJHRCxDQUF3QyxXQUFJLEdBcUczQztBQXJHWSxrQkFBa0I7SUFOOUIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFdBQVcsRUFBRSw0Q0FBNEM7UUFDekQsU0FBUyxFQUFFLENBQUMsd0NBQXdDLEVBQUUsaUNBQWlDLENBQUM7UUFDeEYsU0FBUyxFQUFFLENBQUMsNEJBQVksRUFBRSw0QkFBWSxDQUFDO0tBQ3hDLENBQUM7cUNBVTZCLGVBQU07UUFDUixXQUFJO1FBQ0ksNEJBQVk7UUFDWiw0QkFBWTtHQVpwQyxrQkFBa0IsQ0FxRzlCO0FBckdZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERpYWxvZ3MgPSByZXF1aXJlKCd1aS9kaWFsb2dzJyksXG4gIGZyYW1lID0gcmVxdWlyZSgndWkvZnJhbWUnKTtcblxuaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Vmlld30gZnJvbSAndWkvY29yZS92aWV3JztcbmltcG9ydCB7Um91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtQYWdlfSBmcm9tICd1aS9wYWdlJztcbmltcG9ydCB7Q29sb3J9IGZyb20gJ2NvbG9yJztcblxuaW1wb3J0IHtCYXNlfSBmcm9tICcuLi8uLi9iYXNlJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuLi8uLi9zaGFyZWQvY29uZmlnJztcbmltcG9ydCB7U2NvcmV9IGZyb20gJy4uLy4uL3NoYXJlZC9zY29yZS9zY29yZSc7XG5pbXBvcnQge1Njb3JlU2VydmljZX0gZnJvbSAnLi4vLi4vc2hhcmVkL3Njb3JlL3Njb3JlLnNlcnZpY2UnO1xuaW1wb3J0IHtTdGF0ZX0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0YXRlL1N0YXRlJztcbmltcG9ydCB7U3RhdGVTZXJ2aWNlfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RhdGUvc3RhdGUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2hpZ2gtc2NvcmUnLFxuICB0ZW1wbGF0ZVVybDogJ3BhZ2VzL2hpZ2gtc2NvcmUvaGlnaC1zY29yZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwYWdlcy9oaWdoLXNjb3JlL2hpZ2gtc2NvcmUtY29tbW9uLmNzcycsICdwYWdlcy9oaWdoLXNjb3JlL2hpZ2gtc2NvcmUuY3NzJ10sXG4gIHByb3ZpZGVyczogW1N0YXRlU2VydmljZSwgU2NvcmVTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBIaWdoU2NvcmVDb21wb25lbnQgZXh0ZW5kcyBCYXNlIHtcbiAgaGlnaFNjb3JlczogQXJyYXk8U2NvcmU+ID0gW107XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGlzRGV2OiBCb29sZWFuO1xuICBpc0hpZ2hTY29yZXM6IEJvb2xlYW47XG4gIGlzTG9hZGluZzogQm9vbGVhbjtcbiAgbGFzdFJvdzogbnVtYmVyO1xuICBsZXZlbDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlcjogUm91dGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIF9wYWdlOiBQYWdlLFxuICAgICAgICAgICAgICBwcml2YXRlIF9zY29yZVNlcnZpY2U6IFNjb3JlU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfc3RhdGVTZXJ2aWNlOiBTdGF0ZVNlcnZpY2UpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuaXNIaWdoU2NvcmVzID0gZmFsc2U7XG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMubGFzdFJvdyA9IDI7XG4gICAgdGhpcy5pc0RldiA9IENvbmZpZy5pc0RldiA9PT0gdHJ1ZSA/IHRydWUgOiBmYWxzZTtcbiAgICB0aGlzLnRpdGxlID0gQ29uZmlnLnRpdGxlICsgJyAtIEhpZ2ggU2NvcmVzJztcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKF9zdGF0ZVNlcnZpY2Uuc3RhdGVDaGFuZ2UkXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoc3RhdGU6IGFueSkgPT4gdGhpcy5vblN0YXRlU2VydmljZURhdGFDaGFuZ2Uoc3RhdGUpXG4gICAgICApKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKF9zY29yZVNlcnZpY2UuZGF0YUNoYW5nZSRcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIChzY29yZXM6IGFueSkgPT4gdGhpcy5vblNjb3JlU2VydmljZURhdGFDaGFuZ2Uoc2NvcmVzKVxuICAgICAgKSk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChfc2NvcmVTZXJ2aWNlLm5leHRSb3dDaGFuZ2UkXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAocm93OiBhbnkpID0+IHRoaXMub25OZXh0Um93Q2hhbmdlKHJvdylcbiAgICAgICkpO1xuICB9XG5cbiAgb25TdGF0ZVNlcnZpY2VEYXRhQ2hhbmdlKHN0YXRlOiBTdGF0ZVtdKSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdoaWdoLXNjb3JlLmNvbXBvbmVudCcsICdvblN0YXRlU2VydmljZURhdGFDaGFuZ2UnKTtcbiAgICBsZXQgbGV2ZWw6IHN0cmluZyA9IHRoaXMuX3N0YXRlU2VydmljZS5nZXRLZXlWYWx1ZSgnbGV2ZWwnKTtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2hpZ2gtc2NvcmUuY29tcG9uZW50JywgJ2xldmVsID0gJyArIGxldmVsKTtcbiAgICBpZiAobGV2ZWwpIHtcbiAgICAgIHRoaXMuX3Njb3JlU2VydmljZS5sZXZlbCA9IHRoaXMubGV2ZWwgPSBOdW1iZXIobGV2ZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zY29yZVNlcnZpY2UubGV2ZWwgPSB0aGlzLmxldmVsID0gQ29uZmlnLmRlZmF1bHRMZXZlbDtcbiAgICB9XG4gIH1cblxuICBvblNjb3JlU2VydmljZURhdGFDaGFuZ2Uoc2NvcmVzOiBTY29yZVtdKSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdoaWdoLXNjb3JlLmNvbXBvbmVudCcsICdvblNjb3JlU2VydmljZURhdGFDaGFuZ2UnKTtcbiAgICBpZiAoc2NvcmVzKSB7XG4gICAgICB0aGlzLmlzSGlnaFNjb3JlcyA9IHNjb3Jlcy5sZW5ndGggPiAwID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgdGhpcy5oaWdoU2NvcmVzID0gc2NvcmVzO1xuICAgICAgdGhpcy5jb25zb2xlTG9nQXJyYXkodGhpcy5oaWdoU2NvcmVzKTtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgb25OZXh0Um93Q2hhbmdlKHJvdzpudW1iZXIpIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2hpZ2gtc2NvcmUuY29tcG9uZW50JywgJ29uTmV4dFJvd0NoYW5nZScpO1xuICAgIHRoaXMubGFzdFJvdyA9IHJvdztcbiAgfVxuXG4gIG9uUmVzZXRCdXR0b25UYXAoKSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdoaWdoLXNjb3JlLmNvbXBvbmVudCcsICdvblJlc2V0QnV0dG9uVGFwJyk7XG4gICAgRGlhbG9ncy5jb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IGRlbGV0ZSBhbGwgaGlnaCBzY29yZXM/XCIpLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fc2NvcmVTZXJ2aWNlLnRydW5jYXRlKCk7XG4gICAgICAgIHRoaXMuX3N0YXRlU2VydmljZS50cnVuY2F0ZSgpO1xuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycnXSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBvbkFkZEJ1dHRvblRhcCgpIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2hpZ2gtc2NvcmUuY29tcG9uZW50JywgJ29uQWRkQnV0dG9uVGFwJyk7XG4gICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICdhZGQtaGlnaC1zY29yZS86bGV2ZWw6bW92ZXM6Y2FsbGVyJywge1xuICAgICAgICBtb3ZlczogJzQ5JyxcbiAgICAgICAgbGV2ZWw6ICcxJyxcbiAgICAgICAgY2FsbGVyOiAnaGlnaC1zY29yZSdcbiAgICAgIH1cbiAgICBdKTtcbiAgfVxuXG4gIG9uSGlnaFNjb3JlKCkge1xuICAgIGNvbnNvbGUubG9nKCdvbkhpZ2hTY29yZScpO1xuXG5cbiAgICAvKnZhciBuYXZpZ2F0aW9uRW50cnkgPSB7XG4gICAgIG1vZHVsZU5hbWU6IFwidmlldy9oaWdoLXNjb3JlL2FkZC1oaWdoLXNjb3JlL2FkZC1oaWdoLXNjb3JlXCIsXG4gICAgIGNvbnRleHQ6IHtcbiAgICAgbW92ZXM6IDQzLFxuICAgICBsZXZlbDogMSxcbiAgICAgY2FsbGluZ01vZHVsZU5hbWU6IFwidmlldy9oaWdoLXNjb3JlL2hpZ2gtc2NvcmVcIlxuICAgICB9LFxuICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgfTtcbiAgICAgZnJhbWUudG9wbW9zdCgpLm5hdmlnYXRlKG5hdmlnYXRpb25FbnRyeSk7Ki9cbiAgfVxuXG59XG4iXX0=