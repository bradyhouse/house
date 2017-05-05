import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../components/base.component';
import {DataService} from '../shared/data.service';
import { NavBarCmds } from '../components/tree-grid/index';
declare let _: any;

@Component({
  selector: 'sidebar',
  moduleId: module.id,
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css']
})
export class SidebarComponent extends BaseComponent {

  options: any;
  columns: any[];

  constructor(private _dataService: DataService) {
    super();
    this.options = {
      nodes: [],
      menuOptions: []
    };



    this.subscriptions.push(
      _dataService.responseChange$
        .subscribe(
          (data: any) => this.dataLoaded(data)
        ));

  }

  private dataLoaded(data: any) {
    this.options = {
      nodes: data.data.children,
      menuOptions: [
        NavBarCmds.ShowSelected,
        NavBarCmds.ClearSelected,
        NavBarCmds.ExpandAll,
        NavBarCmds.CollapseAll,
        NavBarCmds.SelectAll
      ]
    };
  }

}
