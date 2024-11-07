import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import {DatabaseServiceInterface} from './../database/database-service.interface';

export interface StateServiceInterface {

  databaseService: DatabaseServiceInterface;

  stateEventChange$: Observable<string>;

  stateEvent: string;

}
