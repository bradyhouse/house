import { Http } from 'angular2/http';
export declare class ChartDataService {
    private http;
    constructor(http: Http);
    bind(url: String, titles: String[], store: Object[]): void;
    request(url: String): any;
}
