var Sqlite = require('nativescript-sqlite');

import {Observable} from 'rxjs/Observable';
import {Observer}   from 'rxjs/Observer';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import {Config} from './config';
import {ModelInterface} from './model.interface';
import {Base} from '../base';

export class DbBaseService extends Base {

  databaseChange$: Observable<any>;

  private _database: any;
  private _databaseObserver: Observer<any>;

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

    this.databaseChange$ = new Observable<any>(
      (observer: any) => this._databaseObserver = observer
    ).share();

    (new Sqlite(Config.dbFile)).then(db => {
      db.resultType(Sqlite.RESULTSASOBJECT);
      db.valueType(Sqlite.VALUESARENATIVE);
      this.database = db;
    }, error => {
      this.consoleLogMsg("OPEN DB ERROR", error);
    });
  }



}
