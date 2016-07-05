import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import {Dictionary} from './dictionary';

describe('Dictionary', () => {
  it('should create an instance', () => {
    expect(new Dictionary()).toBeTruthy();
  });
});
