var util = require('gulp-util');
var chalk = require('chalk');
var del = require('del');
function clean(paths) {
    return function (done) {
        del(paths).then(function (paths) {
            util.log('Deleted', chalk.yellow(paths && paths.join(', ') || '-'));
            done();
        });
    };
}
exports.clean = clean;
//# sourceMappingURL=clean.js.map