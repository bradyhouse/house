import {ModelInterface} from '../model.interface';


export class State implements ModelInterface {

  private _id: number;
  private _key: string;
  private _value: string;


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get key(): string {
    return this._key;
  }

  set key(value: string) {
    this._key = value;
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }

  constructor(id: number, key: string, value: string) {
    this._id = id;
    this._key = key;
    this._value = value;
  }

  toString(): string {
    return '{ id: ' + this.id + ', key: ' + this.key + ', value: ' + this.value + ' }';
  }
}
