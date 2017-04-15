/**
 * Bootstraps the application and makes the ROUTER_PROVIDERS and the APP_BASE_HREF available to it.
 * @see https://angular.io/docs/ts/latest/api/platform-browser-dynamic/index/bootstrap-function.html
 */
import {enableProdMode} from '@angular/core';
// The browser platform with a compiler
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

// platfrom module
import {WebModule} from './web.module';

// example of how to use build variables to determine environment
if (String('<%= BUILD_TYPE %>') === 'prod' || String('<%= TARGET_DESKTOP_BUILD %>') === 'true') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(WebModule);
