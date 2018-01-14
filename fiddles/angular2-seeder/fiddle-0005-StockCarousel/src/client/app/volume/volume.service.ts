import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';


@Injectable()
export class VolumeService {

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
    this.request();

  }

  private randomInt(min: number, max: number) {
    const byteArray: any = new Uint8Array(1);

    window.crypto.getRandomValues(byteArray);

    let randomNum: any = '0.' + byteArray[0].toString();

    randomNum = Math.floor(randomNum * (max - min + 1)) + min;

    return randomNum;
  }

  private request() {
    const urlOverrideField: any = document.getElementById('volumeUrlOverride'),
      isUniqueOverrideField: any = document.getElementById('volumeUrlIsUniqueOverride'),
      isUnique: boolean = isUniqueOverrideField && isUniqueOverrideField.value === 'true' ? true : false,
      self: VolumeService = this,
      req: any = new XMLHttpRequest();

    let url: string = urlOverrideField && urlOverrideField.value ? urlOverrideField.value : null;

    if (isUnique) {
      url += this.randomInt(1, 10000000000);
    }

    let data: any = null;

    if (url) {
      req.open('GET', url);
      req.onload = () => {
        if (req.status === 200) {
          window.setTimeout(() => {
            data = req.responseText.trimLeft().trimRight();
            self._json.data = JSON.parse(data);
            self.response = self._json.data.exchangeData;
          }, 1000);
        } else {
          self.error = req.statusText;
        }
      };
      req.onerror = (error: any) => {

        const msg: string = error && error.message ? error.message : 'Unknown server error';

        if (this._errorObserver) {
          this._errorObserver.next(msg);
        }
        self.error = error ? error : new Error(msg);
      };
      req.send();
    } else {
      if (this._errorObserver) {
        this._errorObserver.next('Oh snap! The "List Link URL" field is missing or is now not populated.');
      }
    }
  }

}
