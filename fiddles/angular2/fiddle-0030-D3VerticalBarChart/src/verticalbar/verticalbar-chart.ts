import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {VerticalbarChartService} from './verticalbar-chart.service';
import {Verticalbar, VerticalbarOptionsInterface, VerticalbarSeriesInterface} from './verticalbar';
import {EventEmitter} from "angular2/angular2";

declare let d3:any;


@Component({
    selector: 'verticalbar-chart',
    template: `
        <verticalbar
            (window:resize)="onWindowResize($event)"
            (configured)="onChartConfigured($event)"

            [options]="options"
            [data]="data">
        </verticalbar>`,
    directives: [Verticalbar],
    providers: [HTTP_PROVIDERS, VerticalbarChartService]
})
export class VerticalbarChart implements OnChanges {
    @Input() height:number;
    @Input() width:number;
    @Input() url:string;
    @Input() cls:string;
    @Output() resize:EventEmitter<any> = new EventEmitter();

    private _chart:Verticalbar;

    private _data:Array<VerticalbarSeriesInterface>;

    constructor(private verticalBarService:VerticalbarChartService) {

    }

    ngOnInit() {
        this.verticalBarService.request(this.url).subscribe((res:any) => {
            if (res.items) {
                this._data = res.items;
            }
        });
    }


    onWindowResize(event:any):void {

        let srcElement:any = event ? event.srcElement : null,
            window:any = srcElement && srcElement.window ? srcElement.window : null,
            height:any = window ? window.innerHeight : null,
            width:any = window ? window.innerWidth : null;

        if (width && height) {
            this.chart.reconfigure(width, height);
            this.resize.emit(window);
        }
    }

    onChartConfigured(chart:Verticalbar) {
        this._chart = chart;
    }

    get chart():Verticalbar {
        return this._chart;
    }

    get data():Array<VerticalbarSeriesInterface> {
        return this._data;
    }

    get options():VerticalbarOptionsInterface {
        return {
            width: this.width,
            height: this.height
        }
    }


}
