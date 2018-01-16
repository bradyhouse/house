import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

declare let moment: any;

export interface StockPrice {
  date: string;
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  name: string;
}

@Injectable()
export class IntradayService {

  public responseChange$: Observable<any>;
  public errorChange$: Observable<any>;
  public lastUpdated: string;

  private _symbol: string;
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
    const symbolOverrideField: any = document.getElementById('symbolOverride');
    if (symbolOverrideField) {
      this._symbol = symbolOverrideField.value;
    }
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
    const urlOverrideField: any = document.getElementById('intradayUrlOverride'),
      isPassThruField: any = document.getElementById('intradayUsePassThruProxyOverride'),
      proxyUrlField: any = document.getElementById('passThruProxyUrlOverride'),
      proxyUrl: string = proxyUrlField && proxyUrlField.value !== '' ? proxyUrlField.value : null,
      isPassThru: boolean = proxyUrl && isPassThruField && isPassThruField.value === 'true' ? true : false,
      hostUrl: string = window.location.port ? 'http://' + window.location.hostname + ':' + window.location.port :
        'http://' + window.location.hostname,
      self: IntradayService = this,
      req: any = new XMLHttpRequest(),
      timeZoneSuffix: string = this.isDst() ? ' EDT' : ' EST',
      params: any =  {
        url: '',
        allowOrigin: '',
        convertToJson: false,
        allowCredentials: true,
        allowMethods: 'POST',
        allowHeaders: 'Content-Type'
      },
      url: string = urlOverrideField && urlOverrideField.value ? urlOverrideField.value : null;
    let data: any = null,
      lastUpdatedStr: string  = null,
      lastUpdatedDate: Date = null,
      encodedParams = null;
    req.onload = () => {
      if (req.status === 200) {
        data = req.responseText.trimLeft().trimRight();
        self._json.data = JSON.parse(data);
        lastUpdatedStr = self._json.data['Meta Data']['3. Last Refreshed'] + timeZoneSuffix;
        lastUpdatedDate = new Date(lastUpdatedStr);
        self.lastUpdated = moment(lastUpdatedDate).format('MM/DD/YYYY  HH:mm');
        self.response = this.transform(self._json.data['Time Series (1min)']);
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
      this.error = 'Oh snap! The "Intraday Data Source URL" field is missing or is now not populated.';
    }
  }

  private parseDates(obj: any) {
    let date: any;
    const dates: any[] = [];
    for (date in obj) {
      dates.push(date);
    }
    dates.sort();
    return dates;
  }
  private transform(data: any) {
    const dates = this.parseDates(data),
      prices: StockPrice[] = [];
    dates.forEach((date: any) => {
      const item: any = data[date],
      timeZoneSuffix: string = this.isDst() ? ' EDT' : ' EST',
      busDateStr: string = date + timeZoneSuffix,
      localDate: Date = new Date(busDateStr),
      localBusDateStr: string = moment(localDate).format('MM/DD/YYYY  HH:mm'),
      localBusDatePieces: any[] = localBusDateStr.split(' ');
      prices.push({
        date: localBusDateStr,
        time: localBusDatePieces[1],
        open: item['1. open'],
        high: item['2. high'],
        low: item['3. low'],
        close: item['4. close'],
        volume: item['5. volume'],
        name: this._symbol
      });
    });
    return prices;
  }

}
