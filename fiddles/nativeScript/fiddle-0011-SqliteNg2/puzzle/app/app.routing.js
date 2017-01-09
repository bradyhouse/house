"use strict";
var game_component_1 = require("./pages/game/game.component");
var about_component_1 = require("./pages/about/about.component");
var level_one_component_1 = require("./pages/level-one/level-one.component");
exports.routes = [
    { path: "", component: game_component_1.GameComponent },
    { path: "about", component: about_component_1.AboutComponent },
    { path: "level-one", component: level_one_component_1.LevelOneComponent }
];
exports.navigatableComponents = [
    game_component_1.GameComponent,
    about_component_1.AboutComponent,
    level_one_component_1.LevelOneComponent
];
//# sourceMappingURL=app.routing.js.map