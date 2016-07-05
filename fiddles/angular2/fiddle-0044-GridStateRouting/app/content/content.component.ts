import { Component }            from '@angular/core';
import { ROUTER_DIRECTIVES }    from '@angular/router';
import { Base }                 from '../components/base';
import 'jquery';
import 'jquery-csv';

declare let jQuery:any;

@Component({
    selector: 'content',
    templateUrl: './app/content/content.component.html',
    styleUrls: ['./app/content/content.component.css'],
    directives: [[ROUTER_DIRECTIVES]],
    providers: []
})
export class ContentComponent extends Base {

    private _width:number;
    private _height:number;


    onWindowResize() {
        window.setTimeout(() => {
            this._width = jQuery('.content-component').width();
            this._height = jQuery('.wrapper').height();
        }, 200);
    }

    get width() {
        if (!this._width) {
            this._width = jQuery('.content-component').width();
        }
        return this._width;
    }

    get height() {
        if (!this._height) {
            this._height = jQuery('.wrapper').height();

        }
        return this._height;
    }

}
