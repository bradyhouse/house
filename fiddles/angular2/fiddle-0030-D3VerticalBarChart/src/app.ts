import {Component} from 'angular2/core';
import * as core from 'angular2/core';
import {VerticalbarChart} from './verticalbar/verticalbar-chart';
import * as meta from './meta';


@Component({
    selector: 'app',
    template: `
        <div style="width: 500px;">
            <verticalbar-chart [cls]="chartCls"
                [height]="chartHeight"
                [width]="chartWidth"
                (resize)="onResize($event)"
                [url]="chartUrl"></verticalbar-chart>
        </div>
    `,
    directives: [VerticalbarChart]
})
export class App {

    private _height:number = window.innerHeight;
    private _width:number = window.innerWidth;

    get chartHeight():number {
        return this._height - 50;
    }

    get chartWidth():number {
        return this._width - 50;
    }

    get chartUrl():string {
        return meta.urls.data;
    }

    get chartCls():string {
        return "chart";
    }

    onResize(window:any):void {
        this._width = window.innerWidth;
        this._height = window.innerHeight;
    }

}
