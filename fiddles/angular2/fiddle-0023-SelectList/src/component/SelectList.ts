
import {Component, View} from 'angular2/core';
import {NgFor, NgClass} from 'angular2/common';

class ViewModel {
    selected:number;
    items:Array<any>;
    constructor(config:Object) {
        this.selected = config['selected'] || 1;
        this.items = config['items'] || [];
    }
}

@Component({
    selector: 'select-list',
    inputs : ['model'],
    directives: [NgFor, NgClass],
    template: `
          <div class="container-fluid">
              <div class="row">
                You clicked item # {{selected}}
              </div>
              <div class="row">
                  <ul>
                      <li *ngFor="#item of model.items"
                        id="{{item.name}}"
                        (click)="selectItem(item)">
                        <a>{{item.name}}</a>
                       </li>
                  </ul>
              </div>
          </div>

          `
})
export class SelectList {
    model : ViewModel;
    _selected:number;
    constructor() {
    }
    selectItem (item: any) {
        this._selected = item.id;
    }
    get selected() {
        return this._selected || this.model.selected;
    }
}
