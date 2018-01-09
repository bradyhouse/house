import {
  ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, KeyValueDiffer, KeyValueDiffers, OnChanges,
  AfterViewChecked, Output, ViewChild
} from '@angular/core';

import { Base } from '../base';
import { DxChartComponent } from 'devextreme-angular/ui/chart';
import { IntradayService, StockPrice } from './intraday.service';
import { BubbleEvent, Options, DataService } from '../interfaces';


@Component({
  selector: 'app-line-chart',
  moduleId: module.id,
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent extends Base implements OnChanges, DoCheck, AfterViewChecked {
  @ViewChild(DxChartComponent) chart: DxChartComponent;
  @Output() events: EventEmitter<BubbleEvent>;
  @Input() options: Options;

  stockPrices: StockPrice[];
  title: string;
  width: number;
  height: number;
  chartHeight: number;
  chartWidth: number;
  isLoaded: boolean;

  private _differ: KeyValueDiffer<string, any> = null;

  load(dataService: DataService = null) {
    if (dataService !== null) {
      this.stockPrices = dataService.getData();
    } else {
      if (this._intradayService) {
        this.stockPrices = this._intradayService.getData();
      }
    }
  }

  onValueChanged(e: any) {
    this.chart.instance.zoomArgument(new Date(e.value[0]), new Date(e.value[1]));
  }


  constructor(private _intradayService: IntradayService,
              private _changeDetector: ChangeDetectorRef,
              private _differs: KeyValueDiffers) {
    super();
    this.events = new EventEmitter();
    this.title = '';
    this.isLoaded = false;
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

  ngAfterViewChecked() {
    this.events.emit({
      type: 'resize'
    });
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
          this.chartWidth = this.width - 140;
          window.setTimeout(() => {
            this.ngAfterViewChecked();
          }, 1000);
        }
        break;
      case 'height':
        if (this.options.height) {
          this.height = this.options.height;
          this.chartHeight = this.height - 305;
          window.setTimeout(() => {
            this.ngAfterViewChecked();
          }, 1000);
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
