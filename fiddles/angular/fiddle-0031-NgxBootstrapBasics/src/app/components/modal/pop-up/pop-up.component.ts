import { Component, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent {

  @ViewChild('popUpEl', { static: false }) popUpEl: ModalDirective;

  @Input()
  isModal: boolean;

  @Output()
  events: EventEmitter<boolean>

  constructor() {
    this.events = new EventEmitter();
  }
  
  hideModal(): void {
    console.log(this.constructor.name + '.hideModal');
    this.popUpEl.hide();
    this.events.emit(false);
  }

  onHidden(): void {
    console.log(this.constructor.name + '.onHidden');
    this.events.emit(false);
  }

}
