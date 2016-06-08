import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { FiddleAppComponent } from '../app/fiddle.component';

beforeEachProviders(() => [FiddleAppComponent]);

describe('App: Fiddle', () => {
  it('should create the app',
      inject([FiddleAppComponent], (app: FiddleAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'fiddle works!\'',
      inject([FiddleAppComponent], (app: FiddleAppComponent) => {
    expect(app.title).toEqual('fiddle works!');
  }));
});
