export interface TreeGridChangesInterface {
  /**
   * Tells if rows need to be updated.
   */
  rows?: boolean;

  /**
   * Tells if columns need to be updated.
   */
  columns?: boolean;

  /**
   * Tells if loader notification need to be updated.
   */
  loaderNotification?: boolean;
}
