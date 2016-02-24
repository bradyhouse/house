import {Component, enableProdMode, Injectable} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';



@Injectable()
export class DataJsonApi {
    constructor(private http: Http) {}
    request() {
        const endpoint = metadata.urls.data;
        return this.http
            .get(endpoint)
            .map(res => res.json());
    }
}

