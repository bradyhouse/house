var path_1 = require('path');
var Builder = require('systemjs-builder');
var config_1 = require('../../config');
var BUNDLER_OPTIONS = {
    format: 'cjs',
    minify: true,
    mangle: false
};
module.exports = function (done) {
    var builder = new Builder(config_1.SYSTEM_BUILDER_CONFIG);
    builder
        .buildStatic(path_1.join(config_1.TMP_DIR, config_1.BOOTSTRAP_MODULE), path_1.join(config_1.JS_DEST, config_1.JS_PROD_APP_BUNDLE), BUNDLER_OPTIONS)
        .then(function () { return done(); });
};
//# sourceMappingURL=build.bundles.app.js.map