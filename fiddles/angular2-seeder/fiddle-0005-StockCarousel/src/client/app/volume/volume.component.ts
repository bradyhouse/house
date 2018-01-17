import {
  ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, KeyValueDiffer, KeyValueDiffers, OnChanges,
  Output, ViewChild, ElementRef, AfterViewInit
} from '@angular/core';

import { Options, BubbleEvent } from '../interfaces/index';
import { Base } from '../base';
import { VolumeService } from './volume.service';


@Component({
  selector: 'app-volume',
  moduleId: module.id,
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.css']
})
export class VolumeComponent extends Base implements OnChanges, DoCheck, AfterViewInit {

  @Output() events: EventEmitter<BubbleEvent>;
  @Input() options: Options;
  @ViewChild('grid') gridEl: ElementRef;
  pieChartOptions: Options;
  lastUpdated: string;

  grid: any;
  volumes: any[];
  title: string;
  width: number;
  height: number;
  hideChart: boolean;
  chartHeight: number;
  chartWidth: number;
  isLoaded: boolean;

  private _differ: KeyValueDiffer<string, any> = null;


  constructor(private _volumeService: VolumeService,
              private _changeDetector: ChangeDetectorRef,
              private _differs: KeyValueDiffers) {
    super();
    this.events = new EventEmitter();
    this.title = '';
    this.pieChartOptions = {
      width: 0,
      height: 0,
      loaded: false
    };

    this.subscriptions.push(_volumeService.responseChange$.subscribe(
      (data: any) => this.onVolumeServiceResponseChange(data)
    ));

  }

  ngAfterViewInit() {
    this.events.emit({
      type: 'resize'
    });
  }
  ngOnChanges(changes: any): void {
    if ('options' in changes) {
      const value = changes['options'].currentValue;
      if (!this._differ && value) {
        this._differ = this._differs.find(value).create();
      }
    }
  }

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

  onMouseOver() {
    this.events.emit({
      type: 'mouseOver'
    });
  }

  onVolumeServiceResponseChange(data: any) {
    this.volumes = data;
    this.lastUpdated = this._volumeService.lastUpdated;
    if (this.grid) {
      this.grid.selectRowsByIndexes([0]);
    }
    this.isLoaded = true;
  }

  calculateCellValue(data: any) {
    const formatNumber: Function = (val: any) => {
      const parts: any = val.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    };

    return formatNumber(data);
  }

  onGridContentReady(args: any) {
   this.grid = args.component;
   if (this.volumes && this.volumes.length > 0) {
     this.grid.selectRowsByIndexes([0]);
   }
  }

  onGridCellClick(cell: any) {
    this.grid.selectRowsByIndexes(cell.rowIndex);
  }

  onGridSelectionChanged(data: any) {
    const rawData: any = data.selectedRowsData[0],
      totalVolume: number = Number(rawData.volume.totalVolume),
      globexVol: number = !isNaN(rawData.volume.globexVol) ?  Number(rawData.volume.globexVol) : 0,
      clearportVol: number = !isNaN(rawData.volume.clearingVol) ? Number(rawData.volume.clearingVol) : 0,
      floorVol: number = !isNaN(rawData.volume.floorVol) ? Number(rawData.volume.floorVol) : 0,
      globexPer: number = Math.floor(globexVol / totalVolume) * 100,
      clearportPer: number = Math.floor(clearportVol / totalVolume) * 100,
      floorPer: number = Math.floor(floorVol / totalVolume) * 100;
    this.pieChartOptions.data = [
      {
        text: 'Globex',
        value: globexVol,
        percent: globexPer
      },
      {
        text: 'Clearport',
        value: clearportVol,
        percent: clearportPer
      },
      {
        text: 'Floor',
        value: floorVol,
        percent: floorPer
      }
    ];
  }
  onChartEvent(args: any) {
    this.events.emit(args);
  }
  private _applyChange(item: any): void {
    switch (item.key) {
      case 'width':
        if (this.options.width) {
          this.width = this.options.width;
          this.pieChartOptions.width =  this.width;
          window.setTimeout(() => {
            this.ngAfterViewInit();
          }, 500);
        }
        break;
      case 'height':
        if (this.options.height) {
          this.height = this.options.height;
          this.chartHeight = this.height - 305;
          const chartBaseHeight: number = Math.floor(.7 * this.chartHeight);
          this.pieChartOptions.height = chartBaseHeight;
          window.setTimeout(() => {
            this.ngAfterViewInit();
          }, 500);

        }
        break;
      case 'title':
        if (this.options.title) {
          this.title = this.options.title;
        }
        break;
    }
  }

}
