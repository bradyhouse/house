import {Component, ViewEncapsulation} from 'angular2/core';
import {Chart} from './components/chart/Chart';

@Component({
    selector: 'app',
    moduleId: module.id,
    template: `
        <chart [uiCls]="chartConfig.uiCls" [nodes]="selectedNodes" [height]="chartHeight" [url]="chartConfig.url"></chart>
    `,
    directives: [Chart],
    encapsulation: ViewEncapsulation.None
})
export class App {
    _selectedNodes: String[] = ['GREEN_KIRBY'];

    get height() {
        return window.innerHeight - 60;
    }
    get selectedNodes() {
        return this._selectedNodes;
    }
    get chartHeight() {
        return this.height - 4;
    }
    get chartConfig() {
        return {
            uiCls: "chart",
            url: "data/data.json"
        }
    }

}
