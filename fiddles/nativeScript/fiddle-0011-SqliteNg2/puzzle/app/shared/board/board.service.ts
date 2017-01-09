import { Injectable }             from '@angular/core';
import {Observable}               from 'rxjs/Observable';
import {Observer}                 from 'rxjs/Observer';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { Config }                   from "../config";
import { Board }                    from "./board";
import { Square }                   from "./square";
import { SharedUtils }              from "../shared-utils";

@Injectable()
export class BoardService {

    gameBoardChange$:Observable<Board>;

    private _gameBoard:Board;
    private _gameBoardObserver:Observer<Board>;

    set gameBoard(board:Board) {
        if (this._gameBoard !== board) {
            this._gameBoard = board;
            if (this._gameBoardObserver) {
                this._gameBoardObserver.next(board);
            }
        }
    }

    get gameBoard():Board {
        return this._gameBoard;
    }

    private _emptySquare:Square;

    set emptySquare(square:Square) {
      if(this._emptySquare !== square) {
        this._emptySquare = square;
      }
    }

    get emptySquare():Square {
      return this._emptySquare;
    }

    private _startingSequence:number[];

    set startingSequence(sequence:number[]) {
        if (this._startingSequence!== sequence) {
            this._startingSequence = sequence;
        }
    }

    get startingSequence():number[] {
        return this._startingSequence;
    }



    constructor() {
        this.gameBoardChange$ = new Observable<Board>(
            (observer:any) => this._gameBoardObserver = observer
        ).share();
    }


    initBoard(cols: number, rows: number) {
        let board = new Board(),
            range:number = cols * rows,
            lastRow:number = rows - 1,
            lastCol:number = cols - 1,
            col:number = 0,
            row:number = 0,
            squareCount:number = range - 1,
            buttonId:string = null,
            buttonCls:string = null,
            i:number = 0,
            expectedValue:number = 0,
            value:number = 0,
            square:Square = null;

        try {
            this.startingSequence = SharedUtils.generateGameSequence(1, squareCount, squareCount);

            for (; row < rows; row++) {
                for (; col < cols; col++) {
                    buttonId = 'b' + (i + 1);
                    buttonCls = buttonId + 'Cls';
                    expectedValue = i + 1;
                    value = this.startingSequence[i];
                    square = new Square();
                    square.id = buttonId;
                    square.row = row;
                    square.col = col;
                    square.value = ""+value;
                    square.expectedValue = ""+expectedValue;
                    square.class = i < squareCount ? value === expectedValue ? 'correct' : 'incorrect' : buttonCls;
                    if (i < squareCount) {
                      this.printSquare(i, square);
                      board.squares.push(square);
                      i++;
                    }
                }
                col = 0;
            }

            buttonId = 'b' + range;
            buttonCls = buttonId + 'Cls';
            square = new Square();
            square.id = buttonId;
            square.row = lastRow;
            square.col = lastCol;
            square.value = '  ';
            square.expectedValue = '  ';
            square.class = buttonCls;
            this.printSquare(i++, square);
            board.squares.push(square);
            this.gameBoard = board;
        } catch (err) {
            this.handleErrors(err);
        }
    }

    private handleErrors(error: Response):any {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }

    private printSquare(i:number, square:Square):void {
        console.log('Square' + (i + 1) + ' = { id: ' + square.id + ', row: ' + square.row + ', col: ' + square.col + ', value: ' + square.value + ', ' + square.expectedValue + ', class: ' + square.class + ' }');
    }
}
