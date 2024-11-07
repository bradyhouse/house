import {
  Component,
  ElementRef,
  Inject,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewEncapsulation
} from '@angular/core';

import {
  SelectListOptions,
  SelectListData,
  SelectListService
} from './index';

declare let jQuery:any;

@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [SelectListService]
})
export class SelectListComponent implements OnChanges  {

  @Input() options:SelectListOptions;
  @Output() changed:EventEmitter<any>;
  @Output() userAction:EventEmitter<boolean>;

  data:SelectListData[];

  private _isInit:boolean;
  private _select2:any;
  private _changeTimeout:any;
  private _isUserAction:boolean;

  constructor(@Inject(ElementRef) public elementRef:ElementRef,
              private _select2Service:SelectListService) {
    this.changed = new EventEmitter();
    this.userAction = new EventEmitter();
    this._isUserAction = true;
    this.options = {};
  }

  ngOnChanges(changes:any) {
    if (changes.options) {
      this.data = this.options.data;
      if (this.options.isFilterSelectedOptions) {
        this.data = this._select2Service.filterSelectedOptions(this.options);
      }

      if (!this._isInit) {
        this.render();
      } else {
        this.validateValue();
      }
    }
  }

  open() {
    this._select2.select2('open');
  }

  private render() {
    this._select2 = jQuery(this.elementRef.nativeElement).find('select');
    this._select2.select2(this._select2Service.getSelect2Options(this.options))
      .on('change', (e:any) => {
        let value:any = this._select2.val();
        if (this.options.isMultiSelect && !value) {
          value = [];
        }
        this.change(value);
      }).on('select2:open', (e:any) => {
      if (this.options.isManualEntry) {
        let value:string = jQuery(this.elementRef.nativeElement).find('.select2-selection__rendered').text();
        if (value) {
          value = value.replace(/\s/g, '');
        }
        jQuery('.select2-container--open .select2-dropdown--below .select2-search__field').val(value);
      }
    });
    this.validateValue();
    this._isInit = true;
  }

  private validateValue() {
    if (this.data && this.data.length > 0) {
      let validatedValue:any = this._select2Service.getValidatedValue(this.options);
      if (this.options.isManualEntry && !this.options.isMultiSelect && validatedValue !== this.options.value) {
        validatedValue = this.options.value;
        this.addManualEntry(validatedValue);
      }
      this.updateSelect2Value(validatedValue);
    }
  }

  private updateSelect2Value(value:any) {
    if (this._changeTimeout) {
      clearTimeout(this._changeTimeout);
    }

    this._changeTimeout = setTimeout(() => {
      if (value) {
        this._isUserAction = false;
        this._select2.val(value).trigger('change');
      }
    }, 10);
  }

  private addManualEntry(value:any) {
    if (this.options.manualEntry) {
      this.options.data.push(this.options.manualEntry({id: value, term: value}));
    } else {
      this.options.data.push(<SelectListData>{id: value, text: value});
    }
  }

  private change(newValue:any) {
    if (JSON.stringify(this.options.value) !== JSON.stringify(newValue)) {
      if (this.options.isFilterSelectedOptions && this.options.isMultiSelect) {
        this.filterSelected(newValue);
      } else {
        this.options.value = newValue;
      }

      this.userAction.emit(this._isUserAction);
      this.changed.emit(this.options.value);
      this._isUserAction = true;
    }
  }

  private filterSelected(newValue:string[]) {
    if (!this.options.value) {
      this.options.value = [];
    }

    if (newValue && newValue.constructor === Array) {
      newValue.forEach((item:string) => {
        if (this.options.value.indexOf(item) === -1) {
          this.options.value.push(item);
        }
      });
    }

    this.data = this._select2Service.filterSelectedOptions(this.options);
  }

}
