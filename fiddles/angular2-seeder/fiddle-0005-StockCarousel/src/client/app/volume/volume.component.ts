import {
  ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, KeyValueDiffer, KeyValueDiffers, OnChanges,
  Output
} from '@angular/core';

import { Options, BubbleEvent, DataService } from '../interfaces/index';
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

  volumes: any[];
  title: string;
  width: number;
  height: number;

  chartHeight: number;
  chartWidth: number;
  isLoaded: boolean;

  private _differ: KeyValueDiffer<string, any> = null;

  load(dataService: DataService = null) {
    if (dataService !== null) {
      this.volumes = dataService.getData();
    } else {
      if (this._volumeService) {
        this.volumes = this._volumeService.getData();
      }
    }

    if (this.volumes && this.volumes.length) {
      this.isLoaded = true;
    }

  }

  constructor(private _volumeService: VolumeService,
              private _changeDetector: ChangeDetectorRef,
              private _differs: KeyValueDiffers) {
    super();
    this.events = new EventEmitter();
    this.title = '';
    this.load();

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

  private _applyChange(item: any): void {
    switch (item.key) {
      case 'width':
        if (this.options.width) {
          this.width = this.options.width;
          this.chartWidth = this.width - 230;
        }
        break;
      case 'height':
        if (this.options.height) {
          this.height = this.options.height;
          this.chartHeight = this.height - 300;
        }
        break;
      case 'title':
        if (this.options.title) {
          this.title = this.options.title;
        }
        break;
      case 'dataService':
        if (this.options.dataService) {
          this.load(this.options.dataService);
        }
        break;
      case 'loaded':
        this.isLoaded = this.options.loaded;
        break;
    }
  }

}
