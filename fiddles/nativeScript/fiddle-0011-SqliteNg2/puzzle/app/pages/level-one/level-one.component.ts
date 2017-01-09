import {Component, OnInit} from '@angular/core';
import {View} from 'ui/core/view';
import {Router} from '@angular/router';
import {Page} from 'ui/page';
import {Color} from 'color';

import { Base } from '../../base';
import { Config } from '../../shared/config';
import { Board } from '../../shared/board/board';
import { Square } from '../../shared/board/square';


@Component({
    selector: 'level-one',
    templateUrl: 'pages/level-one/level-one.html',
    styleUrls: ['pages/level-one/level-one-common.css', 'pages/level-one/level-one.css']
})
export class LevelOneComponent extends Base implements OnInit {

    board: Board;

    constructor(private router: Router, private page: Page) {
        super();

        this.board = new Board();
        this.board.title = Config.title + ' - Level 1';
        this.board.nextScreen = 'level-two';
        //this.board.squares =
    }

    ngOnInit() {

    }

}
