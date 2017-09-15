import {
  Input,
  Output,
  EventEmitter,
  Component,
  OnChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  ChangeDetectorRef,
  DoCheck,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import {Subscriptions} from '../subscriptions';
import {PanelOptions} from './panel';
import {PanelEvent, PanelEventTypes} from './panel-event';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent extends Subscriptions implements OnInit, OnChanges, DoCheck {

  @ViewChild('el') el: ElementRef;

  @Input() options: PanelOptions;
  @Output() events: EventEmitter<PanelEvent>;

  url: string;
  title: string;
  width: number;
  height: number;
  left: number;
  top: number;
  isActive: boolean;
  isClose: boolean;
  timeOut: any;
  cssClasses: string[];

  private _differ: KeyValueDiffer<string, any> = null;
  private _isFullScreen: boolean;


  get isFullScreen(): boolean {
    return this._isFullScreen;
  }

  set isFullScreen(value: boolean) {
    this._isFullScreen = value;
    this._calcHeight();
  }

  constructor(private _changeDetector: ChangeDetectorRef,
              private _differs: KeyValueDiffers,
              public sanitizer: DomSanitizer) {
    super();
    this.events = new EventEmitter();
    this.url = 'http://fiddle.sh';
    this.width = window.innerWidth - 100;
    this.title = 'Panel 1';
    this.left = 0;
    this.top = 0;
    this.cssClasses = ['panel', 'panel-primary'];
  }

  ngOnChanges(changes: any): void {
    if ('options' in changes) {
      const value = changes['options'].currentValue;
      if (!this._differ && value) {
        this._differ = this._differs.find(value).create(this._changeDetector);
      }
    }
  }

  ngOnInit(): void {
    this._calcHeight();
    this._calcWidth();
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

  onWindowResize(event: any) {
    if (this.timeOut) {
      window.clearTimeout(this.timeOut);
    }
    this.timeOut = window.setTimeout(() => {
      this._calcHeight();
      this._calcWidth();
    }, 64);
  }

  onDragStart(event: any): void {
    this.events.emit({
      type: PanelEventTypes.DRAG_START,
      data: {
        event: event,
        panel: this.options
      }
    });
  }

  onDragEnd(event: any): void {
    this.events.emit({
      type: PanelEventTypes.DRAG_END,
      data: {
        event: event,
        panel: this.options
      }
    });
  }

  onDragOver(event: any): void {
    this.events.emit({
      type: PanelEventTypes.DRAG_OVER,
      data: {
        event: event,
        panel: this.options
      }
    });
  }

  onEvents(event: any) {
    switch (event.type) {
      case 'close':
        this.events.emit({
          type: PanelEventTypes.CLOSE,
          data: {
            panel: this.options
          }
        });
        break;
    }
  }

  private _calcHeight() {
    if (this.isFullScreen) {
      this.height = this.el.nativeElement.offsetParent.offsetHeight - (48 * 2) - 16;
    } else {
      this.height = Math.floor(window.innerHeight * .3);
    }
  }

  private _calcWidth() {
    this.width = window.innerWidth - Math.floor(window.innerWidth * .11);
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
        this.title = this.options.title;
        break;
      case 'active':
        this.isActive = this.options.active;
        break;
      case 'fullScreen':
        this.isFullScreen = this.options.fullScreen;
        break;
      case 'cssClass':
        this.cssClasses = this.options.cssClass;
        break;
      case 'canClose':
        this.isClose = this.options.canClose;
        break;
    }
  }


}
