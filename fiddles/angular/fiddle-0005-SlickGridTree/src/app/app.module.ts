import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent}  from './app.component';
import {ContentComponent} from './content/content.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {DataService, StateService} from './shared/index';
import {TreeGridModule} from './components/tree-grid/tree-grid.module';

@NgModule({
  imports: [
    BrowserModule,
    TreeGridModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AppComponent,
    SidebarComponent,
    ContentComponent
  ],
  providers: [DataService, StateService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
