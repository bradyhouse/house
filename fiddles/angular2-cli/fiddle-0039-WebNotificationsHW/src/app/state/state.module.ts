import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './local-storage/local-storage.service';
import { StateService } from './state.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [LocalStorageService, StateService]
})
export class StateModule {
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: StateModule,
        providers: [LocalStorageService, StateService]
    };
}
 }
