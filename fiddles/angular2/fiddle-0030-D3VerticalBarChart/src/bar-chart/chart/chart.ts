import {Component, OnInit, ElementRef, Inject, Input, Output, EventEmitter} from 'angular2/core';
import {ChartView} from './chart-view';
import {ChartInterface} from './chart.interface';

@Component({
    selector: 'chart',
    properties: ['data', 'width', 'height', 'title'],
    templateUrl: './src/bar-chart/chart/chart.html',
})
export class Chart implements OnInit {
    @Input() options:ChartInterface;
    @Output() refresh:EventEmitter<boolean> = new EventEmitter();
    @Output() domInit:EventEmitter<Chart> = new EventEmitter();
    @Output() barClick:EventEmitter<ChartInterface> = new EventEmitter();
    @Output() barMouseOver:EventEmitter<ChartInterface> = new EventEmitter();
    @Output() barMouseOut:EventEmitter<ChartInterface> = new EventEmitter();

    private _data:Array<ChartInterface>;
    private _view:ChartView;

    constructor(@Inject(ElementRef) elementRef:any) {
        this._view = new ChartView(elementRef.nativeElement, this);
    }

    public ngOnInit():void {
        if (this.options.title) {
            this._view.title = this.options.title;
        }
        window.setTimeout(() => {
            this.domInit.emit(this);
        }, 500);
    }

    public get title():string {
        return this._view.title;
    }

    public set title(value:string) {
        this._view.title = value;
    }

    public get width():number {
        return this._view.width;
    }

    public set width(value:number) {
        this._view.width = value;
    }

    public get height():number {
        return this._view.height;
    }

    public set height(value:number) {
        this._view.height = value;
    }

    public get data():Array<ChartInterface> {
        return this._data;
    }

    public set data(arr:Array<ChartInterface>) {
        this._data = arr;
        this._view.render();
    }

    public triggerRefresh(status:boolean) {
        this.refresh.emit(status);
    }

    public triggerBarMouseOut(bar:ChartInterface):void {
        this.barMouseOut.emit(bar);
    }

    public triggerBarClick(bar:ChartInterface):void {
        setTimeout(() => {
            this.barClick.emit(bar);
        }, 500);
    }

    public triggerBarMouseOver(bar:ChartInterface):void {
        this.barMouseOver.emit(bar);
    }

}
