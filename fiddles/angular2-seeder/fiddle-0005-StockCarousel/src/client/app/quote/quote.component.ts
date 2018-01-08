import {
  ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, KeyValueDiffer, KeyValueDiffers, OnChanges,
  Output
} from '@angular/core';
import { BubbleEvent, Options, DataService } from '../interfaces/index';
import { Base } from '../base';


@Component({
  selector: 'app-quote',
  moduleId: module.id,
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent extends Base implements OnChanges, DoCheck {

  @Output() events: EventEmitter<BubbleEvent>;
  @Input() options: Options;

  stockQuotes: any;
  title: string;
  width: number;
  height: number;
  chartHeight: number;
  chartWidth: number;
  isLoaded: boolean;

  private _differ: KeyValueDiffer<string, any> = null;

  load(dataService: DataService = null) {
    throw new Error('method is not implemented');
  }

  constructor(private _changeDetector: ChangeDetectorRef,
              private _differs: KeyValueDiffers) {
    super();
    this.events = new EventEmitter();
    this.title = '';
    this.isLoaded = true;

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

