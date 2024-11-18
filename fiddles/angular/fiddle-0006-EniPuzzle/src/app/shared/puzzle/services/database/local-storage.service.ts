import {Injectable} from '@angular/core';
import {DatabaseServiceInterface} from './database-service.interface';

@Injectable()
export class LocalStorageService implements DatabaseServiceInterface {

  get tables(): string [] {
    let tables: string[] = [];
    if (this.connect()) {
      for (let table in window.localStorage) {
        tables.push(table);
      }
    }
    return tables;
  }

  connect(): boolean {
    return window.localStorage ? true : false;
  }

  delete(table: string): boolean {
    return this.push(table, null);
  }

  pull(table: string):any {
    if (this.connect()) {
      if (window.localStorage.hasOwnProperty(table)) {
        try {
          return JSON.parse(window.localStorage[table]);
        } catch (e) {
          return {};
        }
      }
    }

    return null;
  }

  push(table: string, value: any): boolean {
    if (this.connect()) {
      if (!value) {
        window.localStorage.removeItem(table);
      } else {
        window.localStorage[table] = JSON.stringify(value);
      }
      return true;
    }
    return false;
  }

  exists(table:string): boolean {
    if (this.connect()) {
      return window.localStorage.hasOwnProperty(table);
    }
    return false;
  }

  zero(criteria: string = null): void {
    let tables: string[] = this.tables;
    if (tables.length) {
      tables.forEach((table:string) => {
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

}
