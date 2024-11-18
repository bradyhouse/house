import {ActionsEnum} from './actions.enum';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';


export interface ActionsServiceInterface {

  action: ActionsEnum;
  actionChange$: Observable<ActionsEnum>;
  actionObserver: Observer<ActionsEnum>;

}
