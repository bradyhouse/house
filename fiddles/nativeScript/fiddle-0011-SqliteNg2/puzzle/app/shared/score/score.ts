import {ModelInterface} from '../model.interface';

export class Score implements ModelInterface {
  private _id: number;
  private _user: string;
  private _time: string;
  private _moves: number;
  private _level: number;
  private _cssClass: string;
  private _row:number;


  constructor(id: number, user: string, time: string, moves: number, level: number, cssClass: string) {
    this._id = id;
    this._user = user;
    this._time = time;
    this._moves = moves;
    this._level = level;
    this._cssClass = cssClass;
    this._row = 1;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get user(): string {
    return this._user;
  }

  set user(value: string) {
    this._user = value;
  }

  get time(): string {
    return this._time;
  }

  set time(value: string) {
    this._time = value;
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

  get cssClass(): string {
    return this._cssClass;
  }

  set cssClass(value: string) {
    this._cssClass = value;
  }

  get row(): number {
    return this._row;
  }

  set row(value: number) {
    this._row = value;
  }

  toString(): string {
    return '{ row: ' + this.row +
      ', id: ' + this.id +
      ', user: ' + this.user +
      ', time: ' + this.time +
      ', moves: ' + this.moves +
      ', level: ' + this.level +
      ', cssClass: ' + this.cssClass +' }';
  }

}
