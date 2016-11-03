var createViewModel = require("../shared/main-view-model").createViewModel;
var frame = require('ui/frame');

function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = createViewModel();
}

function onLevelOneClick(args) {
  frame.topmost().navigate('view/level-one/level-one');
}

function onLevelTwoClick(args) {
  frame.topmost().navigate('view/level-two/level-two');
}

function onLevelThreeClick(args) {
  frame.topmost().navigate('view/level-three/level-three');
}

function onAboutClick(args) {
  frame.topmost().navigate('view/about/about');
}

exports.onNavigatingTo = onNavigatingTo;
exports.onLevelOneClick = onLevelOneClick;
exports.onLevelTwoClick = onLevelTwoClick;
exports.onLevelThreeClick = onLevelThreeClick;
exports.onAboutClick = onAboutClick;
