var browser_1 = require('angular2/platform/browser');
var core_1 = require('angular2/core');
var app_1 = require('./app');
var meta = require('./meta');
console.log("%c" + meta.consoleTag, 'font-style: italic; font-size: 20px;');
console.log("%c" + meta.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
console.group();
core_1.enableProdMode();
browser_1.bootstrap(app_1.App)
    .catch(function (err) { return console.error(err); });
//# sourceMappingURL=boot.js.map