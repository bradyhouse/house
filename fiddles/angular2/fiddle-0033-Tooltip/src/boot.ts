import {bootstrap} from 'angular2/platform/browser';
import {enableProdMode} from 'angular2/core';
import {App} from './app';
import * as metadata from './meta';
import * as core from 'angular2/core';

console.log("%c" + metadata.consoleTag, 'font-style: italic; font-size: 20px;');
console.log("%c" + metadata.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
console.group();


enableProdMode();
bootstrap(App)
    .catch(err => console.error(err));


