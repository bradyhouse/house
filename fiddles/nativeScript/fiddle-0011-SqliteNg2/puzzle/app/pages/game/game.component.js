"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var config_1 = require("../../shared/config");
var GameComponent = (function () {
    function GameComponent(router, page) {
        this.router = router;
        this.page = page;
    }
    GameComponent.prototype.ngOnInit = function () {
        this.highscoreVisibility = "collapsed";
        this.title = config_1.Config.title;
    };
    GameComponent.prototype.onPlayTap = function () {
    };
    GameComponent.prototype.onAboutTap = function () {
        this.router.navigate(["/about"]);
    };
    GameComponent.prototype.onHighScoreTap = function () {
    };
    return GameComponent;
}());
__decorate([
    core_1.ViewChild("container"),
    __metadata("design:type", core_1.ElementRef)
], GameComponent.prototype, "container", void 0);
GameComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        templateUrl: "pages/game/game.html",
        styleUrls: ["pages/game/game-common.css", "pages/game/game.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router, page_1.Page])
], GameComponent);
exports.GameComponent = GameComponent;
//# sourceMappingURL=game.component.js.map