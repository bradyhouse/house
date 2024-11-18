import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import {Board} from './board.model';
import {Row} from './row.model';
import {Square} from './square.model';
import {Utils} from '../../common/utils.common';
import {StateServiceInterface} from '../state/state-service.interface';
import {DatabaseServiceInterface} from '../database/database-service.interface';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';


@Injectable()
export class BoardService {

  boardChange$: Observable<Board>;

  private _board: Board;
  private _boardObserver: Observer<Board>;
  private _emptySquare: Square;

  database: DatabaseServiceInterface;

  set board(board: Board) {
    if (this._board.toString() !== board.toString()) {
      this._board = board;
      if (this._boardObserver) {
        this._boardObserver.next(board);
      }
    }
  }

  get board(): Board {
    return this._board;
  }

  get emptySquare(): Square {
    return this._emptySquare;
  }

  set emptySquare(value: Square) {
    this._emptySquare = value;
  }

  constructor() {
    this.database = null;
    this._board = new Board();
    this.boardChange$ = new Observable<Board>(
      (observer: any) => this._boardObserver = observer
    ).share();
  }

  init(stateService: StateServiceInterface, model: Board = null) {

    let board: Board = model ? new Board(model.rowCount, model.colCount, model.isSolved, model.sequence, model.expectedSequence) : null;

    if (stateService && stateService.databaseService) {
      this.database = stateService.databaseService;
    }
    if (board) {
      board.squares = this.transform(board);
      this.board = board;
    }
  }

  sequence(model: Board, expect: boolean = false): number[] {
    let min: number = 1,
      rows: number = model ? model.rowCount : null,
      cols: number = model ? model.colCount : null,
      max: number = rows && cols ? rows * cols : 0,
      seq: number[] = [];

    if (max > 0) {
      if (!expect) {
        seq = Utils.generateSequence(min, max, max);
      } else {
        seq = Utils.generateSequentialSequence(min, max);
      }
    }

    return seq;

  }

  transform(model: Board): Square[] {
    let row: number = 1,
      i: number = 1,
      pos: number = 0,
      rows: number = model.rowCount,
      cols: number = model.colCount,
      isSolved: boolean = model.isSolved,
      seq: number[] = model.sequence && model.sequence.length ? model.sequence : this.sequence(model),
      expectedSeq: number[] = model.expectedSequence && model.expectedSequence.length ? model.expectedSequence :
        this.sequence(model, true),
      subSeq: number[] = [],
      expectedSubSeq: number[] = [],
      store: Row[] = [];

    for (; row <= rows; row++) {
      if (isSolved) {
        subSeq = Utils.parseSubSequence(expectedSeq, pos, cols);
      } else {
        subSeq = Utils.parseSubSequence(seq, pos, cols);
      }
      expectedSubSeq = Utils.parseSubSequence(expectedSeq, pos, cols);

      store.push(<Row>{
        index: i,
        isLast: row === rows ? true : false,
        seq: subSeq,
        expectedSeq: expectedSubSeq
      });
      i++;
      pos += cols;
    }

    return this.transformStore(store);
  }

  transformStore(store: Row[]): Square[] {
    let squares: Square[] = [],
      emptySquares: Square[] = [];
    store.forEach((row: Row) => {
      if (row.seq && row.expectedSeq && row.seq.length === row.expectedSeq.length) {
        row.seq.forEach((num, i) => {
          let colClass: string = Utils.mapColClass(num),
            squareValue: number = i < (row.seq.length - 1) || (i < row.seq.length && !row.isLast) ? num : null,
            squareIsEmpty: boolean = squareValue ? false : true,
            squareClass: string = squareValue ? 'btn ' + colClass : 'btn empty',
            squareExpectedValue: number = row.expectedSeq[i],
            squareId: string = 'row-' + row.index + '-square-' + squareExpectedValue,
            squareRow: number = row.index,
            squareCol: number = i,
            squareOptions: Square = this.isSquarePersisted(squareId) ? this.restoreSquareOptions(squareId) :
              <Square>{
                id: squareId,
                isEmpty: squareIsEmpty,
                row: squareRow,
                col: squareCol,
                value: String(i),
                expectedValue: String(squareExpectedValue),
                cssClass: squareClass
              };
          squares.push(squareOptions);
        });
      }
    });

    emptySquares = squares.filter((square: Square) => {
      return square.isEmpty;
    });

    if (emptySquares.length) {
      this.emptySquare = emptySquares[0];
    }

    if (this.emptySquare) {
      console.log('emptySquare');
      console.log(JSON.stringify(this.emptySquare));
    }

    return squares;
  }

