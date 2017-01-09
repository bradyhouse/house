import {Component, ElementRef, ViewEncapsulation, OnInit, ViewChild} from "@angular/core";
import {View} from "ui/core/view";
import {Router} from "@angular/router";
import {Page} from "ui/page";
import {Color} from "color";

import { Config } from '../../shared/config';
import { Base } from '../../base';
import { ScoreService } from '../../shared/score/score.service';

@Component({
  selector: "my-app",
  templateUrl: "pages/game/game.html",
  providers: [ScoreService],
  styleUrls: ["pages/game/game-common.css", "pages/game/game.css"],
  encapsulation: ViewEncapsulation.None

})
export class GameComponent extends Base implements OnInit {
  @ViewChild("container") container: ElementRef;
  highscoreVisibility: string;
  title: string;


constructor(private _router: Router,
            private _page: Page,
            private _scoreService:ScoreService) {
  super();
}

ngOnInit() {
  this.highscoreVisibility = "collapsed";
  this.title = Config.title;
  let me = this;

  this._scoreService.connect(function(db:any) {
    me._scoreService.select(db, function(data:any[]) {
      if (data && data.length) {
        me.highscoreVisibility = "visible";
      }
    }, me);
  }, me);
}




onPlayTap() {
  this._router.navigate(["/level-one"]);
}

onAboutTap() {
  this._router.navigate(["/about"]);
}

onHighScoreTap() {

}


}
