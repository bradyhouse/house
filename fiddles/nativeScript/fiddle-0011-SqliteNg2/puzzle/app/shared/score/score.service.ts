const Sqlite = require('nativescript-sqlite'),
    frame = require('ui/frame'),
    dbFile = 'highscore.db';

import { Injectable }             from '@angular/core';
import {Observable}               from 'rxjs/Observable';
import {Observer}                 from 'rxjs/Observer';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { Score } from './score';
import { Sql } from './sql';

@Injectable()
export class ScoreService {

    highScoreChange$:Observable<Score>;

    private _dbName:string;
    private _dbFile:string;
    private _dbPromise:any;
    private _highScore:Score;
    private _highScoreObserver:Observer<Score>;

    set highScore(score:Score) {
        if (this._highScore !== score) {
            this._highScore = score;
            if (this._highScoreObserver) {
                this._highScoreObserver.next(score);
            }
        }
    }

    get highScore():Score {
        return this._highScore;
    }


    constructor() {
        this.highScoreChange$ = new Observable<Score>(
            (observer:any) => this._highScoreObserver = observer
        ).share();
        this._dbFile = this._dbName = dbFile;
    }

    connect(fn:Function, scope:any) {
      this.consoleLogMsg('score.service', 'connect');
      if (!Sqlite.exists(this._dbFile)) {
        Sqlite.copyDatabase(this._dbFile);
      }
      this._dbPromise = new Sqlite(this._dbName, (err:any, dbConnection:any) => {
        if (err) {
          this.handleErrors(err);
        } else {
          dbConnection.resultType(Sqlite.RESULTSASOBJECT);
          if (typeof fn === 'function') {
            if (scope) {
              fn.apply(scope, [dbConnection]);
            } else {
              fn(dbConnection);
            }
          }
          dbConnection.close();
        }
      });
    }

    insert(db:any, record:Score, fn:Function, scope:any) {
      this.consoleLogMsg('score.service', 'insert');
      let rs = null;
      if (db) {
        db.execSQL(Sql.insertHighScore, [record.id, record.user, record.time, record.moves, record.level], (err:any, rs:any) => {
          if (err) {
            this.handleErrors(err);
          } else {
            this.consoleLogRecord(record.id, record);
            if (typeof fn === 'function') {
              if (scope) {
                fn.apply(scope, [record]);
              } else {
                fn(record);
              }
            }
          }
        });
      } else {
        if (typeof fn === 'function') {
          if (scope) {
            fn.apply(scope, [null]);
          } else {
            fn(null);
          }
        }
      }
    }

    select(db:any, fn:Function, scope:any) {
      this.consoleLogMsg('score.service', 'select');

      let scores:Score[] = [];

      if (db) {
        db.resultType(Sqlite.RESULTSASOBJECT);
        db.valueType(Sqlite.VALUESARENATIVE);
        db.all(Sql.selectHighScore, (err:any, items:any[]) => {
          if (err) {
            this.handleErrors(err);
          } else {
            if (items && items.length) {
              items.forEach((item:any, index:number) => {
                let score:Score = new Score();
                score.id = item.hasOwnProperty('id') ? +(item.id) : 1,
                score.user = item.hasOwnProperty('user') ? item.user : null,
                score.time = item.hasOwnProperty('time') ? item.time : null,
                score.moves = item.hasOwnProperty('moves') ? +(item.moves) : 0,
                score.level = item.hasOwnProperty('level') ? +(item.level) : 1,
                score.cssClass = score.id % 2 === 0 ? 'highScoreEven' : 'highScoreOdd';
                this.consoleLogRecord(index, score);
                scores.push(score);
              });
            }
            if (typeof fn === 'function') {
              if (scope) {
                fn.apply(scope, [scores]);
              } else {
                fn(scores);
              }
            }
          }
        });
      } else {
        if (typeof fn === 'function') {
          if (scope) {
            fn.apply(scope, [null]);
          } else {
            fn(null);
          }
        }
      }
    }

    private handleErrors(error: any):any {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }

    private consoleLogMsg(tag:string, msg:string):void {
        console.log(tag + ': ' + msg);
    }

    private consoleLogRecord(i, model:Score) {
        console.log('high score #' + i + ' = { id: ' + model.id + ', user: ' + model.user + ', time: ' + model.time + ', moves: ' + model.moves + ', level: ' + model.level + ' }');
    }

}
