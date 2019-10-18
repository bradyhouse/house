
import {RowNode, ColDef} from 'ag-grid-community';

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
   */
  columns?: ColDef[];

  /**
   * agGrid RowNode collection.
   */
  rows?: RowNode[];

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
}

//#endregion

//#endregion
