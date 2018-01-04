import { Component } from '@angular/core';

import { BaseComponent } from '../base.component';

import { IntradayService, ComplaintsWithPercent } from './intraday.service';


@Component({
  selector: 'app-line-chart',
  moduleId: module.id,
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent extends BaseComponent {
  timeSeries: ComplaintsWithPercent[];
  load(dataService: IntradayService) {
    if (dataService) {
      this.timeSeries = dataService.getData();
    }
  }
}
