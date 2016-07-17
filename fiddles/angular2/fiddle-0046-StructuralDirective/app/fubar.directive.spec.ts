/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { Fubar } from './fubar.directive';

describe('Fubar Directive', () => {
  it('should create an instance', () => {
    let directive = new Fubar();
    expect(directive).toBeTruthy();
  });
});
