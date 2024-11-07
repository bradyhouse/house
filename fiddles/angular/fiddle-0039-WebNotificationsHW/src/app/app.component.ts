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
    this._notifyService.isEnabled = true;
    window.setTimeout(() => {
      this.showNotification(this._stateService.notifications);
    }, 1000);
  }

  onNotificationsStateChange(notifications: NotifyDomain.Notification[]) {
    this.showNotification(notifications);
  }
  onNotificationClick(event: any) {
    console.log('onNotificationClick', event);
  }

  private async showNotification(notifications: NotifyDomain.Notification[]): Promise<void> {
    if (notifications.length && this._notifyService.isPermission && this._notifyService.isEnabled)  {
      const lastNotification = notifications[notifications.length - 1];
      const options: any = {
        body: lastNotification.message,
        icon: './assets/7.png',
        actions: [{
          action: 0,
          title: 'Open',
          icon: './assets/question.png'
        }, {
          action: 1,
          title: 'Acknowledge',
          icon: './assets/check.png'
        }],
        data: {
          id: lastNotification.id
        },
        silent: false,
        requireInteraction: false,
        persistent: false,
        sticky: false,
        notificationCloseEvent: false
      };
      const registerServiceWorker = async () => {
        // tslint:disable-next-line: no-shadowed-variable
        const swRegistration = await navigator.serviceWorker.register('./sw.js');
        return swRegistration;
      };
      const swRegistration = await registerServiceWorker();

      navigator.serviceWorker.addEventListener('message', (event: any) => {
        const actionId = event && event.data.message.action ? Number(event.data.message.action) : null;
        const notificationId = actionId ? Number(event.data.message.id) : null;
        switch (actionId) {
          case 0:
            this._router.navigate(['/notification']);
            break;
          case 1:
            this._notifyService.acknowledge(notificationId);
            break;
        }
      });
      window.setTimeout(() => {
        this._notifyService.playAlert();
      }, 1000);
      swRegistration.showNotification('Alert!!!', options);
    }
  }


}
