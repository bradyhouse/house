import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { LicenseManager } from '@ag-grid-enterprise/all-modules';


fetch('assets/license.json').then((response: any) => {
  return response.json();
}).then((data: any) => {
  LicenseManager.setLicenseKey(data.license);
  if (environment.production) {
    enableProdMode();
  }
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
});
