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
      isPassThruField: any = document.getElementById('volumeUsePassThruProxyOverride'),
      proxyUrlField: any = document.getElementById('passThruProxyUrlOverride'),
      proxyUrl: string = proxyUrlField && proxyUrlField.value !== '' ? proxyUrlField.value : null,
      isUnique: boolean = isUniqueOverrideField && isUniqueOverrideField.value === 'true' ? true : false,
      isPassThru: boolean = proxyUrl && isPassThruField && isPassThruField.value === 'true' ? true : false,
      hostUrl: string = window.location.port ? 'http://' + window.location.hostname + ':' + window.location.port :
        'http://' + window.location.hostname,
      self: VolumeService = this,
      req: any = new XMLHttpRequest(),
      params: any =  {
        url: '',
        allowOrigin: '',
        convertToJson: false,
        allowCredentials: true,
        allowMethods: 'POST',
        allowHeaders: 'Content-Type'
      };

    let url: string = urlOverrideField && urlOverrideField.value ? urlOverrideField.value : null,
      data: any = null,
      encodedParams = null;
    req.onload = () => {
      if (req.status === 200) {
        data = req.responseText.trimLeft().trimRight();
        self._json.data = JSON.parse(data);
        self.response = self._json.data.exchangeData;
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

    if (isUnique) {
      url += this.randomInt(1, 10000000000);
    }
    if (isPassThru && url) {
      params.url = url;
      params.allowOrigin = hostUrl;
      encodedParams = JSON.stringify(params);
      console.log('proxyUrl = ' + proxyUrl);
      console.log('encoded params = ' + encodedParams);
      req.open('POST', proxyUrl);
      req.setRequestHeader('Content-type', 'application/json');
      req.send(encodedParams);
    } else if (url) {
      req.open('GET', url);
      req.send();
    } else {
      this.error = 'Oh snap! The "Volume Data Source URL" field is missing or is now not populated.';
    }
  }

}
