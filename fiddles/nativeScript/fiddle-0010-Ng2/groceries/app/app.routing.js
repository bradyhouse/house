"use strict";
var login_component_1 = require("./pages/login/login.component");
var list_component_1 = require("./pages/list/list.component");
exports.routes = [
    { path: "", component: login_component_1.LoginComponent },
    { path: "list", component: list_component_1.ListComponent }
];
exports.navigatableComponents = [
    login_component_1.LoginComponent,
    list_component_1.ListComponent
];
//# sourceMappingURL=app.routing.js.map