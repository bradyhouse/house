import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  DoCheck,
  KeyValueDiffer,
  OnInit,
  KeyValueDiffers,
  ElementRef,
  ViewChild
} from '@angular/core';

export enum EventType {
  Export = 'Export',
  Refresh = 'Refresh',
  Reset = 'Reset'
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() event: EventEmitter <EventType>;


  constructor() {
      this.event = new EventEmitter();
  }

  onResetClick() {
      this.event.emit(EventType.Reset);
  }


  onExportClick() {
    this.event.emit(EventType.Export);
  }

  onRefreshClick() {
      this.event.emit(EventType.Refresh);
  }

}
