"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var base_1 = require("../../base");
var config_1 = require("../../shared/config");
var board_1 = require("../../shared/board/board");
var LevelOneComponent = (function (_super) {
    __extends(LevelOneComponent, _super);
    function LevelOneComponent(router, page) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.page = page;
        _this.board = new board_1.Board();
        _this.board.title = config_1.Config.title + ' - Level 1';
        _this.board.nextScreen = 'level-two';
        return _this;
        //this.board.squares =
    }
    LevelOneComponent.prototype.ngOnInit = function () {
    };
    return LevelOneComponent;
}(base_1.Base));
LevelOneComponent = __decorate([
    core_1.Component({
        selector: 'level-one',
        templateUrl: 'pages/level-one/level-one.html',
        styleUrls: ['pages/level-one/level-one-common.css', 'pages/level-one/level-one.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, page_1.Page])
], LevelOneComponent);
exports.LevelOneComponent = LevelOneComponent;
//# sourceMappingURL=level-one.component.js.map