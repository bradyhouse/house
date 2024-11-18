import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifyService } from './notify.service';
import { RefreshService } from './refresh/refresh.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [NotifyService, RefreshService]
})
export class NotifyModule {
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: NotifyModule,
        providers: [NotifyService, RefreshService]
    };
}
 }
