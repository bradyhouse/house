import {ToolbarStateEnum} from './toolbar-state.enum';
import {
  ActionsServiceInterface,
  StateServiceInterface
} from './../../index';

export interface ToolbarOptionsInterface {
  id: string;
  state: ToolbarStateEnum;
  actionService?: ActionsServiceInterface;
  stateService?: StateServiceInterface;
  isBack: boolean;
  toggleText?: string;
  toggleTitle?: string;
  backRouterLink?: string;
  backTitleText?: string;
  backText?:string;
}
