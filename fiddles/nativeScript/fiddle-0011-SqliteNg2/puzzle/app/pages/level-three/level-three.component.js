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
var LevelThreeComponent = (function (_super) {
    __extends(LevelThreeComponent, _super);
    function LevelThreeComponent(_router, _page, _boardService, _scoreService, _stateService) {
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
    LevelThreeComponent.prototype.ngOnInit = function () {
        this.consoleLogMsg('level-three.component', 'ngOnInit');
        this.onInit();
    };
    LevelThreeComponent.prototype.onInit = function () {
        this.consoleLogMsg('level-three.component', 'onInitChange');
        var title = config_1.Config.title + ' - Level 3';
        if (config_1.Config.isDev) {
            title += ' (Dev Mode)';
        }
        this._boardService.initBoard(5, 5, title, 3, 0, 'level-three');
    };
    LevelThreeComponent.prototype.onGameBoardChange = function (board) {
        this.consoleLogMsg('level-three.component', 'onGameBoardChange');
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
    LevelThreeComponent.prototype.onStateChange = function (state) {
        this.consoleLogMsg('level-three.component', 'onStateChange');
        if (this.isBoardLoaded && state && state.length) {
            var levelValue = this._stateService.getKeyValue('level'), stateLevel = levelValue && levelValue !== undefined ? Number(levelValue) : 1, boardLevel = this.board && this.board.level ? this.board.level : 1;
            if (stateLevel > boardLevel) {
                this._router.navigate([
                    'game/:target', {
                        target: this.board.nextScreen
                    }
                ], config_1.Config.transition);
            }
        }
    };
    LevelThreeComponent.prototype.onResetTap = function () {
        this.onInit();
    };
    LevelThreeComponent.prototype.onSquareGesture = function (square) {
        this.consoleLogMsg('level-three.component', 'onSquareGesture');
        var squareB = this._boardService.emptySquare;
        if (!this._boardService.isEmpty(square) && this._boardService.isValidMove(square, squareB)) {
            this._boardService.moveSquare(square, squareB);
        }
    };
    LevelThreeComponent.prototype.onLowScore = function () {
        var _this = this;
        Dialogs.confirm({
            title: 'W i n n e r',
            message: 'You solved the puzzle in ' + this.board.moves + ' moves!',
            okButtonText: 'Ok'
        }).then(function () {
            _this._router.navigate([
                '/:target', {
                    target: _this.board.nextScreen
                }
            ], config_1.Config.transition);
        });
    };
    LevelThreeComponent.prototype.onHighScore = function () {
        var _this = this;
        this.consoleLogMsg('level-three.component', 'onHighScore');
        Dialogs.confirm({
            title: 'W i n n e r',
            message: 'You solved the puzzle in ' + this.board.moves + ' moves!',
            okButtonText: 'Ok'
        }).then(function () {
            _this._router.navigate([
                'add-high-score/:level:moves:caller', {
                    moves: _this.board.moves,
                    level: _this.board.level,
                    caller: _this.board.nextScreen
                }
            ], config_1.Config.transition);
        });
    };
    LevelThreeComponent.prototype.onSkipLevelTap = function () {
        this.consoleLogMsg('level-three.component', 'onSkipLevelTap');
        this.onHighScore();
    };
    LevelThreeComponent.prototype.onNavBtnTap = function () {
        this._router.navigate([''], config_1.Config.transition);
    };
    return LevelThreeComponent;
}(base_1.Base));
LevelThreeComponent = __decorate([
    core_1.Component({
        selector: 'level-three',
        templateUrl: 'pages/level-three/level-three.component.html',
        styleUrls: ['pages/level-three/level-three-common.css', 'pages/level-three/level-three.css'],
        providers: [board_service_1.BoardService, score_service_1.ScoreService, state_service_1.StateService]
    }),
    __metadata("design:paramtypes", [router_1.RouterExtensions,
        page_1.Page,
        board_service_1.BoardService,
        score_service_1.ScoreService,
        state_service_1.StateService])
], LevelThreeComponent);
exports.LevelThreeComponent = LevelThreeComponent;
