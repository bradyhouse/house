import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { QuoteComponent } from './quote/quote.component';
import { VolumeComponent } from './volume/volume.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BaseComponent } from './base.component';
import { TimeSeriesService } from './time-series.service';

import { DxChartModule} from 'devextreme-angular';

@NgModule({
  declarations: [
    AppComponent,
    QuoteComponent,
    VolumeComponent,
    LineChartComponent,
    PieChartComponent,
    BaseComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    DxChartModule
  ],
  providers: [TimeSeriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
