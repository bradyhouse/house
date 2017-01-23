const Dialogs = require('ui/dialogs'),
  frame = require('ui/frame'),
  application = require('application');

import {Component, OnInit} from '@angular/core';
import {View} from 'ui/core/view';
import {Router} from '@angular/router';
import {Page} from 'ui/page';
import {Color} from 'color';

import {RouterExtensions} from 'nativescript-angular/router';
import { AndroidApplication, AndroidActivityBackPressedEventData } from 'application';


import {Base} from '../../base';
import {Config} from '../../shared/config';
import {Board} from '../../shared/board/board';
import {Square} from '../../shared/board/square';
import {BoardService} from '../../shared/board/board.service';
import {ScoreService} from '../../shared/score/score.service';
import {State} from '../../shared/state/State';
import {StateService} from '../../shared/state/state.service';


@Component({
  selector: 'level-two',
  templateUrl: 'pages/level-two/level-two.component.html',
  styleUrls: ['pages/level-two/level-two-common.css', 'pages/level-two/level-two.css'],
  providers: [BoardService, ScoreService, StateService]
})
export class LevelTwoComponent extends Base implements OnInit {

  board: Board;
  isDev: Boolean;
  isBoardLoaded: Boolean;

  constructor(private _router: RouterExtensions,
              private _page: Page,
              private _boardService: BoardService,
              private _scoreService: ScoreService,
              private _stateService: StateService) {
    super();

    this.isDev = Config.isDev;
    this.isBoardLoaded = false;

    this.subscriptions.push(_boardService.gameBoardChange$
      .subscribe(
        (board: any) => this.onGameBoardChange(board)
      ));

    this.subscriptions.push(_stateService.stateChange$
      .subscribe(
        (state: any) => this.onStateChange(state)
      ));

  }

  ngOnInit() {
    this.consoleLogMsg('level-two.component', 'ngOnInit');
    this.onInit();
  }

  onInit(): void {
    this.consoleLogMsg('level-two.component', 'onInitChange');

    let title = Config.title + ' - Level 2';

    if (Config.isDev) {
      title += ' (Dev Mode)';
    }

    this._boardService.initBoard(4, 4, title, 2, 0, 'level-three');
  }

  onGameBoardChange(board: Board) {
    this.consoleLogMsg('level-two.component', 'onGameBoardChange');
    this.board = board;
    this.isBoardLoaded = true;
    if (this._boardService.isGameOver()) {
      if (this._scoreService.isHighScore(this.board.moves, this.board.level)) {
        this.onHighScore();
      } else {
        this.onLowScore();
      }
    }
  }

  onStateChange(state: State[]) {
    this.consoleLogMsg('level-two.component', 'onStateChange');
    if (this.isBoardLoaded && state && state.length) {
      let levelValue: any = this._stateService.getKeyValue('level'),
        stateLevel: number = levelValue && levelValue !== undefined ? Number(levelValue) : 1,
        boardLevel: number = this.board && this.board.level ? this.board.level : 1;

      if (this.isBoardLoaded && stateLevel > boardLevel) {
        this._router.navigate([
          'game/:target', {
            target: this.board.nextScreen
          }
        ], Config.transition);
      }
    }
  }

  onResetTap(): void {
    this.consoleLogMsg('level-two.component', 'onResetTap');
    this.onInit();
  }

  onSquareGesture(square: Square): void {
    this.consoleLogMsg('level-two.component', 'onSquareGesture');
    let squareB: Square = this._boardService.emptySquare;
    if (!this._boardService.isEmpty(square) && this._boardService.isValidMove(square, squareB)) {
      this._boardService.moveSquare(square, squareB);
    }
  }

  onLowScore(): void {
    Dialogs.confirm({
      title: 'W i n n e r',
      message: 'You solved the puzzle in ' + this.board.moves + ' moves!',
      okButtonText: 'Ok'
    }).then(() => {
      this._stateService.updateLevel(3);
    });
  }

  onHighScore(): void {
    this.consoleLogMsg('level-two.component', 'onHighScore');
    Dialogs.confirm({
      title: 'W i n n e r',
      message: 'You solved the puzzle in ' + this.board.moves + ' moves!',
      okButtonText: 'Ok'
    }).then(() => {
      this.isBoardLoaded = false;
      this._stateService.updateLevel(3);
      this._router.navigate([
        'add-high-score/:level:moves:caller', {
          moves: this.board.moves,
          level: this.board.level,
          caller: this.board.nextScreen
        }
      ], Config.transition);
    });
  }

  onSkipLevelTap(): void {
    this.consoleLogMsg('level-two.component', 'onSkipLevelTap');
    this.onHighScore();
  }

  onNavBtnTap(): void {
    this._router.navigate([''], Config.transition);
  }

}
