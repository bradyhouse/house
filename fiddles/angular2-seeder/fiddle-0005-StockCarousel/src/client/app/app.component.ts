import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Base } from './base';
import { Options } from './interfaces/index';
import * as Viz from 'devextreme/viz/themes';
@Component({
  selector: 'sd-app',
  moduleId: module.id,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbCarouselConfig]
})
export class AppComponent extends Base implements OnInit {
  options: Options;
  width: number;
  height: number;
  interval: number;

  private _preloader: any;


  constructor(private _config: NgbCarouselConfig) {
    super();
    const intervalOverrideField: any = document.getElementById('intervalOverride'),
          titleOverrideField: any = document.getElementById('titleOverride'),
          title: string = titleOverrideField ? titleOverrideField.value : 'ECorp';
    this.interval = intervalOverrideField && !isNaN(intervalOverrideField.value) ?
      Number(intervalOverrideField.value) : 0;
    _config.interval = 0;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.options = {
      width: this.width,
      height: this.height,
      title: title
    };
    this._preloader = document.getElementsByClassName('preloader')[0];
  }

  ngOnInit(): void {
    Viz.currentTheme('generic.contrast');
    Viz.refreshTheme();
  }

  onPanelEvent(event: any) {
    switch (event.type) {
      case 'resize':
        this.onWindowResize();
        break;
      case 'mouseOver':
        this._config.interval = 0;
        break;
      case 'ready':
        this._config.interval = this.interval;
        this._togglePreloader(false);
        break;
    }
  }

  onWindowResize(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.options.width = this.width;
    this.options.height = this.height;
  }

  onCarouselSlide(event: any) {
    this._config.interval = this.interval;
    window.setTimeout(() => {
      this.onWindowResize();
    }, 2000);

  }

  private _togglePreloader(isPreloader: boolean) {
    if (this._preloader) {
      if (isPreloader) {
        this._preloader.classList.remove('loaded');
      } else {
        this._preloader.classList.add('loaded');
      }
    }
  }

}
