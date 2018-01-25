import { AlphaVantageService } from './alphavantage.service';
import { DataFileService } from './data-file.service';
import { inject } from "aurelia-framework";
import { ObserverLocator } from 'aurelia-framework';

@inject(ObserverLocator, AlphaVantageService, DataFileService)
export class App {

  /* See http://hobbit-on-aurelia.net/viewmodel-observable-management/ */

  constructor(observerLocator, alphaVantageService, dataFileService) {

    this.jsonService = dataFileService;
    this.getService = alphaVantageService;
    this.observerLocator = observerLocator;
    this.subscriptions = [];
    this.jsonGetData = this.jsonData = 'loading ...';

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
      this.observerLocator.getObserver(this.getService, 'json').subscribe(
        (newValue, oldValue) => {
        if (newValue !== oldValue) {
      this.jsonGetData = JSON.stringify(this.getService.json);
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
