import {TreeGridNodeInterface} from './tree-grid-node.interface';
import {TreeGridCmds} from '../enums/index';
import 'rxjs/add/operator/toPromise';

export interface TreeGridInterface {
  nodes: TreeGridNodeInterface[];
  nodesRequest?: Promise<any>;
  nodesUpdate?: Promise<any>;
  filter?: string;
  macro?: TreeGridCmds;
  height?: number;
}
