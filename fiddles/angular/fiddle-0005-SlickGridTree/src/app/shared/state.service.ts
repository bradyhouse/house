import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import {List} from 'immutable';

import {TreeGridCmds} from '../components/index';


@Injectable()
export class StateService {

  public selectedNodesChange$: Observable<Array<any>>;
  public treeGridCommandChange$: Observable<TreeGridCmds>;

  private _selectedNodes: List<any>;
  private _selectedNodesObserver: Observer<Array<any>>;

  private _treeGridCommandObserver: Observer<TreeGridCmds>;


  set selectedNodes(value: any[]) {
    let list: List<any> = List(value);
    if (!this._selectedNodes.equals(list)) {
      this._selectedNodes = list;
      if (this._selectedNodesObserver) {
        this._selectedNodesObserver.next(value);
      }
    }
  }

  get selectedNodes(): any[] {
    return this._selectedNodes.toArray();
  }

  constructor() {

    this._selectedNodes = List([]);

    this.selectedNodesChange$ = new Observable(
      (observer: any) => this._selectedNodesObserver = observer
    ).share();

    this.treeGridCommandChange$ = new Observable(
      (observer: any) => this._treeGridCommandObserver = observer
    ).share();

  }

  updateTreeGrid(cmd: TreeGridCmds): void {
    if (this._treeGridCommandObserver) {
      this._treeGridCommandObserver.next(cmd);
    }
  }


}
