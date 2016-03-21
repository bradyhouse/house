var gulp = require('gulp');
var path_1 = require('path');
var config_1 = require('../../config');
var es = require('event-stream');
var onlyDirs = function (es) {
    return es.map(function (file, cb) {
        if (file.stat.isFile()) {
            return cb(null, file);
        }
        else {
            return cb();
        }
    });
};
module.exports = function () {
    return gulp.src([
        path_1.join(config_1.APP_SRC, '**'),
        '!' + path_1.join(config_1.APP_SRC, '**', '*.ts'),
        '!' + path_1.join(config_1.APP_SRC, '**', '*.css'),
        '!' + path_1.join(config_1.APP_SRC, '**', '*.html'),
        '!' + path_1.join(config_1.ASSETS_SRC, '**', '*.js')
    ])
        .pipe(onlyDirs(es))
        .pipe(gulp.dest(config_1.APP_DEST));
};
//# sourceMappingURL=build.assets.prod.js.map