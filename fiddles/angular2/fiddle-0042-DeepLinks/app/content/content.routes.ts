import { RouterConfig }          from '@angular/router';
import { ContentComponent } from './content.component';
import { ContentDetailComponent } from './content-detail/content-detail.component';


export const ContentRoutes:RouterConfig = [
    {
        path: '',
        redirectTo: '/app/',
        terminal: true
    },
    {
        path: 'app',
        redirectTo: '/app/?id=report-a.csv',
        terminal: true
    },
    {
        path: 'app',
        component: ContentComponent,
        children: [
            {
                path: ':id',
                component: ContentDetailComponent
            }
        ]
    }
];
