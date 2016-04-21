import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/core';
import {Chart} from './chart/chart';
import {ChartInterface} from './chart/chart.interface';
import {BarChartInterface} from './bar-chart.interface';

@Component({
    selector: 'bar-chart',
    templateUrl: './src/bar-chart/bar-chart.html',
    directives: [Chart]
})
export class BarChart {
    @Input() options:BarChartInterface;
    @Output() ready:EventEmitter<BarChart> = new EventEmitter();

    private _chart:Chart;
    private _refreshing:boolean = false;

    private _data:Array<ChartInterface>;

    private get width() {
        return this.options ? this.options.width : 0;
    }

    private get height() {
        return this.options ? this.options.height : 0;
    }

    private get title() {
        return this.options ? this.options.title : '';
    }

    private onSimulateDataChange():void {

        let data:Array<ChartInterface> = this._chart && this._chart.data ? this._chart.data : null,
            max:number = data && data.length ? this._chart.max : 0,
            min:number = data && data.length ? this._chart.min : 0;

        if (data && !this._refreshing) {
            data.map((d:ChartInterface) => {
                if ((+d.value) < 0) {
                    d.value = this.generateValue(-1, min, max);
                } else {
                    d.value = this.generateValue(1, min, max);
                }
            });
            this._chart.data = data;
        }
    }

    private simulateDataChange():void {
        this.onSimulateDataChange();
        window.setTimeout(() => {
            this.simulateDataChange();
        }, this.options.delay || 2000);
    }

    private generateValue(sign:number, min:number, max:number):string {
        let getRandomArbitrary = (min:number, max:number) => {
                return Math.random() * (max - min) + min;
            },
            ret = getRandomArbitrary(min, max) * sign;
        return ret.toString();
    }

    private onWindowResize(event:any):void {

        let srcElement:any = event ? event.srcElement : null,
            window:any = srcElement && srcElement.window ? srcElement.window : null,
            height:any = window ? window.innerHeight : null,
            width:any = window ? window.innerWidth : null;

        if (width && height && this._chart) {
            this._refreshing = true;
            this._chart.width = width - 50;
            this._chart.height = height - 50;
        }

    }

    private onChartDomInit(chart:Chart):void {
        this._chart = chart;
        this._chart.width = this.width;
        this._chart.height = this.height;
        this._chart.title = this.title;
        if (this.options.simulate) {
            window.setTimeout(() => {
                this.simulateDataChange();
            }, this.options.delay || 2000);
        }
        this.ready.emit(this);
    }

    private onChartRefresh(state:boolean) {
        this._refreshing = state;
    }

    get data():Array<ChartInterface> {
        return this._data;
    }

    set data(values:Array<ChartInterface>) {
        this._data = values;
        if (this._chart) {
            this._chart.data = this._data;
        }
    }


}
