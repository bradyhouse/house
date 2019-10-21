import {
  Input,
  Component,
  OnChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  DoCheck,
  ElementRef,
  OnInit
} from '@angular/core';

import {
  ChartRangeParams,
  ColDef,
  RowNode,
  ChartType,
  CellRangeParams
} from 'ag-grid-community';


import {
  BarChartOptionKeysEnum,
  BarChartOptions
} from './bar-chart-options';


import "ag-grid-enterprise/chartsModule";


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnChanges, DoCheck, OnInit {

  @Input() options: BarChartOptions;

  //#region Internal Properties

  private _containerEl: HTMLElement;

  private _differ: KeyValueDiffer<any, any>;
  private _columnDefs: ColDef[] = [];
  private _rowData: RowNode[] = [];
  private _id;

  private _onCreateChartContainer: Function;


  private get _fields(): string[] {
    let values: string[] = [];
    if (this._columnDefs) {
      this._columnDefs.forEach((colDef: ColDef) => {
        if (colDef.field) {
          values.push(colDef.field);
        }
      })
    }
    return values;
  }

  private get _cellRange(): CellRangeParams {
    return {
      rowStartIndex: 0,
      rowEndIndex: this._rowData.length - 1,
      columns: this._fields
    };
  }

  private get _isPopulated(): boolean {
    return !!(this._rowData && this._rowData.length && this._columnDefs && this._columnDefs.length);
  }


  private get _chartRangeParams(): ChartRangeParams {
    if (this._isPopulated) {
      return {
        cellRange: this._cellRange,
        chartType: ChartType.GroupedColumn
      };
    } else {
      return null;
    }
  }

  //#endregion

  //#region Constructor

  constructor(private _differs: KeyValueDiffers, private _elementRef : ElementRef) {
    this._onCreateChartContainer = (chartRef: any) => this.onCreateChartContainer(chartRef);
  }

  //#endregion

  //#region OnChanges Implementation

  ngOnChanges(changes: any): void {
    if ('options' in changes) {
      const value = changes['options'].currentValue;
      if (!this._differ && value) {
        this._differ = this._differs.find(value).create();
      }
    }
  }

  //#endregion

  //#region DoCheck Implementation

  ngDoCheck(): void {
    if (this._differ) {
      const changes: any = this._differ.diff(this.options);
      if (changes) {
        changes.forEachChangedItem((item: any) => {
          this._applyChange(item);
        });
        changes.forEachAddedItem((item: any) => {
          this._applyChange(item);
        });
      }
    }
  }

  //#endregion

  //#region OnInit Implementation

  ngOnInit(): void {
    this._containerEl = this._elementRef.nativeElement.querySelector('.chart-container');
  }

  //#endregion

  //#region Event Handlers

  onGridReady(params) {
    if (this._id && this._isPopulated && this._containerEl) {
      setTimeout(() => {
        params.api.chartRange(this._chartRangeParams);
      }, 500);
    }
  }

  onProcessChartOptions(params:any): any {
    var options = params.options;

    options.height = 500;
    options.width = 1000;
    options.title = {
      text: "Precious Metals Production",
      fontStyle: "italic",
      fontWeight: "bold",
      fontSize: 18,
      fontFamily: "Arial, sans-serif",
      color: "#414182"
    };
    options.subtitle = {
      text: "by country",
      fontStyle: "italic",
      fontWeight: "bold",
      fontSize: 14,
      fontFamily: "Arial, sans-serif",
      color: "rgb(100, 100, 100)"
    };
    options.padding = {
      top: 20,
      right: 10,
      bottom: 10,
      left: 20
    };
    options.tooltipClass = "my-tool-tip-class";
    options.legendPosition = "bottom";
    options.legendPadding = 20;
    options.legend = {
      enabled: false
    };
    var xAxis = options.xAxis;
    xAxis.lineWidth = 2;
    xAxis.lineColor = "gray";
    xAxis.tickWidth = 2;
    xAxis.tickSize = 10;
    xAxis.tickPadding = 10;
    xAxis.tickColor = "gray";
    xAxis.labelFontStyle = "italic";
    xAxis.labelFontWeight = "bold";
    xAxis.labelFontSize = 15;
    xAxis.labelFontFamily = "Arial, sans-serif";
    xAxis.labelColor = "#de7b73";
    xAxis.labelRotation = 20;
    xAxis.labelFormatter = function(params) {
      return params.value === "United Kingdom" ? "UK" : "(" + String(params.value) + ")";
    };
    xAxis.gridStyle = [{ stroke: "rgba(94,100,178,0.5)" }];
    var yAxis = options.yAxis;
    yAxis.lineWidth = 2;
    yAxis.lineColor = "gray";
    yAxis.tickWidth = 2;
    yAxis.tickSize = 10;
    yAxis.tickPadding = 10;
    yAxis.tickColor = "gray";
    yAxis.labelFontStyle = "italic";
    yAxis.labelFontWeight = "bold";
    yAxis.labelFontSize = 15;
    yAxis.labelFontFamily = "Arial, sans-serif";
    yAxis.labelColor = "#de7b73";
    yAxis.labelRotation = 20;
    yAxis.labelFormatter = function(params) {
      return params.value.toString().toUpperCase();
    };
    yAxis.gridStyle = [
      {
        stroke: "#80808044",
        lineDash: undefined
      },
      {
        stroke: "#80808044",
        lineDash: [6, 3]
      }
    ];
    var seriesDefaults = options.seriesDefaults;
    seriesDefaults.fills = ["#e1ba00", "silver", "peru"];
    seriesDefaults.strokes = ["black"];
    seriesDefaults.fillOpacity = 0.8;
    seriesDefaults.strokeOpacity = 0.8;
    seriesDefaults.strokeWidth = 2;
    seriesDefaults.highlightStyle = {
      fill: "red",
      stroke: "maroon"
    };
    seriesDefaults.labelEnabled = true;
    seriesDefaults.labelFontStyle = "italic";
    seriesDefaults.labelFontWeight = "bold";
    seriesDefaults.labelFontSize = 15;
    seriesDefaults.labelFontFamily = "Arial, sans-serif";
    seriesDefaults.labelPadding = {
      x: 10,
      y: 10
    };
    seriesDefaults.labelColor = "green";
    seriesDefaults.shadow = {
      color: "rgba(0, 0, 0, 0.3)",
      offset: [5, 5],
      blur: 8
    };
    seriesDefaults.tooltipRenderer = function(params) {
      var xField = params.xField;
      var yField = params.yField;
      var x = params.datum[xField];
      var y = params.datum[yField];
      return "<b>" + xField.toUpperCase() + ":</b> " + x + "<br/><b>" + yField.toUpperCase() + ":</b> " + y;
    };
    return options;
  }


  onCreateChartContainer(chartRef) {
    console.log(chartRef);
    if (this._containerEl) {
      this._containerEl.appendChild(chartRef.chartElement);
    }
  }


  //#endregion

  //#region Internal Methods

  private _applyChange(item: any): void {
    switch (item.key) {
      case BarChartOptionKeysEnum.id:
        this._id = this.options.id;
        break;
      case BarChartOptionKeysEnum.columns:
        this._columnDefs = this.options.columns;
        break;
      case BarChartOptionKeysEnum.rows:
        this._rowData = this.options.rows;
        break;
    }
  }

  //#endregion

}
