import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

declare let moment: any;

export interface Quote {
  lastPrice: number;
  valueChange: number;
  percentChange: number;
  high: number;
  low: number;
  volume: string;
  lastUpdated: string;
  isChangeNegative: boolean;
}

@Injectable()
export class QuoteService {

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

  private stdTimezoneOffset() {
    const today: Date = new Date(),
      jan: Date = new Date(today.getFullYear(), 0, 1),
      jul: Date = new Date(today.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  }

  private isDst() {
    const today: Date = new Date();
    return today.getTimezoneOffset() < this.stdTimezoneOffset();
  }

  private request() {
    const urlOverrideField: any = document.getElementById('quoteUrlOverride'),
      isPassThruField: any = document.getElementById('quoteUsePassThruProxyOverride'),
      isConvertJsonField: any = document.getElementById('quoteConvertToJsonOverride'),
      proxyUrlField: any = document.getElementById('passThruProxyUrlOverride'),
      proxyUrl: string = proxyUrlField && proxyUrlField.value !== '' ? proxyUrlField.value : null,
      isConvertJson: boolean = isConvertJsonField && isConvertJsonField.value === 'true' ? true : false,
      isPassThru: boolean = proxyUrl && isPassThruField && isPassThruField.value === 'true' ? true : false,
      hostUrl: string = window.location.port ? 'http://' + window.location.hostname + ':' + window.location.port :
        'http://' + window.location.hostname,
      self: QuoteService = this,
      req: any = new XMLHttpRequest(),
      params: any =  {
        url: '',
        allowOrigin: '',
        convertToJson: isConvertJson,
        allowCredentials: true,
        allowMethods: 'POST',
        allowHeaders: 'Content-Type'
      },
      url: string = urlOverrideField && urlOverrideField.value ? urlOverrideField.value : null;
    let data: any = null,
      encodedParams = null;
    req.onload = () => {
      if (req.status === 200) {
        data = req.responseText.trimLeft().trimRight();
        self._json.data = JSON.parse(data);
        self.response = this.transform(self._json.data.STOCKQUOTE.RESULT[0].ROW[0]);
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
    if (isPassThru && url) {
      params.url = url;
      params.allowOrigin = hostUrl;
      encodedParams = JSON.stringify(params);
      req.open('POST', proxyUrl);
      req.setRequestHeader('Content-type', 'application/json');
      req.send(encodedParams);
    } else if (url) {
      req.open('GET', url);
      req.send();
    } else {
      this.error = 'Oh snap! The "Quote Data Source URL" field is missing or is now not populated.';
    }
  }

  private transform(data: any) {
    const formatNumber: Function = (val: any) => {
      const parts: any = val.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
      },
      timeZoneSuffix: string = this.isDst() ? ' EDT' : ' EST',
      busDateStr: string = data.LASTDATETIME[0] + timeZoneSuffix,
      localDate: Date =  new Date(busDateStr),
      localBusDateStr: string = moment(localDate).format('MM/DD/YYYY  HH:mm'),
      quote: Quote = {
        lastPrice: Number(data.LASTPRICE[0]),
        valueChange: Number(data.CHANGE[0]),
        percentChange: Number(data.PCHANGE[0]),
        high: Number(data.HIGH[0]),
        low: Number(data.LOW[0]),
        volume: formatNumber(data.VOLUME[0]),
        lastUpdated: localBusDateStr,
        isChangeNegative: false
      };

    if (quote.valueChange < 0) {
      quote.isChangeNegative = true;
    }
    return quote;
  }

}
