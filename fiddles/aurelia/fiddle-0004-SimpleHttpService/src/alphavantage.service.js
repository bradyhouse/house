import { HttpClient } from "aurelia-http-client";
import { inject } from "aurelia-framework";


@inject(HttpClient)
export class AlphaVantageService {

    constructor(http) {
        http.configure((config) => {
            config.withBaseUrl('https://www.alphavantage.co/');
        });
        http.configure((config) => {
            config.withBaseUrl();
        });
        this.json = null;
        this.http = http;
        window.setTimeout(() => {
          this.request();
        }, 2000);
    }

    request() {
        let self = this;
      this.http.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=demo')
        .then(json => this.json = json);
    }

}
