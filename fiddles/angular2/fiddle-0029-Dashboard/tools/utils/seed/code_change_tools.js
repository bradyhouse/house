var config_1 = require('../../config');
var browserSync = require('browser-sync');
var runServer = function () {
    var baseDir = config_1.APP_DEST;
    var routes = (_a = {},
        _a["" + config_1.APP_BASE + config_1.APP_DEST] = config_1.APP_DEST,
        _a[config_1.APP_BASE + "node_modules"] = 'node_modules',
        _a
    );
    if (config_1.APP_BASE !== '/') {
        routes[("" + config_1.APP_BASE)] = config_1.APP_DEST;
        baseDir = config_1.DIST_DIR + "/empty/";
    }
    browserSync({
        middleware: [require('connect-history-api-fallback')({ index: config_1.APP_BASE + "index.html" })],
        port: config_1.PORT,
        startPath: config_1.APP_BASE,
        server: {
            baseDir: baseDir,
            routes: routes
        }
    });
    var _a;
};
var listen = function () {
    runServer();
};
exports.listen = listen;
var changed = function (files) {
    if (!(files instanceof Array)) {
        files = [files];
    }
    browserSync.reload(files);
};
exports.changed = changed;
//# sourceMappingURL=code_change_tools.js.map