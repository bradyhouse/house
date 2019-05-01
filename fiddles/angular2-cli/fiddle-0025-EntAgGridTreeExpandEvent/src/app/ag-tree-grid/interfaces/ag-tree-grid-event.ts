import {
  AgTreeGridEvents
} from '../enums/index';

export interface AgTreeGridEvent {
  type: AgTreeGridEvents;
  data: any;
  gridState?: any;
}
