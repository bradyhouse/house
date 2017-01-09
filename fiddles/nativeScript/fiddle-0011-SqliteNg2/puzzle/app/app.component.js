"use strict";
var core_1 = require("@angular/core");
var Sqlite = require("nativescript-sqlite");
var AppComponent = (function () {
    function AppComponent() {
        if (!Sqlite.exists("highscore.db")) {
            Sqlite.copyDatabase("highscore.db");
        }
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: "main",
        template: "<page-router-outlet></page-router-outlet>"
    }),
    __metadata("design:paramtypes", [])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map