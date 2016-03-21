/// <reference path="../node_modules/immutable/dist/immutable.d.ts" />
import { OnInit } from "angular2/core";
import { JsonDataStore } from "./store/JsonDataStore";
export declare class App implements OnInit {
    private jsonDataStore;
    constructor(jsonDataStore: JsonDataStore);
    _selectedNodes: String[];
    height: number;
    selectedNodes: String[];
    chartHeight: number;
    chartConfig: {
        uiCls: string;
    };
}
