import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { QuoteComponent } from './quote/quote.component';
import { VolumeComponent } from './volume/volume.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BaseComponent } from './base.component';

import { DxChartModule, DxDataGridModule, DxSparklineModule, DxTemplateModule } from 'devextreme-angular';
import { QuoteService } from './quote/quote.service';
import { VolumeService } from './volume/volume.service';
import { IntradayService } from './line-chart/intraday.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DxSparklineModule,
    DxTemplateModule,
    NgbModule.forRoot(),
    DxChartModule,
    DxDataGridModule
  ],
  declarations: [ AppComponent,
    QuoteComponent,
    VolumeComponent,
    LineChartComponent,
    PieChartComponent,
    BaseComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  },
    QuoteService,
    VolumeService,
    IntradayService],
  bootstrap: [AppComponent]

})
export class AppModule { }
