


@Component({
    selector: 'chart',
    properties: ['data', 'width', 'height'],
    template: `<chart-title></chart-title>
        <svg class="bar-chart" xmlns="http://www.w3.org/2000/svg" version="1.1">
             <defs>
                <clipPath id="body-clip"></clipPath>
            </defs>
            <g class="bar-chart-tooltip">
            </g>
            <g class="bar-chart-body" clip-path="url(#body-clip)">
                <linearGradient id="yellowToRed" x1="0%" y1="0%" x2="0%" y2="100%" spreadMethod="pad">
                    <stop class="yellow" offset="0%"></stop>
                    <stop class="red" offset="100%"></stop>
                </linearGradient>
                <linearGradient id="redToYellow" x1="0%" y1="100%" x2="0%" y2="0%" spreadMethod="pad">
                    <stop class="red" offset="0%"></stop>
                    <stop class="yellow" offset="100%"></stop>
                </linearGradient>
                <linearGradient id="lightblueToBlue" x1="0%" y1="100%" x2="0%" y2="0%" spreadMethod="pad">
                    <stop class="lightblue" offset="0%"></stop>
                    <stop class="blue" offset="100%"></stop>
                </linearGradient>
            </g>
            <g class="bar-chart-axes">

            </g>
        </svg>`
})
class Chart implements OnInit {
    @Input() options:ChartInterface;
    @Output() refresh:EventEmitter<boolean> = new EventEmitter();
    @Output() domInit:EventEmitter<Chart> = new EventEmitter();
    @Output() barClick:EventEmitter<ChartInterface> = new EventEmitter();
    @Output() barMouseOver:EventEmitter<ChartInterface> = new EventEmitter();
    @Output() barMouseOut:EventEmitter<ChartInterface> = new EventEmitter();

