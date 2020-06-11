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
import { NotifyService } from '../../notify/notify.service';

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


  constructor(private _notifyService: NotifyService) {
      this.event = new EventEmitter();
  }

  onResetClick() {
      this.event.emit(EventType.Reset);
  }

  onNotifyPermissionBtnClick(): void {
    this._notifyService.requestPermission();
  }

  onExportClick() {
    this.event.emit(EventType.Export);
  }

  onRefreshClick() {
      this.event.emit(EventType.Refresh);
  }

}
