import {Component, OnInit} from '@angular/core';
import {View} from 'ui/core/view';
import {Router} from '@angular/router';
import {Page} from 'ui/page';
import {Color} from 'color';

import {Config} from '../../shared/config';


@Component({
  selector: 'about',
  templateUrl: 'pages/about/about.component.html',
  styleUrls: ['pages/about/about-common.css', 'pages/about/about.css']
})
export class AboutComponent implements OnInit {
  title: string;

  constructor(private _router: Router, private _page: Page) {
    _page.className = 'page';
  }

  ngOnInit() {
    this.title = Config.title + ' - About';
    if (Config.isDev) {
      this.title += ' (Dev Mode)';
    }
  }

  onNavBtnTap(): void {
    this._router.navigate([''], Config.transition);
  }

}
