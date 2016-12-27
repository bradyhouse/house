import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {View} from "ui/core/view";
import {Router} from "@angular/router";
import {Page} from "ui/page";
import {Color} from "color";

import { Config } from '../../shared/config';


@Component({
    selector: "my-app",
    templateUrl: "pages/game/game.html",
    styleUrls: ["pages/game/game-common.css", "pages/game/game.css"]
})
export class GameComponent implements OnInit {
    @ViewChild("container") container: ElementRef;
    highscoreVisibility: string;
    title: string;

    constructor(private router: Router, private page: Page) {
    }

    ngOnInit() {
        this.highscoreVisibility = "collapsed";
        this.title = Config.title;
    }

    onPlayTap() {

    }

    onAboutTap() {
        this.router.navigate(["/about"]);
    }

    onHighScoreTap() {

    }


}