import { Component, AfterViewInit } from '@angular/core';

import { BaseComponent } from '../base.component';

import { IntradayService, ComplaintsWithPercent } from './intraday.service';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent extends BaseComponent implements AfterViewInit {
  timeSeries: ComplaintsWithPercent[];
  ngAfterViewInit() {
    if (this.dataService) {
      this.timeSeries = this.dataService.getData();
    }
  }
}
