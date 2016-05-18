import {
    Component, enableProdMode, Injectable, Inject, Input, Output, EventEmitter, OnInit, ElementRef
}
from 'angular2/core';
import {
    bootstrap
}
from 'angular2/platform/browser';
import {
    Http, Headers, HTTP_PROVIDERS
}
from 'angular2/http';
import 'rxjs/add/operator/map';


var meta: any = {
    fiddleHeader: 'Angular 2 (JS) - Tooltip',
    urls: {
        github: 'https://github.com/bradyhouse/house/tree/master/fiddles/angular2/fiddle-0034-TooltipJs'
    },
    consoleTag: 'H O U S E ~ f i d d l e s'
};


@
Injectable()
interface TooltipInterface {
    top ? : number; // absolute top position of the tooltip
    left ? : number; // absolute left position of the tooltip
    width ? : number; // tooltip width; defaults to 150px
    lines ? : Array < {
        field: string,
        value: string
    } > ; // field/value collection
    visible ? : boolean; // visibility (hide/show) flag
}


@
Component({
    selector: 'tooltip',
    template: `
        <div *ngIf="isVisible"
             role="tooltip"
             [ngStyle]="{'top': top + 'px', 'left': left + 'px', 'display': 'block', 'position': 'absolute'}">
            <div class="tooltip-inner" [ngStyle]="{'height': height +'px', 'width': width + 'px'}">
                <div class="row" *ngFor="#line of lines">
                    <span role="field">{{line.field}}</span><span role="value">{{line.value}}</span>
                </div>
            </div>
        </div>
    `
})
class Tooltip {@
    Input() options: TooltipInterface;
    constructor() {}
    get isVisible(): boolean {
        let visibleWidth = this.browserWidth,
            visibleHeight = this.browserHeight,
            width = this.width,
            height = this.height;
        return this.options &&
            this.options.visible &&
            width < visibleWidth &&
            height < visibleHeight ? this.options.visible : false;
    }
    get lines(): Array < TooltipInterface > {
        return this.options && this.options.lines ? this.options.lines : [];
    }
    get browserWidth(): number {
        return window.document.documentElement.clientWidth;
    }
    get browserHeight(): number {
        return window.document.documentElement.clientHeight;
    }
    get left(): number {
        let left = this.options && this.options.left ? this.options.left : 0,
            width = this.width,
            visibleWidth = this.browserWidth;
        return left + width < visibleWidth ? left :
            left - width < visibleWidth && left - width > 0 ? left - width : 0;
    }
    get top(): number {
        let top = this.options && this.options.top ? this.options.top : 0,
            height = this.height,
            visibleHeight = this.browserHeight;
        return (top + height) < visibleHeight ? top :
            top - height < visibleHeight && top - height > 0 ? top - height : 0;
    }
    get height(): number {
        return this.options && this.options.lines && this.options.lines.length ?
            this.options.lines.length * 21 : 100;
    }
    get width(): number {
        return this.options && this.options.width ? this.options.width : 150;
    }
}


@
Component({
    selector: 'app',
    template: `
        <div class="container left">
            <tooltip
                    [options]="tooltipOptions"
            ></tooltip>
            <span *ngFor="#node of nodes">
                <p (mouseover)="onMouseOver($event)" (mouseout)="onMouseOut($event)">{{node}}</p>
            </span>
        </div>
    `,
    directives: [Tooltip]
})
class App {
    private _lines: Array < {
        field: string,
        value: string
    } > = [{
        field: 'Name',
        value: 'Bob'
    }, {
        field: 'Address',
        value: 'NY'
    }, {
        field: 'Age',
        value: '40'
    }, {
        field: 'Hobbies',
        value: 'jousting'
    }, {
        field: 'Favorite Color',
        value: 'blue'
    }];
    private _tooltipOptions: TooltipInterface = {};
    private _nodes: Array < string > = ['A', 'B', 'C', 'D', 'E']
    get width(): number {
        return window.innerWidth;
    }
    get height(): number {
        return window.innerHeight;
    }
    get nodes(): Array < string > {
        return this._nodes;
    }
    onMouseOver(event: any): void {
        let elText: Array < {
            field: string,
            value: string
        } > = [{
            field: 'Node',
            value: event.srcElement.outerText
        }];
        this.tooltipOptions = < TooltipInterface > {
            left: event.x,
            top: event.y,
            lines: elText.concat(this._lines),
            visible: true
        };
    }
    onMouseOut(event: any): void {
        this.tooltipOptions = < TooltipInterface > {};
    }
    get tooltipOptions(): TooltipInterface {
        return this._tooltipOptions;
    }
    set tooltipOptions(options: TooltipInterface) {
        this._tooltipOptions = options;
    }
}


console.log("%c" + meta.consoleTag, 'font-style: italic; font-size: 20px;');
console.log("%c" + meta.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
console.group();
enableProdMode();
bootstrap(App, )
    .catch(err => console.error(err));
