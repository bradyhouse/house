import {Component, Input} from 'angular2/core';
import {NgStyle} from 'angular2/common';

export interface IPlayerRange {

    width:Number;       // width of the range input control
    value?:Number;      // (Optional) Defaults to minimum value
    min?:Number;        // (Optional) Minimum value of the range; defaults to zero
    max?:Number;        // (Optional) Maximum value of the range; defaults to 100
    step?:Number;       // (Optional) Scale factor; defaults to 1

}


@Component({
    selector: 'player-range',
    template: `
        <div class="player-range">
            <input type="range"
                   value="value"
                   min="{{min}}"
                   max="{{max}}"
                   step="{{step}}"
                   [ngStyle]="{'width': width + 'px'}">
            <label>{{value}}&nbsp;secs</label>
        </div>
    `,
    directives: [NgStyle],
    properties: ['value', 'min', 'max', 'step', 'width']
})
export class PlayerRange {
    @Input() options:PlayerRangeInterface;

    private _min:Number = 0;
    private _max:Number = 100;
    private _value:Number = this._min;
    private _step:Number = 1;

    get width():Number {
        return this.options.width;
    }

    get value():Number {
        return this.options.hasOwnProperty('value') ? this.options.value : this._value;
    }

    get min():Number {
        return this.options.hasOwnProperty('min') ? this.options.min : this._min;
    }

    get max():Number {
        return this.options.hasOwnProperty('max') ? this.options.max : this._max;
    }

    get step():Number {
        return this.options.hasOwnProperty('step') ? this.options.step : this._step;
    }

}
