import { HttpClient } from "aurelia-http-client";
import { inject } from "aurelia-framework";
import * as meta from './meta';

@inject( HttpClient )
export class YahooChartApiService{
    constructor(httpClient){
        this.baseUrl = 'http://chartapi.finance.yahoo.com';
        this.http = httpClient;
    }

    getAll() {
        var request = this.http.createRequest();

        request.asGet()
                .withHeader("Access-Control-Allow-Origin", meta.urls.data)
                .withUrl(meta.urls.data);

        return request.send().then(response => response.content);

    }


}