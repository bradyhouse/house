import { Observable } from 'rxjs/Observable';

export interface Notification {
    id: number;
    message: string;
    status: boolean;
    versionTimeStamp: number;
}

export interface NotifyServiceInterface {
   isPermissionChange$: Observable<boolean>;
   isEnabledChange$: Observable<boolean>;
   notifications: Notification[];
   isNotificationSupport: boolean;
   isPermission: boolean;
   isEnabled: boolean;
   generate(): void;
   acknowledge(id: number): void;
   requestPermission(): void;
   checkNotificationPromise(): boolean;
   handlePermission(permission: string): void;
}
