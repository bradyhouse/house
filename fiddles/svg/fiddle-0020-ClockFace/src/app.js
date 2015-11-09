(function(app) {
    "use strict";
    require('./metadata.js');
    require('./namespaces.js');
    require('../../toolkit/Util.js');
    require('../../toolkit/Stop.js');
    require('../../toolkit/AnimateTransform.js');
    require('../../toolkit/RadialGradient.js');
    require('../../toolkit/LinearGradient.js');
    require('../../toolkit/Pattern.js');
    require('../../toolkit/Definitions.js');
    require('../../toolkit/Circle.js');
    require('../../toolkit/Rectangle.js');
    require('../../toolkit/Group.js');
    require('../../toolkit/Text.js');
    require('../../toolkit/TextPath.js');
    require('../../toolkit/ViewController.js');
    require('../../toolkit/Path.js');
    require('../../toolkit/Surface.js');
    require('./view/button/mixin/Rectangle.js');
    require('./view/button/mixin/Text.js');
    require('./view/button/ButtonController.js');
    require('./view/button/Button.js');
    require('./view/clock/mixin/Surface.js');
    require('./view/clock/ClockController.js');
    require('./view/clock/Clock.js');
    require('./view/Viewport.js');
    require('./init.js');
})(window.app = window.app || {})
