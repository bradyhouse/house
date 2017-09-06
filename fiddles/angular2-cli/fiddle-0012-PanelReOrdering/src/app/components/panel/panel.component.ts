import {
  Input,
  Output,
  EventEmitter,
  Component,
  OnChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  ChangeDetectorRef,
  DoCheck
} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import {Subscriptions} from '../subscriptions';
import {PanelOptions} from './panel';
import {PanelHeaderOptions} from './panel-header/panel-header';
import {PanelEvent, PanelEventTypes} from './panel-event';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent extends Subscriptions implements OnChanges, DoCheck {

  @Input() options: PanelOptions;
  @Output() events: EventEmitter<PanelEvent>;

  panelHeaderOptions: PanelHeaderOptions;
  url: string;
  width: number;
  height: number;
  left: number;
  top: number;
  isActive: boolean;

  private _differ: KeyValueDiffer<string, any> = null;

  constructor(private _changeDetector: ChangeDetectorRef,
              private _differs: KeyValueDiffers,
              public sanitizer: DomSanitizer) {
    super();
    this.events = new EventEmitter();
    this.url = 'http://fiddle.sh';
    this.width = window.innerWidth - 100;
    this.height = Math.floor(window.innerHeight * .3);
    this.isActive = true;
    this.left = 0;
    this.top = 0;
    this.panelHeaderOptions = {
      title: this.url,
      cssClass: 'active-panel'
    };
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

  onPanelHeaderEvent(event: PanelEvent) {
    this.events.emit(event);
  }

  private _applyChange(item: any): void {
    switch (item.key) {
      case 'url':
        this.url = this.options.url;
        break;
      case 'width':
        this.width = this.options.width;
        break;
      case 'height':
        this.height = this.options.height;
        break;
      case 'left':
        this.left = this.options.left;
        break;
      case 'top':
        this.top = this.options.top;
        break;
      case 'title':
        this.panelHeaderOptions.title = this.options.title;
        break;
      case 'isActive':
        this.isActive = this.options.isActive;
        break;
    }
  }


}
