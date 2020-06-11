import { Observable } from 'rxjs/Observable';
import * as NotifyDomain from '../notify/notify';

export class PersistedTypesEnum {
    static localStorageKey = 'fiddle-0037';
    static gridState = 'gridState';
    static notifications = 'notifications';
}

export interface GridState {
    columnState?: any;
    columnGroupsState?: any;
    sortModel?: any;
    filterModel?: any;
    detailColumnState?: any;
    detailSortModel?: any;
    detailFilterModel?: any;
}


export interface State {
    gridState: GridState;
}



export interface StateServiceInterface {
  isReadyChange$: Observable<boolean>;
  isPreloaderChange$: Observable<boolean>;
  gridStateChange$: Observable<GridState>;
  notificationsChange$: Observable<NotifyDomain.Notification[]>;
  [key: string]: any;
  type: string;
  isReady: boolean;
  isPreloader: boolean;
  gridState: GridState;
}