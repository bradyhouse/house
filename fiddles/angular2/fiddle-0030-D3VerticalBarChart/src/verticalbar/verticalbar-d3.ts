import {Component, OnChanges, ElementRef, Inject} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
declare let d3:any;

@Component({
    selector: 'verticalbar-d3',
    template: ``,
    inputs: ['options', 'data']
})
export class VerticalbarD3 implements OnChanges {

    options:any;
    data:[];

    private el:any;

    private _svg:any;
    private _chart:any;

    constructor(@Inject(ElementRef) elementRef:any) {
        this.el = elementRef.nativeElement;
    }

    get svg() : any {
        return this._svg;
    }

    get chart() : any {
        return this._chart;
    }

    ngOnChanges() {
        if (!this._svg && this.options && this.data.length) {
            this.configure();
        }
    }

    private configure() : void {
        if (this.svg) {
            this._svg.remove();
        }
        if (this.chart) {
            this._chart.remove();
        }
        this.el.innerHTML = '<svg class="chart"></svg>';
        this._svg = d3.select("body").append("svg:svg");
        this._chart =  d3.select(".chart")
            .attr("width", this.options.width)
            .attr("height", this.options.height);
        this.configureGradients();
        this.configureSeries();
    }

    private configureSeries() : void {

        let data:any = this.data[0].values,
            height:any = parseFloat(this.options.height),
            barWidth:number = this.options.width / data.length,
            c10:any = d3.scale.category10(),
            bar:any = this.chart.selectAll("g")
                .data(data)
                .enter().append("g")
                .attr("transform", function(d:any, i:any) { return "translate(" + i * barWidth + ",0)"; });

        bar.append("rect")
            .attr("y", function(d:any) { return d.value; })
            .attr("height", function(d:any) { return d.hasOwnProperty('value') && d.value > 0 ? height - d.value : 0; })
            .attr("width", barWidth - 1)
            .attr("color", function(d,i){console.log(i); return c10(i)});

       /* bar.append("rect")
            .attr("y", function(d:any) { return d.value; })
            .attr("width", barWidth - 1)
            .attr("height", function(d:any) { return d.hasOwnProperty('value') && d.value > 0 ? height - d.value : 0; })
            .style("fill", "url(#gradient)");*/

        bar.append("text")
            .attr("x", barWidth / 2)
            .attr("y", function() { return height - 10; })
            .attr("dy", ".75em")
            .text(function(d:any) { return d.label; });


    }

    private configureGradients() : void {

        let gradient:any = this.chart.append("svg:defs")
            .append("svg:linearGradient")
            .attr("id", "gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

        gradient.append("svg:stop")
            .attr("offset", "0%")
            .attr("stop-color", "#00cc00")
            .attr("stop-opacity", 1);

        gradient.append("svg:stop")
            .attr("offset", "100%")
            .attr("stop-color", "#006600")
            .attr("stop-opacity", 1);

    }


}
