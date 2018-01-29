import {
  Component,
  Output,
  Input,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscriptions } from '../shared/index';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'search-bar',
  moduleId: module.id,
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent extends Subscriptions implements OnChanges {
  @Input() filter:string;
  @Output() changed:EventEmitter<string>;
  filterControl:FormControl;

  constructor() {
    super();
    this.changed = new EventEmitter<string>();
    this.filterControl = new FormControl();

    this.subscriptions.push(this.filterControl.valueChanges
      .debounceTime(300)
      .subscribe(
        (filter:string) => this.changeFilter(filter)
      ));
  }

  ngOnChanges(changes:any) {
    if (changes.filter) {
      this.filterControl.setValue(this.filter, {});
      this.changed.emit(this.filter);
    }
  }

  onClearClick() {
    this.filterControl.setValue('', {});
  }

  private changeFilter(filter:string) {
    this.filter = filter;
    this.changed.emit(filter);
  }
}
