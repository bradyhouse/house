import {Component, View} from "angular2/core";
import * as core from 'angular2/core';
import {SelectList} from "./component/SelectList";

@Component({
    selector: "app"
})
@View({
    template: `
      <select-list [model]="selectListConfig"></select-list>
      `,
    directives: [SelectList]
})
export class Fiddle {
    currentSelection:number;
    areas:Array<any>;

    constructor() {
        this.currentSelection = 2;
        this.areas = [
            {id: 1, category: "Operations", name: "Floorplan"},
            {id: 2, category: "Operations", name: "Combinations"},
            {id: 3, category: "Planning", name: "Schedule"},
            {id: 4, category: "Planning", name: "Publish"}
        ];
    }

    get selectListConfig() {
        return {
            items: this.areas,
            selected: this.currentSelection
        }
    }
}