  isSquarePersisted(id: string): boolean {
    let databaseService: DatabaseServiceInterface = this.database;
    if (databaseService) {
      return databaseService.exists(id);
    }
    return false;
  }

  restoreSquareOptions(id: string): Square {
    let databaseService: DatabaseServiceInterface = this.database,
      squareState: Square = null;
    if (databaseService) {
      squareState = databaseService.pull(id);
    }
    return squareState;
  }

  unPersist(): void {
    let databaseService: DatabaseServiceInterface = this.database;

    if (databaseService) {
      databaseService.zero('row');
    }
  }

  persist(options: Square = null): void {
    let databaseService: DatabaseServiceInterface = this.database;
    if (databaseService) {
      if (options) {
        databaseService.push(options.id, options);
      } else {
        if (this.board && this.board.squares) {
          this.board.squares.forEach((square: Square) => {
            this.persist(square);
          });
        }
      }
    }
  }

  slide(left: boolean, square: Square, reps: number) {
    for (var i = 0; i < reps; i++) {
      this.shiftX(left, square);
    }
  }

  shiftX(left: boolean = false, square: Square): void {
    let squareIndices: number[] = [],
        emptySquareIndices: number[] = [];

    if (this.board && this.board.squares && this.board.squares.length) {
      this.board.squares.forEach((s: Square, index: number) => {
        if (s.row === square.row) {
          squareIndices.push(index);
        }
      });
      if (squareIndices.length === 8) {
        if (left) {
          Utils.swap(this.board.squares[squareIndices[0]], this.board.squares[squareIndices[1]]);
          Utils.swap(this.board.squares[squareIndices[1]], this.board.squares[squareIndices[2]]);
          Utils.swap(this.board.squares[squareIndices[2]], this.board.squares[squareIndices[3]]);
          Utils.swap(this.board.squares[squareIndices[3]], this.board.squares[squareIndices[4]]);
          Utils.swap(this.board.squares[squareIndices[4]], this.board.squares[squareIndices[5]]);
          Utils.swap(this.board.squares[squareIndices[5]], this.board.squares[squareIndices[6]]);
          Utils.swap(this.board.squares[squareIndices[6]], this.board.squares[squareIndices[7]]);
        } else {
          Utils.swap(this.board.squares[squareIndices[7]], this.board.squares[squareIndices[6]]);
          Utils.swap(this.board.squares[squareIndices[6]], this.board.squares[squareIndices[5]]);
          Utils.swap(this.board.squares[squareIndices[5]], this.board.squares[squareIndices[4]]);
          Utils.swap(this.board.squares[squareIndices[4]], this.board.squares[squareIndices[3]]);
          Utils.swap(this.board.squares[squareIndices[3]], this.board.squares[squareIndices[2]]);
          Utils.swap(this.board.squares[squareIndices[2]], this.board.squares[squareIndices[1]]);
          Utils.swap(this.board.squares[squareIndices[1]], this.board.squares[squareIndices[0]]);
        }

        emptySquareIndices = squareIndices.filter((indice: number) => {
            return this.board.squares[indice].isEmpty;
        });

        if (emptySquareIndices.length) {
          this.emptySquare = this.board.squares[emptySquareIndices[0]];
        }
        this.persist();
      }
    }
  }
}
