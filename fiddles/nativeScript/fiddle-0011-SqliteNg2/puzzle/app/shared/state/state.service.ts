const Sqlite = require('nativescript-sqlite');


import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer}   from 'rxjs/Observer';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import {StateSql} from './state.sql';
import {State} from './state';
import {DbBaseService} from '../db-base.service';
import {SharedUtils} from '../shared-utils';

@Injectable()
export class StateService extends DbBaseService {

  stateChange$: Observable<State[]>;

  private _state: State[];
  private _stateObserver: Observer<State[]>;
  private _isEmpty: Boolean;

  get state(): State[] {
    return this._state;
  }

  set state(value: State[]) {
    this._state = value;
    if (this._stateObserver) {
      this._stateObserver.next(value);
    }
  }

  constructor() {
    super();

    this._state = [];
    this._isEmpty = true;

    this.stateChange$ = new Observable<State[]>(
      (observer: any) => this._stateObserver = observer
    ).share();

    this.subscriptions.push(this.databaseChange$
      .subscribe(
        (database: any) => this.onDatabaseChange(database)
      ));

  }

  onDatabaseChange(database: any) {
    this.consoleLogMsg('state.service', 'onDatabaseChange');
    this.fetch();
  }

  fetch() {
    this.consoleLogMsg('state.service', 'fetch');
    let data: State[] = [];

    if (this.database) {
      this.consoleLogMsg('state.service', StateSql.selectAll);
      this.database.all(StateSql.selectAll).then((items: any[]) => {
        if (items && items.length) {
          items.forEach((item: any, index: number) => {
            let state: State = new State(
              item.hasOwnProperty('id') ? +(item.id) : 1,
              item.hasOwnProperty('key') ? item.key : null,
              item.hasOwnProperty('value') ? item.value : null
            );
            this.consoleLogRecord(index, state);
            this._isEmpty = false;
            data.push(state);
          });
        } else {
          let state = new State(
            0,
            'level',
            '1'
          );
          data.push(state);
        }
        this.state = data;
      }, error => {
        this.consoleLogMsg('state.service', 'fetch error: ' + error);
      });
    }
  }

  insert(state: State, fetch: Boolean = false) {
    this.consoleLogMsg('state.service', 'insert');
    if (this.database) {
      this.database.execSQL(StateSql.insert, [state.id, state.key, state.value])
        .then((item: any) => {
          this.consoleLogRecord(0, item);
          if (fetch) {
            this.fetch();
          }
        });
    }
  }

  updateLevel(level: number) {
    this.consoleLogMsg('state.service', 'updateLevel');
    if (this.database) {
      if (this._isEmpty) {
        this.insert(new State(0, 'level', String(level)));
      } else {
        this.database.execSQL(StateSql.updateLevel, [level])
          .then((item: any) => {
            this.consoleLogRecord(0, item);
            this.fetch();
          });
      }
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
              this.insert(new State(
                0,
                'level',
                '1'
              ), true);
            });
        });
    }
  }

  getKeyValue(key: string): any {
    this.consoleLogMsg('state.service', 'getKeyValue');
    let arr: any[];
    if (this.state) {
      arr = this.state.filter((item: State) => {
        return item.key.toLowerCase() === key.toLowerCase();
      });
      if (arr && arr.length) {
        return arr[0]['value'];
      }
    }
    return null;
  }

}
