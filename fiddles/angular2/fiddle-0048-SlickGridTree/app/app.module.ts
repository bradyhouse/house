import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { SlickGrid } from './components/ms-slick-grid/index';
import { TreeGridComponent } from './components/tree-grid/tree-grid.component';
import { DataService } from './shared/data.service';

@NgModule({
  imports:      [
      BrowserModule
  ],
  declarations: [ AppComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    SlickGrid,
    TreeGridComponent
  ],
  providers: [DataService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
