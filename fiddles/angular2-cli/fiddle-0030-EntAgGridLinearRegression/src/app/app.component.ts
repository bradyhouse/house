import {
  Component,
  ElementRef,
  OnInit
} from '@angular/core';

import { CartesianChart } from 'ag-grid-enterprise/dist/lib/charts/chart/cartesianChart';
import { NumberAxis } from 'ag-grid-enterprise/dist/lib/charts/chart/axis/NumberAxis';
import { LineSeries } from 'ag-grid-enterprise/dist/lib/charts/chart/series/lineSeries';
import { Caption } from 'ag-grid-enterprise/dist/lib/charts/caption';
import { Padding } from 'ag-grid-enterprise/dist/lib/charts/util/padding';
import borneo from "ag-grid-enterprise/dist/lib/charts/chart/palettes";
import { linearRegression } from "ag-grid-enterprise/dist/lib/charts/util/stat";
import * as d3 from 'd3';

type Datum = {
    x: number,
    y: number
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  private _containerEl: HTMLElement;
  private _chartHeight: number;

  constructor(private _elementRef : ElementRef) {}


  //#region OnInit Implementation

  ngOnInit(): void {
    this._containerEl = this._elementRef.nativeElement.querySelector('.chart-wrapper-body');
    this._chartHeight = Math.floor(.90 * window.innerHeight);
    d3.csv("./assets/data.csv").then((rawData: any) => {
        const data: any = rawData.map(datum => ({
            x: +new Date(datum.Date || 0),
            y: +(datum['Adj Close'] || 0)
        } as Datum));
        this._createNumericLineChart(data);
    });
  }

  //#endregion

  private _createNumericLineChart(data: Datum[]): void {
    const chart = new CartesianChart({
        xAxis: new NumberAxis(),
        yAxis: new NumberAxis()
      });
    chart.xAxis.labelRotation = 45;
    chart.xAxis.labelFormatter = (params) => {
      return new Date(params.value).toDateString();
    };

    chart.parent = this._containerEl;
    chart.width = window.innerWidth;
    chart.height = this._chartHeight;
    chart.padding = new Padding(20, 80, 20, 20);
    chart.title = Caption.create({
        text: 'S&P 500 weekly data (1950 to present)'
    });

    chart.legend.enabled = false;

    const lineSeries = new LineSeries();
    lineSeries.title = 'Price Data';
    lineSeries.marker = true;
    lineSeries.strokeWidth = 0;
    lineSeries.markerSize = 2;
    lineSeries.markerStrokeWidth = 0;
    lineSeries.data = data;
    lineSeries.xField = 'x';
    lineSeries.yField = 'y';

    chart.addSeries(lineSeries);

    this._containerEl.appendChild(document.createElement('br'));

    const X: number[] = [];
    const Y: number[] = [];
    data.forEach(datum => {
        X.push(datum.x);
        Y.push(datum.y);
    });

    const fit = linearRegression(X, Y);
    if (fit) {
        const {slope, intercept} = fit;

        const firstX = data[0].x;
        const lastX = data[data.length - 1].x;
        const firstY = slope * firstX + intercept;
        const lastY = slope * lastX + intercept;

        const slopeSeries = new LineSeries();
        slopeSeries.title = 'Linear Regression';
        slopeSeries.fill = borneo.fills[2];
        slopeSeries.stroke = borneo.strokes[2];
        slopeSeries.marker = false;
        slopeSeries.strokeWidth = 2;
        slopeSeries.data = [{x: firstX, y: firstY}, {x: lastX, y: lastY}];
        slopeSeries.xField = 'x';
        slopeSeries.yField = 'y';

        chart.addSeries(slopeSeries);
    }

}

  
}
