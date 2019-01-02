"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application = require("tns-core-modules/application");
var webview = require("nativescript-advanced-webview");
webview.init();
application.start({ moduleName: 'main-page' });