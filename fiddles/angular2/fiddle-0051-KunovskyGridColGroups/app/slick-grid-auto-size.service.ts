declare let _:any;

export class SlickGridAutoSizeService {
    table:any;
    grid:any;

    autoSizeColumns() {
        if (this.grid && this.table) {
            let columns: any[] = this.grid.getColumns();
            this.resizeColumnsToFitText(columns);
            this.resizeColumnsToFillPanel(columns);
            this.grid.setColumns(columns);
            columns = null;
        }
    }

    autoSizeColumnsForRow(row:any) {
        if (this.grid && row) {
            let columns:any[] = this.grid.getColumns();
            columns.forEach((column:any) => {
                let value:any = row[column.field];
                if (column.formatter) {
                    value = column.formatter(null, null, value, column, row);
                }
                if(this.table) {
                    let actualWidth:number = this.getTextWidth(this.table, value);
                    if (!column.forceWidth && column.width < actualWidth) {
                        column.width = column.forceWidth = actualWidth;
                    }
                }
                value = null;
            });
            this.grid.setColumns(columns);
            columns = null;
        }
    }

    private getTextWidth(table:HTMLElement, value:string):number {
        let dummyContainer = document.createElement('span');
        dummyContainer.className = 'slick-cell';
        dummyContainer.innerHTML = value;
        table.appendChild(dummyContainer);
        let width:number = dummyContainer.offsetWidth;
        table.removeChild(dummyContainer);
        dummyContainer = null;
        return width;
    }

    private resizeColumnsToFitText(columns:any[]) {
        let headers:any[] = this.table.getElementsByClassName('slick-column-name');
        Array.prototype.forEach.call(headers, (header:any) => {
            let column:any = _.find(columns, {name: header.textContent});
            if (column && !column.forceWidth) {
                column.width = header.offsetWidth + 30;
            }
            column = null;
        });
        headers = null;
    }

    private resizeColumnsToFillPanel(columns:any[]) {
        let totalWidth:number = this.calculateTotalWidth(columns);
        let panelWidth:number = this.table.offsetWidth - 18;
        if (totalWidth < panelWidth) {
            let addition:number = (panelWidth - totalWidth) / columns.length;
            let padding:number = 0;
            columns.forEach((column:any) => {
                if (column.forceWidth) {
                    padding += addition;
                } else {
                    column.width += addition + padding;
                    padding = 0;
                }
            });
        }
    }

    private calculateTotalWidth(columns:any[]):number {
        let width:number = 0;
        columns.forEach((column:any) => {
            width += column.width;
        });
        return width;
    }
}
