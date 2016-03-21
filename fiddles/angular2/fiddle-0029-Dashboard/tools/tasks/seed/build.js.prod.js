var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var path_1 = require('path');
var config_1 = require('../../config');
var utils_1 = require('../../utils');
var plugins = gulpLoadPlugins();
var INLINE_OPTIONS = {
    base: config_1.TMP_DIR,
    useRelativePaths: true,
    removeLineBreaks: true
};
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
        .pipe(plugins.inlineNg2Template(INLINE_OPTIONS))
        .pipe(plugins.typescript(tsProject));
    return result.js
        .pipe(plugins.template(utils_1.templateLocals()))
        .pipe(gulp.dest(config_1.TMP_DIR));
};
//# sourceMappingURL=build.js.prod.js.map