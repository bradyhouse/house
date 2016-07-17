import { Component } from '@angular/core';
import { FubarDirective } from './fubar.directive';

@Component({
  selector: 'my-app',
  directives: [[FubarDirective]],
  template: '<h1>Under Construction...</h1>'
})
export class AppComponent { }