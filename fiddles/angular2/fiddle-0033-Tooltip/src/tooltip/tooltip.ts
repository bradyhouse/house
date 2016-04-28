import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/core';
import {TooltipInterface} from './tooltip.interface';


@Component({
    selector: 'tooltip',
    templateUrl: './src/tooltip/tooltip.html'
})
export class Tooltip {

    @Input() options:TooltipInterface;

    constructor() { }

    get isVisible():boolean {
        return this.options && this.options.visible ? this.options.visible : false;
    }

    get lines():Array<TooltipInterface> {
        return this.options && this.options.lines ? this.options.lines : [];
    }

    get left():number {
        return this.options && this.options.left ? this.options.left : 0;
    }

    get top():number {
        return this.options && this.options.top ? this.options.top : 0;
    }

    get height():number {
        return this.options && this.options.lines && this.options.lines.length ?
            this.options.lines.length * 21 : 100;
    }

}