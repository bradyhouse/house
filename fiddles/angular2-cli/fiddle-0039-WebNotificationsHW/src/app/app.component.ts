import {
  Component, OnInit
} from '@angular/core';
import { StateService } from './state/state.service';
import { LocalStorageService } from './state/local-storage/local-storage.service';
import { NotifyService } from './notify/notify.service';
import { BaseComponent } from './app';
import * as NotifyDomain from './notify/notify';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent implements OnInit {

  constructor(private _stateService: StateService,
              private _localStorageService: LocalStorageService,
              private _notifyService: NotifyService,
              private _router: Router) {
    super();
    this.subscriptions.push(_stateService.notificationsChange$
      .subscribe(
        (notifications: NotifyDomain.Notification[]) => this.onNotificationsStateChange(notifications)
      ));
  }

  ngOnInit(): void {
    this._localStorageService.read();
    this._localStorageService.updateStateService(this._stateService.type, this._stateService);
    this._stateService.isReady = true;
    this._notifyService.requestPermission();
    window.setTimeout(() => {
      this.showNotification(this._stateService.notifications);
    }, 1000);
  }

  onNotificationsStateChange(notifications: NotifyDomain.Notification[]) {
    this.showNotification(notifications);
  }

  private showNotification(notifications: NotifyDomain.Notification[]): void {
    if (notifications.length && this._notifyService.isPermission)  {
      const lastNotification = notifications[notifications.length - 1];
      const options: any = {
        body: lastNotification.message
      };
      const notification = new Notification('Fiddle 39', options);
        notification.onclick = () => {
          notification.close();
          this._router.navigate(['/notification']);
        };
    }
  }


}
