import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import {ActionsEnum} from './actions.enum';
import {ActionsServiceInterface} from './actions-service.interface';

@Injectable()
export class ActionsService implements ActionsServiceInterface {

  actionChange$: Observable<ActionsEnum>;

  private _action: ActionsEnum;
  private _actionObserver: Observer<ActionsEnum>;


  get actionObserver(): Observer<ActionsEnum> {
    return this._actionObserver;
  }

  set actionObserver(value: Observer<ActionsEnum>) {
    this._actionObserver = value;
  }

  get action(): ActionsEnum {
    return this._action;
  }

  set action(value: ActionsEnum) {
    if (this._action !== value) {
      this._action = value;
      if (this.actionObserver) {
        this.actionObserver.next(value);
      }
    }
    value = null;
  }

  constructor() {
    this._action = ActionsEnum.START;
    this.actionChange$ = new Observable<ActionsEnum>(
      (observer: any) => this.actionObserver = observer
    ).share();
  }

}
