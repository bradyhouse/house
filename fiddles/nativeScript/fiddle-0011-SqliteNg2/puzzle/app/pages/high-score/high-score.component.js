"use strict";
var Dialogs = require('ui/dialogs'), frame = require('ui/frame');
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
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
        ], {
            clearHistory: true
        });
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
    __metadata("design:paramtypes", [router_1.RouterExtensions,
        page_1.Page,
        score_service_1.ScoreService,
        state_service_1.StateService])
], HighScoreComponent);
exports.HighScoreComponent = HighScoreComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaC1zY29yZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoaWdoLXNjb3JlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUNuQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRTlCLHNDQUF1RTtBQUV2RSxzREFBK0Q7QUFFL0QsZ0NBQTZCO0FBRzdCLG1DQUFnQztBQUNoQyw4Q0FBMkM7QUFFM0Msa0VBQThEO0FBRTlELGtFQUE4RDtBQVE5RCxJQUFhLGtCQUFrQjtJQUFTLHNDQUFJO0lBUzFDLDRCQUFvQixPQUF5QixFQUN6QixLQUFXLEVBQ1gsYUFBMkIsRUFDM0IsYUFBMkI7UUFIL0MsWUFJRSxpQkFBTyxTQXFCUjtRQXpCbUIsYUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFDekIsV0FBSyxHQUFMLEtBQUssQ0FBTTtRQUNYLG1CQUFhLEdBQWIsYUFBYSxDQUFjO1FBQzNCLG1CQUFhLEdBQWIsYUFBYSxDQUFjO1FBWC9DLGdCQUFVLEdBQWlCLEVBQUUsQ0FBQztRQWE1QixLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixLQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNqQixLQUFJLENBQUMsS0FBSyxHQUFHLGVBQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRyxLQUFLLENBQUM7UUFDbEQsS0FBSSxDQUFDLEtBQUssR0FBRyxlQUFNLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDO1FBRTdDLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZO2FBQy9DLFNBQVMsQ0FDUixVQUFDLEtBQVUsSUFBSyxPQUFBLEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsRUFBcEMsQ0FBb0MsQ0FDckQsQ0FBQyxDQUFDO1FBRUwsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVc7YUFDOUMsU0FBUyxDQUNSLFVBQUMsTUFBVyxJQUFLLE9BQUEsS0FBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxFQUFyQyxDQUFxQyxDQUN2RCxDQUFDLENBQUM7UUFFTCxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYzthQUNqRCxTQUFTLENBQ1IsVUFBQyxHQUFRLElBQUssT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUF6QixDQUF5QixDQUN4QyxDQUFDLENBQUM7O0lBQ1AsQ0FBQztJQUVELHFEQUF3QixHQUF4QixVQUF5QixLQUFjO1FBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsc0JBQXNCLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztRQUN2RSxJQUFJLEtBQUssR0FBVyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsYUFBYSxDQUFDLHNCQUFzQixFQUFFLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUMvRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFNLENBQUMsWUFBWSxDQUFDO1FBQzlELENBQUM7SUFDSCxDQUFDO0lBRUQscURBQXdCLEdBQXhCLFVBQXlCLE1BQWU7UUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO1FBQ3ZFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxLQUFLLENBQUM7WUFDckQsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7WUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDekIsQ0FBQztJQUNILENBQUM7SUFFRCw0Q0FBZSxHQUFmLFVBQWdCLEdBQVU7UUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO0lBQ3JCLENBQUM7SUFFRCw2Q0FBZ0IsR0FBaEI7UUFBQSxpQkFVQztRQVRDLElBQUksQ0FBQyxhQUFhLENBQUMsc0JBQXNCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUMvRCxPQUFPLENBQUMsT0FBTyxDQUFDLCtDQUErQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBVztZQUNoRixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNYLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixLQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUM5QixLQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUM5QixLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDOUIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDJDQUFjLEdBQWQ7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLHNCQUFzQixFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7WUFDcEIsb0NBQW9DLEVBQUU7Z0JBQ3BDLEtBQUssRUFBRSxJQUFJO2dCQUNYLEtBQUssRUFBRSxHQUFHO2dCQUNWLE1BQU0sRUFBRSxZQUFZO2FBQ3JCO1NBQ0YsRUFBRTtZQUNELFlBQVksRUFBRSxJQUFJO1NBQ25CLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCx3Q0FBVyxHQUFYO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUczQjs7Ozs7Ozs7O3FEQVM2QztJQUMvQyxDQUFDO0lBRUgseUJBQUM7QUFBRCxDQUFDLEFBdkdELENBQXdDLFdBQUksR0F1RzNDO0FBdkdZLGtCQUFrQjtJQU45QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFlBQVk7UUFDdEIsV0FBVyxFQUFFLDRDQUE0QztRQUN6RCxTQUFTLEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRSxpQ0FBaUMsQ0FBQztRQUN4RixTQUFTLEVBQUUsQ0FBQyw0QkFBWSxFQUFFLDRCQUFZLENBQUM7S0FDeEMsQ0FBQztxQ0FVNkIseUJBQWdCO1FBQ2xCLFdBQUk7UUFDSSw0QkFBWTtRQUNaLDRCQUFZO0dBWnBDLGtCQUFrQixDQXVHOUI7QUF2R1ksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRGlhbG9ncyA9IHJlcXVpcmUoJ3VpL2RpYWxvZ3MnKSxcbiAgZnJhbWUgPSByZXF1aXJlKCd1aS9mcmFtZScpO1xuXG5pbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtWaWV3fSBmcm9tICd1aS9jb3JlL3ZpZXcnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcblxuaW1wb3J0IHtQYWdlfSBmcm9tICd1aS9wYWdlJztcbmltcG9ydCB7Q29sb3J9IGZyb20gJ2NvbG9yJztcblxuaW1wb3J0IHtCYXNlfSBmcm9tICcuLi8uLi9iYXNlJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuLi8uLi9zaGFyZWQvY29uZmlnJztcbmltcG9ydCB7U2NvcmV9IGZyb20gJy4uLy4uL3NoYXJlZC9zY29yZS9zY29yZSc7XG5pbXBvcnQge1Njb3JlU2VydmljZX0gZnJvbSAnLi4vLi4vc2hhcmVkL3Njb3JlL3Njb3JlLnNlcnZpY2UnO1xuaW1wb3J0IHtTdGF0ZX0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0YXRlL1N0YXRlJztcbmltcG9ydCB7U3RhdGVTZXJ2aWNlfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RhdGUvc3RhdGUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2hpZ2gtc2NvcmUnLFxuICB0ZW1wbGF0ZVVybDogJ3BhZ2VzL2hpZ2gtc2NvcmUvaGlnaC1zY29yZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwYWdlcy9oaWdoLXNjb3JlL2hpZ2gtc2NvcmUtY29tbW9uLmNzcycsICdwYWdlcy9oaWdoLXNjb3JlL2hpZ2gtc2NvcmUuY3NzJ10sXG4gIHByb3ZpZGVyczogW1N0YXRlU2VydmljZSwgU2NvcmVTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBIaWdoU2NvcmVDb21wb25lbnQgZXh0ZW5kcyBCYXNlIHtcbiAgaGlnaFNjb3JlczogQXJyYXk8U2NvcmU+ID0gW107XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGlzRGV2OiBCb29sZWFuO1xuICBpc0hpZ2hTY29yZXM6IEJvb2xlYW47XG4gIGlzTG9hZGluZzogQm9vbGVhbjtcbiAgbGFzdFJvdzogbnVtYmVyO1xuICBsZXZlbDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfcGFnZTogUGFnZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfc2NvcmVTZXJ2aWNlOiBTY29yZVNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3N0YXRlU2VydmljZTogU3RhdGVTZXJ2aWNlKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmlzSGlnaFNjb3JlcyA9IGZhbHNlO1xuICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmxhc3RSb3cgPSAyO1xuICAgIHRoaXMuaXNEZXYgPSBDb25maWcuaXNEZXYgPT09IHRydWUgPyB0cnVlIDogZmFsc2U7XG4gICAgdGhpcy50aXRsZSA9IENvbmZpZy50aXRsZSArICcgLSBIaWdoIFNjb3Jlcyc7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChfc3RhdGVTZXJ2aWNlLnN0YXRlQ2hhbmdlJFxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKHN0YXRlOiBhbnkpID0+IHRoaXMub25TdGF0ZVNlcnZpY2VEYXRhQ2hhbmdlKHN0YXRlKVxuICAgICAgKSk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChfc2NvcmVTZXJ2aWNlLmRhdGFDaGFuZ2UkXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoc2NvcmVzOiBhbnkpID0+IHRoaXMub25TY29yZVNlcnZpY2VEYXRhQ2hhbmdlKHNjb3JlcylcbiAgICAgICkpO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goX3Njb3JlU2VydmljZS5uZXh0Um93Q2hhbmdlJFxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKHJvdzogYW55KSA9PiB0aGlzLm9uTmV4dFJvd0NoYW5nZShyb3cpXG4gICAgICApKTtcbiAgfVxuXG4gIG9uU3RhdGVTZXJ2aWNlRGF0YUNoYW5nZShzdGF0ZTogU3RhdGVbXSkge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnaGlnaC1zY29yZS5jb21wb25lbnQnLCAnb25TdGF0ZVNlcnZpY2VEYXRhQ2hhbmdlJyk7XG4gICAgbGV0IGxldmVsOiBzdHJpbmcgPSB0aGlzLl9zdGF0ZVNlcnZpY2UuZ2V0S2V5VmFsdWUoJ2xldmVsJyk7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdoaWdoLXNjb3JlLmNvbXBvbmVudCcsICdsZXZlbCA9ICcgKyBsZXZlbCk7XG4gICAgaWYgKGxldmVsKSB7XG4gICAgICB0aGlzLl9zY29yZVNlcnZpY2UubGV2ZWwgPSB0aGlzLmxldmVsID0gTnVtYmVyKGxldmVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2NvcmVTZXJ2aWNlLmxldmVsID0gdGhpcy5sZXZlbCA9IENvbmZpZy5kZWZhdWx0TGV2ZWw7XG4gICAgfVxuICB9XG5cbiAgb25TY29yZVNlcnZpY2VEYXRhQ2hhbmdlKHNjb3JlczogU2NvcmVbXSkge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnaGlnaC1zY29yZS5jb21wb25lbnQnLCAnb25TY29yZVNlcnZpY2VEYXRhQ2hhbmdlJyk7XG4gICAgaWYgKHNjb3Jlcykge1xuICAgICAgdGhpcy5pc0hpZ2hTY29yZXMgPSBzY29yZXMubGVuZ3RoID4gMCA/IHRydWUgOiBmYWxzZTtcbiAgICAgIHRoaXMuaGlnaFNjb3JlcyA9IHNjb3JlcztcbiAgICAgIHRoaXMuY29uc29sZUxvZ0FycmF5KHRoaXMuaGlnaFNjb3Jlcyk7XG4gICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG9uTmV4dFJvd0NoYW5nZShyb3c6bnVtYmVyKSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdoaWdoLXNjb3JlLmNvbXBvbmVudCcsICdvbk5leHRSb3dDaGFuZ2UnKTtcbiAgICB0aGlzLmxhc3RSb3cgPSByb3c7XG4gIH1cblxuICBvblJlc2V0QnV0dG9uVGFwKCkge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnaGlnaC1zY29yZS5jb21wb25lbnQnLCAnb25SZXNldEJ1dHRvblRhcCcpO1xuICAgIERpYWxvZ3MuY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCBkZWxldGUgYWxsIGhpZ2ggc2NvcmVzP1wiKS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuX3Njb3JlU2VydmljZS50cnVuY2F0ZSgpO1xuICAgICAgICB0aGlzLl9zdGF0ZVNlcnZpY2UudHJ1bmNhdGUoKTtcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnJ10pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb25BZGRCdXR0b25UYXAoKSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdoaWdoLXNjb3JlLmNvbXBvbmVudCcsICdvbkFkZEJ1dHRvblRhcCcpO1xuICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXG4gICAgICAnYWRkLWhpZ2gtc2NvcmUvOmxldmVsOm1vdmVzOmNhbGxlcicsIHtcbiAgICAgICAgbW92ZXM6ICc0OScsXG4gICAgICAgIGxldmVsOiAnMScsXG4gICAgICAgIGNhbGxlcjogJ2hpZ2gtc2NvcmUnXG4gICAgICB9XG4gICAgXSwge1xuICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICBvbkhpZ2hTY29yZSgpIHtcbiAgICBjb25zb2xlLmxvZygnb25IaWdoU2NvcmUnKTtcblxuXG4gICAgLyp2YXIgbmF2aWdhdGlvbkVudHJ5ID0ge1xuICAgICBtb2R1bGVOYW1lOiBcInZpZXcvaGlnaC1zY29yZS9hZGQtaGlnaC1zY29yZS9hZGQtaGlnaC1zY29yZVwiLFxuICAgICBjb250ZXh0OiB7XG4gICAgIG1vdmVzOiA0MyxcbiAgICAgbGV2ZWw6IDEsXG4gICAgIGNhbGxpbmdNb2R1bGVOYW1lOiBcInZpZXcvaGlnaC1zY29yZS9oaWdoLXNjb3JlXCJcbiAgICAgfSxcbiAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgIH07XG4gICAgIGZyYW1lLnRvcG1vc3QoKS5uYXZpZ2F0ZShuYXZpZ2F0aW9uRW50cnkpOyovXG4gIH1cblxufVxuIl19