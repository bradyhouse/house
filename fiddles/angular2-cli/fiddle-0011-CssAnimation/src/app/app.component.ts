import {
  Component,
  AfterViewInit
} from '@angular/core';

import { LoadingAnimeOptions } from './components/index';

@Component({
  selector: 'app-root',
  moduleId: module.id,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  height: number;
  top: number;
  left: number;
  width: number;
  animeWidth: number;
  animeHeight: number;
  options: LoadingAnimeOptions;

  constructor() {
    this.options = {
      isLoading: true,
      isDataValid: false
    };
    this.animeHeight = 0;
    this.animeWidth = 0;
  }

  onLoad($event: Event) {
    this.options = {
      isLoading: true,
      isDataValid: false
    };
  }

  onError($event: Event) {
    this.options = {
      error: "Houston! we have an error. The data is invalid",
      isLoading: false,
      isDataValid: false
    };
  }

  onWarning($event: Event) {
    this.options = {
      warning: "Houston-- fyi, we need data.",
      isLoading: false,
      isDataValid: false
    };

  }


  onAnimeWidthChange(width: number) {
    this.animeWidth = width;
    this.onWindowResize();
  }
  onAnimeHeightChange(height: number) {
    this.animeHeight = height;
    this.onWindowResize();
  }

  onWindowResize() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.left = 0;
    this.top = 0;
  }

}
