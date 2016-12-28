"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var config_1 = require("../../shared/config");
var LevelOneComponent = (function () {
    function LevelOneComponent(router, page) {
        this.router = router;
        this.page = page;
    }
    LevelOneComponent.prototype.ngOnInit = function () {
        this.title = config_1.Config.title + ' - About';
        this.nextScreen = '/view/level-two/level-two';
    };
    return LevelOneComponent;
}());
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