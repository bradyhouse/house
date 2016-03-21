var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var path_1 = require('path');
var utils_1 = require('../../utils');
var config_1 = require('../../config');
var plugins = gulpLoadPlugins();
function inject() {
    var files = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        files[_i - 0] = arguments[_i];
    }
    return plugins.inject(gulp.src(files, {
        read: false
    }), {
        transform: function (filepath) {
            var path = path_1.normalize(filepath).split(path_1.sep);
            arguments[0] = path.slice(3, path.length).join(path_1.sep) + ("?" + Date.now());
            return plugins.inject.transform.apply(plugins.inject.transform, arguments);
        }
    });
}
function injectJs() {
    return inject(path_1.join(config_1.JS_DEST, config_1.JS_PROD_SHIMS_BUNDLE), path_1.join(config_1.JS_DEST, config_1.JS_PROD_APP_BUNDLE));
}
function injectCss() {
    return inject(path_1.join(config_1.CSS_DEST, config_1.CSS_PROD_BUNDLE));
}
module.exports = function () {
    return gulp.src(path_1.join(config_1.APP_SRC, 'index.html'))
        .pipe(injectJs())
        .pipe(injectCss())
        .pipe(plugins.template(utils_1.templateLocals()))
        .pipe(gulp.dest(config_1.APP_DEST));
};
//# sourceMappingURL=build.index.prod.js.map