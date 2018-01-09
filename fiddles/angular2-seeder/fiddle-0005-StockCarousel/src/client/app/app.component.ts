import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Base } from './base';
import { Options, BubbleEvent } from './interfaces/index';

@Component({
  selector: 'sd-app',
  moduleId: module.id,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbCarouselConfig]
})
export class AppComponent extends Base {
  options: Options;
  width: number;
  height: number;

  private _preloader: any;


  constructor(private _config: NgbCarouselConfig) {
    super();
    const titleOverrideField: any = document.getElementById('titleOverride'),
          title: string = titleOverrideField ? titleOverrideField.value : 'ECorp';
    _config.interval = 0;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.options = {
      width: this.width,
      height: this.height,
      title: title
    };
    this._preloader = document.getElementsByClassName('preloader')[0];

    window.setTimeout(() => {
      this._togglePreloader(false);
    }, 1000);
  }

  onPanelEvent(event: any) {
    switch (event.type) {
      case 'resize':
        this.onWindowResize();
        break;
      case 'mouseOver':
        console.log('disabling carousel');
        this._config.interval = 0;
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
    this._config.interval = 0;
    switch (event.current) {
      case 'line-chart':
        this.options.loaded = true;
        break;
      case 'quote':
        this.options.loaded = true;
        break;
      case 'volume':
        this.options.loaded = true;
        break;
      default:
        this.options.loaded = false;
        break;
    }
    window.setTimeout(() => {
      this.onWindowResize();
    }, 1000);

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
