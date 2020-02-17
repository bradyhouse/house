import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AgGridModule } from '@ag-grid-community/angular';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { StateService } from './state.service';
import { LocalStorageService } from './local-storage.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AgGridModule.withComponents([TooltipComponent]),
    ComponentsModule
  ],
  providers: [StateService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
