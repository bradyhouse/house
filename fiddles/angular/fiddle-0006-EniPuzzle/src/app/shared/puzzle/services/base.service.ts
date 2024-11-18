import {OnDestroy} from '@angular/core';
import {ISubscription} from 'rxjs/Subscription';
import {PuzzleConfig} from '../common/index';
import {ModelInterface} from '../../model.interface';


export class BaseService implements OnDestroy {

  subscriptions: Array<ISubscription>;

  constructor() {
    this.subscriptions = [];
  }

  ngOnDestroy() {
    this.clearSubscriptions();
  }

  protected clearSubscriptions(): void {
    this.subscriptions.map((subscription: ISubscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  protected handleErrors(error: any): any {
    this.consoleLogMsg('ERROR', error);
  }

  protected consoleLogMsg(tag: string, msg: string): void {
    if (PuzzleConfig.isDev === true) {
      console.log(tag + ': ' + msg);
    }
  }

  protected consoleLogRecord(i, model: ModelInterface): void {
    if (PuzzleConfig.isDev === true) {
      console.log('record #' + i + ' = ' + model.toString());
    }
  }


}
