import { Component, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showModal: boolean = false;

  constructor() {

  }

  public openModal() {
    this.showModal = true;
  }

  public onClosed(isClosed: boolean) {
    this.showModal = false;
  }

}
