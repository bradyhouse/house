import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Base } from './base';
import { Options, Event } from './interfaces/index';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbCarouselConfig]
})
export class AppComponent extends Base {
  options: Options;
  width: number;
  height: number;

  constructor(private _config: NgbCarouselConfig) {
    super();
    this.options = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    _config.interval = 5000;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  onPanelEvent(event: Event) {
    switch (event.type) {

    }

  }

  onWindowResize(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.options = {
      width: this.width,
      height: this.height
    };
  }

  onCarouselSlide(event: any) {
    this._config.interval = 5000;
    console.log(event);
    window.setTimeout(() => {
      this.onWindowResize();
    }, 1000);

  }

}
