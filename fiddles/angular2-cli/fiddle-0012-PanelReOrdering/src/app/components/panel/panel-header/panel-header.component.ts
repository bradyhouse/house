import {
  Input,
  Output,
  Component,
  OnChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  ChangeDetectorRef,
  ViewEncapsulation,
  EventEmitter,
  DoCheck
} from '@angular/core';

import {PanelEvent, PanelEventTypes} from '../panel-event';

import { PanelHeaderOptions } from './panel-header';
@Component({
  selector: 'app-panel-header',
  templateUrl: './panel-header.component.html',
  styleUrls: ['./panel-header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PanelHeaderComponent implements OnChanges, DoCheck {

  @Input() options: PanelHeaderOptions;
  @Output() events: EventEmitter<PanelEvent>;

  title: string;
  cssClass: string;

  private _differ: KeyValueDiffer<string, any> = null;

  constructor(private _changeDetector: ChangeDetectorRef,
              private _differs: KeyValueDiffers) {
    this.title = '...';
    this.events = new EventEmitter();
  }

  ngOnChanges(changes: any): void {
    if ('options' in changes) {
      const value = changes['options'].currentValue;
      if (!this._differ && value) {
        this._differ = this._differs.find(value).create(this._changeDetector);
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

  onDragStart(event: any): void {
    this.events.emit({
      type: PanelEventTypes.DRAG_START,
      data: {
        event: event,
        title: this.title
      }
    });
  }

  onDragEnd(event: any): void {
    this.events.emit({
      type: PanelEventTypes.DRAG_END,
      data: {
        event: event,
        title: this.title
      }
    });
  }

  onDragOver(event: any): void {
    this.events.emit({
      type: PanelEventTypes.DRAG_OVER,
      data: {
        event: event,
        title: this.title
      }
    });
  }

  private _applyChange(item: any): void {
    switch (item.key) {
      case 'title':
        this.title = this.options.title;
        break;
      case 'cssClass':
        this.cssClass = this.options.cssClass;
        break;
    }
  }

}
