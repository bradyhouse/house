import {Component, ViewEncapsulation} from 'angular2/core';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ContentComponent} from './content/content.component';
import {GlobalService} from './global/global.service';


@Component({
    selector: 'app',
    templateUrl: './app/app.component.html',
    directives: [[SidebarComponent, ContentComponent]],
    providers: [GlobalService],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {




}
