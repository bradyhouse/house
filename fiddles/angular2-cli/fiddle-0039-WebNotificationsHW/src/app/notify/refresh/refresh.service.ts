import { Injectable } from '@angular/core';
import * as Domain from './refresh';
import { timer } from 'rxjs/observable/timer';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class RefreshService implements Domain.RefreshServiceInterface {
   //#region - Refresh Service Implementation
   interval: number;
   ticks: number;
   timerSubscription: Subscription;
   stateChange$: Observable<Domain.RefreshStateEnum>;
   stateChangeObserver: Observer<Domain.RefreshStateEnum>;
 
   private _state: Domain.RefreshStateEnum;
 
 
   get state(): Domain.RefreshStateEnum {
     return this._state;
   }
 
   set state(newState: Domain.RefreshStateEnum) {
    this._state = newState;
    if (this.stateChangeObserver) {
      this.stateChangeObserver.next(newState);
    }
   }
 
   start(): void {
     if (this.state === Domain.RefreshStateEnum.stopped) {
       this.startTimer();
     }
   }
 
   stop(): void {
     if (this.state === Domain.RefreshStateEnum.started) {
       this.stopTimer();
     }
   }
 
   //#endregion
 
   //#region - constructor
 
   constructor() {
     this._state = Domain.RefreshStateEnum.stopped;
     this.interval = 30 * 1000;
     this.timerSubscription = Subscription.EMPTY;
     this.stateChange$ = new Observable<Domain.RefreshStateEnum>(
       (observer: any) => this.stateChangeObserver = observer
     ).share();
   }
 
   //#endregion
 
   //#region internal methods
 
   private startTimer(): void {
     const ticker: any = timer(this.interval, this.interval);
     this.state = Domain.RefreshStateEnum.started;
     this.timerSubscription = ticker.subscribe(
             (tick: number) => {
                 this.ticks = tick;
                 this.state = Domain.RefreshStateEnum.refresh; });
   }
 
   private stopTimer(): void {
     this.timerSubscription.unsubscribe();
     this.state = Domain.RefreshStateEnum.stopped;
     this.ticks = 0;
   }
 
   //#endregion
}
