import { NavBarEvents, NavBarCmds } from '../enums/index';
export interface NavBarEvent {
  event?: NavBarEvents;
  cmd?: NavBarCmds;
  data?: any;
}
