import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { Fiddle0000TemplateAppComponent } from '../app/fiddle-0000-template.component';

beforeEachProviders(() => [Fiddle0000TemplateAppComponent]);

describe('App: Fiddle0000Template', () => {
  it('should create the app',
      inject([Fiddle0000TemplateAppComponent], (app: Fiddle0000TemplateAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'fiddle-0000-template works!\'',
      inject([Fiddle0000TemplateAppComponent], (app: Fiddle0000TemplateAppComponent) => {
    expect(app.title).toEqual('fiddle-0000-template works!');
  }));
});
