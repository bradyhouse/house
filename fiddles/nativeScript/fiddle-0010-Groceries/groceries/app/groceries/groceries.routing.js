"use strict";
var router_1 = require("@angular/router");
var groceries_component_1 = require("./groceries.component");
var auth_guard_service_1 = require("../auth-guard.service");
var groceriesRoutes = [
    { path: "groceries", component: groceries_component_1.GroceriesComponent, canActivate: [auth_guard_service_1.AuthGuard] },
];
exports.groceriesRouting = router_1.RouterModule.forChild(groceriesRoutes);
