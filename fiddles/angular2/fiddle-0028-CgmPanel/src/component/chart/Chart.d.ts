import { OnChanges } from 'angular2/core';
import { JsonDataStore } from '../../store/JsonDataStore';
export declare class Chart implements OnChanges {
    data: Object[];
    height: Number;
    nodes: String[];
    url: String;
    uiCls: String;
    store: JsonDataStore;
    constructor();
    ngOnChanges(): void;
    bind(data: any): void;
    message: string;
    chartOptions: {
        chart: {
            id: string;
            type: string;
            margin: {
                top: number;
                right: number;
                bottom: number;
                left: number;
            };
            x: (d: any) => any;
            y: (d: any) => any;
            showValues: boolean;
            valueFormat: (d: any) => any;
            duration: number;
            rotateLabels: number;
            showLegend: boolean;
            staggerLabels: boolean;
            noData: string;
            xAxis: {
                axisLabel: string;
            };
            yAxis: {
                axisLabel: string;
            };
        };
    };
}
