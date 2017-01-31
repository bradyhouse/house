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
        if (config_1.Config.isDev) {
            _this.title += ' (Dev Mode)';
        }
        _page.className = 'page';
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
                _this._router.navigate([''], config_1.Config.transition);
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
        ], config_1.Config.transition);
    };
    HighScoreComponent.prototype.onExitButtonTap = function () {
        this._router.backToPreviousPage();
    };
    HighScoreComponent.prototype.onNavBtnTap = function () {
        this._router.navigate([''], config_1.Config.transition);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaC1zY29yZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoaWdoLXNjb3JlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUNuQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRTlCLHNDQUF1RTtBQUV2RSxzREFBK0Q7QUFFL0QsZ0NBQTZCO0FBRzdCLG1DQUFnQztBQUNoQyw4Q0FBMkM7QUFFM0Msa0VBQThEO0FBRTlELGtFQUE4RDtBQVE5RCxJQUFhLGtCQUFrQjtJQUFTLHNDQUFJO0lBUzFDLDRCQUFvQixPQUF5QixFQUN6QixLQUFXLEVBQ1gsYUFBMkIsRUFDM0IsYUFBMkI7UUFIL0MsWUFJRSxpQkFBTyxTQTJCUjtRQS9CbUIsYUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFDekIsV0FBSyxHQUFMLEtBQUssQ0FBTTtRQUNYLG1CQUFhLEdBQWIsYUFBYSxDQUFjO1FBQzNCLG1CQUFhLEdBQWIsYUFBYSxDQUFjO1FBWC9DLGdCQUFVLEdBQWlCLEVBQUUsQ0FBQztRQWE1QixLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixLQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNqQixLQUFJLENBQUMsS0FBSyxHQUFHLGVBQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRyxLQUFLLENBQUM7UUFDbEQsS0FBSSxDQUFDLEtBQUssR0FBRyxlQUFNLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDO1FBRTdDLEVBQUUsQ0FBQyxDQUFDLGVBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLEtBQUksQ0FBQyxLQUFLLElBQUksYUFBYSxDQUFDO1FBQzlCLENBQUM7UUFFRCxLQUFLLENBQUMsU0FBUyxHQUFH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QUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDJDQUFjLEdBQWQ7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLHNCQUFzQixFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7WUFDcEIsb0NBQW9DLEVBQUU7Z0JBQ3BDLEtBQUssRUFBRSxJQUFJO2dCQUNYLEtBQUssRUFBRSxHQUFHO2dCQUNWLE1BQU0sRUFBRSxZQUFZO2FBQ3JCO1NBQ0YsRUFBRSxlQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELDRDQUFlLEdBQWY7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELHdDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLGVBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUgseUJBQUM7QUFBRCxDQUFDLEFBbkdELENBQXdDLFdBQUksR0FtRzNDO0FBbkdZLGtCQUFrQjtJQU45QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFlBQVk7UUFDdEIsV0FBVyxFQUFFLDRDQUE0QztRQUN6RCxTQUFTLEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRSxpQ0FBaUMsQ0FBQztRQUN4RixTQUFTLEVBQUUsQ0FBQyw0QkFBWSxFQUFFLDRCQUFZLENBQUM7S0FDeEMsQ0FBQztxQ0FVNkIseUJBQWdCO1FBQ2xCLFdBQUk7UUFDSSw0QkFBWTtRQUNaLDRCQUFZO0dBWnBDLGtCQUFrQixDQW1HOUI7QUFuR1ksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRGlhbG9ncyA9IHJlcXVpcmUoJ3VpL2RpYWxvZ3MnKSxcbiAgZnJhbWUgPSByZXF1aXJlKCd1aS9mcmFtZScpO1xuXG5pbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtWaWV3fSBmcm9tICd1aS9jb3JlL3ZpZXcnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcblxuaW1wb3J0IHtQYWdlfSBmcm9tICd1aS9wYWdlJztcbmltcG9ydCB7Q29sb3J9IGZyb20gJ2NvbG9yJztcblxuaW1wb3J0IHtCYXNlfSBmcm9tICcuLi8uLi9iYXNlJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuLi8uLi9zaGFyZWQvY29uZmlnJztcbmltcG9ydCB7U2NvcmV9IGZyb20gJy4uLy4uL3NoYXJlZC9zY29yZS9zY29yZSc7XG5pbXBvcnQge1Njb3JlU2VydmljZX0gZnJvbSAnLi4vLi4vc2hhcmVkL3Njb3JlL3Njb3JlLnNlcnZpY2UnO1xuaW1wb3J0IHtTdGF0ZX0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0YXRlL1N0YXRlJztcbmltcG9ydCB7U3RhdGVTZXJ2aWNlfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RhdGUvc3RhdGUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2hpZ2gtc2NvcmUnLFxuICB0ZW1wbGF0ZVVybDogJ3BhZ2VzL2hpZ2gtc2NvcmUvaGlnaC1zY29yZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwYWdlcy9oaWdoLXNjb3JlL2hpZ2gtc2NvcmUtY29tbW9uLmNzcycsICdwYWdlcy9oaWdoLXNjb3JlL2hpZ2gtc2NvcmUuY3NzJ10sXG4gIHByb3ZpZGVyczogW1N0YXRlU2VydmljZSwgU2NvcmVTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBIaWdoU2NvcmVDb21wb25lbnQgZXh0ZW5kcyBCYXNlIHtcbiAgaGlnaFNjb3JlczogQXJyYXk8U2NvcmU+ID0gW107XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGlzRGV2OiBCb29sZWFuO1xuICBpc0hpZ2hTY29yZXM6IEJvb2xlYW47XG4gIGlzTG9hZGluZzogQm9vbGVhbjtcbiAgbGFzdFJvdzogbnVtYmVyO1xuICBsZXZlbDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfcGFnZTogUGFnZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfc2NvcmVTZXJ2aWNlOiBTY29yZVNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3N0YXRlU2VydmljZTogU3RhdGVTZXJ2aWNlKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmlzSGlnaFNjb3JlcyA9IGZhbHNlO1xuICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmxhc3RSb3cgPSAyO1xuICAgIHRoaXMuaXNEZXYgPSBDb25maWcuaXNEZXYgPT09IHRydWUgPyB0cnVlIDogZmFsc2U7XG4gICAgdGhpcy50aXRsZSA9IENvbmZpZy50aXRsZSArICcgLSBIaWdoIFNjb3Jlcyc7XG5cbiAgICBpZiAoQ29uZmlnLmlzRGV2KSB7XG4gICAgICB0aGlzLnRpdGxlICs9ICcgKERldiBNb2RlKSc7XG4gICAgfVxuXG4gICAgX3BhZ2UuY2xhc3NOYW1lID0gJ3BhZ2UnO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goX3N0YXRlU2VydmljZS5zdGF0ZUNoYW5nZSRcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIChzdGF0ZTogYW55KSA9PiB0aGlzLm9uU3RhdGVTZXJ2aWNlRGF0YUNoYW5nZShzdGF0ZSlcbiAgICAgICkpO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goX3Njb3JlU2VydmljZS5kYXRhQ2hhbmdlJFxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKHNjb3JlczogYW55KSA9PiB0aGlzLm9uU2NvcmVTZXJ2aWNlRGF0YUNoYW5nZShzY29yZXMpXG4gICAgICApKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKF9zY29yZVNlcnZpY2UubmV4dFJvd0NoYW5nZSRcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIChyb3c6IGFueSkgPT4gdGhpcy5vbk5leHRSb3dDaGFuZ2Uocm93KVxuICAgICAgKSk7XG4gIH1cblxuICBvblN0YXRlU2VydmljZURhdGFDaGFuZ2Uoc3RhdGU6IFN0YXRlW10pIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2hpZ2gtc2NvcmUuY29tcG9uZW50JywgJ29uU3RhdGVTZXJ2aWNlRGF0YUNoYW5nZScpO1xuICAgIGxldCBsZXZlbDogc3RyaW5nID0gdGhpcy5fc3RhdGVTZXJ2aWNlLmdldEtleVZhbHVlKCdsZXZlbCcpO1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnaGlnaC1zY29yZS5jb21wb25lbnQnLCAnbGV2ZWwgPSAnICsgbGV2ZWwpO1xuICAgIGlmIChsZXZlbCkge1xuICAgICAgdGhpcy5fc2NvcmVTZXJ2aWNlLmxldmVsID0gdGhpcy5sZXZlbCA9IE51bWJlcihsZXZlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3Njb3JlU2VydmljZS5sZXZlbCA9IHRoaXMubGV2ZWwgPSBDb25maWcuZGVmYXVsdExldmVsO1xuICAgIH1cbiAgfVxuXG4gIG9uU2NvcmVTZXJ2aWNlRGF0YUNoYW5nZShzY29yZXM6IFNjb3JlW10pIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2hpZ2gtc2NvcmUuY29tcG9uZW50JywgJ29uU2NvcmVTZXJ2aWNlRGF0YUNoYW5nZScpO1xuICAgIGlmIChzY29yZXMpIHtcbiAgICAgIHRoaXMuaXNIaWdoU2NvcmVzID0gc2NvcmVzLmxlbmd0aCA+IDAgPyB0cnVlIDogZmFsc2U7XG4gICAgICB0aGlzLmhpZ2hTY29yZXMgPSBzY29yZXM7XG4gICAgICB0aGlzLmNvbnNvbGVMb2dBcnJheSh0aGlzLmhpZ2hTY29yZXMpO1xuICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBvbk5leHRSb3dDaGFuZ2Uocm93Om51bWJlcikge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnaGlnaC1zY29yZS5jb21wb25lbnQnLCAnb25OZXh0Um93Q2hhbmdlJyk7XG4gICAgdGhpcy5sYXN0Um93ID0gcm93O1xuICB9XG5cbiAgb25SZXNldEJ1dHRvblRhcCgpIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2hpZ2gtc2NvcmUuY29tcG9uZW50JywgJ29uUmVzZXRCdXR0b25UYXAnKTtcbiAgICBEaWFsb2dzLmNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgZGVsZXRlIGFsbCBoaWdoIHNjb3Jlcz9cIikudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLl9zY29yZVNlcnZpY2UudHJ1bmNhdGUoKTtcbiAgICAgICAgdGhpcy5fc3RhdGVTZXJ2aWNlLnRydW5jYXRlKCk7XG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJyddLCBDb25maWcudHJhbnNpdGlvbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBvbkFkZEJ1dHRvblRhcCgpIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2hpZ2gtc2NvcmUuY29tcG9uZW50JywgJ29uQWRkQnV0dG9uVGFwJyk7XG4gICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICdhZGQtaGlnaC1zY29yZS86bGV2ZWw6bW92ZXM6Y2FsbGVyJywge1xuICAgICAgICBtb3ZlczogJzQ5JyxcbiAgICAgICAgbGV2ZWw6ICcxJyxcbiAgICAgICAgY2FsbGVyOiAnaGlnaC1zY29yZSdcbiAgICAgIH1cbiAgICBdLCBDb25maWcudHJhbnNpdGlvbik7XG4gIH1cblxuICBvbkV4aXRCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgdGhpcy5fcm91dGVyLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xuICB9XG5cbiAgb25OYXZCdG5UYXAoKTogdm9pZCB7XG4gICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnJ10sIENvbmZpZy50cmFuc2l0aW9uKTtcbiAgfVxuXG59XG4iXX0=