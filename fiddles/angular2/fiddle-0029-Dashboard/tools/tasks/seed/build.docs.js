var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var path_1 = require('path');
var config_1 = require('../../config');
var plugins = gulpLoadPlugins();
module.exports = function () {
    var src = [
        'typings/main.d.ts',
        path_1.join(config_1.APP_SRC, '**/*.ts'),
        '!' + path_1.join(config_1.APP_SRC, '**/*.spec.ts'),
        '!' + path_1.join(config_1.APP_SRC, '**/*.e2e.ts')
    ];
    return gulp.src(src)
        .pipe(plugins.typedoc({
        module: 'commonjs',
        target: 'es5',
        includeDeclarations: true,
        out: config_1.DOCS_DEST,
        json: path_1.join(config_1.DOCS_DEST, 'data/docs.json'),
        name: config_1.APP_TITLE,
        ignoreCompilerErrors: false,
        experimentalDecorators: true,
        version: true
    }));
};
//# sourceMappingURL=build.docs.js.map