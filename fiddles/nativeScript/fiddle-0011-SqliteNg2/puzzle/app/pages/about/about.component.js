"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var config_1 = require("../../shared/config");
var AboutComponent = (function () {
    function AboutComponent(_router, _page) {
        this._router = _router;
        this._page = _page;
        _page.className = 'page';
    }
    AboutComponent.prototype.ngOnInit = function () {
        this.title = config_1.Config.title + ' - About';
        if (config_1.Config.isDev) {
            this.title += ' (Dev Mode)';
        }
    };
    AboutComponent.prototype.onNavBtnTap = function () {
        this._router.navigate([''], config_1.Config.transition);
    };
    return AboutComponent;
}());
AboutComponent = __decorate([
    core_1.Component({
        selector: 'about',
        templateUrl: 'pages/about/about.component.html',
        styleUrls: ['pages/about/about-common.css', 'pages/about/about.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, page_1.Page])
], AboutComponent);
exports.AboutComponent = AboutComponent;
