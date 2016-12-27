"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var config_1 = require("../../shared/config");
var AboutComponent = (function () {
    function AboutComponent(router, page) {
        this.router = router;
        this.page = page;
    }
    AboutComponent.prototype.ngOnInit = function () {
        this.title = config_1.Config.title + ' - About';
    };
    return AboutComponent;
}());
AboutComponent = __decorate([
    core_1.Component({
        selector: 'about',
        templateUrl: 'pages/about/about.html',
        styleUrls: ['pages/about/about-common.css', 'pages/about/about.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, page_1.Page])
], AboutComponent);
exports.AboutComponent = AboutComponent;
//# sourceMappingURL=about.component.js.map