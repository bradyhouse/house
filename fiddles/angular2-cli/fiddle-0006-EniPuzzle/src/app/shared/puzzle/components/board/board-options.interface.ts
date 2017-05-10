import {ActionsServiceInterface, StateServiceInterface} from './../../index';


export interface BoardOptionsInterface {
  id: string;
  rows: number;
  cols: number;
  sequence?: number[];
  expectedSequence?: number[];
  isSolved?: boolean;
  actionService?: ActionsServiceInterface;
  stateService?: StateServiceInterface;
}
