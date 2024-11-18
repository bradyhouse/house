import { Routes } from '@angular/router';
import { FiddleViewComponent } from './views/fiddle-view/fiddle-view.component';
import { DocsViewComponent } from './views/docs-view/docs-view.component';
import { AboutViewComponent } from './views/about-view/about-view.component';
import { NotFoundViewComponent } from './views/not-found-view/not-found-view.component';

const routes: Routes = [
  {
    path: '',
    component: FiddleViewComponent
  },
  {
    path: 'docs',
    component: DocsViewComponent
  },
  {
    path: 'about',
    component: AboutViewComponent
  },
  {
    path: '404',
    component: NotFoundViewComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

export default routes