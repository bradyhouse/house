import {
  EventEmitter,
  Injectable
} from '@angular/core';

import {
  NodeService
} from './node.service';

@Injectable()
export class EventsService {

  constructor(
    private _nodeService: NodeService
  ) {}

  init(grid: any, dataView: any, events: EventEmitter<any>) {

    grid.onClick.subscribe((e: any, args: any) => this.onGridCellClick(e, args, dataView));

    this._nodeService.dataView.onRowCountChanged.subscribe((e: any, args: any) => this.onDataViewRowCountChanged(e, args, grid));

    this._nodeService.dataView.onRowsChanged.subscribe((e: any, args: any) => this.onDataViewRowsChanged(e, args, grid));

    grid.onSelectedRowsChanged.subscribe((e: any, args: any) => this.onGridSelectedRowsChanged(e, args, grid, events));

  }

  onGridSelectedRowsChanged(e: any, args: any, grid: any, events: EventEmitter<any>): void {
    let selectedData: any[] = [];
    args.rows.forEach((row: number) => {
      selectedData.push(grid.getDataItem(row));
    });
    events.emit({
      data: selectedData
    });
  }

  onDataViewRowsChanged(e: any, args: any, grid: any): void {
    grid.invalidateRows(args.rows);
    grid.render();
  }

  onDataViewRowCountChanged(e: any, args: any, grid: any): void {
    grid.updateRowCount();
    grid.render();
  }

  onGridCellClick(e: any, args: any, dataView: any): void {
    let node: any = dataView.getItem(args.row),
      cssClass: string = this._parseTargetClass(e);
    if (cssClass) {
      switch (cssClass) {
        case 'expanded': {
          if (node) {
            return this._nodeService.updateNode(node, node.selected, false);
          }
        }
        case 'collapsed': {
          if (node) {
            node = this._nodeService.updateNode(node, node.selected, true);
            return dataView.updateItem(node.id, node);
          }
        }
        case 'child-selected': {
          if (node) {
            node = this._nodeService.updateNode(node, false);
            return dataView.updateItem(node.id, node);
          }
        }
        case 'selected': {
          if (node) {
            node = this._nodeService.updateNode(node, false, node.expanded);
            return dataView.updateItem(node.id, node);
          }
        }
        case 'unselected': {
          if (node) {
            node = this._nodeService.updateNode(node, true, node.expanded);
            return dataView.updateItem(node.id, node);
          }
        }
        case 'child-unselected': {
          if (node) {
            node = this._nodeService.updateNode(node, true);
            return dataView.updateItem(node.id, node);
          }
        }
      }
    }
  }

  private _parseTargetClass(e: any): string {
    let srcElement: any = e && e.srcElement ? e.srcElement : null,
      cssClassAttributeValue: string = srcElement ? srcElement.getAttribute('class') : null,
      cssClasses: string[] = cssClassAttributeValue ? cssClassAttributeValue.split(' ') : null;
    return cssClasses && cssClasses.length ? cssClasses.pop() : null;
  }

}
