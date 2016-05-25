import {Component} from '@angular/core';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ContentComponent} from './content/content.component';
import {GlobalService} from './global/global.service';


@Component({
    selector: 'app',
    templateUrl: './app/app.component.html',
    styleUrls: ['./app/app.component.css'],
    directives: [[SidebarComponent, ContentComponent]],
    providers: [GlobalService]
})
export class AppComponent {



    constructor() {

    }


}
