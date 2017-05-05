import {
  EventEmitter

} from '@angular/core';


export class EventsService {

  collapsedRows: string[];
  selectedRows: any[];
  columnFilters: any;
  dataView: any;
  grid: any;

  constructor() {
    this.collapsedRows = [];
    this.selectedRows = [];
    this.columnFilters = {};
  }

  init(grid: any, dataView: any, events: EventEmitter<any>) {

    this.grid = grid;
    this.dataView = dataView;

    grid.onClick.subscribe((e: any, args: any) => this.onGridCellClick(e, args, dataView));

    dataView.onRowCountChanged.subscribe((e: any, args: any) => this.onDataViewRowCountChanged(e, args, grid));

    dataView.onRowsChanged.subscribe((e: any, args: any) => this.onDataViewRowsChanged(e, args, grid));

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
    let row: any = dataView.getItem(args.row),
      cssClass: string = this.parseTargetClass(e);
    if (cssClass) {
      switch (cssClass) {
        case 'expanded': {
          if (row) {
            row = this.updateNode(row, row.selected, false);
            return dataView.updateItem(row.id, row);
          }
        }
        case 'collapsed': {
          if (row) {
            row = this.updateNode(row, row.selected, true);
            return dataView.updateItem(row.id, row);
          }
        }
        case 'child-selected': {
          if (row) {
            row = this.updateNode(row, false);
            return dataView.updateItem(row.id, row);
          }
        }
        case 'selected': {
          if (row) {
            row = this.updateNode(row, false, row.expanded);
            return dataView.updateItem(row.id, row);
          }
        }
        case 'unselected': {
          if (row) {
            row = this.updateNode(row, true, row.expanded);
            return dataView.updateItem(row.id, row);
          }
        }
        case 'child-unselected': {
          if (row) {
            row = this.updateNode(row, true);
            return dataView.updateItem(row.id, row);
          }
        }
      }
    }
  }

  clearSelectedRows(): void {
    if (this.selectedRows.length) {
      this.selectedRows.forEach((id:any) => {
        let row: any = this.dataView.getItemById(id);
        if (row) {
          row.selected = false;
          if (row.hasOwnProperty('children') && row.children.length) {
            row.expanded = false;
            if (this.collapsedRows[id]) {
              this.collapsedRows.splice(this.collapsedRows.indexOf(id), 1);
            }
          }
          this.dataView.updateItem(id, row);
        }
      });
      this.selectedRows = [];
    }
  }

  private updateNode(row: any, selected: boolean, expanded: boolean = false): any {
    this.selectRow(row, selected);
    if (row.children && row.children.length) {
      if (selected !== row.selected) {
        if (selected) {
          row.expanded = true;
        } else {
          row.expanded = false;
        }
      } else {
        row.expanded = expanded;
      }
      row.selected = selected;

      let index: number = this.collapsedRows.indexOf(row.id);
      if (expanded && index !== -1) {
        this.collapsedRows.splice(index, 1);
      } else {
        this.collapsedRows.push(row.id);
      }
      row.children.forEach((child: any) => {
        let childRow: any = this.dataView.getItemById(child.id);
        if (childRow) {
          childRow.selected = row.selected;
          this.selectRow(childRow, row.selected);
          this.dataView.updateItem(childRow.id, childRow);
        }
      });
    } else {
      let parentRow = this.dataView.getItemById(row.parent);
      row.selected = selected;
      if (parentRow) {
        if (selected) {
          parentRow.selected = true;
        } else {
          if (this.isOtherChildSelected(parentRow, row.id)) {
            parentRow.selected = true;
            this.selectRow(parentRow, true);
          } else {
            parentRow.selected = false;
            this.selectRow(parentRow, false);
          }
        }
        this.dataView.updateItem(parentRow.id, parentRow);
      }
    }
    return row;
  }

  private selectRow(row: any, state:boolean) {
    if (state) {
      if (!this.selectedRows[row.id]) {
        this.selectedRows.push(row.id);
      }
    } else {
      if (this.selectedRows[row.id]) {
        this.selectedRows.splice(this.selectedRows.indexOf(row.id), 1)
      }
    }
  }

  private isOtherChildSelected(row: any, skipId: number): boolean {
    let selectedChildren: any[] = row.children && row.children.length ?
      row.children.filter((child: any) => {
        let childRow = this.dataView.getItemById(child.id);
        return childRow && childRow.id !== skipId && childRow.selected;
      }) : null;

    return selectedChildren && selectedChildren.length ? true : false;

  }

  private parseTargetClass(e: any): string {
    let srcElement: any = e && e.srcElement ? e.srcElement : null,
      cssClassAttributeValue: string = srcElement ? srcElement.getAttribute('class') : null,
      cssClasses: string[] = cssClassAttributeValue ? cssClassAttributeValue.split(' ') : null;
    return cssClasses && cssClasses.length ? cssClasses.pop() : null;
  }

}
