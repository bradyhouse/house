import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FillImageModule } from './components/fill-image/fill-image.module';
import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, FillImageModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
