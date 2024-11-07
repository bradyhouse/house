import {StateServiceInterface} from './../state/state-service.interface';

export interface DatabaseServiceInterface {
  readonly tables: string[];
  connect(): boolean;
  delete(table: string): boolean;
  pull(table: string):any;
  push(table: string, value: any): boolean;
  exists(table: string): boolean;
  zero(criteria: string): void;
}
