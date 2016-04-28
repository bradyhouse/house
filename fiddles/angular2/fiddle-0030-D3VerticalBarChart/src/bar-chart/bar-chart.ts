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
    @Output() click:EventEmitter<ChartInterface> = new EventEmitter();
    @Output() mouseover:EventEmitter<ChartInterface> = new EventEmitter();
    @Output() mouseout:EventEmitter<ChartInterface> = new EventEmitter();

    private _chart:Chart;
    private _refreshing:boolean = false;
    private _defaultScaleRange = [0,10];

    private _data:Array<any>;

    get title():string {
        return this._chart ? this._chart.title : (this.options.title ? this.options.title : '');
    }

    set title(value:string) {
        if (this._chart) {
            this._chart.title = value;
        }
    }

    private get valueScaleFn():Function {
        return this.options.hasOwnProperty('scaleFn') ? this.options.scaleFn : this.defaultScaler;
    }

    private get valueDeltaMax():number {
        return this.options.scaleRange && this.options.scaleRange.length > 1 ? this.options.scaleRange[1] : this._defaultScaleRange[1];
    }

    private get valueDeltaMin():number {
        return this.options.scaleRange && this.options.scaleRange.length > 1 ? this.options.scaleRange[0] : this._defaultScaleRange[0];
    }

    private defaultScaler(d:ChartInterface) {
        return d.value;
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

    private generateValue(sign:number, min:number, max:number):number {
        let getRandomArbitrary = (min:number, max:number) => {
                return Math.random() * (max - min) + min;
            },
            ret = getRandomArbitrary(min, max) * sign;
        return ret;
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

    private onChartBarClick(bar:ChartInterface) {
        this.click.emit(bar);
    }

    private onChartBarMouseOver(bar:ChartInterface) {
        this.mouseover.emit(bar);
    }

    private onChartBarMouseOut(bar:ChartInterface) {
        this.mouseout.emit(bar);
    }

    private onChartDomInit(chart:Chart):void {
        this._chart = chart;
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

    get data():Array<any> {
        return this._data;
    }

    set data(values:Array<any>) {
        this._data = values;
        if (this._chart) {
            this._chart.data = this._data;
        }
    }

    get chartOptions():ChartInterface {
        return <ChartInterface>{
            valueScaleFn: this.valueScaleFn,
            valueDeltaMax: this.valueDeltaMax,
            valueDeltaMin: this.valueDeltaMin
        }
    }

}
