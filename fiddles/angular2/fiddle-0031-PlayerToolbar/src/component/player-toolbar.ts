import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/core';
import {NgStyle, NgSwitch} from 'angular2/common';
import {PlayerRange, IPlayerRange} from './player-range';

export enum PlayerToolbarState {
    noOptions = 0,
    hidden = 1,
    paused = 2,
    play = 3
}

export interface IPlayerToolbar {
    width:number;               // Width of the toolbar
    items:number;               // item count
    item:number;                // (Optional) zero based item index. Defaults to 0
    state:PlayerToolbarState;   // (Optional) state indicator. Defaults to "hidden" when items <= 1
    rangeOptions:IPlayerRange;  // (Optional) Range configuration Options
}

@Component({
    selector: 'player-toolbar',
    template: `
        <div class="footer" [ngSwitch]="state">
            <div *ngSwitchWhen="0" role="noOptions">
                <div class="container-fluid">
                    <div class="alert alert-danger">
                        <i>player-toolbar misconfigured</i>
                    </div>
                </div>
            </div>
            <div *ngSwitchWhen="1"></div>
            <div *ngSwitchDefault class="navbar navbar-default">
                <ul [ngSwitch]="isFirstItem" class="nav navbar-nav navbar-left">
                    <li *ngSwitchWhen="true" role="first"
                        class="btn btn-default disabled">
                        <svg class="buttons" viewBox="0 0 24 24">
                            <path fill="#000000" d="M6,18.14V6.14H8V18.14H6M9.5,12.14L18,6.14V18.14L9.5,12.14Z" />
                        </svg>
                    </li>
                    <li *ngSwitchDefault class="btn btn-default" title="previous" (click)="onPreviousButtonClicked($event)">
                        <svg class="buttons" viewBox="0 0 24 24">
                            <path fill="#000000" d="M6,18.14V6.14H8V18.14H6M9.5,12.14L18,6.14V18.14L9.5,12.14Z" />
                        </svg>
                    </li>
                </ul>
                <ul [ngSwitch]="state" class="nav navbar-nav navbar-left">
                    <li *ngSwitchWhen="3" role="playing"
                        class="btn btn-default"
                        title="pause" (click)="onPauseButtonClicked($event)">
                        <svg class="buttons" viewBox="0 0 24 24">
                            <path fill="#000000" d="M14,19.14H18V5.14H14M6,19.14H10V5.14H6V19.14Z" />
                        </svg>
                    </li>
                    <li *ngSwitchDefault class="btn btn-default" title="play" (click)="onPlayButtonClicked($event)">
                        <svg class="buttons" viewBox="0 0 24 24">
                            <path fill="#000000" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                        </svg>
                    </li>
                </ul>
                <ul [ngSwitch]="isLastItem" class="nav navbar-nav navbar-left">
                    <li *ngSwitchWhen="true" role="last"
                        class="btn btn-default disabled">
                        <svg class="buttons" viewBox="0 0 24 24">
                            <path fill="#000000" d="M16,18.14H18V6.14H16M6,18.14L14.5,12.14L6,6.14V18.14Z" />
                        </svg>
                    </li>
                    <li *ngSwitchDefault class="btn btn-default" title="next" (click)="onNextButtonClicked($event)">
                        <svg class="buttons" viewBox="0 0 24 24">
                            <path fill="#000000" d="M16,18.14H18V6.14H16M6,18.14L14.5,12.14L6,6.14V18.14Z" />
                        </svg>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li class="btn btn-default" title="increment speed (secs)">
                        <player-range [options]="rangeOptions" (valuechange)="onRangeValueChanged($event)"></player-range>
                    </li>
                </ul>
            </div>
        </div>
    `,
    properties: ['state', 'sliderWidth', 'marginLeft'],
    directives: [PlayerRange, NgStyle, NgSwitch]
})
export class PlayerToolbar {

    @Input() options:IPlayerToolbar;

    @Output() statechange:EventEmitter<IPlayerToolbar> = new EventEmitter();

    private _seconds:Number;
    private _rangeWidth:Number = 130;

    ngOnInit() {
        this.statechange.emit(this.options);
    }

    get nextItem():number {
        let curItem:number = this.options.item,
            nextItem:number = curItem + 1;
        if (nextItem = this.options.items) {
            return nextItem;
        }
        return curItem;
    }

    get previousItem():number {
        let curItem:number = this.options.item,
            previousItem:number = curItem - 1;

        if (previousItem >= 0) {
            return previousItem;
        }
        return curItem;
    }

    get isLastItem():boolean {
        return this.options.item == this.options.items;
    }

    get isFirstItem():boolean {
        return this.options.item == 0;
    }

    get state():PlayerToolbarState {
        return this.options.state;
    }

    get rangeOptions():IPlayerRange {
        return this.options.rangeOptions;
    }

    onPreviousButtonClicked():void {
        this.options.item = this.previousItem;
        this.statechange.emit(this.options);
    }

    onPlayButtonClicked():void {
        this.options.state = PlayerToolbarState.play;
        this.statechange.emit(this.options);
    }

    onPauseButtonClicked():void {
        this.options.state = PlayerToolbarState.paused;
        this.statechange.emit(this.options);
    }

    onNextButtonClicked():void {
        this.options.item = this.nextItem;
        if (this.options.item == this.options.items) {
            this.options.state = PlayerToolbarState.paused;
        }
        this.statechange.emit(this.options);
    }

    onRangeValueChanged(value:number):void {
        this.options.rangeOptions.value = value;
        this.statechange.emit(this.options);
    }

}
