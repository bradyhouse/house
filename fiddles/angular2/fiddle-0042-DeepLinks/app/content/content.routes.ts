import { RouterConfig }          from '@angular/router';
import { ContentComponent } from './content.component';
import { ContentDetailComponent } from './content-detail/content-detail.component';


export const ContentRoutes:RouterConfig = [
    {
        path: '',
        redirectTo: '/content/?id=report-a.csv',
        terminal: true
    },
    {
        path: 'content',
        component: ContentComponent,
        children: [
            {
                path: ':id',
                component: ContentDetailComponent
            }
        ]
    }
];
