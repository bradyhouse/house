import {
  OnDestroy
} from '@angular/core';
import {
  ISubscription
} from 'rxjs/Subscription';

export interface BaseServiceInterface extends OnDestroy {
  subscriptions: ISubscription[];
  ngOnDestroy(): void;
  clearSubscriptions(): void;
}

export abstract class BaseComponent implements BaseServiceInterface, OnDestroy {

  subscriptions: ISubscription[];

  constructor() {
    this.subscriptions = [];
  }
  ngOnDestroy() {
    this.clearSubscriptions();
  }

  clearSubscriptions() {
    this.subscriptions.forEach((subscription: ISubscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }
}
