import {Injectable} from '@angular/core';
import 'rxjs/add/operator/share';
import {
  StateService,
  DatabaseService
} from '../../shared/fiddle/index';

@Injectable()
export class GameStateService extends StateService {
  constructor(private _databaseService: DatabaseService) {
    super( _databaseService);
  }
}
