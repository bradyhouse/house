export interface TreeGridColumnInterface {
  /**
   * The key which will be used to fetch data for each row.
   */
  field?:string;

  /**
   * Descriptive identifier of the column that will be used for reference only. (Not used in actual grid rendering)
   */
  id?:string;

  /**
   * The name which will be displayed for the column.
   */
  name?:string;

  /**
   * The description of the column.  Used for columns that don't have a name.
   */
  description?:string;

  /**
   * Default content to be displayed if nothing is passed.
   */
  defaultContent?:string;

  /**
   * The type of the data which will be used to apply appropriate formatting.
   */
  dataType?:TreeGridColumnDataTypeEnum;

  /**
   * Number of decimal places to format the value. It works only if dataType is set to number.
   */
  decimalPlaces?:number;

  /**
   * The order of the groups.
   */
  rowGroupIndex?:number;

  /**
   * Allows you to change what the cell will render.
   */
  formatter?:Function;

  /**
   * Pins/freezes a column so that it is always in view.
   */
  pinned?:TreeGridColumnPinnedEnum;

  /**
   * If column reorder is enabled, this will disable it for the specific column.
   */
  fixed?:boolean;

  /**
   * Disables sorting.
   */
  sortable?:boolean;

  /**
   * Disables filtering.
   */
  searchable?:boolean;

  /**
   * Will hide the column.
   */
  hidden?:boolean;

  /**
   * Will not allow the user to hide the column.
   */
  disableHiding?:boolean;

  /**
   * Used to apply a class.
   */
  cssClass?:string;

  /**
   * Used for grouped columns under a parent column.
   */
  children?:TreeGridColumnInterface[];

  /**
   * Width of the column.
   */
  width?:number;

  /**
   * Minimum width of the column.
   */
  minWidth?:number;

  /**
   * Forces the width to be certain width, ignoring the auto-sizing.
   */
  forceWidth?:number;

  /**
   * Order of the column as it appears in the header.
   */
  index?:number;

  cellRenderer?:string;
}

export enum TreeGridColumnDataTypeEnum {
  /**
   * Numeric column.
   */
  Number,

  /**
   * Tree view group column.
   */
  Group
}

export enum TreeGridColumnPinnedEnum {
  /**
   * Pin to the left of the grid.
   */
  Left

}
