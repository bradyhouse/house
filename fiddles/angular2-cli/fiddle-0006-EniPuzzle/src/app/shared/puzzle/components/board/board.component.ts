import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

import {
  RowOptionsInterface,
  RowComponent, SquareOptionsInterface
} from '../index';
import {
  StateServiceInterface,
  DatabaseServiceInterface
} from '../../index';

import {BaseComponent} from '../base.component';
import {BoardInterface} from './board.interface';
import {BoardOptionsInterface} from './board-options.interface';
import {Utils, ActionsEnum} from '../../index';


@Component({
  moduleId: module.id,
  selector: 'pz-board',
  templateUrl: 'board.component.html',
  styleUrls: [
    'board.component.css',
  ],
})
export class BoardComponent extends BaseComponent implements BoardInterface, OnChanges {

  @Input() options: BoardOptionsInterface;

  rows: RowOptionsInterface[];

  private _emptySquare: SquareOptionsInterface;

  get database(): DatabaseServiceInterface {
    let stateService: StateServiceInterface = this.options &&
    this.options.hasOwnProperty('stateService') ? this.options.stateService : null;
    return stateService ? stateService.databaseService : null;
  }

  get emptySquare(): SquareOptionsInterface {
    let emptyRow: RowOptionsInterface[] = this.rows.filter((row: RowOptionsInterface) => {
        return row.hasOwnProperty('emptySquare') && row.emptySquare !== null;
      }),
      initEmptySquare: SquareOptionsInterface = emptyRow && emptyRow.length ? emptyRow[0].emptySquare : null;

    if (this._emptySquare) {
      return this._emptySquare;
    }
    return initEmptySquare;
  }

  set emptySquare(value: SquareOptionsInterface) {
    this._emptySquare = value;
  }

  constructor() {
    super();
    this.rows = [];
    this._emptySquare = null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.options) {
      if (!this.options.hasOwnProperty('isSolved')) {
        this.options.isSolved = false;
      }
      if (!this.options.hasOwnProperty('sequence')) {
        this.options.sequence = this.sequence(this.options);
      }
      if (!this.options.hasOwnProperty('expectedSequence')) {
        this.options.expectedSequence = this.sequence(this.options, true);
      }
      this.rows = this.transform(this.options);
      if (this.subscriptions.length === 0) {
        if (this.options.actionService) {
          this.subscriptions.push(this.options.actionService.actionChange$
            .subscribe(
              (action: any) => this.onActionChange(action)
            ));
        }
      }
    }
  }

  onRowSquareClick($event: any): void {
    let row: RowComponent = $event[0],
      a: SquareOptionsInterface = $event[1],
      b: SquareOptionsInterface = this.emptySquare ? this.emptySquare : null;
    if (row && a && b) {
      if (!a.isEmpty && Utils.isValidMove(a, b)) {
        Utils.swap(a, b);
        this.persist(a);
        this.persist(b);
        this.emptySquare = a;
      }
    }
  }

  onRowLeftClick(row: RowComponent): void {
    if (row.emptySquare !== null) {
      this.emptySquare = row.emptySquare;
    }
  }

  onRowRightClick(row: RowComponent): void {
    if (row.emptySquare !== null) {
      this.emptySquare = row.emptySquare;
    }
  }

  onActionChange(action: ActionsEnum): void {
    this.unPersist();

    switch (action) {
      case ActionsEnum.PLAY:
        this.options.isSolved = false;
        break;
      case ActionsEnum.SOLVE:
        this.options.isSolved = true;
        break;
    }
    setTimeout(() => {
      this.rows = this.transform(this.options);
    }, 100);

  }

  sequence(options: BoardOptionsInterface, expect: boolean = false): number[] {
    let min: number = 1,
      rows: number = options ? options.rows : null,
      cols: number = rows ? options.cols : null,
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

  transform(options: BoardOptionsInterface): RowOptionsInterface[] {
    let row: number = 1,
      i: number = 1,
      pos: number = 0,
      rows: number = options.rows,
      cols: number = options.cols,
      isSolved: boolean = options.isSolved,
      seq: number[] = options.sequence,
      expectedSeq: number[] = options.expectedSequence,
      subSeq: number[] = [],
      expectedSubSeq: number[] = [],
      store: RowOptionsInterface[] = [],
      stateService: StateServiceInterface = options.stateService;

    for (; row <= rows; row++) {
      if (isSolved) {
        subSeq = Utils.parseSubSequence(expectedSeq, pos, cols);
      } else {
        subSeq = Utils.parseSubSequence(seq, pos, cols);
      }
      expectedSubSeq = Utils.parseSubSequence(expectedSeq, pos, cols);

      store.push(<RowOptionsInterface>{
        index: i,
        isLast: row === rows ? true : false,
        sequence: subSeq,
        expectedSequence: expectedSubSeq,
        stateService: stateService
      });
      i++;
      pos += cols;
    }


    return store;
  }

  unPersist(): void {
    let databaseService: DatabaseServiceInterface = this.database;

    if (databaseService) {
      databaseService.zero('row');
    }
  }

  persist(options: SquareOptionsInterface): void {
    let databaseService: DatabaseServiceInterface = this.database;

    if (databaseService) {
      databaseService.push(options.id, options);
    }
  }

}
