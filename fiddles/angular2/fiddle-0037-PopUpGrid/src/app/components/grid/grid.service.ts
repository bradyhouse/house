import {Component, Injectable} from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class GridService {
    constructor(private http: Http) {}
    request() {
        const endpoint = "data.json";
        return this.http
            .get(endpoint)
            .map(res => res.json());
    }
}

