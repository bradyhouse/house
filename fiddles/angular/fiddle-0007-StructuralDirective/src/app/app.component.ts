import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rows: any[] = [{
    id: 0,
    value: 'fubar'
  }, {
    id: 1,
    value: 'football'
  }, {
    id: 2,
    value: 'stuff'
  }, {
    id: 3,
    value: 'junk'
  }];

  trackByFn(arg:any) {
    return arg;
  }
  onAddClick($event) {
    this.rows.push({
      id: this.rows.length + 1,
      value: 'item ' + (this.rows.length + 1)
    });
  }
  onClearClick($event) {
    this.rows = [];
  }

}
