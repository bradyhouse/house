import {
  ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, KeyValueDiffer, KeyValueDiffers, OnChanges,
  Output, ViewChild, ElementRef
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
export class VolumeComponent extends Base implements OnChanges, DoCheck {

  @Output() events: EventEmitter<BubbleEvent>;
  @Input() options: Options;
  @ViewChild('grid') gridEl: ElementRef;
  pieChartOptions: Options;

  grid: any;
  volumes: any[];
  title: string;
  width: number;
  height: number;

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
    if (this.grid) {
      this.grid.selectRowsByIndexes([0]);
    }
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
    const rawData: any = data.selectedRowsData[0];
    this.pieChartOptions.data = [
      {
        text: 'Globex',
        value: rawData.volume.globexVol
      },
      {
        text: 'Clearport',
        value: rawData.volume.clearingVol
      },
      {
        text: 'Floor',
        value: rawData.volume.floorVol
      }
    ];
    this.pieChartOptions.width = this.chartWidth;

    this.pieChartOptions.height = this.chartHeight;
  }

  private _applyChange(item: any): void {
    switch (item.key) {
      case 'width':
        if (this.options.width) {
          this.width = this.options.width;
          this.chartWidth = this.width;
        }
        break;
      case 'height':
        if (this.options.height) {
          this.height = this.options.height;
          this.chartHeight = (Math.floor(.4 * this.height)) - 300;
        }
        break;
      case 'title':
        if (this.options.title) {
          this.title = this.options.title;
        }
        break;
      case 'dataService':
        break;
      case 'loaded':
        this.isLoaded = this.options.loaded;
        break;
    }
  }

}
