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
        '!' + path_1.join(config_1.APP_SRC, '**/*.spec.ts'),
        '!' + path_1.join(config_1.APP_SRC, '**/*.e2e.ts')
    ];
    var result = gulp.src(src)
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.typescript(tsProject));
    return result.js
        .pipe(plugins.sourcemaps.write())
        .pipe(plugins.template(utils_1.templateLocals()))
        .pipe(gulp.dest(config_1.APP_DEST));
};
//# sourceMappingURL=build.js.dev.js.map