import {Component, Input} from '@angular/core';
import {SquareInterface} from './square.interface';
import {SquareOptionsInterface} from './square-options.interface';
import {BaseComponent} from '../base.component';

@Component({
  moduleId: module.id,
  selector: 'pz-square',
  templateUrl: 'square.component.html',
  styleUrls: [
    'square.component.css',
  ],
})
export class SquareComponent extends BaseComponent implements SquareInterface {

  @Input() options: SquareOptionsInterface;

  constructor() {
    super();
  }

}
