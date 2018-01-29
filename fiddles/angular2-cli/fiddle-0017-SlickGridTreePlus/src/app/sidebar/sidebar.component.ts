import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscriptions, TreeGridCmds, TreeGridInterface } from '../components/index';
import { DataService, StateService } from '../shared/index';
declare let $: any;

@Component({
  selector: 'sidebar',
  moduleId: module.id,
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css']
})
export class SidebarComponent extends Subscriptions {
  @ViewChild('sidebarEl') el: ElementRef;
  options: TreeGridInterface;
  columns: any[];

  constructor(private _dataService: DataService,
              private _stateService: StateService) {
    super();
    this.options = {
      nodes: [],
      macro: null,
      sparkLineRender: this.onSparkLineRender
    };


    this.subscriptions.push(
      _dataService.responseChange$
        .subscribe(
          (data: any) => this.dataLoaded(data)
        ));

    this.subscriptions.push(
      _stateService.treeGridCommandChange$
        .subscribe(
          (cmd: any) => this.onTreeCmd(cmd)
        ));

  }

  private dataLoaded(data: any) {
    this.options = {
      nodes: data.data.children,
      height: $(this.el.nativeElement).height()
    };
  }

  onSparkLineRender(cellNode: any, row: any, dataContext: any, colDef: any) {
    console.log('rendering ...');
  }

  onGridEvent(args: any) {
    if (args.type === 2) {
      this._stateService.selectedNodes = args.data;
    }
  }

  onTreeCmd(cmd: TreeGridCmds) {
    this.options.macro = cmd;
  }




}
