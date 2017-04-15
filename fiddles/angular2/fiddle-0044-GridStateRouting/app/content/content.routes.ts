import { RouterConfig } from '@angular/router';
import { ContentComponent } from './content.component';
import { ContentDetailComponent } from './content-detail/content-detail.component';


export const ContentRoutes:RouterConfig = [
    {
        path: '',
        redirectTo: '/',
        terminal: true
    },
    {
        path: '',
        redirectTo: '?id=report-a.csv',
        terminal: true
    },
    {
        path: '',
        component: ContentComponent,
        children: [
            {
                path: ':id',
                component: ContentDetailComponent
            }
        ]
    }
];
