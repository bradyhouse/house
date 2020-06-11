
export interface Notification {
    id: number;
    message: string;
    status: boolean;
    versionTimeStamp: number;
}

export interface NotifyServiceInterface {
   notifications: Notification[];
   isNotificationSupport: boolean;
   isPermission: boolean;
   generate(): void;
   acknowledge(id: number): void;
   requestPermission(): void;
   checkNotificationPromise(): boolean;
   handlePermission(permission: string): void;
}
