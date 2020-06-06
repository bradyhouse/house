import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AgGridModule } from '@ag-grid-community/angular';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { StateModule } from './state/state.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // tslint:disable-next-line: deprecation
    HttpModule,
    AgGridModule.withComponents([TooltipComponent]),
    ComponentsModule,
    StateModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
