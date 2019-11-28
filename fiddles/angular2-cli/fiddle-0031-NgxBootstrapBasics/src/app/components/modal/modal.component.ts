import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  isModal: boolean;

  onShowModal() {
    this.isModal = true;
  }

  onPopUpEvents(event: boolean) {
    this.isModal = event;
  }

}
