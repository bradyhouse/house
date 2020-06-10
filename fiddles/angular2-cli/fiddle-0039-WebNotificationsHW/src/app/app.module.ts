import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AgGridModule } from '@ag-grid-community/angular';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StateModule } from './state/state.module';
import { AppRoutingModule } from './app-routing.module';
import { NotificationQueueComponent } from './notification-queue/notification-queue.component';

@NgModule({
  declarations: [
    NotificationQueueComponent,
    DashboardComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    // tslint:disable-next-line: deprecation
    HttpModule,
    AgGridModule.withComponents([TooltipComponent]),
    ComponentsModule,
    StateModule.forRoot(),
     AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
