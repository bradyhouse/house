import { Node } from './node';
import { NavBarCmds } from '../nav-bar/enums/index';

export interface Options {
  nodes: Node[];
  menuOptions?: NavBarCmds[];
  filter?: string;
}
