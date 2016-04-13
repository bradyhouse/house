import {Component, OnChanges, ElementRef, Inject, Input, Output, EventEmitter} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';

declare let d3:any;

export interface VerticalbarOptionsInterface {
    width?:Number;
    height?:Number;
}

export interface VerticalbarSeriesInterface {
    x:number;
    y:Number;
    label:String;
}

class Margins {
    private _top:number;
    private _left:number;
    private _right:number;
    private _bottom:number;

    constructor(top:number, left:number, right:number, bottom:number) {
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
    selector: 'verticalbar',
    template: ``
})
export class Verticalbar implements OnChanges {

    @Input() data:Array<VerticalbarSeriesInterface>;
    @Input() options:VerticalbarOptionsInterface;
    @Output() configured:Event<Verticalbar> = new EventEmitter();

    private _duration:number = 1000;
    private _seriesPadding:number = 2;
    private _bodyPadding:number = 5;
    private _margins:Margins = new Margins(30, 40, 0, 30);
    private _xAxis:any;
    private _yAxis:any;
    private _svg:any;
    private _bodyG:any;
    private _el:any;
    private _chart:any;
    private _forceY:Array<number> = [0]
,
    private _x:any = d3.scale.ordinal();
    private _y:any = d3.scale.linear();

    constructor(@Inject(ElementRef) elementRef:any) {
        this._el = elementRef.nativeElement;
    }

    ngOnChanges():void {
        if (this.data && this.data.length) {
            this.render();
        }
    }

    private getX(d:any) {
        return d.x;
    }

    private getY(d:any) {
        return d.y;
    }

    get svg():any {
        return this._svg;
    }

    get chart():any {
        return this._chart;
    }

    get quadrantWidth():number {
        return this.options && this.options.width ?
        this.options.width - this._margins.left - this._margins.right :
        window.innerWidth - this._margins.left - this._margins.right;
    }

    get quadrantHeight():number {
        return this.options && this.options.height ?
        this.options.height - this._margins.top - this._margins.bottom :
        window.innerHeight - this._margins.top - this._margins.bottom;
    }

    get xStart():number {
        return this._margins.left;
    }

    get yStart():number {
        return this.options && this.options.height ?
        this.options.height - this._margins.bottom :
        window.innerHeight - this._margins.bottom;
    }

    get yEnd():number {
        return this._margins.top;
    }

    get margins():Margins {
        return this._margins;
    }

    get axesDom():any {
        return this._svg ? this._svg.selectAll("g.axes") : null;
    }

    get xAxis():any {
        return this._xAxis;
    }

    get yAxis():any {
        return this._yAxis;
    }

    get bodyPadding():number {
        return this._bodyPadding;
    }

    reconfigure(width:number, height:number) {

        let chartWidth:number = width - this._margins.left - this._margins.right,
            chartHeight:number = height - this._margins.top - this._margins.bottom;

        this.removeAxesDom();

        this._bodyG.selectAll("rect.bar")
            .remove();

        d3.select(".chart")
            .data(this.data)
            .attr("width", chartWidth)
            .attr("height", chartHeight);

        this.configureBodyClip();
        this.configureAxesAndScales();
        //this.renderBody();
    }

    configure():void {
        if (this.svg) {

            this._svg.remove();
        }
        if (this.chart) {
            this._chart.remove();
        }
        this._el.innerHTML = '<svg class="chart"></svg>';
        this._svg = this._chart = d3.select(".chart")
            .attr("width", this.options.width)
            .attr("height", this.options.height);
        this.configureBodyClip();
        this.configureGradients();
        this.configureAxesAndScales();
        this.configured.emit(this);
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

        let defs:any = this._svg.append("svg:defs"),
            positiveGradient:any = defs.append("svg:linearGradient")
                .attr("id", "positive")
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "0%")
                .attr("y2", "100%")
                .attr("spreadMethod", "pad"),
            negativeGradient:any = defs.append("svg:linearGradient")
                .attr("id", "negative")
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "0%")
                .attr("y2", "100%")
                .attr("spreadMethod", "pad");

        positiveGradient.append("svg:stop")
            .attr("class", "yellow")
            .attr("offset", "0%");
        positiveGradient.append("svg:stop")
            .attr("class", "red")
            .attr("offset", "100%");

        negativeGradient.append("svg:stop")
            .attr("class", "lightblue")
            .attr("offset", "0%");
        negativeGradient.append("svg:stop")
            .attr("class", "blue")
            .attr("offset", "100%");

    }

    private configureAxesAndScales():void {

        this._x.domain(this.data.map((d:any) => {
                return d.label;
            }))
            .rangeBands([0, this.quadrantWidth], .1);

        this._xAxis = d3
            .svg
            .axis()
            .scale(this._x)
            .orient("bottom");

        this._y.domain(d3.extent(this.data.map((d:any) => {
            return d.y
        }).concat(this._forceY)));

        this._y.range([this.quadrantHeight - (this._y.domain()[0] < 0 ? 12 : 0), this._y.domain()[1] > 0 ? 12 : 0]);

        this._yAxis = d3.svg.axis()
            .scale(this._y)
            .orient("left")
            .ticks(3)
            .tickSubdivide(0)
            .tickFormat((v:any) => {
                return v + " X";
            });
    }

    render():void {
        if (!this._svg) {
            this.configure();
        }
        this.renderBody();
    }

    private renderAxes():void {
        let self:VerticalbarD3 = this,
            axesG:any = this.axesDom;

        if (axesG) {
            self.removeAxesDom();
        }

        axesG = self.svg.append("g")
            .attr("class", "axes");

        axesG.append("g")
            .attr("class", "axis")
            .attr("transform", function () {
                return "translate(" + self.margins.left + "," + self.yStart + ")";
            })
            .call(self.xAxis);

        axesG.append("g")
            .attr("class", "axis")
            .attr("transform", function () {
                return "translate(" + self.xStart + "," + self.yEnd + ")";
            })
            .call(this.yAxis);

        this.renderYGridlines(axesG);

    }

    private renderBars():void {
        let padding:number = 2;



        this._bodyG.selectAll("rect.bar")
            .data(this.data)
            .enter()
            .append("rect")
            .attr("class", "bar");

        this._bodyG.selectAll("rect.bar")
            .data(this.data)
            .transition()
            .duration(this._duration)
            .attr('y', (d:any) => {
                return this.getY(d) < 0 ? this._y(0) : this._y(this.getY(d));
            })
            .attr("x", (d:any) => {
                return this._x(d.label);
            })
            .attr('height', (d:any) => {
                return Math.max(Math.abs(this._y(this.getY(d)) - this._y(0)), 1)
            })
            .attr("width", (d:any) => {
                return Math.floor(this.quadrantWidth / this.data.length - padding - 2);
            });

        this._bodyG.selectAll("rect.bar")
            .data(this.data)
            .style("fill", (d:any) => {
                return this.getY(d) < 0 ? 'url(#negative)' : 'url(#positive)';
            });

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
        this.renderAxes();
        this.renderBars();

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

    private removeAxesDom():void {
        if (this.axesDom) {
            this._svg.selectAll("g.axes").remove();
        }
    }

}
