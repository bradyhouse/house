import {
  ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, KeyValueDiffer, KeyValueDiffers, OnChanges,
  Output
} from '@angular/core';
import { Event, Options } from './interfaces';
import { Base } from './base';
import { TimeSeriesService, ComplaintsWithPercent } from './time-series.service';


@Component({
  selector: 'app-base',
  template: ``,
  styles: []
})
export class BaseComponent extends Base implements OnChanges, DoCheck {

  @Output() events: EventEmitter<Event>;
  @Input() options: Options;

  title: string;
  width: number;
  height: number;
  chartType: string = 'bar';
  chartHeight: number;
  chartWidth: number;
  timeSeries: ComplaintsWithPercent[];

  private _differ: KeyValueDiffer<string, any> = null;


  constructor(private _changeDetector: ChangeDetectorRef,
              private _differs: KeyValueDiffers,
              private _timeSeries: TimeSeriesService) {
    super();
    this.events = new EventEmitter();
    this.timeSeries = _timeSeries.getData();
    this.title = 'ECorp';
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

  private _applyChange(item: any): void {
    switch (item.key) {
      case 'width':
        if (this.options.width) {
          this.width = this.options.width;
          this.chartWidth = this.width - 140;
        }
      case 'height':
        if (this.options.height) {
          this.height = this.options.height;
          this.chartHeight = this.height - 20;
        }
      case 'chartType':
        if (this.options.chartType) {
          this.chartType = this.options.chartType;
        }
      case 'title':
        if (this.options.title) {
          this.title = this.options.title;
        }
    }
  }

}
