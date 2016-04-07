import {Component, Injectable} from 'angular2/core';
import 'rxjs/add/operator/map';



@Injectable()
export class PlayerTaskService {

    private _fn:Function;
    private _scope:Object<T>;
    private _args:Array<T>;
    private _ms:Number;

    constructor(fn:Function, scope:Object<T>, args:Array<T>, ms:Number) {
        this._fn = fn;
        this._scope = scope;
        this._args = args;
        this._ms = ms;
    }
    tick() {
        let self:PlayerTaskService = this;
        return Rx.Observable.create(function (observer:any) {
            let onTimeout:Function = function () {
                try{
                    let res:Number = self._fn(self._scope, self._args || []);
                    observer.onNext(res);
                    observer.onCompleted();
                } catch (err:Error) {
                    observer.onError(err);
                }
            };
            window.setTimeout(onTimeout, self._ms);
        });
    }
}

