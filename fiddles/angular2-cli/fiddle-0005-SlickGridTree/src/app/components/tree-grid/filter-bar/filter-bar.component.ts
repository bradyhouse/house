import {
  Component,
  Output,
  Input,
  EventEmitter,
  OnChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  ChangeDetectorRef,
  DoCheck
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subscriptions} from '../../shared/subscriptions';
import 'rxjs/add/operator/debounceTime';
import {FilterBarInterface} from './filter-bar.interface';

@Component({
  selector: 'filter-bar',
  moduleId: module.id,
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent extends Subscriptions implements OnChanges, DoCheck {
  @Input() options: FilterBarInterface;
  @Output() changed: EventEmitter<any>;
  enabled: boolean;
  filterControl: FormControl;
  placeHolder: string;

  private _filter: string;

  private _differ: KeyValueDiffer<string, any> = null;


  get filter(): string {
    return this._filter;
  }

  set filter(value: string) {
    if (this._filter !== value) {
      this._filter = value;
      this.filterControl.setValue(value, {});
      this.changed.emit({
        type: 'filter',
        data: value
      });
    }
  }

  constructor(private _changeDetector: ChangeDetectorRef,
              private _differs: KeyValueDiffers,) {
    super();
    this.changed = new EventEmitter<string>();
    this.filterControl = new FormControl();
    this.enabled = true;
    this._filter = null;
    this.placeHolder = 'Enter Search Criteria';
    this.subscriptions.push(this.filterControl.valueChanges
      .debounceTime(300)
      .subscribe(
        (filter: string) => this.onValueChanged(filter)
      ));
  }

  ngOnChanges(changes: any) {
    if ('options' in changes) {
      const value = changes['options'].currentValue;
      if (!this._differ && value) {
        try {
          this._differ = this._differs.find(value).create(this._changeDetector);
        } catch (e) {
          throw new Error(
            `Cannot find a differ supporting object '${value}'`);
        }
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

  onValueChanged(value: string): void {
    this.filter = value;
  }

  onClearClick(): void {
    this.filter = '';
  }

  private _applyChange(item: any): void {
    switch (item.key) {
      case 'isDisabled':
        this.enabled = !this.options.isDisabled;
        break;
      case 'filter':
        this.filter = this.options.filter;
        break;
    }
  }

}
