
import {OnDestroy} from '@angular/core';
import {ISubscription} from 'rxjs/Subscription';
import {Config} from './shared/config';
import {ModelInterface} from './shared/model.interface';


export class Base implements OnDestroy {

  subscriptions:Array<ISubscription>;

  constructor() {
    this.subscriptions = [];
  }

  ngOnDestroy() {
    this.clearSubscriptions();
  }

  protected clearSubscriptions():void {
    this.subscriptions.map((subscription:ISubscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  protected handleErrors(error: any): any {
    this.consoleLogMsg('ERROR', error);
  }

  protected consoleLogMsg(tag: string, msg: string): void {
    if (Config.isDev === true) {
      console.log(tag + ': ' + msg);
    }
  }

  protected consoleLogRecord(i, model: ModelInterface): void {
    if (Config.isDev === true) {
      console.log('record #' + i + ' = ' + model.toString());
    }
  }
  protected consoleLogArray(models: ModelInterface[]): void {
    let i: number = 0;
    if (Config.isDev === true) {
      models.map((model: ModelInterface) => {
        this.consoleLogRecord(i, model);
        i++;
      });
    }
  }


}
