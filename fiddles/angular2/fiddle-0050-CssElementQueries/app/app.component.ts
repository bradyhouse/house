import {
    Component,
} from '@angular/core';


@Component({
  selector: 'app',
  moduleId: module.id,
  templateUrl: './app/app.component.html',
  styleUrls: ['./app/app.component.css']
})
export class AppComponent {
  options:any;

  constructor() {
    this.options = {
      src: 'app/surface.jpg'
    };
  }
}
