import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {NgStyle, NgSwitch} from 'angular2/common';
import {PlayerRange, IPlayerRange} from './player-range/player-range';

export enum PlayerToolbarState {
    noOptions = 0,
    hidden = 1,
    paused = 2,
    playing = 3,
    first = 4,
    last = 5
}

export interface IPlayerToolbar {
    width:Number;               // Width of the toolbar
    items:Number;               // item count
    item?:Number;               // (Optional) zero based item index. Defaults to 0
    state?:PlayerToolbarState; // (Optional) state indicator. Defaults to "hidden" when items <= 1
    rangeOptions?:IPlayerRange; // (Optional) Range configuration Options
}

@Component({
    selector: 'player-toolbar',
    template: `
        <div class="footer" [ngSwitch]="state">
            <nav *ngSwitchWhen="0" role="noOptions">
                <div class="container-fluid">
                    <div class="alert alert-danger">
                        <i>player-toolbar misconfigured</i>
                    </div>
                </div>
            </nav>
            <nav *ngSwitchWhen="1"></nav>
            <nav *ngSwitchDefault class="navbar navbar-default">
                <div class="container-fluid">
                    <ul [ngSwitch]="state" class="nav navbar-nav navbar-left">
                        <li *ngSwitchWhen="4" role="first"
                            class="btn btn-default disabled">
                            <a href="#" class="fa fa-step-backward fa-3x"></a>
                        </li>
                        <li *ngSwitchDefault class="btn btn-default" title="previous">
                            <a href="#" class="fa fa-step-backward fa-3x"></a>
                        </li>
                    </ul>
                    <ul [ngSwitch]="state" class="nav navbar-nav navbar-left">
                        <li *ngSwitchWhen="3" role="playing"
                            class="btn btn-default"
                            title="pause">
                            <a href="#" class="fa fa-pause fa-3x"></a>
                        </li>
                        <li *ngSwitchDefault class="btn btn-default" title="play">
                            <a href="#" class="fa fa-play fa-4x"></a>
                        </li>
                    </ul>
                    <ul [ngSwitch]="state" class="nav navbar-nav navbar-left">
                        <li *ngSwitchWhen="5" role="last"
                            class="btn btn-default disabled">
                            <a href="#" class="fa fa-step-forward fa-3x"></a>
                        </li>
                        <li *ngSwitchDefault class="btn btn-default" title="next">
                            <a href="#" class="fa fa-step-forward fa-3x"></a>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li class="btn btn-default" title="increment speed (secs)">
                            <player-range [options]="rangeOptions"></player-range>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>`,
    properties: ['state', 'sliderWidth', 'marginLeft'],
    directives: [PlayerRange, NgStyle, NgSwitch]
})
export class PlayerToolbar {

    @Input() options:IPlayerToolbar;
    @Output() play: EventEmitter<any> = new EventEmitter();
    @Output() pause: EventEmitter<any> = new EventEmitter();
    @Output() previous: EventEmitter<any> = new EventEmitter();
    @Output() next: EventEmitter<any> = new EventEmitter();
    @Output() first: EventEmitter<any> = new EventEmitter();
    @Output() last: EventEmitter<any> = new EventEmitter();



    private _state:PlayerToolbarState = PlayerToolbarState.noOptions;
    private _rangeWidth:Number = 130;
    private _rangeOptions:IPlayerRange = {
            width: this._rangeWidth
    };


    get state():PlayerToolbarState {
        return this.options && this.options.hasOwnProperty('state') ? this.options.state : this._state;
    }

    get rangeOptions():IPlayerRange {
        return this.options && this.options.hasOwnProperty('rangeOptions') ? this.options.rangeOptions : this._rangeOptions;
    }

    onPlayClicked(event:any) {
        this.gridRowDoubleClicked.emit(row);
    }

}
