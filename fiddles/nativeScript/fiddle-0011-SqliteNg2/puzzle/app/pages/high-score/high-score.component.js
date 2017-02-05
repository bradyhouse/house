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
        _this.isDev = config_1.Config.isDev;
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
