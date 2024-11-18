import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  private gridApi: any;
  private gridColumnApi: any;
  private newCount: number;

  private columnDefs: any[];
  private rowData: any[];
  private rowSelection: any;

  private style: { width: string; height: string };

  constructor() {
    this.newCount = 1;
    this.columnDefs = [
      {
        headerName: 'Make',
        field: 'make'
      },
      {
        headerName: 'Model',
        field: 'model'
      },
      {
        headerName: 'Price',
        field: 'price'
      },
      {
        headerName: 'Zombies',
        field: 'zombies'
      },
      {
        headerName: 'Style',
        field: 'style'
      },
      {
        headerName: 'Clothes',
        field: 'clothes'
      }
    ];
    this.rowData = [
      {
        make: 'Toyota',
        model: 'Celica',
        price: 35000,
        zombies: 'Elly',
        style: 'Smooth',
        clothes: 'Jeans'
      },
      {
        make: 'Ford',
        model: 'Mondeo',
        price: 32000,
        zombies: 'Shane',
        style: 'Filthy',
        clothes: 'Shorts'
      },
      {
        make: 'Porsche',
        model: 'Boxter',
        price: 72000,
        zombies: 'Jack',
        style: 'Dirty',
        clothes: 'Padded'
      }
    ];
    this.rowSelection = 'multiple';
  }

  getRowData() {
    var rowData: any[] = [];
    this.gridApi.forEachNode((node: any) => {
      rowData.push(node.data);
    });
    console.log('Row Data:');
    console.log(rowData);
  }

  clearData() {
    this.gridApi.setRowData([]);
  }

  onAddRow() {
    let newItem = this.createNewRowData();
    let res = this.gridApi.updateRowData({ add: [newItem] });
    this.printResult(res);
  }

  addItems() {
    let newItems = [this.createNewRowData(), this.createNewRowData(), this.createNewRowData()];
    let res = this.gridApi.updateRowData({ add: newItems });
    this.printResult(res);
  }

  addItemsAtIndex() {
    let newItems = [this.createNewRowData(), this.createNewRowData(), this.createNewRowData()];
    let res = this.gridApi.updateRowData({
      add: newItems,
      addIndex: 2
    });
    this.printResult(res);
  }

  updateItems() {
    let itemsToUpdate: any[] = [];
    this.gridApi.forEachNodeAfterFilterAndSort((rowNode: any, index: number) => {
      if (index >= 5) {
        return;
      }
      var data = rowNode.data;
      data.price = Math.floor(Math.random() * 20000 + 20000);
      itemsToUpdate.push(data);
    });
    var res = this.gridApi.updateRowData({ update: itemsToUpdate });
    this.printResult(res);
  }

  onInsertRowAt2() {
    var newItem = this.createNewRowData();
    var res = this.gridApi.updateRowData({
      add: [newItem],
      addIndex: 2
    });
    this.printResult(res);
  }

  onRemoveSelected() {
    var selectedData = this.gridApi.getSelectedRows();
    var res = this.gridApi.updateRowData({ remove: selectedData });
    this.printResult(res);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.stretchGrid(window.innerWidth, window.innerHeight);
    this.gridApi.sizeColumnsToFit();    
  }

  createNewRowData() {
    var newData = {
      make: 'Toyota ' + this.newCount,
      model: 'Celica ' + this.newCount,
      price: 35000 + this.newCount * 17,
      zombies: 'Headless',
      style: 'Little',
      clothes: 'Airbag'
    };
    this.newCount++;
    return newData;
  }

  printResult(res: any) {
    console.log('---------------------------------------');
    if (res.add) {
      res.add.forEach((rowNode: any) => {
        console.log('Added Row Node', rowNode);
      });
    }
    if (res.remove) {
      res.remove.forEach((rowNode: any) => {
        console.log('Removed Row Node', rowNode);
      });
    }
    if (res.update) {
      res.update.forEach((rowNode: any) => {
        console.log('Updated Row Node', rowNode);
      });
    }
  }

  onResize(event: any): void {
    this.stretchGrid(event.target.innerWidth, event.target.innerHeight);
  }

  stretchGrid(width: number, height: number): void {
    this.style = {
      width: width + 'px',
      height: (height - 70) + 'px'
    };
  }

}