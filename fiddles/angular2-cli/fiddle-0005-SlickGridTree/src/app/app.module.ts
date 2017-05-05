import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent}  from './app.component';
import {ContentComponent} from './content/content.component';
import {SidebarComponent} from './sidebar/sidebar.component';

import {DataService} from './shared/data.service';
import {TreeGridModule} from './components/tree-grid/tree-grid.module';

@NgModule({
  imports: [
    BrowserModule,
    TreeGridModule
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
