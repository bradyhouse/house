import { OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';


export abstract class Base implements OnDestroy {
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

}
