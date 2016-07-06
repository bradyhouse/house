import { RouterConfig }          from '@angular/router';
import { ContentComponent } from './content.component';
import { ContentRouterComponent } from './content-router/content-router.component';


export const ContentRoutes:RouterConfig = [
    {
        path: '',
        redirectTo: '/',
        terminal: true
    },
    {
        path: '',
        redirectTo: '?id=green',
        terminal: true
    },
    {
        path: '',
        component: ContentComponent,
        children: [
            {
                path: ':id',
                component: ContentRouterComponent
            }
        ]
    }
];
