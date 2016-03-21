var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var _tsProject;
function makeTsProject() {
    if (!_tsProject) {
        _tsProject = plugins.typescript.createProject('tsconfig.json', {
            typescript: require('typescript')
        });
    }
    return _tsProject;
}
exports.makeTsProject = makeTsProject;
//# sourceMappingURL=tsproject.js.map