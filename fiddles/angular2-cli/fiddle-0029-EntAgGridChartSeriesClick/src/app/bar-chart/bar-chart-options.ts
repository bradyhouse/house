
import {RowNode, ColDef} from 'ag-grid-community';




export interface BarChartOptions {

  /**
   * Required string used to locate the chart instance in the DOM. Can
   * be used for automated testing access.
   */
  id: string;

  /**
   * agGrid Column schema.
   */
  columns?: ColDef[];

  /**
   * agGrid RowNode collection.
   */
  rows?: RowNode[];

}

//#region Grid Option Keys

/**
 * Enumeration of all options exposed and supported by the grid.
 */
export class BarChartOptionKeysEnum {
  static id:string = 'id';
  static columns:string = 'columns';
  static rows:string = 'rows';
}

//#endregion
