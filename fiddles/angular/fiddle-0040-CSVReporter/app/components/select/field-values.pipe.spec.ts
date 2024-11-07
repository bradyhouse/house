import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import { FieldValues } from './field-values.pipe';

describe('FieldValues Pipe', () => {
  beforeEachProviders(() => [FieldValues]);

  it('should transform the input', inject([FieldValues], (pipe: FieldValues) => {
      expect(pipe.transform(true)).toBe(null);
  }));
});
