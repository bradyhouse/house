"use strict";
var Config = (function () {
    function Config() {
    }
    return Config;
}());
Config.title = '15 Puzzle';
Config.isDev = false;
Config.dbFile = 'highscore.db';
Config.defaultLevel = 1;
Config.transition = {
    transition: {
        name: "flip",
        curve: "linear"
    }
};
exports.Config = Config;
