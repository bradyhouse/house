import {Component} from '@angular/core';
import {StateService} from '../shared/index';
import {Subscriptions, TreeGridCmds} from '../components/index';



@Component({
  selector: 'content',
  moduleId: module.id,
  templateUrl: 'content.component.html',
  styleUrls: ['content.component.css']
})
export class ContentComponent extends Subscriptions {

  json: string;
  emptyJson: string = 'No nodes selected.';

  constructor(
    private _stateService: StateService
  ) {
    super();
    this.json = this.emptyJson;

    this.subscriptions.push(_stateService.selectedNodesChange$
      .subscribe(
        (nodes:any) => this.onSelectedNodesChange(nodes)
      ));
  }


  onSelectedNodesChange(nodes: any[]) {
    if (nodes && nodes.length) {
      this.json = JSON.stringify(nodes);
    } else {
      this.json = this.emptyJson;
    }
  }

  onShowSelectedClick() {
    this._stateService.updateTreeGrid(TreeGridCmds.ShowSelected);
  }

  onClearSelectedClick() {
    this._stateService.updateTreeGrid(TreeGridCmds.ClearSelected);
  }

  onExpandAllClick() {
    this._stateService.updateTreeGrid(TreeGridCmds.ExpandAll);
  }

  onCollapseAllClick() {
    this._stateService.updateTreeGrid(TreeGridCmds.CollapseAll);
  }

  onSelectAllClick() {
    this._stateService.updateTreeGrid(TreeGridCmds.SelectAll);
  }

  onShowAllClick() {
    this._stateService.updateTreeGrid(TreeGridCmds.ShowAll);
  }

}

