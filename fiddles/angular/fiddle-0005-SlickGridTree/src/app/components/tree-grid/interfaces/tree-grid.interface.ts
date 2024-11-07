import {TreeGridNodeInterface} from './tree-grid-node.interface';
import {TreeGridCmds} from '../enums/index';
import 'rxjs/add/operator/toPromise';

export interface TreeGridInterface {

  /**
   * One required parameter defining the initial state of the tree.
   */
  nodes: TreeGridNodeInterface[];

  /**
   * Promise used to inject nodes into a childless node.  NOTE - a childless node one with an empty `children` collection.
   */
  nodesRequest?: Promise<any>;

  /**
   * Promise used to change the state of a specific node.
   */
  nodesUpdate?: Promise<any>;

  /**
   * parameter used to filter the tree using a specific criterial.
   */
  filter?: string;

  /**
   * parameter used to pass commands to the control.
   */
  macro?: TreeGridCmds;

  /**
   * Explicit height parameter.
   */
  height?: number;

  /**
   * Displays a notification if something is wrong with the data.
   */
  notification?: string;

}
