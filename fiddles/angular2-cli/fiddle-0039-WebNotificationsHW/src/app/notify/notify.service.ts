import {
  Injectable
} from '@angular/core';
import * as Domain from './notify';
import {
  StateService
} from '../state/state.service';
import {
  BaseComponent
} from '../app';
import {
  RefreshService
} from './refresh/refresh.service';
import {
  RefreshStateEnum
} from './refresh/refresh';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

declare let _: any;


@Injectable()
export class NotifyService extends BaseComponent implements Domain.NotifyServiceInterface {
  isPermissionChange$: Observable<boolean>;
  isSoundChange$: Observable<boolean>;
  isEnabledChange$: Observable<boolean>;
  notifications: Domain.Notification[];

  private _isPermission: boolean;
  private _isPermissionObserver: Observer<boolean>;
  private _isSound: boolean;
  private _isSoundObserver: Observer<boolean>;
  private _isEnabled: boolean;
  private _isEnableObserver: Observer<boolean>;

  get isPermission(): boolean {
    return this._isPermission;
  }

  set isPermission(permission: boolean) {
    if (!_.isEqual(permission, this._isPermission)) {
      this._isPermission = permission;
      if (this._isPermissionObserver) {
        this._isPermissionObserver.next(permission);
      }
    }
  }

  get isSound(): boolean {
    return this._isSound;
  }

  set isSound(sound: boolean) {
    if (!_.isEqual(sound, this._isSound)) {
      this._isSound = sound;
      if (this._isSoundObserver) {
        this._isPermissionObserver.next(sound);
      }
    }
  }

  get isEnabled(): boolean {
    return this._isEnabled;
  }

  set isEnabled(enabled: boolean) {
    if (!_.isEqual(enabled, this._isEnabled)) {
      this._isEnabled = enabled;
      if (this.isPermission) {
        if (!enabled) {
          this._refreshService.stop();
        } else {
          this._refreshService.start();
        }
      }
      if (this._isEnableObserver) {
        this._isEnableObserver.next(enabled);
      }
    }
  }

  get isNotificationSupport(): boolean {
    if (!('Notification' in window)) {
      return false;
    }
    return true;
  }
  generate(): void {
    const id: number = this.notifications && this.notifications.length ? this.notifications.length + 1 : 1;
    const versionTimeStamp: number = (new Date()).getTime();
    const notification: Domain.Notification = {
      id: id,
      message: 'Call your mother! (' + id + ')',
      status: false,
      versionTimeStamp: versionTimeStamp
    };
    this.notifications.push(notification);
    this._stateService.notifications = this.notifications;
  }

  acknowledge(id: number): void {
    this.notifications = this.notifications.filter((notification: Domain.Notification) => {
      return notification.id !== id;
    });
    this._stateService.notifications = this.notifications;
  }

  playAlert(): void {
    if (this.isSound) {
      try {
        const audio = new Audio();
        audio.src = './assets/alert.mp3';
        audio.load();
        audio.play();
      } catch {
        // tslint:disable-next-line: no-console
        console.info('Attempt to play alert sound failed.');
      }
    }
  }

  requestPermission(): void {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications.');
      this.isPermission = false;
    } else {
      if (this.checkNotificationPromise()) {
        Notification.requestPermission()
          .then((permission) => {
            this.handlePermission(permission);
          });
      } else {
        Notification.requestPermission((permission: any) => {
          this.handlePermission(permission);
        });
      }
    }
  }

  handlePermission(permission: string) {
    if (permission === 'denied' || permission === 'default') {
      this.isPermission = false;
    } else {
      this.isPermission = true;
    }
  }

  checkNotificationPromise(): boolean {
    try {
      Notification.requestPermission().then();
    } catch {
      return false;
    }
    return true;
  }


  constructor(private _stateService: StateService,
    private _refreshService: RefreshService) {

    super();

    this.notifications = [];
    this._isSound = false;

    this.isPermissionChange$ = new Observable <boolean> (
      (observer: any) => this._isPermissionObserver = observer
    ).share();

    this.isEnabledChange$ = new Observable <boolean> (
      (observer: any) => this._isEnableObserver = observer
    ).share();

    this.isSoundChange$ = new Observable <boolean> (
      (observer: any) => this._isSoundObserver = observer
    ).share();

    this.subscriptions.push(_stateService.isReadyChange$
      .subscribe(
        (isReady: boolean) => this.onStateServiceIsReadyChange(isReady)
      ));
    this.subscriptions.push(_stateService.notificationsChange$
      .subscribe(
        (notifications: any) => this.onNotificationsStateChange(notifications)
      ));
    this.subscriptions.push(_refreshService.stateChange$
      .subscribe(
        (state: any) => this.onRefreshChange(state)
      ));
    this._refreshService.start();
  }

  onNotificationsStateChange(notifications: Domain.Notification[]): void {
    if (!_.isEqual(notifications, this.notifications)) {
      this.notifications = notifications;
    }
  }

  onStateServiceIsReadyChange(isReady: boolean) {
    if (isReady) {
      if (this._stateService.notifications && this._stateService.notifications.length) {
        this.notifications = this._stateService.notifications;
      }
    }
  }

  onRefreshChange(state: RefreshStateEnum): void {
    console.log('onRefreshChange', state);
    if (state === RefreshStateEnum.refresh) {
      this.generate();
    }
  }

}
