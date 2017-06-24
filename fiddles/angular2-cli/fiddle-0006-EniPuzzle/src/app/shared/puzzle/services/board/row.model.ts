import { Square } from './square.model';



export class Row {

  constructor(
    public index: number,
    public isLast: boolean,
    public squares: Square[],
    public seq: number[],
    public expectedSeq: number[],
    public emptySquare: Square = null
  ){ }

}
