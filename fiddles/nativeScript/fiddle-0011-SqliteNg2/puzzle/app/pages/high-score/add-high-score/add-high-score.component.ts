const Dialogs = require('ui/dialogs'),
  frame = require('ui/frame');


import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { NgModule } from "@angular/core";

import {TextField} from "ui/text-field";


import {Base} from '../../../base';
import {Config} from '../../../shared/config';
import {Score} from '../../../shared/score/score';
import {ScoreService} from '../../../shared/score/score.service';


@Component({
  selector: 'add-high-score',
  templateUrl: 'pages/high-score/add-high-score/add-high-score.component.html',
  styleUrls: ['pages/high-score/add-high-score/add-high-score-common.css',
    'pages/high-score/add-high-score/add-high-score.css'],
  providers: [ScoreService]
})
export class AddHighScoreComponent extends Base implements OnInit {

  @ViewChild("nameTextField") nameTextField: ElementRef;
  name = "";
  level: any;
  moves: any;
  title: string;
  caller: string;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _scoreService: ScoreService) {
    super();

    this.subscriptions.push(_route.params.subscribe((params: any) => {
      _scoreService.level = this.level = params['level'];
      this.moves = params['moves'];
      this.caller = params['caller'];
      this.consoleLogMsg('add-high-score.component', 'level = ' + this.level);
      this.consoleLogMsg('add-high-score.component', 'moves = ' + this.moves);
      this.consoleLogMsg('add-high-score.component', 'caller = ' + this.caller);
    }));

  }

  ngOnInit() {
    this.consoleLogMsg('add-high-score.component', 'ngOnInit');
    this.title = Config.title + ' - Add High Score';
  }

  onAddButtonTap() {
    this.consoleLogMsg('add-high-score.component', 'onAddButtonTap');
    this.consoleLogMsg('add-high-score.component', 'name = ' + this.name.trim());


    let textField = <TextField>this.nameTextField.nativeElement;
    textField.dismissSoftInput();
    this.name = textField.text;

    if (this.name.trim() === "") {
      alert("Enter your name");
      return;
    }

    let score:Score = new Score(this._scoreService.nextId,
      this.name, '00:00:00', +this.moves, this.level, <string>null);

    this._scoreService.insert(score);

    this._router.navigate([this.caller, { clearHistory: true }]);

  }

  onCancelButtonTap() {
    this._router.navigate([this.caller, { clearHistory: true } ]);
  }

}
