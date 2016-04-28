import {Chart, ChartInterface} from 'chart';
import {this. from '../../utils/number-formatter';

declare let d3:any;

export class ChartView {

    private _ctrl:Chart;
    private _top:number = 10;
    private _left:number = 40;
    private _right:number = 10;
    private _bottom:number = 30;
    private _width:number;
    private _height:number;
    private _padding:number = 2;
    private _el:any;
    private _title:string = '';
    private _duration:number = 500;
    private _xAxis:any;
    private _yAxis:any;
    private _forceY:Array<number> = [0];
    private _x:any = d3.scale.ordinal();
    private _y:any = d3.scale.linear();

    constructor(el:any, ctrl:Chart) {
        this._el = el;
        this._ctrl = ctrl;
    }

    public get title():string {
        return this._title;
    }

    public set title(value:string) {
        this._title = value;
        this.renderTitle();
    }

    public get width():number {
        return this.node ? this.node.getBoundingClientRect().width - 10 : this._width;
    }

    public set width(value:number) {
        this._width = value;
        this.reconfigure();
    }

    public get height():number {
        return this.node ? this.node.getBoundingClientRect().height - 10 : this._height;
    }

    public set height(value:number) {
        this._height = value;
        this.reconfigure();
    }

    private get svgEl():any {
        return this._el ? d3.select(this._el).select('svg.bar-chart') : null;
    }

    private get node():any {
        return this.svgEl && this.svgEl.node() ? this.svgEl.node() : null;
    }

    private get axesEl():any {
        return this.svgEl ? this.svgEl.select("g.bar-chart-axes") : null;
    }

    private get titleEl():any {
        return d3.select('chart-title');
    }

    private get bodyClipEl():any {
        return this.defsEl ? this.defsEl.select('#body-clip') : null;
    }

    private get bodyEl():any {
        return this.svgEl ? this.svgEl.select('g.bar-chart-body') : null;
    }

    private get defsEl():any {
        return this.svgEl ? this.svgEl.select("defs") : null;
    }

    private get max():number {
        return d3.max(this._ctrl.data, (d:ChartInterface) => {
            return d.value;
        });
    }

    private get min():number {
        return d3.min(this._ctrl.data, (d:ChartInterface) => {
            return d.value;
        });
    }

    private get quadrantWidth():number {
        return this.width - this.horizontalPadding;
    }

    private get quadrantHeight():number {
        return this.height - this.verticalPadding;
    }

    private get xStart():number {
        return this.left;
    }

    private get yStart():number {
        return this.height - this.bottom;
    }

    private get yEnd():number {
        return this.top;
    }

    private get top():number {
        return this._top;
    }

    private get left():number {
        return this._left;
    }

    private get right():number {
        return this._right;
    }

    private get bottom():number {
        return this._bottom;
    }

    private get verticalPadding():number {
        return this.top + this.bottom;
    }

    private get horizontalPadding():number {
        return this.left + this.right;
    }

    private get padding():number {
        return this._padding;
    }

    private get canReconfigure():boolean {
        return this._ctrl.data &&
            this._ctrl.data.length &&
            this.width &&
            this.height &&
            this.svgEl &&
            this.bodyEl;
    }

    private get canRender():boolean {
        return this._ctrl.data &&
            this._ctrl.data.length &&
            this.width &&
            this.height;
    }

    private reconfigure():void {
        if (this.canReconfigure) {
            this.removeTooltip();
            this.removeBars();
            d3.select(".chart")
                .data(this._ctrl.data)
                .transition()
                .duration(this._duration)
                .attr("width", this.width)
                .attr("height", this.height);

            this.configureBodyClip();
            this.configureAxesAndScales();
            this.renderBody();
            this._ctrl.triggerRefresh(true);
        }
    }

    private configure():void {
        if (this.svgEl) {
            this.svgEl
                .attr("width", this.width)
                .attr("height", this.height);
        }
        this.configureAxesAndScales();
        this.configureBodyClip();
    }

    private configureBodyClip():void {
        if (this.bodyClipEl) {
            this.bodyClipEl.selectAll('rect')
                .remove();
            this.bodyClipEl
                .append("rect")
                .attr("x", 0)
                .attr("y", 10)
                .attr("width", this.quadrantWidth - 5)
                .attr("height", this.quadrantHeight - 20);
        }
    }

    private configureAxesAndScales():void {

        this._x.domain(this._ctrl.data.map((d:ChartInterface) => {
                return d.label;
            }))
            .rangeBands([0, this.quadrantWidth]);

        this._xAxis = d3
            .svg
            .axis()
            .scale(this._x)
            .orient("bottom");

        this._y.domain(d3.extent(this._ctrl.data.map((d:ChartInterface) => {
            let scaledValue = this.valueScaleFn(d);
            let ret = (scaledValue >= 0) ?
                this.constrain(scaledValue, this.valueDeltaMin(1), this.valueDeltaMax(1)) :
                this.constrain(scaledValue, this.valueDeltaMax(-1), this.valueDeltaMin(-1));
            return ret * 100;
        }).concat(this._forceY)));

        this._y.range([this.quadrantHeight - (this._y.domain()[0] < 0 ? 12 : 0), this._y.domain()[1] > 0 ? 12 : 0]);

        this._yAxis = d3.svg.axis()
            .scale(this._y)
            .orient("left")
            .ticks(5)
            .tickFormat((v:any) => {
                return v + ' X';
            });
    }

    public render():void {
        if (this.canRender) {
            this.configure();
            this.renderBody();
        }
        else {
            this.clear();
        }
    }

    private clear():void {
        this.removeAxes();
        this.removeBars();
        this.removeTitle();
    }

    private removeAxes():void {
        if (this.axesEl) {
            this.axesEl.selectAll('g')
                .remove();
        }
    }

    private renderAxes():void {
        this.removeAxes();

        this.axesEl.append("g")
            .attr("class", "bar-chart-x-axis")
            .attr("transform", () => {
                return "translate(" + this.left + "," + this.yStart + ")";
            })
            .call(this._xAxis);

        this.axesEl.append("g")
            .attr("class", "bar-chart-y-axis")
            .attr("transform", () => {
                return "translate(" + this.xStart + "," + this.yEnd + ")";
            })
            .call(this._yAxis);

        this.renderGridLines(this.axesEl);

    }

    private renderBody():void {
        if (this.bodyEl) {
            this.bodyEl
                .attr("transform", "translate("
                    + this.xStart
                    + ","
                    + this.yEnd + ")");
        }
        this.renderAxes();
        this.renderBars();
    }

    private renderGridLines(group:any):void {
        let lines = group.selectAll("g.bar-chart-y-axis g.tick")
            .select("line.h-grid-line");

        if (lines.length) {
            lines.remove();
        }

        lines = group.selectAll("g.bar-chart-y-axis g.tick")
            .append("line")
            .classed("h-grid-line", true);


        lines.attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", this.quadrantWidth)
            .attr("y2", 0);
    }

    private removeBars():void {
        if (this.bodyEl) {
            this.bodyEl.selectAll("g.bar-chart-series")
                .remove();
        }
    }

    private renderBars():void {
        this.removeTooltip();
        this.removeBars();
        this.bodyEl.selectAll('g.bar-chart-series')
            .data(this._ctrl.data)
            .enter()
            .append("g")
            .attr("class", "bar-chart-series");

        this.bodyEl.selectAll("g.bar-chart-series")
            .data(this._ctrl.data)
            .append('rect')
            .attr("x", (d:ChartInterface) => {
                return this._x(d.label);
            })
            .attr('y', (d:ChartInterface) => {
                let scaledValue = this.valueScaleFn(d);
                let value = scaledValue > 0 ?
                        this.constrain(scaledValue, this.valueDeltaMin(1), this.valueDeltaMax(1)) :
                        scaledValue === 0 ? this.valueDeltaMin(1) :
                            this.constrain(scaledValue, this.valueDeltaMax(-1), this.valueDeltaMin(-1)),
                    domainValue = value * 100,
                    rangeValue = domainValue < 0 ? this._y(0) : this._y(domainValue);
                return rangeValue;
            })
            .attr('height', (d:ChartInterface) => {
                let scaledValue = this.valueScaleFn(d);
                let value = (scaledValue > 0) ?
                        this.constrain(scaledValue, this.valueDeltaMin(1), this.valueDeltaMax(1)) :
                        scaledValue === 0 ? this.valueDeltaMin(1) :
                            this.constrain(scaledValue, this.valueDeltaMax(-1), this.valueDeltaMin(-1)),
                    domainValue = value * 100;
                return Math.max(Math.abs(this._y(domainValue) - this._y(0)), 1);
            })
            .attr("width", () => {
                return Math.floor(this.quadrantWidth / this._ctrl.data.length - 2 * this.padding);
            });

        this.bodyEl.selectAll('g.bar-chart-series > rect')
            .data(this._ctrl.data)
            .attr("class", (d:ChartInterface) => {
                return d.value < 0 ? "bar-chart-negative-series" : "bar-chart-positive-series";
            });

        this.bodyEl.selectAll("g.bar-chart-series")
            .data(this._ctrl.data)
            .on('mouseover', (d:ChartInterface) => {
                let left = this.xStart,
                    top = this.top;
                this.removeTooltip();
                this.renderTooltip(d, left, top);
                this._ctrl.triggerBarMouseOver(d);
            })
            .on('click', (d:ChartInterface) => {
                this.removeTooltip();
                this._ctrl.triggerBarClick(d);
            })
            .on('mouseout', (d:ChartInterface) => {
                this.removeTooltip();
                this._ctrl.triggerBarMouseOut(d);
            });

    }

    private removeTooltip():void {
        this.svgEl.select('g.bar-chart-tooltip')
            .selectAll('rect')
            .remove();
        this.svgEl.select('g.bar-chart-tooltip')
            .selectAll('text')
            .remove();
    }

    private renderTooltip(d:ChartInterface, left:number, top:number):void {

        let group = this.svgEl.select('g.bar-chart-tooltip'),
            rect = group.append('rect')
                .attr('x', left)
                .attr('y', top)
                .attr('width', this.quadrantWidth)
                .attr('height', '0px');

        group.append('text')
            .text(JSON.stringify(d))
            .attr('y', top)
            .attr('x', "51%")
            .attr('alignment-baseline', 'middle')
            .attr('text-anchor', 'middle')
            .classed('bar-chart-tooltip', true);
    }

    private removeTitle():void {
        this.titleEl
            .select('div')
            .remove();
    }

    private renderTitle():void {
        this.removeTitle();
        this.titleEl
            .append('div');
        this.titleEl
            .select('div')
            .classed('chartTitle', true)
            .text(this.title);
    }

    private valueFormat(value:any):any {
        let formatter:any = d3.format(',.2f');
        return formatter(value);
    }

    private valueDeltaMax(sign:number):number {
        return this._ctrl.options.hasOwnProperty('valueDeltaMax') ? sign * this._ctrl.options.valueDeltaMax : sign * this.max;
    }

    private valueDeltaMin(sign:number):number {
        return this._ctrl.options.hasOwnProperty('valueDeltaMin') ? sign * this._ctrl.options.valueDeltaMin : sign * this.min;
    }

    private valueScaleFn(d:ChartInterface):number {
        return this._ctrl.options.hasOwnProperty('valueScaleFn') ? this._ctrl.options.valueScaleFn(d) : d.value;
    }
    
    private constrain(val:number, min:number, max:number):number {
        if (min === null) {
            min = val;
        }
        if (max === null) {
            max = val;
        }
        return (val < min) ? min : ((val > max) ? max : val);
    }
}
