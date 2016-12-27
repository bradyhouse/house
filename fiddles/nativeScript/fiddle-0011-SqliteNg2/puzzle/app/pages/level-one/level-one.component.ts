import {Component, OnInit} from '@angular/core';
import {View} from 'ui/core/view';
import {Router} from '@angular/router';
import {Page} from 'ui/page';
import {Color} from 'color';

import {Config} from '../../shared/config';


@Component({
    selector: 'level-one',
    templateUrl: 'pages/level-one/level-one.html',
    styleUrls: ['pages/level-one/level-one-common.css', 'pages/level-one/level-one.css']
})
export class LevelOneComponent implements OnInit {

    title: string;
    moves: number;
    level: number;
    nextScreen: string;

    constructor(private router: Router, private page: Page) {}

    ngOnInit() {
        this.title = Config.title + ' - About';
        this.nextScreen = '/view/level-two/level-two';
    }

}