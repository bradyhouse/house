import {EventEmitter} from '@angular/core';
import {RowOptionsInterface} from './row-options.interface';
import {SquareOptionsInterface, SquareComponent} from '../index';
import {RowComponent} from './row.component';


export interface RowInterface {
  options: RowOptionsInterface;
  squares: SquareOptionsInterface[];
  emptySquare: SquareOptionsInterface;
  squareClick: EventEmitter<[RowComponent, SquareOptionsInterface]>;
  leftClick: EventEmitter<RowComponent>;
  rightClick: EventEmitter<RowComponent>;
  shift(left: boolean): void;
  persist(): void;
}
