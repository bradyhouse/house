"use strict";
var Dialogs = require('ui/dialogs'), frame = require('ui/frame'), application = require('application');
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var router_1 = require("nativescript-angular/router");
var base_1 = require("../../base");
var config_1 = require("../../shared/config");
var board_service_1 = require("../../shared/board/board.service");
var score_service_1 = require("../../shared/score/score.service");
var state_service_1 = require("../../shared/state/state.service");
var LevelOneComponent = (function (_super) {
    __extends(LevelOneComponent, _super);
    function LevelOneComponent(_router, _page, _boardService, _scoreService, _stateService) {
        var _this = _super.call(this) || this;
        _this._router = _router;
        _this._page = _page;
        _this._boardService = _boardService;
        _this._scoreService = _scoreService;
        _this._stateService = _stateService;
        _this.isDev = config_1.Config.isDev;
        _this.isBoardLoaded = false;
        _this.subscriptions.push(_boardService.gameBoardChange$
            .subscribe(function (board) { return _this.onGameBoardChange(board); }));
        _this.subscriptions.push(_stateService.stateChange$
            .subscribe(function (state) { return _this.onStateChange(state); }));
        return _this;
    }
    LevelOneComponent.prototype.ngOnInit = function () {
        this.consoleLogMsg('level-one.component', 'ngOnInit');
        this.onInit();
    };
    LevelOneComponent.prototype.onInit = function () {
        this.consoleLogMsg('level-one.component', 'onInitChange');
        var title = config_1.Config.title + ' - Level 1';
        if (config_1.Config.isDev) {
            title += ' (Dev Mode)';
        }
        this._boardService.initBoard(3, 3, title, 1, 0, 'level-two');
    };
    LevelOneComponent.prototype.onGameBoardChange = function (board) {
        this.consoleLogMsg('level-one.component', 'onGameBoardChange');
        this.board = board;
        this.isBoardLoaded = true;
        if (this._boardService.isGameOver()) {
            if (this._scoreService.isHighScore(this.board.moves, this.board.level)) {
                this.onHighScore();
            }
            else {
                this.onLowScore();
            }
        }
    };
    LevelOneComponent.prototype.onStateChange = function (state) {
        this.consoleLogMsg('level-one.component', 'onStateChange');
        if (this.isBoardLoaded && state && state.length) {
            var levelValue = this._stateService.getKeyValue('level'), stateLevel = levelValue && levelValue !== undefined ? Number(levelValue) : 1, boardLevel = this.board && this.board.level ? this.board.level : 1;
            if (this.isBoardLoaded && stateLevel > boardLevel) {
                this._router.navigate([
                    'game/:target', {
                        target: this.board.nextScreen
                    }
                ], config_1.Config.transition);
            }
        }
    };
    LevelOneComponent.prototype.onResetTap = function () {
        this.onInit();
    };
    LevelOneComponent.prototype.onSquareGesture = function (square) {
        this.consoleLogMsg('level-one.component', 'onSquareGesture');
        var squareB = this._boardService.emptySquare;
        if (!this._boardService.isEmpty(square) && this._boardService.isValidMove(square, squareB)) {
            this._boardService.moveSquare(square, squareB);
        }
    };
    LevelOneComponent.prototype.onLowScore = function () {
        var _this = this;
        Dialogs.confirm({
            title: 'W i n n e r',
            message: 'You solved the puzzle in ' + this.board.moves + ' moves!',
            okButtonText: 'Ok'
        }).then(function () {
            _this._stateService.updateLevel(2);
        });
    };
    LevelOneComponent.prototype.onHighScore = function () {
        var _this = this;
        Dialogs.confirm({
            title: 'W i n n e r',
            message: 'You solved the puzzle in ' + this.board.moves + ' moves!',
            okButtonText: 'Ok'
        }).then(function () {
            _this.isBoardLoaded = false;
            _this._stateService.updateLevel(2);
            _this._router.navigate([
                'add-high-score/:level:moves:caller', {
                    moves: _this.board.moves,
                    level: _this.board.level,
                    caller: _this.board.nextScreen
                }
            ], config_1.Config.transition);
        });
    };
    LevelOneComponent.prototype.onSkipLevelTap = function () {
        this.consoleLogMsg('level-one.component', 'onSkipLevelTap');
        this.onHighScore();
    };
    LevelOneComponent.prototype.onNavBtnTap = function () {
        this._router.navigate([''], config_1.Config.transition);
    };
    return LevelOneComponent;
}(base_1.Base));
LevelOneComponent = __decorate([
    core_1.Component({
        selector: 'level-one',
        templateUrl: 'pages/level-one/level-one.component.html',
        styleUrls: ['pages/level-one/level-one-common.css', 'pages/level-one/level-one.css'],
        providers: [board_service_1.BoardService, score_service_1.ScoreService, state_service_1.StateService]
    }),
    __metadata("design:paramtypes", [router_1.RouterExtensions,
        page_1.Page,
        board_service_1.BoardService,
        score_service_1.ScoreService,
        state_service_1.StateService])
], LevelOneComponent);
exports.LevelOneComponent = LevelOneComponent;
