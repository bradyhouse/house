var gulp = require('gulp');
var config_1 = require('../../config');
module.exports = function () {
    return gulp.src(config_1.FONTS_SRC)
        .pipe(gulp.dest(config_1.FONTS_DEST));
};
//# sourceMappingURL=build.fonts.js.map