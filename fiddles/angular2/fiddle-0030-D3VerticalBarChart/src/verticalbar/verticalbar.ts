import {Component, OnInit, Input} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {VerticalbarService} from './verticalbar.service';
import {VerticalbarD3} from './verticalbar-d3';
import {VerticalbarD3OptionsInterface} from './verticalbar-d3-options.interface';
import {VerticalbarD3SeriesInterface} from './verticalbar-d3-series.interface';

declare let d3:any;


@Component({
    selector: 'verticalbar',
    template: `<div class="{{cls}}-scrollbox" style="width: {{width}}px; height: {{height}}px;">
                <verticalbar-d3 [options]="options" [data]="data"></verticalbar-d3>
               </div>`,
    styleUrls: [
        'src/verticalbar/verticalbar.css'
    ],
    directives: [VerticalbarD3],
    providers: [HTTP_PROVIDERS, VerticalbarService]
})
export class Verticalbar implements OnInit {
    @Input() height:Number;
    @Input() width:Number;
    @Input() url:String;
    @Input() cls:String;

    private _data:Array<VerticalbarD3SeriesInterface>;

    constructor(private verticalBarService:VerticalbarService) {

    }

    ngOnInit() {
        this.verticalBarService.request(this.url).subscribe((res:any) => {
            if (res.items) {
                this._data = res.items;
            }
        });
    }

    get data():Array<VerticalbarD3SeriesInterface> {
        return this._data;
    }

    get options():VerticalbarD3OptionsInterface {
        return {
            width: this.width,
            height: this.height
        }
    }


}
