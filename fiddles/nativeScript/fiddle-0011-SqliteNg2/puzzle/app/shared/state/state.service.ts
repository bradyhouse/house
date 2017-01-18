const Sqlite = require('nativescript-sqlite');


import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer}   from 'rxjs/Observer';

import {List} from 'immutable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import {StateSql} from './state.sql';
import {State} from './state';
import {DbBaseService } from '../db-base.service';
import {SharedUtils} from '../shared-utils';

@Injectable()
export class StateService extends DbBaseService {

  stateChange$: Observable<State[]>;

  private _state:List<State>;
  private _stateObserver: Observer<State[]>;

  get state(): State[] {
    return this._state.toArray();
  }

  set state(value: State[]) {
    let list: List<State> = List(value);
    this._state = list;
    if (this._stateObserver) {
      this._stateObserver.next(value);
    }
  }

  constructor() {
    super();

    this._state = List([]);

    this.stateChange$ = new Observable<State[]>(
      (observer: any) => this._stateObserver = observer
    ).share();

    this.subscriptions.push(this.databaseChange$
      .subscribe(
        (database: any) => this.onDatabaseChange(database)
      ));

  }

  onDatabaseChange(database:any) {
    this.consoleLogMsg('state.service', 'onDatabaseChange');
    this.fetch();
  }

  fetch() {
    this.consoleLogMsg('state.service', 'fetch');
    let data: State[] = [];

    if (this.database) {
      this.database.all(StateSql.selectAll).then((items: any[]) => {
        if (items && items.length) {
          items.forEach((item: any, index: number) => {
            let state: State = new State(
              item.hasOwnProperty('id') ? +(item.id) : 1,
              item.hasOwnProperty('key') ? item.key : null,
              item.hasOwnProperty('value') ? item.value : null
            );
            this.consoleLogRecord(index, state);
            data.push(state);
          });
          this.state = data;
        } else {
          let state = new State(
            0,
            'level',
            '1'
          );
          this.state = [state];
        }
      }, error => {
        this.consoleLogMsg('state.service', 'fetch error: ' + error);
      });
    }
  }

  updateLevel(level: number) {
    this.consoleLogMsg('state.service', 'updateLevel');
    if (this.database) {
      this.database.execSQL(StateSql.updateLevel, [level])
        .then((item: any) => {
          this.consoleLogRecord(0, item);
          this.fetch();
        });
    }
  }

  truncate(): void {
    this.consoleLogMsg('state.service', 'truncate');
    if (this.database) {
      this.database.execSQL(StateSql.dropTable)
        .then((err: any) => {
          if (err) {
            this.consoleLogMsg('state.service', 'ERROR: Attempt to drop the config table failed.');
            return;
          }
          this.database.execSQL(StateSql.createTable)
            .then((err: any) => {
              if (err) {
                this.consoleLogMsg('state.service', 'ERROR: Attempt to create the config table failed.');
                return;
              }
              this._state = List([]);
              this.fetch();
            });
        });
    }
  }

  getKeyValue(key:string): any {
    this.consoleLogMsg('state.service', 'getKeyValue');
    let arr:any[];
    if (this.state) {
      arr = this.state.filter((item:State) => {
        return item.key.toLowerCase() === key.toLowerCase();
      });
      if (arr && arr.length) {
        return arr[0]['value'];
      }
    }
    return null;
  }

}
