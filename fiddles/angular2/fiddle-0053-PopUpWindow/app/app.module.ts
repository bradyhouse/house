import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PopUpService } from './pop-up.service';
import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent ],
  providers:    [ PopUpService],

  bootstrap:    [ AppComponent ]
})
export class AppModule { }
