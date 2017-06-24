import {ElementRef, Injectable} from '@angular/core';

declare let ResizeSensor: any;

@Injectable()
export class TreeGridResizeService {
  private _resizeSensor: any;
  private _resizeTimeout: any;

  init(element: ElementRef, grid: any, table: ElementRef) {
    this.resize(grid, table);
    this._resizeSensor = new ResizeSensor(element, () => {
      this.resize(grid, table);
    });
  }

  resize(grid: any, table: ElementRef) {
    if (this._resizeTimeout) {
      clearTimeout(this._resizeTimeout);
    }

    this._resizeTimeout = setTimeout(() => {
      if (grid) {
        grid.resizeCanvas();
        let columns: any[] = grid.getColumns();
        this._stretchColumns(columns, table);
        grid.setColumns(columns);
        columns = null;
      }
    }, 132);
  }

  private _stretchColumns(columns: any[], table: any) {
    let totalWidth: number = this._calculateTotalWidth(columns);
    let panelWidth: number = table.offsetWidth - 18;
    if (totalWidth < panelWidth) {
      let addition: number = (panelWidth - totalWidth) / columns.length;
      let padding: number = 0;
      columns.forEach((column: any) => {
        column.width += addition + padding;
        padding = 0;
      });
    }
  }

  private _calculateTotalWidth(columns: any[]): number {
    let width: number = 0;
    columns.forEach((column: any) => {
      width += column.width;
    });
    return width;
  }

}
