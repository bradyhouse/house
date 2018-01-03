import { Component, OnInit, AfterViewInit } from '@angular/core';

import { BaseComponent } from '../base.component';


@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.css']
})
export class VolumeComponent extends BaseComponent implements AfterViewInit {

  dataSource: WeekData[];

  ngAfterViewInit() {

  }

}
