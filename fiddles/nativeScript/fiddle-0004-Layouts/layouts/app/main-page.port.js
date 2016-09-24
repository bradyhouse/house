/***********************************************************************************
 * (c) 2015, Nathanael Anderson
 * Licensed under the MIT license
 *
 * Version 1.0.0                                       Nathan@master-technology.com
 **********************************************************************************/
"use strict";

console.log("!---------------------- MainPage.port");
var mainPage = require('./main-page.js');
mainPage.pageSource.set('source',"main-page.port.js");

module.exports = mainPage;