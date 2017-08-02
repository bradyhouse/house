import {Injectable}    from '@angular/core';
import {List} from 'immutable';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';


@Injectable()
export class PopUpService {

  popUpConfigChange$: Observable<number[]>;


  private _isLocalStorageSupported: boolean;
  private _popUp: any;
  private _popUpConfig: List<number>;
  private _popUpConfigObserver: Observer<number[]>;

  get popUp(): any {
    return this._popUp;
  }

  set popUp(value: any) {
    this._popUp = value;

    window.onbeforeunload = () => this.onWindowoBeforeUnload();
    this._popUp.onclose = () => this.onPopUpBeforeUnload();
    this._popUp.onbeforeunload = () => this.onPopUpBeforeUnload();
  }

  get popUpConfig(): number[] {
    return this._popUpConfig.toArray();
  }

  set popUpConfig(value: number[]) {
    let list: List<number> = List(value);

    this._popUpConfig = list;
    this.updateState('popUpConfig', value);
    if (this._popUpConfigObserver) {
      this._popUpConfigObserver.next(value);
    }
  }


  constructor() {
    this._popUp = null;

    if (window.localStorage) {
      this._isLocalStorageSupported = true;
    }
    this._initPopUpConifg();

    this.popUpConfigChange$ = new Observable<number[]>(
      (observer: any) => this._popUpConfigObserver = observer
    ).share();


  }


  onWindowoBeforeUnload() {
    if (this._popUp) {
      this._popUp.close();
    }
  }

  onPopUpBeforeUnload() {
    console.log('onPopUpBeforeUnLoad');
    if (this._popUp) {
      this.popUpConfig = [this._popUp.innerWidth,
        this._popUp.innerHeight,
        this._popUp.screenLeft,
        this._popUp.screenTop];
      delete this._popUp;
      this._popUp = null;
    }
  }

  private _updateState(key: string, value: any) {
    if (this._isLocalStorageSupported) {
      window.localStorage[key] = JSON.stringify(value);
    }
  }

  private _readState(key: string): any {
    let value: any;

    if (this._isLocalStorageSupported) {
      if (window.localStorage[key]) {
        try {
          value = JSON.parse(window.localStorage[key]);
        } catch (e) {
          value = null;
        }
      }
    }

    return value;
  }

  private _initPopUpConifg(): void {
    let state: any[] = this._readState();
    if (state) {
      this._popUpConfig = List(state);
    } else {
      this._popUpConfig = List([]);
    }
  }

}
