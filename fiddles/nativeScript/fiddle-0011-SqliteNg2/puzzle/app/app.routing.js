"use strict";
var game_component_1 = require("./pages/game/game.component");
var about_component_1 = require("./pages/about/about.component");
exports.routes = [
    { path: "", component: game_component_1.GameComponent },
    { path: "about", component: about_component_1.AboutComponent }
];
exports.navigatableComponents = [
    game_component_1.GameComponent,
    about_component_1.AboutComponent
];
//# sourceMappingURL=app.routing.js.map