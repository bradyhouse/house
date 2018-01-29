import {
  TreeGridEvents
} from '../enums/index';

export interface TreeGridEventInterface {
  type: TreeGridEvents;
  data: any;
}
