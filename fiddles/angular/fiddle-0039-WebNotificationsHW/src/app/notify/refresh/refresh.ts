import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

/**
 * Enumeration defining the 3 possible states
 * of the refresh service class.
 */
export class RefreshStateEnum {
    /**
     * Refresh process timer has started.
     */
    static started = 'started';
    /**
     * Refresh process timer has stopped.
     */
    static stopped = 'stopped';
    /**
     * Timer has triggered the target callback method.
     */
    static refresh = 'refresh';
}

/**
 * Refresh Service Interface. This interface is used
 * to define a simple Reactive based timer process.
 * Based on a configured interval, when started the interface
 * will notify subscribed observer.
 */
export interface RefreshServiceInterface {
    /**
     * Refresh Count. On start value is
     * set to 1. On stop value is set to 0.
     */
    ticks: number;
    /**
     * Refresh interval in milliseconds.
     * Note - The first refresh will fire immediately.
     * Subsequent refreshes will ellapse after this period.
     */
    interval: number;
    /**
     * Observable used to detect a refresh service
     * state change. On start, the state
     * of the service is set to "started". On
     * stop the state of the service is set to
     * "stopped".
     */
    stateChange$: Observable<RefreshStateEnum>;
    /**
     * Observer which is notified on the state 
     * property change.
     */
    stateChangeObserver: Observer<RefreshStateEnum>;
    /**
     * State property used to describe the state
     * of the service.
     */
    state: RefreshStateEnum;
    /**
     * Subscription used to control (start or stop) the
     * timer instance.
     */
    timerSubscription: Subscription;
    /**
     * Method used to subscribe to a new timer, set
     * state property to "started".
     */
    start(): void;
    /**
     * Method used to unsubscribe to the timer, set
     * the state property to "stopped", and reset
     * the tick count to 0.
     */
    stop(): void;
}

