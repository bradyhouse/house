import { Component, Pipe, PipeTransform } from '@angular/core';

import { BaseComponent } from '../base.component';
import { VolumeService, WeekData } from './volume.service';

@Component({
  selector: 'app-volume',
  moduleId: module.id,
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.css']
})
export class VolumeComponent extends BaseComponent {

  dataSource: WeekData[];

  load(dataService: VolumeService) {
    if (dataService) {
      this.dataSource = dataService.getData();
    }
  }

  abs(value: any) {
    return Math.abs(value);
  }

}

@Pipe({ name: 'gridCellData' })
export class GridCellDataPipe implements PipeTransform {
  transform(gridData: any) {
    return gridData.data[gridData.column.caption.toLowerCase()];
  }
}
