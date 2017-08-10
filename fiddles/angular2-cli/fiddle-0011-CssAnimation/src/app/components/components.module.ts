import { NgModule,  NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingAnimeComponent } from './loading-anime/loading-anime.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoadingAnimeComponent],
  exports: [
    LoadingAnimeComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ComponentsModule { }
