var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var path_1 = require('path');
var config_1 = require('../../config');
var plugins = gulpLoadPlugins();
function watch(taskname) {
    return function () {
        plugins.watch(path_1.join(config_1.APP_SRC, '**/*'), function () { return gulp.start(taskname); });
    };
}
exports.watch = watch;
//# sourceMappingURL=watch.js.map