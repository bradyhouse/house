import { Row } from './row.model';

export class Square {

  constructor(public id: string,
              public isEmpty: boolean,
              public row: number,
              public col: number,
              public value: string,
              public expectedValue: string,
              public cssClass: string) {}

}
