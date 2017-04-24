import { TreeGridColumnInterface } from './index';

export interface TreeGridOptionsInterface {
  /**
   * Data used to render the rows.
   */
  rows?: any[];

  /**
   * Ids of selected rows
   */
  selectedRows?: string[];

  /**
   * Data used to render the columns.
   */
  columns?: TreeGridColumnInterface[];

  /**
   * Used to save the state of the column such as order and width.
   */
  columnsState?: any[];

  /**
   * Enabled infinite scroll where the grid will display only a portion of the data and will load the rest via an
   * api when the users scrolls through the data.
   */
  isInfiniteScroll?: boolean;

  /**
   * When grouping is applied, it will make the group use the entire row.
   */
  isGroupUseEntireRow?: boolean;

  /**
   * Expands all children under each group.
   */
  isGroupDefaultExpanded?: boolean;

  /**
   * Will render a group column which will have tree-view navigation.
   * Data needs to have specific format for this option to work.
   */
  isTreeView?: boolean;

  /**
   * Will allow the user to select rows with a checkbox.
   */
  isCheckboxSelect?: boolean;

  /**
   * Will group the header columns based on the specified children.
   */
  isGroupColumns?: boolean;

  /**
   * Will allow the user to reorder columns with drag and drop.
   */
  isReorderColumns?: boolean;

  /**
   * The initial sort state of the grid.
   */
  sortColumn?:any;

  /**
   * List of hidden columns.
   */
  hiddenColumns?:string[];

  /**
   * Shows the columns menu where the user can toggle them on/off.
   */
  isColumnsMenu?:boolean;

  /**
   * Display a red error message instead of the content.
   */
  error?:string;

  /**
   * Displays a black notification instead of the content
   */
  notification?:string;

  /**
   * Displays a loader icon while the data is being loaded.
   */
  isLoading?:boolean;
}
