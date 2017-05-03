export class AcmeGridRowsService {
  rows: any[];

  constructor() {
    this.rows = [];
  }

  transform(rows: any[], collapsed: any[]): any[] {
    let flatRows: any[] = [],
      ids: any = {};


    if (!rows) {
      rows = [];
    }

    rows.forEach((row: any) => {
      flatRows = this.flattenRows(row, flatRows, -1, 0, true);
    });

    rows = flatRows.map((row: any, index: number) => {
      row = Object.assign({}, row);
      row.id = index;
      if (ids[row.id]) {
        row.id += index;
      }
      ids[row.id] = true;
      row.order = index;
      row.expanded = false;
      row.selected = false;
      return row;
    });
    return rows;
  }

  private flattenRows(row: any, rows: any[], parent: number, indent: number, root: boolean = false): any[] {
    if (root) {
      rows.push(this.updateDescendant(row, parent, indent));
    }

    if (row && row.children) {
      parent = rows.length - 1;
      indent++;
      row.children.forEach((child: any, index: number) => {
        rows.push(this.updateDescendant(child, parent, indent));
        if (child.children) {
          this.flattenRows(child, rows, parent, indent);
        }
      });
    }

    return rows;
  }

  private updateDescendant(row: any, parent: number, indent: number): any {
    if (row) {
      row.id += parent + 1;
      row.parent = parent;
      row.indent = indent;
      row.selected = false;
    }
    return row;
  }


}
