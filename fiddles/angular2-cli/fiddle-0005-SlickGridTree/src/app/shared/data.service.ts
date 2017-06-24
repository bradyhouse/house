import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';


@Injectable()
export class DataService {

  public responseChange$: Observable<any>;
  public errorChange$: Observable<any>;

  private _response: any;
  private _responseObserver: Observer<any>;

  private _error: any;
  private _errorObserver: Observer<any>;

  private _json: any = {
    data: []
  };

  set response(resp: any) {
    this._response = resp;
    if (this._responseObserver) {
      this._responseObserver.next(resp);
    }
  }

  get response(): any {
    return this._response;
  }

  set error(err: any) {
    this._error = err;
    if (this._errorObserver) {
      this._errorObserver.next(err);
    }
  }

  get error(): any {
    return this._error;
  }

  constructor() {

    this.responseChange$ = new Observable(
      (observer: any) => this._responseObserver = observer
    ).share();

    this.errorChange$ = new Observable(
      (observer: any) => this._errorObserver = observer
    ).share();

    this.request('assets/json/big-data.json');

  }

  private request(url) {
    let self: DataService = this,
      req: any = new XMLHttpRequest(),
      data: any;
    req.open('GET', url);
    req.onload = () => {
      if (req.status == 200) {
        window.setTimeout(() => {
          data = req.responseText.trimLeft().trimRight();
          self._json.data = JSON.parse(data);
          self.response = self._json;
        }, 1000);
      } else {
        self.error = req.statusText;
      }
    }
    req.onerror = () => {
      self.error = "Unknown Error";
    }
    req.send();
  }

}
