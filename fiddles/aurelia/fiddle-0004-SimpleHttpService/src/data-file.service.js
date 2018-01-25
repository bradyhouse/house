import { HttpClient } from "aurelia-http-client";
import { inject } from "aurelia-framework";


/* See http://stackoverflow.com/questions/32174584/aurelia-http-fetch-client-no-access-control-for-tumblr-api */
@inject(HttpClient)
export class DataFileService {

    constructor(http) {
        this._json = null;
        this._http = http;
      window.setTimeout(() => {
        this.init();
      }, 1000);

    }

    set http(val) {
        this._http = val;
    }

    get http() {
        return this._http;
    }

    get json() {
        return this._json;
    }

    set json(js) {
        this._json = js;
    }

    init() {
        this.http.configure((config) => {
            config.withBaseUrl('/');
        });

        this.http.get('data.json')
            .then(json => this.json = json);
    }

}
