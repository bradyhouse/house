import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs/Observable';
import {
  Observer
} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import {
  LocalStorageService
} from './local-storage/local-storage.service';
import {
  GridState,
  PersistedTypesEnum,
  StateServiceInterface
} from './state';
declare let _: any;
import {
  List
} from 'immutable';


@Injectable()
export class StateService implements StateServiceInterface {

  isPreloaderChange$: Observable<boolean>;
  isReadyChange$: Observable<boolean>;
  gridStateChange$: Observable<GridState>;
  typeChange$: Observable<string>;

  [key: string]: any;

  private _gridState: GridState;
  private _gridStateObserver: Observer<GridState>;
  private _isPreloader: boolean;
  private _isPreloaderObserver: Observer<boolean>;
  private _isReady: boolean;
  private _isReadyObserver: Observer<boolean>;
  private _type: string;
  private _typeObserver: Observer<string>;

  set isPreloader(newValue: boolean) {
    if (this._isPreloader !== newValue) {
      this._isPreloader = newValue;
      if (this._isPreloaderObserver) {
        this._isPreloaderObserver.next(newValue);
      }
    }
  }

  get isPreloader(): boolean {
    return this._isPreloader;
  }

  set isReady(newValue: boolean) {
    if (this._isReady !== newValue) {
      this._isReady = newValue;
      if (this._isReadyObserver) {
        this._isReadyObserver.next(newValue);
      }
    }
  }

  get isReady(): boolean {
    return this._isReady;
  }

  get gridState(): GridState {
    return this._gridState;
  }

  set gridState(newValue: GridState) {
    if (!_.isEqual(newValue, this._gridState)) {
      this._gridState = newValue;
      if (this.isReady) {
        this.updateState(PersistedTypesEnum.gridState, {gridState: newValue});
      }
      if (this._gridStateObserver) {
        this._gridStateObserver.next(newValue);
      }
    }
  }

  set type(newValue: string) {
    if (this._type !== newValue) {
      this._type = newValue;
      if (this._typeObserver) {
        this._typeObserver.next(newValue);
      }
    }
  }

  get type(): string {
    return this._type;
  }

  constructor(protected localStorageService: LocalStorageService) {
    this._isReady = false;
    this._type = PersistedTypesEnum.localStorageKey;
    this._isPreloader = true;
    this._gridState = {};

    this.isReadyChange$ = new Observable < boolean > (
      (observer: any) => this._isReadyObserver = observer
    ).share();

    this.gridStateChange$ = new Observable<GridState>(
      (observer: any) => this._gridStateObserver = observer
    ).share();

    this.typeChange$ = new Observable<string>(
      (observer: any) => this._typeObserver = observer
    ).share();

  }

  private updateState(key: string, value: any, type: string = null) {
    if (this.type) {
      this.localStorageService.write(key, value, this.type);
    }
  }

}
