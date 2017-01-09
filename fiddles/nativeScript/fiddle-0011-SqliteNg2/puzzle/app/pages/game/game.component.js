"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var config_1 = require("../../shared/config");
var base_1 = require("../../base");
var score_service_1 = require("../../shared/score/score.service");
var GameComponent = (function (_super) {
    __extends(GameComponent, _super);
    function GameComponent(_router, _page, _scoreService) {
        var _this = _super.call(this) || this;
        _this._router = _router;
        _this._page = _page;
        _this._scoreService = _scoreService;
        return _this;
    }
    GameComponent.prototype.ngOnInit = function () {
        this.highscoreVisibility = "collapsed";
        this.title = config_1.Config.title;
        var me = this;
        this._scoreService.connect(function (db) {
            me._scoreService.select(db, function (data) {
                if (data && data.length) {
                    me.highscoreVisibility = "visible";
                }
            }, me);
        }, me);
    };
    GameComponent.prototype.onPlayTap = function () {
        this._router.navigate(["/level-one"]);
    };
    GameComponent.prototype.onAboutTap = function () {
        this._router.navigate(["/about"]);
    };
    GameComponent.prototype.onHighScoreTap = function () {
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
        templateUrl: "pages/game/game.html",
        providers: [score_service_1.ScoreService],
        styleUrls: ["pages/game/game-common.css", "pages/game/game.css"],
        encapsulation: core_1.ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [router_1.Router,
        page_1.Page,
        score_service_1.ScoreService])
], GameComponent);
exports.GameComponent = GameComponent;
//# sourceMappingURL=game.component.js.map