
/// <reference path="../node_modules/immutable/dist/immutable.d.ts" />

import "angular2/bundles/angular2-polyfills";
import {Component, provide, Inject, View, OnInit} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";
import {List} from "immutable";
import {bootstrap} from "angular2/platform/browser";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/share';
import {JsonDataService} from "./store/JsonDataService";
import {JsonDataStore} from "./store/JsonDataStore";
import {Chart} from "./component/chart/Chart";

@Component({
    selector: 'app',
    providers: [JsonDataStore, JsonDataService, HTTP_PROVIDERS]
})
@View({
    template: `
        <div>
            <chart [uiCls]="chartConfig.uiCls" [store]="jsonDataStore" [nodes]="selectedNodes" [height]="chartHeight"></chart>
        </div>
    `,
    directives: [Chart]
})
export class App implements OnInit {



    constructor(private jsonDataStore: JsonDataStore) {}
    _selectedNodes: String[] = ['GREEN_KIRBY'];

    get height() {
        return window.innerHeight - 60;
    }
    get selectedNodes() {
        return this._selectedNodes;
    }
    get chartHeight() {
        return this.height - 4;
    }
    get chartConfig() {
        return {
            uiCls: "chart"
        }
    }

}

bootstrap(App);
