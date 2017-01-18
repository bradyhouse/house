export class Square {
  private _id: string;
  private _row: number;
  private _col: number;
  private _value: string;
  private _expectedValue: string;
  private _cssClass: string;


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get row(): number {
    return this._row;
  }

  set row(value: number) {
    this._row = value;
  }

  get col(): number {
    return this._col;
  }

  set col(value: number) {
    this._col = value;
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }

  get expectedValue(): string {
    return this._expectedValue;
  }

  set expectedValue(value: string) {
    this._expectedValue = value;
  }

  get cssClass(): string {
    return this._cssClass;
  }

  set cssClass(value: string) {
    this._cssClass = value;
  }

  constructor(id: string, row: number, col: number, value: string, expectedValue: string, cssClass: string) {
    this._id = id;
    this._row = row;
    this._col = col;
    this._value = value;
    this._expectedValue = expectedValue;
    this._cssClass = cssClass;
  }
}
