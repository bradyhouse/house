import { RouterConfig }          from '@angular/router';
import { ContentComponent }     from './content.component';

export const ContentRoutes: RouterConfig = [
    {
        path: '',
        redirectTo: '/reports',
        terminal: true
    },
    { path: 'reports', component: ContentComponent },
    { path: 'reports/:id', component: ContentComponent }
];
