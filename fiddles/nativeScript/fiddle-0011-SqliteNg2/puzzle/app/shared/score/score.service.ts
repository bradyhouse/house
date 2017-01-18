const Sqlite = require('nativescript-sqlite');

import {List} from 'immutable';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer}   from 'rxjs/Observer';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';


import {Score} from './score';
import {ScoreSql} from './score.sql';
import {DbBaseService} from '../db-base.service';

@Injectable()
export class ScoreService extends DbBaseService {

  dataChange$: Observable<Score[]>;
  minMovesChange$: Observable<number>;
  levelChange$: Observable<number>;
  nextRowChange$: Observable<number>;

  private _nextId: number;
  private _nextRow: number;
  private _nextRowObserver: Observer<number>;
  private _data: List<Score>;
  private _dataObserver: Observer<Score[]>;
  private _minMoves: number;
  private _minMovesObserver: Observer<number>;
  private _level: number;
  private _levelObserver: Observer<number>;


  get nextRow(): number {
    return this._nextRow;
  }

  set nextRow(value: number) {
    this.consoleLogMsg('score.service', 'set nextRow');
    if (this._nextRow !== value) {
      this._nextRow = value;
      if (this._nextRowObserver) {
        this._nextRowObserver.next(value);
      }
    }
  }

  get nextId(): number {
    return this._nextId;
  }

  get data(): Score[] {
    return this._data.toArray();
  }

  set data(value: Score[]) {
    this.consoleLogMsg('score.service', 'set data');
    let list: List<Score> = List(value);
    this._data = list;
    if (this._dataObserver) {
      this._dataObserver.next(value);
    }
  }

  get minMoves(): number {
    return this._minMoves;
  }

  set minMoves(value: number) {
    if (this._minMoves != value) {
      this._minMoves = value;
      if (this._minMovesObserver) {
        this._minMovesObserver.next(value);
      }
    }
  }

  get level(): number {
    return this._level;
  }

  set level(value: number) {
    if (this._level !== value) {
      this._level = value;
      this.fetch(value);
      if (this._levelObserver) {
        this._levelObserver.next(value);
      }
    }
  }

  constructor() {
    super();

    this._data = List([]);
    this._minMoves = null;
    this._level = null;

    this.dataChange$ = new Observable<Score[]>(
      (observer: any) => this._dataObserver = observer
    ).share();

    this.minMovesChange$ = new Observable<number>(
      (observer: any) => this._minMovesObserver = observer
    ).share();

    this.levelChange$ = new Observable<number>(
      (observer: any) => this._levelObserver = observer
    ).share();

    this.nextRowChange$ = new Observable<number>(
      (observer: any) => this._nextRowObserver = observer
    ).share();

    this.subscriptions.push(this.databaseChange$
      .subscribe(
        (database: any) => this.onDatabaseChange(database)
      ));

  }

  truncate() {
    this.consoleLogMsg('score.service', 'truncate');
    if (this.database) {
      this.consoleLogMsg('score.service', ScoreSql.dropHighScore);
      this.database.execSQL(ScoreSql.dropHighScore)
        .then((err:any) => {
          if (err) {
            this.consoleLogMsg('score.service', 'ERROR: Attempt to drop the high_scores table failed.');
            return;
          }
          this.consoleLogMsg('score.service', ScoreSql.createHighScore);
          this.database.execSQL(ScoreSql.createHighScore)
            .then((err:any) => {
              if (err) {
                this.consoleLogMsg('score.service', 'ERROR: Attempt to create the high_scores table failed.');
                return;
              }
              this._data = List([]);
              this.fetch(this.level);
            });
        });
    }
  }

  insert(score: Score) {
    this.consoleLogMsg('score.service', 'insert');
    this.consoleLogRecord(0, score);
    if (this.database) {
      this.database.execSQL(ScoreSql.insertHighScore, [score.id, score.user, score.time, score.moves, score.level])
        .then((item: any) => {
          this.consoleLogRecord(0, item);
        });
    }
  }

  fetch(level: number) {
    this.consoleLogMsg('score.service', 'fetch');
    let scores: Score[] = [],
      row: number = 1;
    if (this.database) {
      this.database.all(ScoreSql.selectHighScore).then((items: any[]) => {
        if (items && items.length) {
          items.forEach((item: any, index: number) => {
            let score: Score = new Score(
              item.hasOwnProperty('id') ? +(item.id) : 1,
              item.hasOwnProperty('user') ? item.user : null,
              item.hasOwnProperty('time') ? item.time : null,
              item.hasOwnProperty('moves') ? +(item.moves) : 0,
              item.hasOwnProperty('level') ? +(item.level) : 1,
              item.hasOwnProperty('id') && +(item.id) % 2 === 0 ? 'highScoreEven' : 'highScoreOdd'
            );
            score.row = row;
            this.consoleLogRecord(index, score);
            scores.push(score);
            row++;
          });
          this.data = scores;
          this.calc();
        } else {
          this.minMoves = 0;
          this.data = [];
        }
      }, error => {
        this.consoleLogMsg("SELECT ERROR", error);
      });
    }

  }

  isHighScore(moves: number, level: number): boolean {
    this.consoleLogMsg('score.service', 'isHighScore');
    if (level === this.level && this.minMoves) {
      return moves < this.minMoves ? true : false;
    }
    return false;
  }

  calc() {
    this.calcMinMoves();
    this.calcNextId();
    this.calcNextRow();
  }

  onDatabaseChange(database: any) {
    this.consoleLogMsg('score.service', 'onDatabaseChange');
    if (database && this.level) {
      this.fetch(this.level);
    } else {
      this.consoleLogMsg('score.service', 'WARNING: No level set in the score service.');
    }
  }

  private calcMinMoves() {
    this.consoleLogMsg('score.service', 'calcMinMoves');
    let moves: number = 0;
    if (this._data.size > 0) {
      this._data.map((score: Score) => {
        if (moves === 0 || score.moves < moves) {
          moves = score.moves;
        }
      });
    }
    this._minMoves = moves;
  }

  private calcNextId() {
    this.consoleLogMsg('score.service', 'calcNextId');
    let id: number = 1;
    if (this._data.size > 0) {
      this._data.map((score: Score) => {
        if (score.id > id) {
          id = score.id;
        }
      });
      id++;
    }
    this._nextId = id;
    this.consoleLogMsg('score.service', 'nextId = ' + this.nextId);
  }

  private calcNextRow() {
    this.consoleLogMsg('score.service', 'calcNextRow');
    let row: number = 1;
    if (this._data.size > 0) {
      this._data.map((score: Score) => {
        if (score.row > row) {
          row = score.row;
        }
      });
      row++;
    }
    this.nextRow = row;
    this.consoleLogMsg('score.service', 'nextRow = ' + this.nextRow);
  }

}
