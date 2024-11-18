import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// ag-grid
import {AgGridModule} from 'ag-grid-angular';
// application
import {AppComponent} from './app.component';
// rich grid
import {RichGridComponent} from './rich-grid-component/rich-grid.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
      HttpClientModule,
      AgGridModule.withComponents([])
    ],
    declarations: [
        AppComponent,
        RichGridComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
