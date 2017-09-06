import {
  Input,
  Output,
  EventEmitter,
  Component,
  OnChanges,
  AfterViewInit,
  KeyValueDiffer,
  KeyValueDiffers,
  ChangeDetectorRef,
  DoCheck
} from '@angular/core';
import { HeaderOptions } from './header';
import { SelectListOptions } from '../index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnChanges, DoCheck {
  @Input() options: HeaderOptions;
  @Output() itemSelected:EventEmitter<string>;
  selectListOptions: SelectListOptions;

  private _differ: KeyValueDiffer<string, any> = null;


  constructor(private _changeDetector: ChangeDetectorRef,
              private _differs: KeyValueDiffers) {
    this.itemSelected = new EventEmitter();
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

  onSelectListChange(value: string) {
    this.itemSelected.emit(value);
  }

  private _applyChange(item: any): void {
    switch (item.key) {
      case 'selectListOptions':
        this.selectListOptions = this.options.selectListOptions;
        break;
    };
  }



}
