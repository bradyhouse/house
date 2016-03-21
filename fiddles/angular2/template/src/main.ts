import {provide, enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {APP_BASE_HREF} from 'angular2/router';
import {App} from './components/app/app';

if ('<%= ENV %>' === 'prod') { enableProdMode(); }

bootstrap(App, [
  provide(APP_BASE_HREF, { useValue: '<%= APP_BASE %>' })
]);