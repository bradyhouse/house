var fs_1 = require('fs');
var yargs_1 = require('yargs');
var path_1 = require('path');
var ENVIRONMENTS = {
    DEVELOPMENT: 'dev',
    PRODUCTION: 'prod'
};
var SeedConfig = (function () {
    function SeedConfig() {
        this.PORT = yargs_1.argv['port'] || 5555;
        this.PROJECT_ROOT = path_1.normalize(path_1.join(__dirname, '..'));
        this.ENV = getEnvironment();
        this.DEBUG = yargs_1.argv['debug'] || false;
        this.DOCS_PORT = yargs_1.argv['docs-port'] || 4003;
        this.COVERAGE_PORT = yargs_1.argv['coverage-port'] || 4004;
        this.APP_BASE = yargs_1.argv['base'] || '/';
        this.HOT_LOADER_PORT = 5578;
        this.BOOTSTRAP_MODULE = 'main';
        this.APP_TITLE = 'fiddle-0029-Dashboard';
        this.APP_SRC = 'src';
        this.ASSETS_SRC = this.APP_SRC + "/assets";
        this.TOOLS_DIR = 'tools';
        this.SEED_TASKS_DIR = path_1.join(process.cwd(), this.TOOLS_DIR, 'tasks', 'seed');
        this.DOCS_DEST = 'docs';
        this.DIST_DIR = 'dist';
        this.DEV_DEST = this.DIST_DIR + "/dev";
        this.PROD_DEST = this.DIST_DIR + "/prod";
        this.TMP_DIR = this.DIST_DIR + "/tmp";
        this.APP_DEST = this.DIST_DIR + "/" + this.ENV;
        this.CSS_DEST = this.APP_DEST + "/css";
        this.JS_DEST = this.APP_DEST + "/js";
        this.APP_ROOT = this.ENV === 'dev' ? "" + this.APP_BASE + this.APP_DEST + "/" : "" + this.APP_BASE;
        this.VERSION = appVersion();
        this.CSS_PROD_BUNDLE = 'all.css';
        this.JS_PROD_SHIMS_BUNDLE = 'shims.js';
        this.JS_PROD_APP_BUNDLE = 'app.js';
        this.VERSION_NPM = '2.14.2';
        this.VERSION_NODE = '4.0.0';
        this.NG2LINT_RULES = customRules();
        this.DEV_NPM_DEPENDENCIES = normalizeDependencies([
            { src: 'systemjs/dist/system-polyfills.src.js', inject: 'shims' },
            { src: 'reflect-metadata/Reflect.js', inject: 'shims' },
            { src: 'es6-shim/es6-shim.js', inject: 'shims' },
            { src: 'systemjs/dist/system.src.js', inject: 'shims' },
            { src: 'angular2/bundles/angular2-polyfills.js', inject: 'shims' },
            { src: 'rxjs/bundles/Rx.js', inject: 'libs' },
            { src: 'angular2/bundles/angular2.js', inject: 'libs' },
            { src: 'angular2/bundles/router.js', inject: 'libs' },
            { src: 'angular2/bundles/http.js', inject: 'libs' },
            { src: 'bootstrap/dist/css/bootstrap.min.css', inject: 'libs' },
            { src: 'font-awesome/css/font-awesome.min.css', inject: 'libs' },
            { src: 'mdi/css/materialdesignicons.min.css', inject: 'libs' },
            { src: 'ng2-select/components/css/ng2-select.css', inject: 'libs' }
        ]);
        this.PROD_NPM_DEPENDENCIES = normalizeDependencies([
            { src: 'systemjs/dist/system-polyfills.src.js', inject: 'shims' },
            { src: 'reflect-metadata/Reflect.js', inject: 'shims' },
            { src: 'es6-shim/es6-shim.min.js', inject: 'shims' },
            { src: 'systemjs/dist/system.js', inject: 'shims' },
            { src: 'angular2/bundles/angular2-polyfills.min.js', inject: 'libs' },
            { src: 'bootstrap/dist/css/bootstrap.min.css', inject: 'libs' },
            { src: 'font-awesome/css/font-awesome.min.css', inject: 'libs' },
            { src: 'mdi/css/materialdesignicons.min.css', inject: 'libs' },
            { src: 'ng2-select/components/css/ng2-select.css', inject: 'libs' }
        ]);
        this.APP_ASSETS = [
            { src: this.ASSETS_SRC + "/main.css", inject: true },
            { src: this.ASSETS_SRC + "/theme-blue.css", inject: true }
        ];
        this.DEV_DEPENDENCIES = this.DEV_NPM_DEPENDENCIES.concat(this.APP_ASSETS);
        this.PROD_DEPENDENCIES = this.PROD_NPM_DEPENDENCIES.concat(this.APP_ASSETS);
        this.SYSTEM_CONFIG_DEV = {
            defaultJSExtensions: true,
            paths: (_a = {},
                _a[this.BOOTSTRAP_MODULE] = "" + this.APP_BASE + this.BOOTSTRAP_MODULE,
                _a['angular2/*'] = this.APP_BASE + "angular2/*",
                _a['rxjs/*'] = this.APP_BASE + "rxjs/*",
                _a['moment'] = this.APP_BASE + "node_modules/ng2-bootstrap/node_modules/moment/moment",
                _a['*'] = this.APP_BASE + "node_modules/*",
                _a
            ),
            packages: {
                angular2: { defaultExtension: false },
                rxjs: { defaultExtension: false }
            }
        };
        this.SYSTEM_CONFIG = this.SYSTEM_CONFIG_DEV;
        this.SYSTEM_BUILDER_CONFIG = {
            defaultJSExtensions: true,
            paths: (_b = {},
                _b[this.TMP_DIR + "/*"] = this.TMP_DIR + "/*",
                _b['*'] = 'node_modules/*',
                _b
            )
        };
        var _a, _b;
    }
    return SeedConfig;
})();
exports.SeedConfig = SeedConfig;
function normalizeDependencies(deps) {
    deps
        .filter(function (d) { return !/\*/.test(d.src); })
        .forEach(function (d) { return d.src = require.resolve(d.src); });
    return deps;
}
function appVersion() {
    var pkg = JSON.parse(fs_1.readFileSync('package.json').toString());
    return pkg.version;
}
function customRules() {
    var lintConf = JSON.parse(fs_1.readFileSync('tslint.json').toString());
    return lintConf.rulesDirectory;
}
function getEnvironment() {
    var base = yargs_1.argv['_'];
    var prodKeyword = !!base.filter(function (o) { return o.indexOf(ENVIRONMENTS.PRODUCTION) >= 0; }).pop();
    if (base && prodKeyword || yargs_1.argv['env'] === ENVIRONMENTS.PRODUCTION) {
        return ENVIRONMENTS.PRODUCTION;
    }
    else {
        return ENVIRONMENTS.DEVELOPMENT;
    }
}
//# sourceMappingURL=seed.config.js.map