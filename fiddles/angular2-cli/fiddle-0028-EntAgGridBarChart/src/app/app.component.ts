import { Component } from '@angular/core';
import { BarChartOptions } from './bar-chart/interfaces/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  barChartOptions: BarChartOptions;

  constructor() {
    this.barChartOptions = {
      id: 'fiddle',
      columns: [
        {
          field: "country",
          width: 150,
          chartDataType: "category"
        },
        {
          field: "gold",
          chartDataType: "series"
        },
        /*{
          field: "silver",
          chartDataType: "series"
        },
        {
          field: "bronze",
          chartDataType: "series"
        },*/
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
      ],
      rows: createRowData()
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
