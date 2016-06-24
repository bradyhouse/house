import { provideRouter, RouterConfig }  from '@angular/router';

import { CrisisCenterRoutes } from './crisis-center/crisis-center.routes';
import { HeroesRoutes }       from './heroes/heroes.routes';

import { LoginRoutes,
         AUTH_PROVIDERS }     from './login.routes';

import { CanDeactivateGuard } from './interfaces';

export const routes: RouterConfig = [
  ...HeroesRoutes,
  ...LoginRoutes,
  ...CrisisCenterRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AUTH_PROVIDERS,
  CanDeactivateGuard
];


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/