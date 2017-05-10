import { ModelInterface } from '../../../model.interface';

export class ConfigRecord implements ModelInterface {

  constructor(public key: string, public value: string) {}

  toString(): string {
    return '{ key: ' + this.key + ', value: ' + this.value + ' }';
  }

}
