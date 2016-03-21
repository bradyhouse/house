var express = require('express');
var openResource = require('open');
var serveStatic = require('serve-static');
var codeChangeTool = require('./code_change_tools');
var path_1 = require('path');
var config_1 = require('../../config');
function serveSPA() {
    codeChangeTool.listen();
}
exports.serveSPA = serveSPA;
function serveDocs() {
    var server = express();
    server.use(config_1.APP_BASE, serveStatic(path_1.resolve(process.cwd(), config_1.DOCS_DEST)));
    server.listen(config_1.DOCS_PORT, function () {
        return openResource('http://localhost:' + config_1.DOCS_PORT + config_1.APP_BASE);
    });
}
exports.serveDocs = serveDocs;
function serveCoverage() {
    var server = express();
    server.use(config_1.APP_BASE, serveStatic(path_1.resolve(process.cwd(), 'coverage')));
    server.listen(config_1.COVERAGE_PORT, function () {
        return openResource('http://localhost:' + config_1.COVERAGE_PORT + config_1.APP_BASE);
    });
}
exports.serveCoverage = serveCoverage;
//# sourceMappingURL=server.js.map