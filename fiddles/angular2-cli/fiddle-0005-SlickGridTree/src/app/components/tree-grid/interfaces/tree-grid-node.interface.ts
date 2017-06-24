export interface TreeGridNodeInterface {
  /**
   * One required field for defining a tree node.
   */
  title: string;

  /**
   * Optional flag that can be used to disable the node's checkbox control. The flag is set to
   * true by default. Unless this flag is explicitly set to false on a given node, the node is rendered
   * with a checkbox.
   */
  selectable?: boolean;

  /**
   * Optional flag that can be used to override the default selection behavior. The flag is
   * false by default.  If explicitly set to true, when the selection state of a selectable node
   * having descendants changes, a select bubble event is triggered.  The consuming control
   * can then use custom logic to update the descendants.
   */
  bubbleSelect?: boolean;

  /**
   * Optional field that can be used to identify a node.
   */
  id?: string;

  /**
   * Optional field used to order trees in grid. This value must be unique and sequential.
   * Its assigned during the initial load and then whenever child nodes are appended.
   */
  order?: number;

  /**
   * Optional field used to uniquely identify a node regardless of its order (location)
   * in the grid.
   */
  guid?: string;

  /**
   * Optional field used to store the order id of the node's parent.
   */
  parent?: number;

  /**
   * Optional field used to store the guid of the node's parent.  This value is assigned
   * by the node load (and/or append) process.
   */
  parentGuid?: string;

  /**
   * Optional parameter defining how far to indent the node.  This value is assigned when the
   * node is added to the DOM.
   */
  indent?: number;

  /**
   * Optional field containing descendant nodes.
   */
  children?: any[];

  /**
   * Optional field indicating whether the node is expanded or collasped.
   */
  expanded?: boolean;

  /**
   * Optional field indicating whether node is selected.
   */
  selected?: boolean;

  /**
   * Optional flag when set to true, selecting the node will auto select all of it's children.
   */
  autoSelect?: boolean;

  /**
   * Optional property that can be used to store a custom model class.
   */
  model?: any;
}
