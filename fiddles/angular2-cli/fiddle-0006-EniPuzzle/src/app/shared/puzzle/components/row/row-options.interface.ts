import {SquareOptionsInterface} from '../index';
import {StateServiceInterface} from './../../index';

export interface RowOptionsInterface {
  index: number;
  isLast: boolean;
  sequence: number[];
  expectedSequence: number[];
  emptySquare?: SquareOptionsInterface;
  stateService?: StateServiceInterface;
}
