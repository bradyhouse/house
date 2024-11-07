export interface Events {
  /**
   * The type of event.
   */
  type?: string | number;

  /**
   * Data that is emitted.
   */
  data?: any;

  /**
   * grid state -- optional parameter used by ag-grid
   */
  gridState?: any;
}
