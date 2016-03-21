var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var path_1 = require('path');
var slash = require('slash');
var config_1 = require('../../config');
var utils_1 = require('../../utils');
var plugins = gulpLoadPlugins();
function inject(name) {
    return plugins.inject(gulp.src(getInjectablesDependenciesRef(name), { read: false }), {
        name: name,
        transform: transformPath()
    });
}
function getInjectablesDependenciesRef(name) {
    return config_1.DEV_DEPENDENCIES
        .filter(function (dep) { return dep['inject'] && dep['inject'] === (name || true); })
        .map(mapPath);
}
function mapPath(dep) {
    var envPath = dep.src;
    if (envPath.startsWith(config_1.APP_SRC)) {
        envPath = path_1.join(config_1.APP_DEST, dep.src.replace(config_1.APP_SRC, ''));
    }
    return envPath;
}
function transformPath() {
    return function (filepath) {
        arguments[0] = path_1.join(config_1.APP_BASE, filepath) + ("?" + Date.now());
        return slash(plugins.inject.transform.apply(plugins.inject.transform, arguments));
    };
}
module.exports = function () {
    return gulp.src(path_1.join(config_1.APP_SRC, 'index.html'))
        .pipe(inject('shims'))
        .pipe(inject('libs'))
        .pipe(inject())
        .pipe(plugins.template(utils_1.templateLocals()))
        .pipe(gulp.dest(config_1.APP_DEST));
};
//# sourceMappingURL=build.index.dev.js.map