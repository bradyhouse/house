import {Component, Injectable} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';



@Injectable()
export class DataJsonApi {
    constructor(private http: Http) {}
    request() {
        const endpoint = "data.json";
        return this.http
            .get(endpoint)
            .map(res => res.json());
    }
}

