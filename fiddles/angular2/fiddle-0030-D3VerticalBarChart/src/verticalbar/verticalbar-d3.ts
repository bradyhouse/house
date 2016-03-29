import {Component, OnChanges, ElementRef, Inject, Input} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
declare let d3:any;

class Margins {
    private _top:Number;
    private _left:Number;
    private _right:Number;
    private _bottom:Number;

    constructor(top:Number, left:Number, right:Number, bottom:Number) {
        this._top = top;
        this._left = left;
        this._right = right;
        this._bottom = bottom;
    }

    get top() {
        return this._top;
    }

    get left() {
        return this._left;
    }

    get right() {
        return this._right;
    }

    get bottom() {
        return this._bottom;
    }
}


@Component({
    selector: 'verticalbar-d3',
    template: ``,
    inputs: ['options', 'data']
})
export class VerticalbarD3 implements OnChanges {

    @Input() options:any;
    @Input() data:Array<any>;

    private _duration:Number = 1000;
    private _margins:Margins = new Margins(30, 40, 0, 30);
    private _width:Number = window.innerWidth - this._margins.left - this._margins.right;
    private _height:Number = window.innerHeight - this._margins.top - this._margins.bottom;
    private _xScale:Function;
    private _yScale:Function;
    private _xAxis:Function;
    private _yAxis:Function;
    private _svg:any;
    private _bodyG:any;
    private _snapshot:Boolean = false;
    private _el:any;
    private _chart:any;

    constructor(@Inject(ElementRef) elementRef:any) {
        this.el = elementRef.nativeElement;
    }

    get svg():any {
        return this._svg;
    }
    get chart():any {
        return this._chart;
    }
    get quadrantWidth():Number {
        return this._width - this._margins.left - this._margins.right;
    }
    get quadrantHeight():Number {
        return this._height - this._margins.top - this._margins.bottom;
    }


    ngOnChanges() {
        if (!this._svg && this.options && this.data.length) {
            this.configure();
        }
    }

    private configure():void {
        if (this.svg) {
            this._svg.remove();
        }
        if (this.chart) {
            this._chart.remove();
        }
        this.el.innerHTML = '<svg class="chart"></svg>';
        this._svg = d3.select("body").append("svg:svg");
        this._chart = d3.select(".chart")
            .attr("width", this.options.width)
            .attr("height", this.options.height);
        this.configureGradients();
    }

    private defineAxesAndScales():void {
        this._xScale = d3.scale.ordinal()
            .domain(this.data.map(function (d) {
                return d.label;
            }))
            .rangeRoundBands([0, this.quadrantWidth, 0.05]);
        this._xAxis = d3.svg.axis().scale(this._xScale).orient("bottom");
        this._yScale = d3.scale.linear()
            .domain([0, d3.max(this.data, function (d) {
                return d.y;
            })])
            .range([this.quadrantHeight, 0]);
        this._yAxis = d3.svg.axis()
            .scale(this._yScale)
            .orient("left");
    }

    private renderGradients():void {

        let gradient = this._svg.append("svg:defs")
            .append("svg:linearGradient")
            .attr("id", "gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "0%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

        gradient.append("svg:stop")
            .attr("class", "begin")
            .attr("offset", "0%");

        gradient.append("svg:stop")
            .attr("class", "end")
            .attr("offset", "100%");

    }


}
