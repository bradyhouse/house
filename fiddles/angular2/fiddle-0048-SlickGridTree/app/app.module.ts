import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent}  from './app.component';
import {ContentComponent} from './content/content.component';
import {SidebarComponent} from './sidebar/sidebar.component';

import {DataService} from './shared/data.service';
import {AcmeGridModule} from './components/acme-grid/acme-grid.module';

@NgModule({
  imports: [
    BrowserModule,
    AcmeGridModule
  ],
  declarations: [AppComponent,
    SidebarComponent,
    ContentComponent
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
