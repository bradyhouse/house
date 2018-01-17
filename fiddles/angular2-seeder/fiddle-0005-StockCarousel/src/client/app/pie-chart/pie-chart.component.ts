import {
  ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, KeyValueDiffer, KeyValueDiffers, OnChanges,
  Output, AfterViewInit
} from '@angular/core';
import { BubbleEvent, Options, DataService } from '../interfaces/index';
import { Base } from '../base';


@Component({
  selector: 'app-pie-chart',
  moduleId: module.id,
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent extends Base implements OnChanges, DoCheck, AfterViewInit {

  @Output() events: EventEmitter<BubbleEvent>;
  @Input() options: Options;

  volume: any;
  width: number;
  height: number;
  chartHeight: number;
  chartWidth: number;

  private _differ: KeyValueDiffer<string, any> = null;



  constructor(private _changeDetector: ChangeDetectorRef,
              private _differs: KeyValueDiffers) {
    super();
    this.events = new EventEmitter();

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

  customizeText(arg: any) {
    console.log(arg);
    return arg.text + arg.value;
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
            this.ngAfterViewInit();
          }, 1000);
        }
        break;
      case 'height':
        if (this.options.height) {
          this.height = this.options.height;
          this.chartHeight = this.height - 305;
          window.setTimeout(() => {
            this.ngAfterViewInit();
          }, 1000);
        }
        break;
      case 'data':
        if (this.options.data) {
          this.volume = this.options.data;
        }
    }
  }

}

