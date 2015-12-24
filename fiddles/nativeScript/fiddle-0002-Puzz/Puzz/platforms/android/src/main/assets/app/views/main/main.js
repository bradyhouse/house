var frameModule = require("ui/frame");

exports.showAbout = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/about/about");
};

exports.showThree = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/game/three/three");
};

exports.showFour = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/game/four/four");
};

exports.showFive = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/game/five/five");
};


