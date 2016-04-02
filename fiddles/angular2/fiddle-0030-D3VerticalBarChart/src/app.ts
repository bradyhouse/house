import {Component} from 'angular2/core';
import * as core from 'angular2/core';
import {Verticalbar} from './verticalbar/verticalbar';
import * as meta from './meta';


@Component({
    selector: 'app',
    template: `
        <div style="width: 500px;">
            <verticalbar [cls]="chartCls" [height]="chartHeight" [width]="chartWidth" [url]="chartUrl"></verticalbar>
        </div>
    `,
    directives: [Verticalbar]
})
export class App {

    get chartHeight() {
        return window.innerHeight - 50;
    }

    get chartWidth() {
        return window.innerWidth - 50;
    }

    get chartUrl() {
        return meta.urls.data;
    }

    get chartCls() {
        return "chart";
    }
}
