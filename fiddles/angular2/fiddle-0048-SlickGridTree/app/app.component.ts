import { Component } from '@angular/core';
import {ContentComponent} from '../app/content/content.component';
import {SidebarComponent} from '../app/sidebar/sidebar.component';


@Component({
  selector: 'app',
  moduleId: module.id,
  directives: [[SidebarComponent, ContentComponent]],
  templateUrl: './app/app.component.html',
  styleUrls: ['./app/app.component.css']
})
export class AppComponent {

}
