import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {PuzzleModule} from './shared/puzzle/puzzle.module';
import { AppComponent } from './app.component';
import { AppStateService } from './app-state.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PuzzleModule
  ],
  providers: [AppStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
