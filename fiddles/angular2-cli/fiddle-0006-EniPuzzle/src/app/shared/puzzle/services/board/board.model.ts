import { Square } from './square.model';
import { ModelInterface } from '../../../model.interface';

export class Board implements ModelInterface {

  private _squares: Square[];

  get squares(): Square[] {
    return this._squares;
  }

  set squares(value: Square[]) {
    this._squares = value;
  }

  constructor(
    public rowCount: number = 0,
    public colCount: number = 0,
    public isSolved: boolean = false,
    public sequence: number[] = [],
    public expectedSequence: number[] = []
  ) {
    this._squares = [];
  }

  toString(): string {
    return '{ rows: ' + this.rowCount + ', cols: ' + this.colCount + ', isSolved: ' +
      this.isSolved + ', sequence: ' + JSON.stringify(this.sequence) +
      ', expectedSequence: ' + JSON.stringify(this.expectedSequence) +
      ', squares:' + this._squares.length + ' }';
  }

}
