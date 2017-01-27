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
