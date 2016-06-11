import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { GeneratePipeAppComponent } from '../app/generate-pipe.component';

beforeEachProviders(() => [GeneratePipeAppComponent]);

describe('App: GeneratePipe', () => {
  it('should create the app',
      inject([GeneratePipeAppComponent], (app: GeneratePipeAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'generate-pipe works!\'',
      inject([GeneratePipeAppComponent], (app: GeneratePipeAppComponent) => {
    expect(app.title).toEqual('generate-pipe works!');
  }));
});
