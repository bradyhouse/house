var util = require('gulp-util');
var chalk = require('chalk');
var del = require('del');
var fs_1 = require('fs');
var path_1 = require('path');
var config_1 = require('../../config');
function walk(path) {
    var files = fs_1.readdirSync(path);
    for (var i = 0; i < files.length; i += 1) {
        var curPath = path_1.join(path, files[i]);
        if (fs_1.lstatSync(curPath).isDirectory()) {
            deleteAndWalk(curPath);
        }
    }
}
function deleteAndWalk(path) {
    del.sync([path_1.join(path, '*.js')]);
    util.log('Deleted', chalk.yellow(path + "/*.js"));
    walk(path);
}
module.exports = function (done) {
    deleteAndWalk(config_1.TOOLS_DIR);
    done();
};
//# sourceMappingURL=clean.tools.js.map