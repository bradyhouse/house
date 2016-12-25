"use strict";
var platform_1 = require("nativescript-angular/platform");
var forms_1 = require("nativescript-angular/forms");
var core_1 = require("@angular/core");
var login_routing_1 = require("./login.routing");
var login_component_1 = require("./login.component");
var LoginModule = (function () {
    function LoginModule() {
    }
    return LoginModule;
}());
LoginModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_1.NativeScriptModule,
            forms_1.NativeScriptFormsModule,
            login_routing_1.loginRouting
        ],
        declarations: [
            login_component_1.LoginComponent
        ]
    }),
    __metadata("design:paramtypes", [])
], LoginModule);
exports.LoginModule = LoginModule;
