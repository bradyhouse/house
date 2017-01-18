const Dialogs = require('ui/dialogs'),
  frame = require('ui/frame');

import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {View} from 'ui/core/view';
import {Router} from '@angular/router';
import {Page} from 'ui/page';
import {Color} from 'color';

import {Base} from '../../base';
import {Config} from '../../shared/config';
import {Score} from '../../shared/score/score';
import {ScoreService} from '../../shared/score/score.service';
import {State} from '../../shared/state/State';
import {StateService} from '../../shared/state/state.service';

@Component({
  selector: 'high-score',
  templateUrl: 'pages/high-score/high-score.component.html',
  styleUrls: ['pages/high-score/high-score-common.css', 'pages/high-score/high-score.css'],
  providers: [StateService, ScoreService]
})
export class HighScoreComponent extends Base {
  highScores: Array<Score> = [];
  title: string;
  isDev: Boolean;
  isHighScores: Boolean;
  isLoading: Boolean;
  lastRow: number;
  level: number;

  constructor(private _router: Router,
              private _page: Page,
              private _scoreService: ScoreService,
              private _stateService: StateService) {
    super();
    this.isHighScores = false;
    this.isLoading = true;
    this.lastRow = 2;
    this.isDev = Config.isDev === true ? true : false;
    this.title = Config.title + ' - High Scores';

    this.subscriptions.push(_stateService.stateChange$
      .subscribe(
        (state: any) => this.onStateServiceDataChange(state)
      ));

    this.subscriptions.push(_scoreService.dataChange$
      .subscribe(
        (scores: any) => this.onScoreServiceDataChange(scores)
      ));

    this.subscriptions.push(_scoreService.nextRowChange$
      .subscribe(
        (row: any) => this.onNextRowChange(row)
      ));
  }

  onStateServiceDataChange(state: State[]) {
    this.consoleLogMsg('high-score.component', 'onStateServiceDataChange');
    let level: string = this._stateService.getKeyValue('level');
    this.consoleLogMsg('high-score.component', 'level = ' + level);
    if (level) {
      this._scoreService.level = this.level = Number(level);
    } else {
      this._scoreService.level = this.level = Config.defaultLevel;
    }
  }

  onScoreServiceDataChange(scores: Score[]) {
    this.consoleLogMsg('high-score.component', 'onScoreServiceDataChange');
    if (scores) {
      this.isHighScores = scores.length > 0 ? true : false;
      this.highScores = scores;
      this.consoleLogArray(this.highScores);
      this.isLoading = false;
    }
  }

  onNextRowChange(row:number) {
    this.consoleLogMsg('high-score.component', 'onNextRowChange');
    this.lastRow = row;
  }

  onResetButtonTap() {
    this.consoleLogMsg('high-score.component', 'onResetButtonTap');
    Dialogs.confirm("Are you sure you want delete all high scores?").then((result: any) => {
      if (result) {
        this.isLoading = true;
        this._scoreService.truncate();
        this._stateService.truncate();
        this._router.navigate(['']);
      }
    });
  }

  onAddButtonTap() {
    this.consoleLogMsg('high-score.component', 'onAddButtonTap');
    this._router.navigate([
      'add-high-score/:level:moves:caller', {
        moves: '49',
        level: '1',
        caller: 'high-score'
      }
    ]);
  }

  onHighScore() {
    console.log('onHighScore');


    /*var navigationEntry = {
     moduleName: "view/high-score/add-high-score/add-high-score",
     context: {
     moves: 43,
     level: 1,
     callingModuleName: "view/high-score/high-score"
     },
     animated: false
     };
     frame.topmost().navigate(navigationEntry);*/
  }

}
