var view = require("ui/core/view"),
    frameModule = require("ui/frame"),
    base = require("../base"),
    btnIds = [1, 2, 3, 4];

exports.pageLoaded = function(args) {
    var sender = args.object,
        parent = sender.parent;
    base.resizeButtons(view, parent, btnIds, 1, 5);
};

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


