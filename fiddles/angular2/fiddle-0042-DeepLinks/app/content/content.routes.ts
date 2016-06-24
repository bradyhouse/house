import { RouterConfig }          from '@angular/router';
import { ContentComponent } from './content.component';
import { ContentRouterComponent } from './content-router/content-router.component';


export const ContentRoutes: RouterConfig = [
    {
        path: '',
        redirectTo: '/content/0',
        terminal: true
    },
    {
        path: 'content',
        component: ContentComponent,
        children: [
            {
                path: ':id',
                component: ContentRouterComponent
            }
        ]
    }
];
