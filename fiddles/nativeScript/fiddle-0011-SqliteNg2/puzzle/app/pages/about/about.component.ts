import {Component, OnInit} from '@angular/core';
import {View} from 'ui/core/view';
import {Router} from '@angular/router';
import {Page} from 'ui/page';
import {Color} from 'color';

import {Config} from '../../shared/config';


@Component({
    selector: 'about',
    templateUrl: 'pages/about/about.html',
    styleUrls: ['pages/about/about-common.css', 'pages/about/about.css']
})
export class AboutComponent implements OnInit {
    title: string;

    constructor(private router: Router, private page: Page) {
    }

    ngOnInit() {
        this.title = Config.title + ' - About';

    }

}