var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var path_1 = require('path');
var config_1 = require('../../config');
var utils_1 = require('../../utils');
var plugins = gulpLoadPlugins();
module.exports = function () {
    var tsProject = utils_1.makeTsProject();
    var src = [
        'typings/browser.d.ts',
        'tools/manual_typings/**/*.d.ts',
        path_1.join(config_1.APP_SRC, '**/*.ts'),
        '!' + path_1.join(config_1.APP_SRC, '**/*.e2e.ts'),
        '!' + path_1.join(config_1.APP_SRC, config_1.BOOTSTRAP_MODULE + ".ts")
    ];
    var result = gulp.src(src)
        .pipe(plugins.plumber())
        .pipe(plugins.inlineNg2Template({ base: config_1.APP_SRC, useRelativePaths: true }))
        .pipe(plugins.typescript(tsProject));
    return result.js
        .pipe(gulp.dest(config_1.APP_DEST));
};
//# sourceMappingURL=build.js.test.js.map