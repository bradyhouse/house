import {
  Component,
  Output,
  Input,
  EventEmitter,
  OnChanges
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BaseComponent} from '../../base.component';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'search-bar',
  moduleId: module.id,
  templateUrl: './app/components/acme-grid/search-bar/search-bar.component.html',
  styleUrls: ['./app/components/acme-grid/search-bar/search-bar.component.css'],
})
export class SearchBarComponent extends BaseComponent implements OnChanges {
  @Input() filter: string;
  @Output() changed: EventEmitter<string>;
  filterControl: FormControl;

  constructor() {
    super();
    this.changed = new EventEmitter<string>();
    this.filterControl = new FormControl();

    this.subscriptions.push(this.filterControl.valueChanges
      .debounceTime(300)
      .subscribe(
        (filter: string) => this.changeFilter(filter)
      ));
  }

  ngOnChanges(changes: any) {
    if (changes.filter) {
      this.filterControl.setValue(this.filter, {});
    }
  }

  onClearClick() {
    this.filterControl.setValue('', {});
  }

  private changeFilter(value: string) {
    this.filter = value;
    this.changed.emit(value);
  }
}
