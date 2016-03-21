import {Component, View} from 'angular2/core';
import {GridController} from './components/grid/Grid';

@Component({
    selector: 'app',
    moduleId: module.id
})
@View({
    template: `
        <grid [height]="height" [url]="url" [filter]="selectedNodes"></grid>
    `,
    directives: [GridController]

})
export class App {

    _selectedNodes: String[] = ['GREEN_KIRBY'];
    _url:String = "data/data.json";


    get height() {
        return window.innerHeight - 60;
    }

    get selectedNodes() {
        return this._selectedNodes;
    }

    get url() {
        return this._url;
    }

}
