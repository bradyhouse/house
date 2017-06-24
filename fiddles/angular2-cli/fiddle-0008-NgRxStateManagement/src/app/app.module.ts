import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonInputComponent } from './components/person-input/person-input.component';
import { FilterSelectComponent } from './components/filter-select/filter-select.component';
import { PartyStatsComponent } from './components/party-stats/party-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    PersonInputComponent,
    FilterSelectComponent,
    PartyStatsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
