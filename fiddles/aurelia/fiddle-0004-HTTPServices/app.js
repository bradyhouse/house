import { YahooChartApiService } from './yahoo-chart-api.service';
import { DataFileService } from './data-file.service';
import { inject } from "aurelia-framework";
import { ObserverLocator } from 'aurelia-framework';

@inject(ObserverLocator, YahooChartApiService, DataFileService)
export class App {

    /* See http://hobbit-on-aurelia.net/viewmodel-observable-management/ */

    constructor(observerLocator, yahooChartApiService, dataFileService) {

        this.jsonService = dataFileService;
        this.jsonpService = yahooChartApiService;
        this.observerLocator = observerLocator;
        this.subscriptions = [];
        this.jsonpData = this.jsonData = 'loading ...';

    }

    activate(params, queryString, routeConfig) {

        this.subscriptions.push(
            this.observerLocator.getObserver(this.jsonService, 'json').subscribe(
                (newValue, oldValue) => {
                    if (newValue !== oldValue) {
                        this.jsonData = JSON.stringify(this.jsonService.json);
                    }
                })
        );

        this.subscriptions.push(
            this.observerLocator.getObserver(this.jsonpService, 'json').subscribe(
                (newValue, oldValue) => {
                    if (newValue !== oldValue) {
                        this.jsonpData = JSON.stringify(this.jsonpService.json);
                    }
                })
        );
    }

    deactivate() {
        while (this.subscriptions.length) {
            this.subscriptions.pop()();
        }
    }


}
