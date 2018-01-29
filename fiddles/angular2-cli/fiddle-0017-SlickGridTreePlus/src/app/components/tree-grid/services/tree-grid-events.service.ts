import {
  EventEmitter,
  Injectable
} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import {
  TreeGridNodeService
} from './tree-grid-node.service';


import {
  TreeGridEvents
} from '../enums/index';

import {
  TreeGridEventInterface
} from '../interfaces/index';

@Injectable()
export class TreeGridEventsService {

  dataViewRowsChange$: Observable<any>;

  private _dataViewRowsObserver: Observer<any>;

  constructor(private _nodeService: TreeGridNodeService) {
    this.dataViewRowsChange$ = new Observable<any>(
      (observer: any) => this._dataViewRowsObserver = observer
    ).share();
  }

  init(grid: any, dataView: any, events: EventEmitter<any>) {
    if (grid && dataView && events) {
      grid.onClick.subscribe((e: any, args: any) => this.onGridCellClick(e, args, dataView, events));
      if (this._nodeService.dataView) {
        this._nodeService.dataView.onRowsChanged.subscribe((e: any, args: any) => this.onDataViewRowsChanged(e, args, grid));
      }
    }
  }

  onDataViewRowsChanged(e: any, args: any, grid: any): void {
    grid.invalidateRows(args.rows);
    grid.render();
    if (this._dataViewRowsObserver) {
      this._dataViewRowsObserver.next(e);
    }
  }

  onGridCellClick(e: any, args: any, dataView: any, events: EventEmitter<any>): void {
    let node: any = dataView.getItem(args.row),
      cssClass: string = this._parseTargetClass(e);
    if (cssClass) {
      switch (cssClass) {
        case 'expanded': {
          if (node) {
            this._nodeService.updateNode(node, node.selected, false);
          }
        }
          break;
        case 'collapsed': {
          if (node) {
            this._nodeService.updateNode(node, node.selected, true);
          }
        }
          break;
        case 'child-selected': {
          if (node) {
            this._nodeService.updateNode(node, false);
          }
        }
          break;
        case 'selected': {
          if (node) {
            this._nodeService.updateNode(node, false, false);
            this._nodeService.updateNodeChildren(node, false);
          }
        }
          break;
        case 'unselected': {
          if (node) {
            this._nodeService.updateNode(node, true, true);
            if (node.bubbleSelect) {
              this.bubbleSelect(node, events);
            }
          }
        }
          break;
        case 'child-unselected': {
          if (node) {
            this._nodeService.updateNode(node, true);
          }
        }
          break;
        case 'request-children': {
          if (node) {
            this.requestChildren(node, events);
          }
        }
          break;
        case 'select-children': {
          if (node) {
            this._nodeService.updateNodeChildren(node, true);
          }
        }
          break;

        case 'unselect-children': {
          if (node) {
            this._nodeService.updateNodeChildren(node, false);
          }
        }
          break;

      }
    }
  }

  requestChildren(node: any, events: EventEmitter<any>): void {
    events.emit(<TreeGridEventInterface>{
      type: TreeGridEvents.nodeRequest,
      data: [node]
    });
  }

  bubbleSelect(node: any, events: EventEmitter<any>): void {
    events.emit(<TreeGridEventInterface>{
      type: TreeGridEvents.selectBubble,
      data: node
    });
  }

  private _parseTargetClass(e: any): string {
    let srcElement: any = e && e.target ? e.target : null,
      cssClassAttributeValue: string = srcElement ? srcElement.getAttribute('class') : null,
      cssClasses: string[] = cssClassAttributeValue ? cssClassAttributeValue.split(' ') : null;
    return cssClasses && cssClasses.length ? cssClasses.pop() : null;
  }

}
