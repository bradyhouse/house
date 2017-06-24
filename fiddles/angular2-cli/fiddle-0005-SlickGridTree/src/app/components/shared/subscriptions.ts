import { OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';

export class Subscriptions implements OnDestroy {
  subscriptions:ISubscription[];

  constructor() {
    this.subscriptions = [];
  }

  ngOnDestroy() {
    this.clearSubscriptions();
  }

  protected clearSubscriptions() {
    this.subscriptions.forEach((subscription:ISubscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }
}
