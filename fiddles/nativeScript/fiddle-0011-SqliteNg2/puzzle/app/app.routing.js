"use strict";
var game_component_1 = require("./pages/game/game.component");
var about_component_1 = require("./pages/about/about.component");
var level_one_component_1 = require("./pages/level-one/level-one.component");
var level_two_component_1 = require("./pages/level-two/level-two.component");
var level_three_component_1 = require("./pages/level-three/level-three.component");
var high_score_component_1 = require("./pages/high-score/high-score.component");
var add_high_score_component_1 = require("./pages/high-score/add-high-score/add-high-score.component");
exports.routes = [
    { path: '', component: game_component_1.GameComponent },
    { path: 'game/:target', component: game_component_1.GameComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'level-one', component: level_one_component_1.LevelOneComponent },
    { path: 'level-two', component: level_two_component_1.LevelTwoComponent },
    { path: 'level-three', component: level_three_component_1.LevelThreeComponent },
    { path: 'high-score', component: high_score_component_1.HighScoreComponent },
    { path: 'add-high-score/:level:moves:caller', component: add_high_score_component_1.AddHighScoreComponent }
];
exports.navigatableComponents = [
    game_component_1.GameComponent,
    about_component_1.AboutComponent,
    level_one_component_1.LevelOneComponent,
    level_two_component_1.LevelTwoComponent,
    level_three_component_1.LevelThreeComponent,
    high_score_component_1.HighScoreComponent,
    add_high_score_component_1.AddHighScoreComponent
];
