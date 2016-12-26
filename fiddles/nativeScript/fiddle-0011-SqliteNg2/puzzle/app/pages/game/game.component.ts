import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { View } from "ui/core/view";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { Color } from "color";

@Component({
    selector: "my-app",
    templateUrl: "pages/game/game.html",
    styleUrls: ["pages/game/game-common.css", "pages/game/game.css"]
})
export class GameComponent implements OnInit {
    @ViewChild("container") container: ElementRef;
    highscoreVisibility: string;
    title: string;
    
    constructor(private router: Router, private page: Page) {}

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.highscoreVisibility = "collapsed";
        this.title = "15 Puzzle";
    }

    onPlayTap() {

    }

    onAboutTap() {

    }

    onHighScoreTap() {

    }


}