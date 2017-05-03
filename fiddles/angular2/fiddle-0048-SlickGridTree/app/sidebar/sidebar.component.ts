import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../components/base.component';
import {DataService} from '../shared/data.service';
declare let _: any;

@Component({
  selector: 'sidebar',
  moduleId: module.id,
  templateUrl: './app/sidebar/sidebar.component.html',
  styleUrls: ['./app/sidebar/sidebar.component.css']
})
export class SidebarComponent extends BaseComponent {

  options: any;
  columns: any[];

  constructor(private _dataService: DataService) {
    super();
    this.options = {
      rows: [],
      columns: []
    };

    this.columns = [
      {id: "title", field: "title"}
    ];

    this.subscriptions.push(
      _dataService.responseChange$
        .subscribe(
          (data: any) => this.dataLoaded(data)
        ));

  }

  private dataLoaded(data: any) {
    this.options = {
      rows: data.data.children,
      columns: this.columns
    };
  }

}
