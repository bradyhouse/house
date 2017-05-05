import { NavBarCmds } from '../enums/nav-bar-cmds.enum';

export interface NavBarOptions {
  isDisabled?: boolean;
  filter?: string;
  commands?: NavBarCmds[];
}
