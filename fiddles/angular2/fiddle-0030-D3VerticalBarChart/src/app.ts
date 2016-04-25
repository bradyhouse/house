import {Component} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {BarChart} from './bar-chart/bar-chart';
import {BarChartInterface} from './bar-chart/bar-chart.interface';
import {ChartInterface} from './bar-chart/chart/chart.interface';

import {DataService} from './data.service'
import * as metadata from './meta';


@Component({
    selector: 'app',
    templateUrl: './src/app.html',
    directives: [BarChart],
    providers: [HTTP_PROVIDERS, DataService]
})
export class App {

    data:Array<ChartInterface> = [];

    private _width:number = window.innerWidth - 50;
    private _height:number = window.innerHeight - 50;
    private _simulate:boolean = true;
    private _delay:number = 1000;
    private _title:string = metadata.fiddleHeader;
    private _chart:BarChart;

    constructor(private dataService:DataService) {

    }

    onWindowResize(event:any):void {

        let srcElement:any = event ? event.srcElement : null,
            window:any = srcElement && srcElement.window ? srcElement.window : null,
            height:any = window ? window.innerHeight : null,
            width:any = window ? window.innerWidth : null;

        if (width && height) {
            this._width = window.innerWidth - 50;
            this._height = window.innerHeight -50;
        }
    }

    onChartReady(chart:BarChart) {
        this._chart = chart;
        this.dataService.request(metadata.urls.data).subscribe((res:any) => {
            if (res.items) {
                this._chart.data = res.items;
            }
        });
    }

    get options():BarChartInterface {
        return {
            simulate: false,
            scaleFn: (d:any):number => {
                let value = d && d.value ? d.value : 0,
                    tolerance:number = d && d.tolerance && d.tolerance !== 0 ? d.tolerance : 1,
                    scale:number = (+value) / (+tolerance);
                return scale;
            },
            scaleRange: [.05, 50]
        }
    }

}
