import {Component, OnChanges, ElementRef, Inject, Input} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {VerticalbarD3OptionsInterface} from './verticalbar-d3-options.interface';
import {VerticalbarD3SeriesInterface} from './verticalbar-d3-series.interface';

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
    template: ``
})
export class VerticalbarD3 implements OnChanges {

    @Input() data:Array<VerticalbarD3SeriesInterface>;
    @Input() options:VerticalbarD3OptionsInterface;

    private _duration:Number = 1000;
    private _seriesPadding:Number = 2;
    private _bodyPadding:Number = 5;
    private _margins:Margins = new Margins(30, 40, 0, 30);
    private _xScale:any;
    private _yScale:any;
    private _xAxis:any;
    private _yAxis:any;
    private _svg:any;
    private _bodyG:any;
    private _snapshot:Boolean = false;
    private _el:any;
    private _chart:any;

    constructor(@Inject(ElementRef) elementRef:any) {
        this._el = elementRef.nativeElement;
    }

    ngOnChanges():void {
        if (this.data && this.data.length) {
            this.render();
        }
    }

    get svg():any {
        return this._svg;
    }

    get chart():any {
        return this._chart;
    }

    get quadrantWidth():Number {
        return this.options && this.options.width ?
            this.options.width - this._margins.left - this._margins.right:
            window.innerWidth - this._margins.left - this._margins.right;
    }

    get quadrantHeight():Number {
        return this.options && this.options.height ?
            this.options.height - this._margins.top - this._margins.bottom:
            window.innerHeight - this._margins.top - this._margins.bottom;
    }

    get xStart():Number {
        return this._margins.left;
    }

    get yStart():Number {
        return this.options && this.options.height ?
            this.options.height - this._margins.bottom:
            window.innerHeight - this._margins.bottom;
    }

    get yEnd():Number {
        return this._margins.top;
    }

    get margins():Margins {
        return this._margins;
    }

    get xAxis():any {
        return this._xAxis;
    }

    get yAxis():any {
        return this._yAxis;
    }

    get seriesPadding():Number {
        return this._seriesPadding;
    }

    get bodyPadding():Number {
        return this._bodyPadding;
    }

    private configure():void {
        if (this.svg) {
            this._svg.remove();
        }
        if (this.chart) {
            this._chart.remove();
        }
        this._el.innerHTML = '<svg class="chart"></svg>';
        this._svg = d3.select("body").append("svg:svg");
        this._chart = d3.select(".chart")
            .attr("width", this.options.width)
            .attr("height", this.options.height);
        this.configureBodyClip();
        this.configureGradients();
        this.configureAxesAndScales();
    }

    private configureBodyClip():void {
        this._svg.append("defs")
            .append("clipPath")
            .attr("id", "body-clip")
            .append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", this.quadrantWidth + 2 * this.bodyPadding)
            .attr("height", this.quadrantHeight);
    }

    private configureGradients():void {

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

    private configureAxesAndScales():void {
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

    private render():void {
        if (!this._svg) {
            this.configure();
        }
        this.renderBody();
    }

    private renderAxes():void {
        let axesG = this._svg.selectAll("g.axes").remove();

        axesG = this._svg.append("g")
            .attr("class", "axes");

        axesG.append("g")
            .attr("class", "axis")
            .attr("transform", function () {
                return "translate(" + this._margins.left + "," + this.yStart + ")";
            })
            .call(this.xAxis);

        axesG.append("g")
            .attr("class", "axis")
            .attr("transform", function () {
                return "translate(" + xStart() + "," + yEnd() + ")";
            })
            .call(this._yAxis);

        this.renderYGridlines(axesG);
        this.renderXGridlines(axesG);

    }

    private renderYGridlines(group:any):void {
        let lines = group.selectAll("g.axis g.tick")
            .select("line.h-grid-line").remove();

        lines = group.selectAll("g.axis g.tick")
            .style("stroke", "white")
            .append("line")
            .classed("h-grid-line", true)
            .style("stroke", "white")
            .style("stroke-opacity", function (d, i) {
                return (+d.y) == 0 ? 1 : .2;
            });

        lines.attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", this.quadrantWidth)
            .attr("y2", 0);
    }

    private renderXGridlines(group:any):void {
        let lines = group.selectAll("g.axis g.tick")
            .selectAll("line.v-grid-line")
            .remove();

        lines = group.selectAll("g.axis g.tick")
            .append("line")
            .classed("v-grid-line", true)
            .style("stroke-width", function (d, i) {
                return i == 0 ? 0 : .5;
            });

        lines.attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", -this.quadrantHeight);
    }

    private renderBody():void {
        if (!this._bodyG && this._svg) {
            this._bodyG = this._svg.append("g")
                .attr("class", "body")
                .attr("transform", "translate("
                    + this.xStart
                    + ","
                    + this.yEnd + ")")
                .attr("clip-path", "url(#body-clip)");
        }
        this.renderBars();
        this.renderAxes();
    }

    private renderBars():void {
        this._bodyG.selectAll("rect.bar")
            .data(this.data)
            .enter()
            .append("rect")
            .attr("class", "bar");

        this._bodyG.selectAll("rect.bar")
            .data(this.data)
            .transition()
            .duration(this._duration)
            .attr("x", function (d) {
                return this._xScale(d.label);
            })
            .attr("y", function (d) {
                return this._yScale(d.y);
            })
            .attr("height", function (d) {
                return this.quadrantHeight - this._yScale(d.y);
            })
            .attr("width", function (d) {
                return Math.floor(this.quadrantWidth / this.data.length - this.seriesPadding - 2);
            })
            .style("fill", "url(#gradient)");
    }

}
