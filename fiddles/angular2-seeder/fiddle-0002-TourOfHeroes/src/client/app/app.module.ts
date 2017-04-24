import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppComponent }  from './app.component';
import { HeroDetailComponent } from './shared/components/hero-detail/hero-detail.component';
import { HeroesComponent } from './shared/components/heroes/heroes.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { HeroSearchComponent } from './shared/components/hero-search/hero-search.component';
import { AppRoutingModule }   from './app-routing.module';
import { HeroService }    from './shared/services/hero.service';
import { InMemoryDataService }  from './shared/services/in-memory-data.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        HeroesComponent,
        HeroDetailComponent,
        HeroSearchComponent
    ],
    providers: [HeroService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
