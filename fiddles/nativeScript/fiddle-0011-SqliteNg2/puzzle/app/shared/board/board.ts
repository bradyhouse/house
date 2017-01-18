
import { Square } from './square';
import { Observable } from 'rxjs/Rx';
import { ModelInterface } from '../model.interface';

export class Board implements ModelInterface {
    private _title: string;
    private _moves: number;
    private _level: number;
    private _nextScreen: string;
    private _squares: Square[];


    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get moves(): number {
        return this._moves;
    }

    set moves(value: number) {
        this._moves = value;
    }

    get level(): number {
        return this._level;
    }

    set level(value: number) {
        this._level = value;
    }

    get nextScreen(): string {
        return this._nextScreen;
    }

    set nextScreen(value: string) {
        this._nextScreen = value;
    }

    get squares(): Square[] {
        return this._squares;
    }

    set squares(value: Square[]) {
        this._squares = value;
    }

    constructor(title: string, moves: number, level: number, nextScreen: string) {
        this._title = title;
        this._moves = moves;
        this._level = level;
        this._nextScreen = nextScreen;
        this._squares = [];
    }

    toString():string {
      return '{ title: ' + this.title + ', moves: ' + this.moves + ', level: ' +
        this.level + ', nextScreen: ' + this.nextScreen + ' }';
    }

}
