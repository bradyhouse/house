const StateModelSql: any = {
  insert: "insert into config(key, value) values(?,?)",
  selectAll: "select id, key, value from config",
  selectNextId: "select seq from sqlite_sequence where name='config'",
  delete: "DELETE FROM config WHERE key = ?",
  update: "update 'main'.'config' set value = ? where key = ?",
  dropTable: "drop table 'main'.'config';",
  count: "SELECT COUNT(*) as count FROM config WHERE key = ?",
  createTable: "create table 'config' ('id' integer primary key  autoincrement  not null  unique , 'key' text not null , 'value' text not null)"
};

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/toPromise';
import {DatabaseServiceInterface} from './database-service.interface';
import {ConfigRecord} from './config-record.model';
import {BaseService} from '../base.service';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import {PuzzleConfig} from '../../common/index';

declare let Sqlite3: any;
declare let Sqlite: any;


@Injectable()
export class Sqlite3DatabaseService extends BaseService implements DatabaseServiceInterface {

  databaseChange$: Observable<any>;

  private _localStorage: any;
  private _database: any;
  private _databaseObserver: Observer<any>;
  private _isEmpty: Boolean;

  get tables(): string [] {
    let tables: string[] = [];
    if (this.connect()) {
      for (let table in this._localStorage) {
        tables.push(table);
      }
    }
    return tables;
  }

  get database(): any {
    return this._database;
  }

  set database(value: any) {
    if (this._database !== value) {
      this._database = value;
      if (this._databaseObserver) {
        this._databaseObserver.next(value);
      }
    }
  }

  constructor() {
    super();
    this._database = null;
    this._isEmpty = true;
    Sqlite = Sqlite3;
    this.databaseChange$ = new Observable<any>(
      (observer: any) => this._databaseObserver = observer
    ).share();

    (new Sqlite(PuzzleConfig.dbFile)
      .toPromise()
      .then((err, db) => {
        console.log(db);
        this.database = db;
        this._localStorage = this.fetch();
      })
      .catch(this.handleError)
    );
  }

  connect(): boolean {
    return this.database ? true : false;
  }

  delete(table: string): boolean {
    return this.push(table, null);
  }

  pull(table: string): any {
    if (this.connect()) {
      if (this._localStorage.hasOwnProperty(table)) {
        try {
          return JSON.parse(this._localStorage[table]);
        } catch (e) {
          return {};
        }
      }
    }
    return null;
  }

  push(key: string, value: any): boolean {
    if (this.connect()) {
      if (!value) {
        delete this._localStorage[key];
        this.dbDelete(key)
          .then((rc:boolean) => {
            return rc;
          });
      } else {
        this._localStorage[key] = JSON.stringify(value);
        this.sync(key, value)
          .then((rc:boolean) => {
            return rc;
          });
      }
    }
    return false;
  }

  exists(table: string): boolean {
    if (this.connect()) {
      return this._localStorage.hasOwnProperty(table);
    }
    return false;
  }

  zero(criteria: string = null): void {
    let tables: string[] = this.tables;
    if (tables.length) {
      tables.forEach((table: string) => {
        if (criteria) {
          if (table.indexOf(criteria) !== -1) {
            this.delete(table);
          }
        } else {
          this.delete(table);
        }
      });
    }
  }

  private dbDelete(key: string): Promise<boolean> {
    if (this.connect()) {
      this.database.execSQL(StateModelSql.delete, [key])
        .toPromise()
        .then((item: any) => {
          this.consoleLogRecord(0, item);
          return Promise.resolve(true);
        })
        .catch(this.handleError);
    } else {
      return Promise.resolve(false);
    }
  }

  /*private getHeroes(): Promise<Boolean> {
   return this.http.get(this.heroesUrl)
   .toPromise()
   .then(response => response.json().data as Hero[])
   .catch(this.handleError);
   }*/

  private dbInsert(key: string, value: any): Promise<boolean> {
    this.consoleLogMsg('sqlite-database.service', 'dbInsert');
    if (this.connect()) {
      this.database.execSQL(StateModelSql.insert, [key, String(value)])
        .toPromise()
        .then((item: any) => {
          this.consoleLogRecord(0, item);
          return Promise.resolve(true);
        })
        .catch(this.handleError);
    } else {
      return Promise.resolve(false);
    }
  }

  private fetch(): any {
    this.consoleLogMsg('sqlite-database.service', 'fetch');
    let data: ConfigRecord[] = [],
      rc: any = {};

    if (this.connect) {
      this.consoleLogMsg('sqlite-database.service', StateModelSql.selectAll);
      this.database.all(StateModelSql.selectAll).then((items: any[]) => {
        if (items && items.length) {
          items.forEach((item: any, index: number) => {
            let configRecord: ConfigRecord = new ConfigRecord(
              item.hasOwnProperty('key') ? item.key : null,
              item.hasOwnProperty('value') ? item.value : null
            );
            this.consoleLogRecord(index, configRecord);
            data.push(configRecord);
          });
        } else {
          let state = new ConfigRecord(
            'level',
            '1'
          );
          data.push(state);
        }
        if (data.length) {
          this._isEmpty = false;
          data.forEach((rec: ConfigRecord) => {
            rc[rec.key] = rec.value;
          });
        }
      }, error => {
        this.consoleLogMsg('sqlite-database.service', 'fetch error: ' + error);
      });
    }
    return rc;
  }

  private dbUpdate(key: string, value: any): Promise<boolean> {
    this.consoleLogMsg('sqlite-database.service', 'dbUpdate');
    if (this.connect()) {
      this.database.execSQL(StateModelSql.update, [key, String(value)])
        .toPromise()
        .then((item: any) => {
          this.consoleLogRecord(0, item);
          return Promise.resolve(true);
        })
        .catch(this.handleError);
    } else {
      return Promise.resolve(false);
    }
  }

  private sync(key: string, value: any): Promise<boolean> {
    this.consoleLogMsg('sqlite-database.service', 'sync');
    if (this.connect()) {
      this.database.execSQL(StateModelSql.count, [key])
        .toPromise()
        .then((item: any) => {
          if (item.hasOwnProperty('count') && (+item.count) > 0) {
            return this.dbUpdate(key, value);
          } else {
            return this.dbInsert(key, value);
          }
        })
        .catch(this.handleError);
    } else {
      return Promise.resolve(false);
    }
  }

  private handleError(error: any): Promise<boolean> {
    console.error('An error occurred', error);
    return Promise.resolve(false);
  }

}
