declare let _: any;
export class AcmeGridColumnsService {

  columns: any[];

  constructor() {
    this.columns = [];
  }

  transform(columns: any[]): any[] {
    if (!columns) {
      columns = [];
    }
    if (columns.length > 0) {
      columns = columns.map((column: any, index: number) => {
        return this.transformColumn(
          column,
          index);
      });
    }

    return columns;
  }

  private transformColumn(column: any, index: number): any {
    column = Object.assign({}, column);
    column.id = column.field;
    column.index = index;

    if (!column.formatter) {
      column.formatter = this.columnFormatter;
    }

    column.width = 200;

    return column;
  }

  private columnFormatter(row: any, cell: any, value: any, columnDef: any, data: any): string {
    let indent: string = '<span style="display:inline-block;height:1px;width:' + (25 * data.indent || 0) + 'px"></span>',
      childIndent: string = '<span style="display:inline-block;height:1px;width:' + (15 * data.indent || 0) + 'px"></span>';
    if (data.children && data.children.length > 0) {
      if (data.expanded === true || row.expanded) {
        if (data.selected === true || row.selected) {
          value = indent + '<span class="slick-group-toggle tree-toggle expanded"></span><span class="slick-group-toggle tree-toggle selected"></span>' + value;
        } else {
          value = indent + '<span class="slick-group-toggle tree-toggle expanded"></span><span class="slick-group-toggle tree-toggle unselected"></span>' + value;
        }
      } else {
        if (data.selected === true || row.selected) {
          value = indent + '<span class="slick-group-toggle tree-toggle collapsed"></span><span class="slick-group-toggle tree-toggle selected"></span>' + value;
        } else {
          value = indent + '<span class="slick-group-toggle tree-toggle collapsed"></span><span class="slick-group-toggle tree-toggle unselected"></span>' + value;
        }
      }
    } else {
      if (data.selected === true || row.selected) {
        value = indent + childIndent + '<span class="slick-group-toggle child-selected"></span>' + value;
      } else {
        value = indent + childIndent + '<span class="slick-group-toggle child-unselected"></span>' + value;
      }
    }
    return value;
  }

}
