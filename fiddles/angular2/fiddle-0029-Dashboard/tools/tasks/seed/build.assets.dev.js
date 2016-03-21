var gulp = require('gulp');
var path_1 = require('path');
var config_1 = require('../../config');
module.exports = function () {
    return gulp.src([
        path_1.join(config_1.APP_SRC, '**'),
        '!' + path_1.join(config_1.APP_SRC, '**', '*.ts')
    ])
        .pipe(gulp.dest(config_1.APP_DEST));
};
//# sourceMappingURL=build.assets.dev.js.map