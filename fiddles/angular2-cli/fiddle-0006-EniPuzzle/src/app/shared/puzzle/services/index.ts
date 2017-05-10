import { Sqlite3DatabaseService } from './database/sqlite3-database.service';
import { LocalStorageService } from './database/local-storage.service';
import { StateService } from './state/state.service';

export const PUZZLE_PROVIDERS: any[] = [
  LocalStorageService,
  Sqlite3DatabaseService,
  StateService
];

export * from './database/local-storage.service';
export * from './database/sqlite3-database.service';
export * from './database/database-service.interface';
export * from './state/state-service.interface';
export * from './state/state.service';
