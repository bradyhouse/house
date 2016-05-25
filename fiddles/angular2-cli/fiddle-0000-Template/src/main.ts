import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { Fiddle0000TemplateAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(Fiddle0000TemplateAppComponent);
