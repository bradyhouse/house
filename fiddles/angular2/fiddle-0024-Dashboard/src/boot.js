var browser_1 = require('angular2/platform/browser');
var core_1 = require('angular2/core');
var App_1 = require('./App');
var meta = require('./meta');
var core = require('angular2/core');
console.log("%c" + meta.consoleTag, 'font-style: italic; font-size: 20px;');
console.log("%c" + meta.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
console.group();
ag.grid.initialiseAgGridWithAngular2({ core: core });
core_1.enableProdMode();
browser_1.bootstrap(App_1.App)
    .catch(function (err) { return console.error(err); });
//# sourceMappingURL=boot.js.map