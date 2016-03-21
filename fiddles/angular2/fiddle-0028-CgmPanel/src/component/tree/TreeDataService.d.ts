import { Http } from 'angular2/http';
export declare class TreeDataService {
    private http;
    constructor(http: Http);
    request(url: String): any;
}
