var core_1 = require('angular2/core');
var browser_1 = require('angular2/platform/browser');
var router_1 = require('angular2/router');
var fiddle_chart_1 = require('./fiddle-chart');
if ('<%= ENV %>' === 'prod') {
    core_1.enableProdMode();
}
browser_1.bootstrap(fiddle_chart_1.App, [
    core_1.provide(router_1.APP_BASE_HREF, { useValue: '<%= APP_BASE %>' })
]);
//# sourceMappingURL=main.js.map