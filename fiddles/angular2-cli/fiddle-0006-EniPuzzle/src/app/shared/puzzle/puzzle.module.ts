import {NgModule, Optional, SkipSelf, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {PUZZLE_COMPONENTS} from './components/index';
import {ACTION_PROVIDERS} from './actions/index';
import {PUZZLE_PROVIDERS} from './services/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule
  ],
  providers: [
    ACTION_PROVIDERS,
    PUZZLE_PROVIDERS
  ],
  declarations: [
    PUZZLE_COMPONENTS
  ],
  exports: [
    PUZZLE_COMPONENTS
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class PuzzleModule {

  constructor(@Optional() @SkipSelf() parentModule: PuzzleModule) {
    if (parentModule) {
      throw new Error('PuzzleModule already loaded; Import in root module only.');
    }
  }
}
