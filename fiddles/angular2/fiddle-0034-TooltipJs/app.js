"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var browser_1 = require('angular2/platform/browser');
require('rxjs/add/operator/map');
var meta = {
    fiddleHeader: 'Angular 2 (JS) - Tooltip',
    urls: {
        github: 'https://github.com/bradyhouse/house/tree/master/fiddles/angular2/fiddle-0034-TooltipJs'
    },
    consoleTag: 'H O U S E ~ f i d d l e s'
};
var Tooltip = (function () {
    function Tooltip() {
    }
    Object.defineProperty(Tooltip.prototype, "isVisible", {
        get: function () {
            var visibleWidth = this.browserWidth, visibleHeight = this.browserHeight, width = this.width, height = this.height;
            return this.options &&
                this.options.visible &&
                width < visibleWidth &&
                height < visibleHeight ? this.options.visible : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "lines", {
        get: function () {
            return this.options && this.options.lines ? this.options.lines : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "browserWidth", {
        get: function () {
            return window.document.documentElement.clientWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "browserHeight", {
        get: function () {
            return window.document.documentElement.clientHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "left", {
        get: function () {
            var left = this.options && this.options.left ? this.options.left : 0, width = this.width, visibleWidth = this.browserWidth;
            return left + width < visibleWidth ? left :
                left - width < visibleWidth && left - width > 0 ? left - width : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "top", {
        get: function () {
            var top = this.options && this.options.top ? this.options.top : 0, height = this.height, visibleHeight = this.browserHeight;
            return (top + height) < visibleHeight ? top :
                top - height < visibleHeight && top - height > 0 ? top - height : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "height", {
        get: function () {
            return this.options && this.options.lines && this.options.lines.length ?
                this.options.lines.length * 21 : 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "width", {
        get: function () {
            return this.options && this.options.width ? this.options.width : 150;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input()
    ], Tooltip.prototype, "options", void 0);
    Tooltip = __decorate([
        core_1.Component({
            selector: 'tooltip',
            template: "\n        <div *ngIf=\"isVisible\"\n             role=\"tooltip\"\n             [ngStyle]=\"{'top': top + 'px', 'left': left + 'px', 'display': 'block', 'position': 'absolute'}\">\n            <div class=\"tooltip-inner\" [ngStyle]=\"{'height': height +'px', 'width': width + 'px'}\">\n                <div class=\"row\" *ngFor=\"#line of lines\">\n                    <span role=\"field\">{{line.field}}</span><span role=\"value\">{{line.value}}</span>\n                </div>\n            </div>\n        </div>\n    "
        })
    ], Tooltip);
    return Tooltip;
}());
var App = (function () {
    function App() {
        this._lines = [{
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
        this._tooltipOptions = {};
        this._nodes = ['A', 'B', 'C', 'D', 'E'];
    }
    Object.defineProperty(App.prototype, "width", {
        get: function () {
            return window.innerWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "height", {
        get: function () {
            return window.innerHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "nodes", {
        get: function () {
            return this._nodes;
        },
        enumerable: true,
        configurable: true
    });
    App.prototype.onMouseOver = function (event) {
        var elText = [{
                field: 'Node',
                value: event.srcElement.outerText
            }];
        this.tooltipOptions = {
            left: event.x,
            top: event.y,
            lines: elText.concat(this._lines),
            visible: true
        };
    };
    App.prototype.onMouseOut = function (event) {
        this.tooltipOptions = {};
    };
    Object.defineProperty(App.prototype, "tooltipOptions", {
        get: function () {
            return this._tooltipOptions;
        },
        set: function (options) {
            this._tooltipOptions = options;
        },
        enumerable: true,
        configurable: true
    });
    App = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n        <div class=\"container left\">\n            <tooltip\n                    [options]=\"tooltipOptions\"\n            ></tooltip>\n            <span *ngFor=\"#node of nodes\">\n                <p (mouseover)=\"onMouseOver($event)\" (mouseout)=\"onMouseOut($event)\">{{node}}</p>\n            </span>\n        </div>\n    ",
            directives: [Tooltip]
        })
    ], App);
    return App;
}());
console.log("%c" + meta.consoleTag, 'font-style: italic; font-size: 20px;');
console.log("%c" + meta.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
console.group();
core_1.enableProdMode();
browser_1.bootstrap(App)
    .catch(function (err) { return console.error(err); });
