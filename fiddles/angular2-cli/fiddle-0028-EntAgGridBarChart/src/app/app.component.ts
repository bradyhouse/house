import {Component} from '@angular/core';
import { RowNode, ColumnApi, } from 'ag-grid/main';

import 'ag-grid-enterprise';
import 'ag-grid-enterprise/chartsModule';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private gridApi: any;
  private gridColumnApi: ColumnApi;
  private columnDefs: any[];
  private defaultColDef: any;
  private popupParent: HTMLElement;
  private rowData: RowNode[];
  private chartRef: any;
  private cellRange: { rowStartIndex: number; rowEndIndex: number; columns: string[] };

  private style: { width: string; height: string };

  constructor() {
    this.columnDefs = [
      {
        field: "country",
        width: 150,
        chartDataType: "category"
      },
      {
        field: "gold",
        chartDataType: "series"
      },
      {
        field: "silver",
        chartDataType: "series"
      },
      {
        field: "bronze",
        chartDataType: "series"
      },
      {
        headerName: "A",
        valueGetter: "Math.floor(Math.random()*1000)",
        chartDataType: "series"
      },
      {
        headerName: "B",
        valueGetter: "Math.floor(Math.random()*1000)",
        chartDataType: "series"
      },
      {
        headerName: "C",
        valueGetter: "Math.floor(Math.random()*1000)",
        chartDataType: "series"
      },
      {
        headerName: "D",
        valueGetter: "Math.floor(Math.random()*1000)",
        chartDataType: "series"
      }
    ];
    this.defaultColDef = {
      width: 100,
      resizable: true
    };
    this.popupParent = document.body;
    this.rowData = createRowData();
  }

  onRangeSelectionChanged($event: any): void {
    this.captureCellRange();
  }

  chartGroupedBar():void {
    const chartRangeParams = {
      cellRange: this.cellRange,
      chartType: "groupedBar"
    };
    this.displayChart(chartRangeParams, 'btnChartGroupedBar');
  }

  chartStackedBar():void {
    const chartRangeParams = {
      cellRange: this.cellRange,
      chartType: "stackedBar"
    };
    this.displayChart(chartRangeParams, 'btnChartStackedBar');
  }

  chartNormalizedBar():void {
    const chartRangeParams = {
      cellRange: this.cellRange,
      chartType: "normalizedBar"
    };
    this.displayChart(chartRangeParams, 'btnChartNormalizedBar');
  }

  chartGroupedColumn():void {
    const chartRangeParams = {
      cellRange: this.cellRange,
      chartType: "groupedColumn"
    };
    this.displayChart(chartRangeParams, 'btnChartGroupedColumn');
  }

  chartStackedColumn():void {
    const chartRangeParams = {
      cellRange: this.cellRange,
      chartType: "stackedColumn"
    };
    this.displayChart(chartRangeParams, 'btnChartStackedColumn');
  }

  chartNormalizedColumn():void {
    const chartRangeParams = {
      cellRange: this.cellRange,
      chartType: "normalizedColumn"
    };
    this.displayChart(chartRangeParams, 'btnChartNormalizedColumn');
  }

  chartArea() {
    const chartRangeParams = {
      cellRange: this.cellRange,
      chartType: "area"
    };
    this.displayChart(chartRangeParams, 'btnChartArea');
  }

  chartStackedArea():void {
    const chartRangeParams = {
      cellRange: this.cellRange,
      chartType: "stackedArea"
    };
    this.displayChart(chartRangeParams, 'btnChartStackedArea');
  }

  chartNormalizedArea():void {
    const chartRangeParams = {
      cellRange: this.cellRange,
      chartType: "normalizedArea"
    };
    this.displayChart(chartRangeParams, 'btnChartNormalizedArea');
  }

  chartDoughnut():void {
    const chartRangeParams = {
      cellRange: this.cellRange,
      chartType: "doughnut"
    };
    this.displayChart(chartRangeParams, 'btnChartDoughnut');
  }

  chartLine():void {
    const chartRangeParams = {
      cellRange: this.cellRange,
      chartType: "line"
    };
    this.displayChart(chartRangeParams, 'btnChartLine');
  }

  chartScatter():void {
    const chartRangeParams = {
      cellRange: this.cellRange,
      chartType: "scatter"
    };
    this.displayChart(chartRangeParams, 'btnChartScatter');
  }

  chartPie():void {
    const chartRangeParams = {
      cellRange: this.cellRange,
      chartType: "pie"
    };
    this.displayChart(chartRangeParams, 'btnChartPie');
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.captureCellRange();
    this.stretchGrid(window.innerWidth, window.innerHeight);
  }

  processChartOptions(params) {
    var options = params.options;
    options.width = 500;
    options.height = 500;
    switch (params.type) {
      case "groupedBar":
        options.legendPosition = "bottom";
        break;
      case "stackedBar":
        options.legendPosition = "bottom";
        break;
      case "normalizedBar":
        options.legendPosition = "bottom";
        break;
      case "groupedColumn":
        options.legendPosition = "right";
        break;
      case "stackedColumn":
        options.legendPosition = "right";
        break;
      case "normalizedColumn":
        options.legendPosition = "right";
        break;
      case "area":
        options.legendPosition = "bottom";
        break;
      case "stackedArea":
        options.legendPosition = "bottom";
        break;
      case "normalizedArea":
        options.legendPosition = "bottom";
        break;
      case "pie":
        options.legendPosition = "top";
        break;
      case "doughnut":
        options.legendPosition = "right";
        break;
      case "line":
        options.legendPosition = "left";
        break;
    }
    return options;
  }

  onResize(event: any): void {
    this.stretchGrid(event.target.innerWidth, event.target.innerHeight);
  }

  captureCellRange() {
    const _ranges: any[] = this.gridApi.getCellRanges();
    let _columns: string[] = [];
    let _rowStartIndex: number;
    let _rowEndIndex: number;

    if (_ranges.length === 1 && _ranges[0].columns[0].colId === 'country') {
      _rowStartIndex = _ranges[0].startRow.rowIndex;
      _rowEndIndex = _ranges[0].endRow.rowIndex;
      _ranges[0].columns.forEach((column: any) => {
        _columns.push(column.colId);
      });
      this.cellRange = {
        rowStartIndex: _rowStartIndex,
        rowEndIndex: _rowEndIndex,
        columns: _columns
      }
    } else {
      this.cellRange = {
        rowStartIndex: 0,
        rowEndIndex: 4,
        columns: ["country", "gold", "silver", "bronze"]
      }
    }
  }

  updateBtnBar(id: string = null) {
    let btnsDiv: HTMLElement = document.getElementById('btnBar');
    let btns: NodeList = btnsDiv.querySelectorAll('button');
    let activeBtn: HTMLElement = id ? document.getElementById(id) : null;
    let activeBtnCls: string = activeBtn ? activeBtn.getAttribute('class') : null;
    if (btns) {
      btns.forEach((btn: HTMLElement) => {
        let cls = btn.getAttribute('class');
        if (cls) {
          cls = cls.replace(' active', '');
          btn.setAttribute('class', cls);
        }
      });
    }
    if (activeBtn) {
      activeBtn.setAttribute('class', activeBtnCls + ' active');
    }
  }

  displayChart(chartRangeParams: any, btnId: string) {
    if (this.chartRef) {
      this.chartRef.destroyChart();
      this.updateBtnBar();
    }
    this.updateBtnBar(btnId);
    this.chartRef = this.gridApi.chartRange(chartRangeParams);
    this.attachCloseHandler();
  }

  attachCloseHandler() {
    let closeBtn: HTMLElement = this.chartRef.chartElement.querySelector('.chart-wrapper-close');
    console.debug(closeBtn);
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.chartRef.destroyChart();
        this.updateBtnBar();
      });
    }

  }

  stretchGrid(width: number, height: number): void {
    this.style = {
      width: width + 'px',
      height: (height - 70) + 'px'
    };
  }

}

function createRowData() {
  let countries = [
    "Ireland",
    "Spain",
    "United Kingdom",
    "France",
    "Germany",
    "Luxembourg",
    "Sweden",
    "Norway",
    "Italy",
    "Greece",
    "Iceland",
    "Portugal",
    "Malta",
    "Brazil",
    "Argentina",
    "Colombia",
    "Peru",
    "Venezuela",
    "Uruguay",
    "Belgium"
  ];
  let rowData = [];
  countries.forEach(function(country, index) {
    rowData.push({
      country: country,
      gold: Math.floor(((index + 1 / 7) * 333) % 100),
      silver: Math.floor(((index + 1 / 3) * 555) % 100),
      bronze: Math.floor(((index + 1 / 7.3) * 777) % 100)
    });
  });
  return rowData;
}
