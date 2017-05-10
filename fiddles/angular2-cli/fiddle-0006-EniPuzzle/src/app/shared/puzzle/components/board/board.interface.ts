import {BoardOptionsInterface} from './board-options.interface';
import {RowOptionsInterface, RowComponent, SquareOptionsInterface} from '../index';
import {ActionsEnum, DatabaseServiceInterface,} from '../../index';

export interface BoardInterface {
  options: BoardOptionsInterface;
  readonly database: DatabaseServiceInterface;
  rows: RowOptionsInterface[];
  emptySquare: SquareOptionsInterface;
  onRowLeftClick(row: RowComponent): void;
  onRowSquareClick(row: RowComponent, square: SquareOptionsInterface): void;
  onActionChange(action: ActionsEnum): void;
  sequence(options: BoardOptionsInterface, expect: boolean): number[];
  transform(options: BoardOptionsInterface): RowOptionsInterface[];
  unPersist(): void;
  persist(options: SquareOptionsInterface): void;
}
