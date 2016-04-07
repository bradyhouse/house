import {Component, EventEmitter, Input, Output, OnInit} from 'angular2/core';
import {NgStyle} from 'angular2/common';

export interface IPlayerRange {

    width:number;       // width of the range input control
    value?:number;      // (Optional) current range value; defaults to min
    min?:number;        // (Optional) minimum range value; defaults to 1
    max?:number;        // (Optional) maximum range value; defaults to 10
    step?:number;       // (Optional) range step amount; defaults to 1
    units?:string;      // (Optional) units amount; defaults to 'secs'
    title?:string;      // (Optional) range tooltip; defaults to 'seconds'

}


@Component({
    selector: 'player-range',
    template: `
        <div class="player-range">
            <input type="range"
                   value="{{value}}"
                   min="{{min}}"
                   max="{{max}}"
                   step="{{step}}"
                   [ngStyle]="{'width': width + 'px'}"
                   (change)="onValueChanged($event)"
                   title="{{title}}">
            <label>{{value}}&nbsp;{{units}}</label>
        </div>
    `,
    directives: [NgStyle],
    properties: ['value', 'min', 'max', 'step', 'width', 'units', 'title']
})
export class PlayerRange implements OnInit {
    @Input() options:IPlayerRange;
    @Output() valuechange:EventEmitter<number> = new EventEmitter();

    private _width:number;
    private _min:number;
    private _max:number;
    private _value:number;
    private _step:number;
    private _units:string;
    private _title:string;

    ngOnInit() {
        if (this.options) {
            this._width = this.options.hasOwnProperty('width') ? this.options.width : 130;
            this._min = this.options.hasOwnProperty('min') ? this.options.min : 0;
            this._max = this.options.hasOwnProperty('max') ? this.options.max : 10;
            this._step = this.options.hasOwnProperty('step') ? this.options.step : 1;
            this._value = this.options.hasOwnProperty('value') ? this.options.value : this._min;
            this._units = this.options.hasOwnProperty('units') ? this.options.units : 'secs';
            this._title = this.options.hasOwnProperty('title') ? this.options.title : 'seconds';
        }
    }

    get width():number {
        return this._width;
    }

    get value():number {
        return this._value;
    }

    get min():number {
        return this._min;
    }

    get max():number {
        return this._max;
    }

    get step():number {
        return this._step;
    }

    get units():string {
        return this._units;
    }

    get title():string {
        return this._title;
    }

    onValueChanged(event:any):void {
        this._value = event.target.value;
        this.valuechange.emit(this.value);
    }

    // Experimental ...

    static initOptions(config:IPlayerRange):IPlayerRange {
        let defaultOptions = JSON.parse("{width: 130," +
                "max: 10," +
                "min: 1," +
                "step: 1," +
                "value: 5," +
                "title: 'sec'}"),
            newOptions = Object.create(defaultOptions.prototype);

        if (config) {
            Object.apply(newOptions, config);
        }
        return newOptions;
    }

}
