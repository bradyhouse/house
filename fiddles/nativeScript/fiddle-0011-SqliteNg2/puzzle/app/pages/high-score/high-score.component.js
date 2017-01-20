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
                _this._router.navigate([''], config_1.Config.transitionWithoutHistory);
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
        ], config_1.Config.transitionWithoutHistory);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaC1zY29yZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoaWdoLXNjb3JlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUNuQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRTlCLHNDQUF1RTtBQUV2RSxzREFBK0Q7QUFFL0QsZ0NBQTZCO0FBRzdCLG1DQUFnQztBQUNoQyw4Q0FBMkM7QUFFM0Msa0VBQThEO0FBRTlELGtFQUE4RDtBQVE5RCxJQUFhLGtCQUFrQjtJQUFTLHNDQUFJO0lBUzFDLDRCQUFvQixPQUF5QixFQUN6QixLQUFXLEVBQ1gsYUFBMkIsRUFDM0IsYUFBMkI7UUFIL0MsWUFJRSxpQkFBTyxTQXFCUjtRQXpCbUIsYUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFDekIsV0FBSyxHQUFMLEtBQUssQ0FBTTtRQUNYLG1CQUFhLEdBQWIsYUFBYSxDQUFjO1FBQzNCLG1CQUFhLEdBQWIsYUFBYSxDQUFjO1FBWC9DLGdCQUFVLEdBQWlCLEVBQUUsQ0FBQztRQWE1QixLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixLQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNqQixLQUFJLENBQUMsS0FBSyxHQUFHLGVBQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRyxLQUFLLENBQUM7UUFDbEQsS0FBSSxDQUFDLEtBQUssR0FBRyxlQUFNLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDO1FBRTdDLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZO2FBQy9DLFNBQVMsQ0FDUixVQUFDLEtBQVUsSUFBSyxPQUFBLEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsRUFB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Q3BCLG9DQUFvQyxFQUFFO2dCQUNwQyxLQUFLLEVBQUUsSUFBSTtnQkFDWCxLQUFLLEVBQUUsR0FBRztnQkFDVixNQUFNLEVBQUUsWUFBWTthQUNyQjtTQUNGLEVBQUUsZUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVILHlCQUFDO0FBQUQsQ0FBQyxBQXJGRCxDQUF3QyxXQUFJLEdBcUYzQztBQXJGWSxrQkFBa0I7SUFOOUIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFdBQVcsRUFBRSw0Q0FBNEM7UUFDekQsU0FBUyxFQUFFLENBQUMsd0NBQXdDLEVBQUUsaUNBQWlDLENBQUM7UUFDeEYsU0FBUyxFQUFFLENBQUMsNEJBQVksRUFBRSw0QkFBWSxDQUFDO0tBQ3hDLENBQUM7cUNBVTZCLHlCQUFnQjtRQUNsQixXQUFJO1FBQ0ksNEJBQVk7UUFDWiw0QkFBWTtHQVpwQyxrQkFBa0IsQ0FxRjlCO0FBckZZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERpYWxvZ3MgPSByZXF1aXJlKCd1aS9kaWFsb2dzJyksXG4gIGZyYW1lID0gcmVxdWlyZSgndWkvZnJhbWUnKTtcblxuaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Vmlld30gZnJvbSAndWkvY29yZS92aWV3JztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7UGFnZX0gZnJvbSAndWkvcGFnZSc7XG5pbXBvcnQge0NvbG9yfSBmcm9tICdjb2xvcic7XG5cbmltcG9ydCB7QmFzZX0gZnJvbSAnLi4vLi4vYmFzZSc7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi4vLi4vc2hhcmVkL2NvbmZpZyc7XG5pbXBvcnQge1Njb3JlfSBmcm9tICcuLi8uLi9zaGFyZWQvc2NvcmUvc2NvcmUnO1xuaW1wb3J0IHtTY29yZVNlcnZpY2V9IGZyb20gJy4uLy4uL3NoYXJlZC9zY29yZS9zY29yZS5zZXJ2aWNlJztcbmltcG9ydCB7U3RhdGV9IGZyb20gJy4uLy4uL3NoYXJlZC9zdGF0ZS9TdGF0ZSc7XG5pbXBvcnQge1N0YXRlU2VydmljZX0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0YXRlL3N0YXRlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdoaWdoLXNjb3JlJyxcbiAgdGVtcGxhdGVVcmw6ICdwYWdlcy9oaWdoLXNjb3JlL2hpZ2gtc2NvcmUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsncGFnZXMvaGlnaC1zY29yZS9oaWdoLXNjb3JlLWNvbW1vbi5jc3MnLCAncGFnZXMvaGlnaC1zY29yZS9oaWdoLXNjb3JlLmNzcyddLFxuICBwcm92aWRlcnM6IFtTdGF0ZVNlcnZpY2UsIFNjb3JlU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgSGlnaFNjb3JlQ29tcG9uZW50IGV4dGVuZHMgQmFzZSB7XG4gIGhpZ2hTY29yZXM6IEFycmF5PFNjb3JlPiA9IFtdO1xuICB0aXRsZTogc3RyaW5nO1xuICBpc0RldjogQm9vbGVhbjtcbiAgaXNIaWdoU2NvcmVzOiBCb29sZWFuO1xuICBpc0xvYWRpbmc6IEJvb2xlYW47XG4gIGxhc3RSb3c6IG51bWJlcjtcbiAgbGV2ZWw6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3BhZ2U6IFBhZ2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3Njb3JlU2VydmljZTogU2NvcmVTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIF9zdGF0ZVNlcnZpY2U6IFN0YXRlU2VydmljZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5pc0hpZ2hTY29yZXMgPSBmYWxzZTtcbiAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5sYXN0Um93ID0gMjtcbiAgICB0aGlzLmlzRGV2ID0gQ29uZmlnLmlzRGV2ID09PSB0cnVlID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHRoaXMudGl0bGUgPSBDb25maWcudGl0bGUgKyAnIC0gSGlnaCBTY29yZXMnO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goX3N0YXRlU2VydmljZS5zdGF0ZUNoYW5nZSRcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIChzdGF0ZTogYW55KSA9PiB0aGlzLm9uU3RhdGVTZXJ2aWNlRGF0YUNoYW5nZShzdGF0ZSlcbiAgICAgICkpO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goX3Njb3JlU2VydmljZS5kYXRhQ2hhbmdlJFxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKHNjb3JlczogYW55KSA9PiB0aGlzLm9uU2NvcmVTZXJ2aWNlRGF0YUNoYW5nZShzY29yZXMpXG4gICAgICApKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKF9zY29yZVNlcnZpY2UubmV4dFJvd0NoYW5nZSRcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIChyb3c6IGFueSkgPT4gdGhpcy5vbk5leHRSb3dDaGFuZ2Uocm93KVxuICAgICAgKSk7XG4gIH1cblxuICBvblN0YXRlU2VydmljZURhdGFDaGFuZ2Uoc3RhdGU6IFN0YXRlW10pIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2hpZ2gtc2NvcmUuY29tcG9uZW50JywgJ29uU3RhdGVTZXJ2aWNlRGF0YUNoYW5nZScpO1xuICAgIGxldCBsZXZlbDogc3RyaW5nID0gdGhpcy5fc3RhdGVTZXJ2aWNlLmdldEtleVZhbHVlKCdsZXZlbCcpO1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnaGlnaC1zY29yZS5jb21wb25lbnQnLCAnbGV2ZWwgPSAnICsgbGV2ZWwpO1xuICAgIGlmIChsZXZlbCkge1xuICAgICAgdGhpcy5fc2NvcmVTZXJ2aWNlLmxldmVsID0gdGhpcy5sZXZlbCA9IE51bWJlcihsZXZlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3Njb3JlU2VydmljZS5sZXZlbCA9IHRoaXMubGV2ZWwgPSBDb25maWcuZGVmYXVsdExldmVsO1xuICAgIH1cbiAgfVxuXG4gIG9uU2NvcmVTZXJ2aWNlRGF0YUNoYW5nZShzY29yZXM6IFNjb3JlW10pIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2hpZ2gtc2NvcmUuY29tcG9uZW50JywgJ29uU2NvcmVTZXJ2aWNlRGF0YUNoYW5nZScpO1xuICAgIGlmIChzY29yZXMpIHtcbiAgICAgIHRoaXMuaXNIaWdoU2NvcmVzID0gc2NvcmVzLmxlbmd0aCA+IDAgPyB0cnVlIDogZmFsc2U7XG4gICAgICB0aGlzLmhpZ2hTY29yZXMgPSBzY29yZXM7XG4gICAgICB0aGlzLmNvbnNvbGVMb2dBcnJheSh0aGlzLmhpZ2hTY29yZXMpO1xuICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBvbk5leHRSb3dDaGFuZ2Uocm93Om51bWJlcikge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnaGlnaC1zY29yZS5jb21wb25lbnQnLCAnb25OZXh0Um93Q2hhbmdlJyk7XG4gICAgdGhpcy5sYXN0Um93ID0gcm93O1xuICB9XG5cbiAgb25SZXNldEJ1dHRvblRhcCgpIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2hpZ2gtc2NvcmUuY29tcG9uZW50JywgJ29uUmVzZXRCdXR0b25UYXAnKTtcbiAgICBEaWFsb2dzLmNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgZGVsZXRlIGFsbCBoaWdoIHNjb3Jlcz9cIikudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLl9zY29yZVNlcnZpY2UudHJ1bmNhdGUoKTtcbiAgICAgICAgdGhpcy5fc3RhdGVTZXJ2aWNlLnRydW5jYXRlKCk7XG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJyddLCBDb25maWcudHJhbnNpdGlvbldpdGhvdXRIaXN0b3J5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG9uQWRkQnV0dG9uVGFwKCkge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnaGlnaC1zY29yZS5jb21wb25lbnQnLCAnb25BZGRCdXR0b25UYXAnKTtcbiAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgJ2FkZC1oaWdoLXNjb3JlLzpsZXZlbDptb3ZlczpjYWxsZXInLCB7XG4gICAgICAgIG1vdmVzOiAnNDknLFxuICAgICAgICBsZXZlbDogJzEnLFxuICAgICAgICBjYWxsZXI6ICdoaWdoLXNjb3JlJ1xuICAgICAgfVxuICAgIF0sIENvbmZpZy50cmFuc2l0aW9uV2l0aG91dEhpc3RvcnkpO1xuICB9XG5cbn1cbiJdfQ==