var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var path_1 = require('path');
var config_1 = require('../../config');
var utils_1 = require('../../utils');
var plugins = gulpLoadPlugins();
module.exports = function () {
    var tsProject = utils_1.makeTsProject();
    var src = [
        'typings/main.d.ts',
        'tools/manual_typings/**/*.d.ts',
        path_1.join(config_1.TOOLS_DIR, '**/*.ts')
    ];
    var result = gulp.src(src, { base: './' })
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.typescript(tsProject));
    return result.js
        .pipe(plugins.sourcemaps.write())
        .pipe(plugins.template(utils_1.templateLocals()))
        .pipe(gulp.dest('./'));
};
//# sourceMappingURL=build.js.tools.js.map