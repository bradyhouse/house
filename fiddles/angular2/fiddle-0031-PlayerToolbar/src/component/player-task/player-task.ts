import {Component, Input} from 'angular2/core';


export enum PlayerTaskState {
    paused = 0,
    running = 1
}

export interface IPlayerTask {
    fn:Function;
    state:PlayerTaskState;
    scope?:Object;
    args?:Array<T>;
}


@Component({
    selector: 'player-task',
    template: ``,
    properties: ['fn', '']
})
export class PlayerTask implements IPlayerTask {

    fn:Function;
    state:PlayerTaskState;
    scope:Object;
    args:Array<T>;


}
