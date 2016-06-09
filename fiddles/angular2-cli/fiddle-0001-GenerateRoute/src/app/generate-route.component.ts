import { Component } from '@angular/core';
import { AboutComponent } from './+about';
import { Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'generate-route-app',
  templateUrl: 'generate-route.component.html',
  styleUrls: ['generate-route.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS]
})
@Routes([
  {path: '/', component: GenerateRouteAppComponent},
  {path: '/about', component: AboutComponent}
])
export class GenerateRouteAppComponent {
  title = 'generate-route works!';
}
