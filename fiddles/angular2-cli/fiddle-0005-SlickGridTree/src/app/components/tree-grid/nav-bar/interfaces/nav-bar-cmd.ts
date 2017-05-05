import { NavBarEvents, NavBarCmds } from '../enums/index';

export interface NavBarCmd {
  text: string;
  event: NavBarEvents,
  cmd: NavBarCmds
}
