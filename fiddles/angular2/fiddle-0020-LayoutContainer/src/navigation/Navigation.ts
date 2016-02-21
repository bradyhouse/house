import {Component} from 'angular2/core';



@Component({
    selector: 'r2d2-navigation',
    template: `
    <div class="col-md-2 r2d2-nav">
        <div id="r2d2-navigation-el" class="panel panel-default" style="height: {{height}}px;">
            <div class="panel-body">
                <code>LEFT NAV</code>
                <img src="x.png" width="100%" />
                <img src="x.png" width="100%" />
                <img src="x.png" width="100%" />
            </div>
        </div>
    </div>`
})
export class Navigation {

    constructor() {
        this._height = window.innerHeight - 100;
    }
    get height() {
        return this._height;
    }

    set height(val) {
        this._height = val;
    }

}
