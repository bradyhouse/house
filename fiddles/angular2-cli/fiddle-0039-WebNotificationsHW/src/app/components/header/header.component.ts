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
import { BaseComponent } from '../../app';

export enum EventType {
  Reset = 'Reset'
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent {
  @Output() event: EventEmitter <EventType>;
  isPermission: boolean;
  isEnabled: boolean;

  constructor(private _notifyService: NotifyService) {
    super();
    this.event = new EventEmitter();
    this.subscriptions.push(_notifyService.isPermissionChange$
      .subscribe(
        (permission: boolean) => this.onNotifyIsPermissionChange(permission)
      ));
    this.subscriptions.push(_notifyService.isEnabledChange$
      .subscribe(
        (enable: boolean) => this.onNotifyIsEnabledChange(enable)
      ));
  }

  onResetClick() {
      this.event.emit(EventType.Reset);
  }

  onDisableBtnClick() {
   this._notifyService.isEnabled = false;
  }

  onNotifyPermissionBtnClick(): void {
    this._notifyService.requestPermission();
    this._notifyService.isEnabled = true;
  }

  onNotifyIsPermissionChange(isPermission: boolean) {
    this.isPermission = isPermission;
  }

  onNotifyIsEnabledChange(isEnabled: boolean) {
    this.isPermission = isEnabled;
  }

}
