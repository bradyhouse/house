import {Component, OnInit, ElementRef, Inject, Input, Output, EventEmitter} from 'angular2/core';
import {ChartViewModel} from './chart-view-model';
import {ChartInterface} from './chart.interface';

declare let d3:any;

@Component({
    selector: 'chart',
    properties: ['data', 'width', 'height'],
    templateUrl: './src/bar-chart/chart/chart.html'
})
export class Chart implements OnInit {
    @Output() onRefresh:EventEmitter<boolean> = new EventEmitter();
    @Output() onDomInit:EventEmitter<Chart> = new EventEmitter();

    private _width:number;
    private _height:number;
    private _title:string;
    private _data:Array<ChartInterface>;
    private _duration:number = 500;
    private _seriesPadding:number = 2;
    private _viewModel:ChartViewModel = new ChartViewModel(30, 40, 0, 30);
    private _xAxis:any;
    private _yAxis:any;
    private _el:any;
    private _forceY:Array<number> = [0];
    private _x:any = d3.scale.ordinal();
    private _y:any = d3.scale.linear();

    constructor(@Inject(ElementRef) elementRef:any) {
        this._el = elementRef.nativeElement;
    }

    ngOnInit():void {
        window.setTimeout(() => {
            this.onDomInit.emit(this);
        }, 500);
    }

    get max():number {
        return d3.max(this._data, (d:ChartInterface) => {
            return d.value;
        });
    }

    get min():number {
        return d3.min(this._data, (d:ChartInterface) => {
            return d.value;
        });
    }

    get title():string {
        return this._title;
    }

    set title(value:string) {
        this._title = value;
        this.renderTitle();
    }

    get width():number {
        return this.svgEl ? this.svgEl.node().getBoundingClientRect().width : 0;
    }

    set width(value:number) {
        this._width = value;
        this.onDimensionsChange();
    }

    get height():number {
        return this.svgEl ? this.svgEl.node().getBoundingClientRect().height : 0;
    }

    set height(value:number) {
        this._height = value;
        this.onDimensionsChange();
    }

    private get canReconfigure():boolean {
        return this._data &&
        this._data.length &&
        this._width &&
        this._height &&
        this.svgEl &&
        this.bodyEl ? true : false;
    }

    private get canRender():boolean {
        return this._data &&
        this._data.length &&
        this._width &&
        this._height ? true : false;
    }

    private onDimensionsChange():void {
        this.reconfigure();
    }

    get data():Array<ChartInterface> {
        return this._data;
    }

    set data(arr:Array<ChartInterface>) {
        this._data = arr;
        if (this._data && this._data.length) {
            this.render();
        }
    }

    private get quadrantWidth():number {
        return this.width - this._viewModel.horizontalPadding;
    }

    private get quadrantHeight():number {
        return this.height - this._viewModel.verticalPadding;
    }

    private get xStart():number {
        return this._viewModel.left;
    }

    private get yStart():number {
        return this.height - this._viewModel.bottom;
    }

    private get yEnd():number {
        return this._viewModel.top;
    }

    private get svgEl():any {
        return this._el ? d3.select(this._el).select('svg.chart') : null;
    }

    private get axesEl():any {
        return this.svgEl ? this.svgEl.select("g.axes") : null;
    }

    private get defsEl():any {
        return this.svgEl ? this.svgEl.select("defs") : null;
    }

    private get bodyClipEl():any {
        return this.defsEl ? this.defsEl.select('#body-clip') : null;
    }

    private get bodyEl():any {
        return this.svgEl ? this.svgEl.select('g.body') : null;
    }

    private valueFormat(value:any):any {
        let formatter:any = d3.format(',.2f');
        return formatter(value);

    }

    reconfigure():void {
        if (this.canReconfigure) {
            this.hideTooltip();
            this.removeBars();
            d3.select(".chart")
                .data(this.data)
                .transition()
                .duration(this._duration)
                .attr("width", this.width)
                .attr("height", this.height);

            this.configureBodyClip();
            this.configureAxesAndScales();
            this.renderBody();
            this.onRefresh.emit(false);
        }
    }

    configure():void {
        if (this.svgEl) {
            this.svgEl
                .attr("width", this.width)
                .attr("height", this.height);
        }
        this.configureBodyClip();
        this.configureAxesAndScales();
    }

