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
  isSound: boolean;

  constructor(private _notifyService: NotifyService) {
    super();
    this.event = new EventEmitter();
    this.isSound = _notifyService.isSound;
    this.isPermission = _notifyService.isPermission;
    this.subscriptions.push(_notifyService.isSoundChange$
      .subscribe(
        (sound: boolean) => this.onNotifyIsSoundChange(sound)
      ));
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

  onEnableSoundBtnClick() {
    this._notifyService.isSound = this.isSound = true;
  }

  onDisableSoundBtnClick() {
    this._notifyService.isSound = this.isSound = false;
  }

  onNotifyPermissionBtnClick(): void {
    this._notifyService.requestPermission();
    window.setTimeout(() => {
      if(this._notifyService.isPermission) {
        this.isPermission = true;
      }
    }, 1000);
  }

  onNotifyIsSoundChange(sound: boolean) {
    this.isSound = sound;
  }

  onNotifyIsPermissionChange(isPermission: boolean) {
    this.isPermission = isPermission;
  }

  onNotifyIsEnabledChange(isEnabled: boolean) {
    this.isPermission = isEnabled;
  }

}
