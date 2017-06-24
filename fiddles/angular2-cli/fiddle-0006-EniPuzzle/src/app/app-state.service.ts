import {Injectable} from '@angular/core';
import 'rxjs/add/operator/share';
import {
  StateService,
  LocalStorageService
} from './shared/puzzle/index';

@Injectable()
export class AppStateService extends StateService {
  constructor(databaseService: LocalStorageService) {
    super(databaseService);
  }
}
