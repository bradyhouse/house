"use strict";
var platform_1 = require("nativescript-angular/platform");
var status_bar_util_1 = require("./utils/status-bar-util");
var app_module_1 = require("./app.module");
status_bar_util_1.setStatusBarColors();
platform_1.platformNativeScriptDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map