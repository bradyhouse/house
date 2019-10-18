
import {RowNode, ColDef, BarChartOptions as AgBarChartOptions } from 'ag-grid-community';

//#region Interfaces

//#region Event Interface

export interface BarChartEvent {
  /**
   * The type of event.
   */
  type?: string | number;

  /**
   * Data that is emitted.
   */
  data?: any;
}

//#endregion

//#region Options Interface

export interface BarChartOptions {

  /**
   * Required string used to locate the chart instance in the DOM. Can
   * be used for automated testing access.
   */
  id: string;

  /**
   * agGrid Column schema.
   *
   * See ag-grid's ColDef entity class
   * {@link
    * https://github.com/ag-grid/ag-grid/blob/master/packages/ag-grid-community/src/ts/entities/colDef.ts|
    * AgGrid ColDef Entity Class
   */
  columns?: ColDef[];

  /**
   * agGrid RowNode collection.
   *
   * See ag-grid's RowNode entity class
   * {@link
    * https://github.com/ag-grid/ag-grid/blob/master/packages/ag-grid-community/src/ts/entities/rowNode.ts|
    * AgGrid RowNode Entity Class
   */
  rows?: RowNode[];

  /**
   * Chart Options Overrides
   *
   * See ag-grid's BarChartOptions Interface
   * {@link
   * https://github.com/ag-grid/ag-grid/blob/master/packages/ag-grid-community/src/ts/interfaces/iChartOptions.ts|
   * AgGrid iChartOptions Interfaces}
   */
  chartOptions?: AgBarChartOptions;

}

//#endregion

//#endregion

//#region Enums

//#region Event Type Enum

export class BarChartEventTypeEnum {
  static seriesNodeClick: string = 'seriesNodeClick';
  static ready: string = 'ready';
}


//#endregion

//#region Grid Option Key Enum

/**
 * Enumeration of all options exposed and supported by the grid.
 */
export class BarChartOptionKeysEnum {
  static id:string = 'id';
  static columns:string = 'columns';
  static rows:string = 'rows';
  static chartOptions: string = 'chartOptions';
}

//#endregion

//#endregion
