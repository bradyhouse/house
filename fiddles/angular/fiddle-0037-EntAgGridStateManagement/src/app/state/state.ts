import { Observable } from 'rxjs/Observable';

export class PersistedTypesEnum {
    static localStorageKey = 'fiddle-0037';
    static gridState = 'gridState';
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
  [key: string]: any;
  type: string;
  isReady: boolean;
  isPreloader: boolean;
  gridState: GridState;
}