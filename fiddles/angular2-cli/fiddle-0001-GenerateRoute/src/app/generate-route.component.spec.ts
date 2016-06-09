import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { GenerateRouteAppComponent } from '../app/generate-route.component';

beforeEachProviders(() => [GenerateRouteAppComponent]);

describe('App: GenerateRoute', () => {
  it('should create the app',
      inject([GenerateRouteAppComponent], (app: GenerateRouteAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'generate-route works!\'',
      inject([GenerateRouteAppComponent], (app: GenerateRouteAppComponent) => {
    expect(app.title).toEqual('generate-route works!');
  }));
});