    private _width:number;
    private _height:number;
    private _title:string;
    private _data:Array<ChartInterface>;
    private _duration:number = 500;
    private _seriesPadding:number = 2;
    private _viewModel:ChartViewModel = new ChartViewModel(10, 40, 10, 30);
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
        if (this.options.title) {
            this._title = this.options.title;
        }
        window.setTimeout(() => {
            this.domInit.emit(this);
        }, 500);
    }

    get title():string {
        return this._title;
    }

    set title(value:string) {
        this._title = value;
        this.renderTitle();
    }

    get width():number {
        return this.node ? this.node.getBoundingClientRect().width - 10 : this._width;
    }

    set width(value:number) {
        this._width = value;
        this.onDimensionsChange();
    }

    get height():number {
        return this.node ? this.node.getBoundingClientRect().height - 10 : this._width;

    }

    set height(value:number) {
        this._height = value;
        this.onDimensionsChange();
    }

    get data():Array<ChartInterface> {
        return this._data;
    }

    set data(arr:Array<ChartInterface>) {
        this._data = arr;
        this.render();
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

    private get canReconfigure():boolean {
        return this._data &&
        this._data.length &&
        this.width &&
        this.height &&
        this.svgEl &&
        this.bodyEl ? true : false;
    }

    private get canRender():boolean {
        return this._data &&
        this._data.length ? true : false;
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

    private get node():any {
        return this.svgEl && this.svgEl.node() ? this.svgEl.node() : null;
    }

    private get svgEl():any {
        return this._el ? d3.select(this._el).select('svg.bar-chart') : null;
    }

    private get axesEl():any {
        return this.svgEl ? this.svgEl.select("g.bar-chart-axes") : null;
    }

    private get titleEl():any {
        return d3.select('chart-title');
    }

    private get defsEl():any {
        return this.svgEl ? this.svgEl.select("defs") : null;
    }

    private get bodyClipEl():any {
        return this.defsEl ? this.defsEl.select('#body-clip') : null;
    }

    private get bodyEl():any {
        return this.svgEl ? this.svgEl.select('g.bar-chart-body') : null;
    }

    private valueScaleFn(d:ChartInterface):number {
        return this.options.hasOwnProperty('valueScaleFn') ? this.options.valueScaleFn(d) : d.value;
    }

    private valueDeltaMax(sign:number):number {
        return this.options.hasOwnProperty('valueDeltaMax') ? sign * this.options.valueDeltaMax : sign * this.max;
    }

    private valueDeltaMin(sign:number):number {
        return this.options.hasOwnProperty('valueDeltaMin') ? sign * this.options.valueDeltaMin : sign * this.min;
    }

    private onDimensionsChange():void {
        this.reconfigure();
    }

    private valueFormat(value:any):any {
        let formatter:any = d3.format(',.2f');
        return formatter(value);

    }

    private reconfigure():void {
        if (this.canReconfigure) {
            this.removeTooltip();
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
            this.refresh.emit(false);
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
            .rangeBands([0, this.quadrantWidth]);

        this._xAxis = d3
            .svg
            .axis()
            .scale(this._x)
            .orient("bottom");

        this._y.domain(d3.extent(this.data.map((d:ChartInterface) => {
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
                return v + ' X'
            });
    }

    private renderTooltip(d:ChartInterface, left:number, top:number):void {

        let group = this.svgEl.select('g.bar-chart-tooltip'),
            rect = group.append('rect')
                .attr('x', left)
                .attr('y', top)
                .attr('width', this.quadrantWidth)
                .attr('height', '0px');
        group
            .append('text')
            .text(JSON.stringify(d))
            .attr('y', top)
            .attr('x', "51%")
            .attr('alignment-baseline', 'middle')
            .attr('text-anchor', 'middle')
            .classed('bar-chart-tooltip', true);

    }

    private removeTooltip():void {
        this.svgEl.select('g.bar-chart-tooltip')
            .selectAll('rect')
            .remove();
        this.svgEl.select('g.bar-chart-tooltip')
            .selectAll('text')
            .remove();
    }

    private clear():void {
        this.removeAxes();
        this.removeBars();
        this.removeTitle();
    }

    private render():void {
        if (this.canRender) {
            this.configure();
            this.renderBody();
        }
        else {
            this.clear();
        }
    }

    private removeAxes():void {
        if (this.axesEl) {
            this.axesEl.selectAll('g')
                .remove();
        }
    }

    private renderAxes():void {
        this.removeAxes();
        if (this.axesEl) {

            this.axesEl.append("g")
                .attr("class", "bar-chart-x-axis")
                .attr("transform", () => {
                    return "translate(" + this._viewModel.left + "," + this.yStart + ")";
                })
                .call(this._xAxis);

            this.axesEl.append("g")
                .attr("class", "bar-chart-y-axis")
                .attr("transform", () => {
                    return "translate(" + this.xStart + "," + this.yEnd + ")";
                })
                .call(this._yAxis);

            this.renderGridlines(this.axesEl);
        }

    }

    private removeBars():void {
        if (this.bodyEl) {
            this.bodyEl.selectAll("g.bar-chart-series")
                .remove();

        }
    }

    private zeroBars():void {
        this.bodyEl.selectAll('g.bar-chart-series')
            .data(this.data)
            .enter()
            .append("g")
            .attr("class", "bar-chart-series");

        this.bodyEl.selectAll("g.bar-chart-series")
            .data(this.data)
            .append('rect')
            .attr("x", (d:ChartInterface) => {
                return this._x(d.label);
            })
            .attr('y', (d:ChartInterface) => {
                return this._y(0);
            })
            .attr('height', (d:ChartInterface) => {
                return 0;
            })
            .attr("width", (d:ChartInterface) => {
                return Math.floor(this.quadrantWidth / this.data.length - 2 * this._seriesPadding);
            });
    }
    private renderBars():void {
        this.removeTooltip();
        this.removeBars();
        this.zeroBars();

        this.bodyEl.selectAll("g.bar-chart-series")
            .data(this.data)
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
            .attr("width", (d:ChartInterface) => {
                return Math.floor(this.quadrantWidth / this.data.length - 2 * this._seriesPadding);
            });

        this.bodyEl.selectAll('g.bar-chart-series > rect')
            .data(this.data)
            .attr("class", (d:ChartInterface) => {
                return d.value < 0 ? "bar-chart-negative-series" : "bar-chart-positive-series";
            });

        this.bodyEl.selectAll("g.bar-chart-series")
            .data(this.data)
            .on('mouseover', (d:ChartInterface) => {
                this.onBarMouseOver(d);
            })
            .on('click', (d:ChartInterface) => {
                this.onBarClick(d);
            })
            .on('mouseout', (d:ChartInterface) => {
                this.onBarMouseOut(d);
            });

    }

    private onBarMouseOut(bar:ChartInterface):void {
        this.removeTooltip();
        this.barMouseOut.emit(bar);
    }

    private onBarClick(bar:ChartInterface):void {
        this.removeTooltip();
        this.barClick.emit(bar);
    }

    private onBarMouseOver(bar:ChartInterface):void {
        let left = this.xStart,
            top = this._viewModel.top;
        this.removeTooltip();
        this.renderTooltip(bar, left, top);
        this.barMouseOver.emit(bar);
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
}