    private configureBodyClip():void {
        if (this.bodyClipEl) {
            this.bodyClipEl.selectAll('rect')
                .remove();
            this.bodyClipEl
                .append("rect")
                .attr("x", 0)
                .attr("y", 10)
                .attr("width", this.quadrantWidth)
                .attr("height", this.quadrantHeight - 20);
        }
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

        this._y.domain(d3.extent(this.data.map((d:ChartInterface) => {
            let ret = (d.value >= 0) ? this.constrain(d.value, 0.05, 10) : this.constrain(d.value, -10, -0.05);
            return ret;

        }).concat(this._forceY)));

        this._y.range([this.quadrantHeight - (this._y.domain()[0] < 0 ? 12 : 0), this._y.domain()[1] > 0 ? 12 : 0]);

        this._yAxis = d3.svg.axis()
            .scale(this._y)
            .orient("left")
            .ticks(5)
            .tickFormat((v:any) => {
                return v;
            });
    }

    private showTooltip(d:ChartInterface, left:number, top:number):void {
        let tooltip = d3.select('tooltip')
            .append('div')
            .style("top", top + 'px')
            .style("left", left + 'px')
            .style("position", 'fixed');

        tooltip
            .attr('class', 'tooltip');

        if (d.value < 0) {
            tooltip.classed('negative', true);

        } else {
            tooltip.classed('positive', true);
        }

        tooltip
            .text(' ' + d.label + ' ' + this.valueFormat(d.value));

    }

    private hideTooltip() {
        d3.select('tooltip')
            .selectAll('div.tooltip')
            .remove();
    }

    render():void {
        if (this.canRender) {
            this.configure();
            this.renderBody();
        }
    }

    private renderAxes():void {

        if (this.axesEl) {
            this.axesEl.selectAll('g')
                .remove();

            this.axesEl.append("g")
                .attr("class", "axis")
                .attr("transform", () => {
                    return "translate(" + this._viewModel.left + "," + this.yStart + ")";
                })
                .call(this._xAxis);

            this.axesEl.append("g")
                .attr("class", "axis")
                .attr("transform", () => {
                    return "translate(" + this.xStart + "," + this.yEnd + ")";
                })
                .call(this._yAxis);

            this.renderGridlines(this.axesEl);
        }

    }

    private zeroBars():void {

        this.bodyEl.selectAll("rect.bar")
            .data(this.data)
            .attr('y', (d:ChartInterface) => {
                return this._y(0);
            })
            .attr("x", (d:ChartInterface) => {
                return this._x(d.label);
            })
            .attr('height', () => {
                return 1;
            })
            .attr("width", (d:ChartInterface) => {
                return Math.floor(this.quadrantWidth / this.data.length - this._seriesPadding);
            });
    }

    private removeBars():void {
        if (this.bodyEl) {
            this.bodyEl.selectAll("rect.bar")
                .remove();

        }
    }

    private renderBars():void {
        this.hideTooltip();
        this.removeBars();
        this.bodyEl.selectAll("rect.bar")
            .data(this.data)
            .enter()
            .append("rect")
            .attr("class", "bar");

        this.zeroBars();

        this.bodyEl.selectAll("rect.bar")
            .data(this.data)
            .attr("x", (d:ChartInterface) => {
                return this._x(d.label);
            })
            .transition()
            .duration(this._duration)
            .attr('y', (d:ChartInterface) => {
                return (d.value) < 0 ? this._y(0) : this._y(d.value);
            })
            .attr('height', (d:ChartInterface) => {
                return Math.max(Math.abs(this._y(d.value) - this._y(0)), 1)
            })
            .attr("width", (d:ChartInterface) => {
                return Math.floor(this.quadrantWidth / this.data.length - this._seriesPadding);
            });

        this.bodyEl.selectAll("rect.bar")
            .data(this.data)
            .style("fill", (d:ChartInterface) => {
                return d.value < 0 ? 'url(#negative)' : 'url(#positive)';
            });

        this.bodyEl.selectAll("rect.bar")
            .data(this.data)
            .on('mouseover', (d:ChartInterface, i:number) => {
                let left = i <= 28 ? 60 + this._x(d.label) : 60 + this._x(this.data[28].label),
                    top = d.value < 0 ? this._y(0) + 10 : this._y(0) + 40;
                this.hideTooltip();
                this.showTooltip(d, left, top);
            })
            .on('click', (d:ChartInterface) => {
                let json = JSON.stringify(d);
                alert(json);
            })
            .on('mouseout', (d:ChartInterface) => {
                this.hideTooltip();
            });

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

    private renderGridlines(group:any):void {
        let lines = group.selectAll("g.axis g.tick")
            .select("line.h-grid-line");

        if (lines.length) {
            lines.remove();
        }

        lines = group.selectAll("g.axis g.tick")
            .append("line")
            .classed("h-grid-line", true)
            .style("stroke-opacity", (d:ChartInterface, i:number) => {
                return (+i) == 0 ? 0 : .2;
            });

        lines.attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", this.quadrantWidth)
            .attr("y2", 0);
    }

    private renderTitle():void {

        let title = d3.select('chart-title')
            .append('div');
        title.classed('chartTitle', true);
        title.text(this.title);
    }
}
