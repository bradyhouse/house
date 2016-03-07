import {Component} from 'angular2/core';
import * as core from 'angular2/core';
import {Chart} from './component/Chart';
import * as meta from './meta';


@Component({
    selector: 'app',
    template: `
        <div style="width: 500px;">
            <chart [uiCls]="chartUiCls" [nodes]="chartNodes" [height]="chartHeight" [url]="chartUrl"></chart>
        </div>
    `,
    directives: [Chart]
})
export class App {
    get chartNodes() {
        return ["GREEN_KIRBY", "KLEIN_WATERS"];
    }
    get chartHeight() {
        return 300;
    }
    get chartUrl() {
        return meta.urls.data;
    }
    get chartUiCls() {
        return "chart";
    }
}
