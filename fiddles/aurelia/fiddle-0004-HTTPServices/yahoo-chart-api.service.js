import { HttpClient } from "aurelia-http-client";
import { inject } from "aurelia-framework";
import * as meta from './meta.js';


/* See http://stackoverflow.com/questions/32174584/aurelia-http-fetch-client-no-access-control-for-tumblr-api */
@inject(HttpClient)
export class YahooChartApiService {

    constructor(http) {
        http.configure((config) => {
            config.withBaseUrl('https://chartapi.finance.yahoo.com/');
        });
        this.json = null;
        this.http = http;
        this.request();

    }

    request() {
        let self = this;
        top.jsoncallback = function (data) {
            self.json = data;
        };
        return this.http.jsonp('instrument/1.0/%5EDJI/chartdata;type=quote;range=5d/json?callback=jsoncallback');
    }

}