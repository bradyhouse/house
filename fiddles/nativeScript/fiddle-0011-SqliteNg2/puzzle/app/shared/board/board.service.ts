import {Injectable}             from '@angular/core';
import {Observable}               from 'rxjs/Observable';
import {Observer}                 from 'rxjs/Observer';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import {Config}                   from "../config";
import {Board}                    from "./board";
import {Square}                   from "./square";
import {SharedUtils}              from "../shared-utils";

@Injectable()
export class BoardService {

  gameBoardChange$: Observable<Board>;

  private _gameBoard: Board;
  private _gameBoardObserver: Observer<Board>;

  set gameBoard(board: Board) {
    if (this._gameBoard !== board) {
      this._gameBoard = board;
      if (this._gameBoardObserver) {
        this._gameBoardObserver.next(board);
      }
    }
  }

  get gameBoard(): Board {
    return this._gameBoard;
  }

  get emptySquare(): Square {
    if (this._gameBoard && this._gameBoard.squares.length) {
      let matches: Square[] = this._gameBoard.squares.filter(function (square: Square) {
        return square.cssClass === 'empty';
      });
      if (matches && matches.length) {
        return matches[0];
      }
    }
    return null;
  }

  private _startingSequence: number[];

  set startingSequence(sequence: number[]) {
    if (this._startingSequence !== sequence) {
      this._startingSequence = sequence;
    }
  }

  get startingSequence(): number[] {
    return this._startingSequence;
  }

  constructor() {
    this.gameBoardChange$ = new Observable<Board>(
      (observer: any) => this._gameBoardObserver = observer
    ).share();
  }

  initBoard(cols: number, rows: number, title: string, level: number, moves: number, nextScreen: string) {
    try {
      let board = new Board(title, moves, level, nextScreen),
        range: number = cols * rows,
        lastRow: number = rows - 1,
        lastCol: number = cols - 1,
        col: number = 0,
        row: number = 0,
        squareCount: number = range - 1,
        buttonId: string = null,
        buttonCls: string = null,
        i: number = 0,
        expectedValue: number = 0,
        value: number = 0,
        square: Square = null;

      this.startingSequence = SharedUtils.generateGameSequence(1, squareCount, squareCount);

      for (; row < rows; row++) {
        for (; col < cols; col++) {
          buttonId = 'b' + (i + 1);
          buttonCls = buttonId + 'Cls';
          expectedValue = i + 1;
          value = this.startingSequence[i];
          square = new Square(buttonId,
            row,
            col,
            "" + value,
            "" + expectedValue,
            i < squareCount ? value === expectedValue ? 'square correct' : 'square incorrect' : buttonCls);

          if (i < squareCount) {
            this.printSquare(i, square);
            board.squares.push(square);
            i++;
          }
        }
        col = 0;
      }

      buttonId = 'b' + range;
      buttonCls = 'empty';
      square = new Square(buttonId, lastRow, lastCol, '  ', '  ', buttonCls);

      this.printSquare(i++, square);
      board.squares.push(square);
      this.gameBoard = board;
    } catch (err) {
      this.handleErrors(err);
    }
  }

  isValidMove(squareA: Square, squareB: Square): boolean {
    let rowDelta: number = Math.abs(squareA.row - squareB.row),
      colDelta: number = Math.abs(squareA.col - squareB.col),
      rc: boolean = false;
    this.printSquare(0, squareA);
    this.printSquare(1, squareB);
    if (squareA.row == squareB.row || squareA.col == squareB.col) {
      rc = (rowDelta == 0 || rowDelta == 1) && (colDelta == 0 || colDelta == 1);
    }
    return rc;
  }

  isEmpty(square: Square): boolean {
    return square.cssClass === 'empty' ? true : false;
  }

  moveSquare(squareA: Square, squareB: Square) {

    let newMoves:number = this._gameBoard.moves+1,
      newGameBoard: Board = new Board(this._gameBoard.title,
      newMoves,
      this._gameBoard.level,
      this._gameBoard.nextScreen);

    this._gameBoard.squares.map(function (square: Square) {
      if (square.row === squareA.row && square.col === squareA.col) {
        let newSquareA: Square = new Square(
          squareA.id,
          squareA.row,
          squareA.col,
          squareB.value,
          squareA.expectedValue,
          squareB.cssClass
        );

        if (newSquareA.cssClass !== 'empty') {
          if (newSquareA.value === newSquareA.expectedValue) {
            newSquareA.cssClass = 'square correct';
          } else {
            newSquareA.cssClass = 'square incorrect';
          }
        }
        newGameBoard.squares.push(newSquareA);

      } else if (square.row === squareB.row && square.col === squareB.col) {
        let newSquareB: Square = new Square(
          squareB.id,
          squareB.row,
          squareB.col,
          squareA.value,
          squareB.expectedValue,
          squareA.cssClass
        );

        if (newSquareB.cssClass !== 'empty') {
          if (newSquareB.value === newSquareB.expectedValue) {
            newSquareB.cssClass = 'square correct';
          } else {
            newSquareB.cssClass = 'square incorrect';
          }
        }

        newGameBoard.squares.push(newSquareB);
      } else {
        let newSquare: Square = new Square(
          square.id,
          square.row,
          square.col,
          square.value,
          square.expectedValue,
          square.cssClass
        )
        newGameBoard.squares.push(newSquare);
      }
    });
    this.gameBoard = newGameBoard;
  }

  isGameOver(): boolean {
    let moves: Square[] = this._gameBoard.squares.filter(function (square: Square) {
      return square.value === square.expectedValue;
    });
    return moves && moves.length === this._gameBoard.squares.length ? true : false;
  }

  private handleErrors(error: any): any {
    if (Config.isDev) {
      console.log(error);
    }
    return Observable.throw(error);
  }

  private printSquare(i: number, square: Square): void {
    if (Config.isDev) {
      console.log('Square' + (i + 1) + ' = { id: ' + square.id + ', row: ' + square.row + ', col: ' + square.col + ', value: ' + square.value + ', ' + square.expectedValue + ', class: ' + square.cssClass + ' }');
    }
  }
}
