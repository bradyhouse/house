import {OnDestroy} from '@angular/core';
import {ISubscription} from 'rxjs/Subscription';


export class Base implements OnDestroy {


    subscriptions:Array<ISubscription>;

    constructor() {
        this.subscriptions = [];
    }

    ngOnDestroy() {
        this.clearSubscriptions();
    }

    protected enumerables:Array<string> = ['valueOf', 'toLocaleString', 'toString', 'constructor'];

    protected clearSubscriptions():void {
        this.subscriptions.map((subscription:ISubscription) => {
            subscription.unsubscribe();
        });
        this.subscriptions = [];
    }

    protected  isArray(value):boolean {
        return ('isArray' in Array) ? Array.isArray : toString.call(value) === '[object Array]';
    }

    protected isNumeric(value):boolean {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    protected apply(object:any, config:any, defaults:any = null) {
        if (defaults) {
            this.apply(object, defaults);
        }

        if (object && config && config.constructor == Object) {
            let property:string;
            for (property in config) {
                object[property] = config[property];
            }

            if (this.enumerables) {
                this.enumerables.map(function(enumerable:string, index:number) {
                    if (config.hasOwnProperty(enumerable)) {
                        object[enumerable] = config[enumerable];
                    }
                });
            }
        }

        return object;
    }

}
