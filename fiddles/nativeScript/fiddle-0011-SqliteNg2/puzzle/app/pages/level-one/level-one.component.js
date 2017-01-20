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
        if (application.android) {
            application.android.on(application.AndroidApplication.activityBackPressedEvent, function () { return _this.onBackButtonPressed; });
        }
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
        this._boardService.initBoard(3, 3, config_1.Config.title + ' - Level 1', 1, 0, 'level-two');
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
            if (stateLevel > boardLevel) {
                this._router.navigate([this.board.nextScreen], config_1.Config.transitionWithoutHistory);
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
            _this._stateService.updateLevel(2);
            _this._router.navigate([
                'add-high-score/:level:moves:caller', {
                    moves: _this.board.moves,
                    level: _this.board.level,
                    caller: _this.board.nextScreen
                }
            ], config_1.Config.transitionWithHistory);
        });
    };
    LevelOneComponent.prototype.onSkipLevelTap = function () {
        this.consoleLogMsg('level-one.component', 'onSkipLevelTap');
        this.onHighScore();
    };
    LevelOneComponent.prototype.onBackButtonPressed = function () {
        this._router.navigate([''], config_1.Config.transitionWithoutHistory);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV2ZWwtb25lLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxldmVsLW9uZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFDbkMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFDM0IsV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUV2QyxzQ0FBZ0Q7QUFHaEQsZ0NBQTZCO0FBRTdCLHNEQUE2RDtBQUc3RCxtQ0FBZ0M7QUFDaEMsOENBQTJDO0FBRzNDLGtFQUE4RDtBQUM5RCxrRUFBOEQ7QUFFOUQsa0VBQThEO0FBUzlELElBQWEsaUJBQWlCO0lBQVMscUNBQUk7SUFNekMsMkJBQW9CLE9BQXlCLEVBQ3pCLEtBQVcsRUFDWCxhQUEyQixFQUMzQixhQUEyQixFQUMzQixhQUEyQjtRQUovQyxZQUtFLGlCQUFPLFNBbUJSO1FBeEJtQixhQUFPLEdBQVAsT0FBTyxDQUFrQjtRQUN6QixXQUFLLEdBQUwsS0FBSyxDQUFNO1FBQ1gsbUJBQWEsR0FBYixhQUFhLENBQWM7UUFDM0IsbUJBQWEsR0FBYixhQUFhLENBQWM7UUFDM0IsbUJBQWEsR0FBYixhQUFhLENBQWM7UUFHN0MsS0FBSSxDQUFDLEtBQUssR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFDO1FBQzFCLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBRTNCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyx3QkFBd0IsRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixFQUF4QixDQUF3QixDQUFDLENBQUM7UUFDbEgsQ0FBQztRQUVELEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FB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LEtBQUssQ0FBQyxVQUFVO2lCQUM5QjthQUNGLEVBQUUsZUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsMENBQWMsR0FBZDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELCtDQUFtQixHQUFuQjtRQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsZUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUdILHdCQUFDO0FBQUQsQ0FBQyxBQXZIRCxDQUF1QyxXQUFJLEdBdUgxQztBQXZIWSxpQkFBaUI7SUFON0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFdBQVcsRUFBRSwwQ0FBMEM7UUFDdkQsU0FBUyxFQUFFLENBQUMsc0NBQXNDLEVBQUUsK0JBQStCLENBQUM7UUFDcEYsU0FBUyxFQUFFLENBQUMsNEJBQVksRUFBRSw0QkFBWSxFQUFFLDRCQUFZLENBQUM7S0FDdEQsQ0FBQztxQ0FPNkIseUJBQWdCO1FBQ2xCLFdBQUk7UUFDSSw0QkFBWTtRQUNaLDRCQUFZO1FBQ1osNEJBQVk7R0FWcEMsaUJBQWlCLENBdUg3QjtBQXZIWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBEaWFsb2dzID0gcmVxdWlyZSgndWkvZGlhbG9ncycpLFxuICBmcmFtZSA9IHJlcXVpcmUoJ3VpL2ZyYW1lJyksXG4gIGFwcGxpY2F0aW9uID0gcmVxdWlyZSgnYXBwbGljYXRpb24nKTtcblxuaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1ZpZXd9IGZyb20gJ3VpL2NvcmUvdmlldyc7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7UGFnZX0gZnJvbSAndWkvcGFnZSc7XG5pbXBvcnQge0NvbG9yfSBmcm9tICdjb2xvcic7XG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcblxuXG5pbXBvcnQge0Jhc2V9IGZyb20gJy4uLy4uL2Jhc2UnO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4uLy4uL3NoYXJlZC9jb25maWcnO1xuaW1wb3J0IHtCb2FyZH0gZnJvbSAnLi4vLi4vc2hhcmVkL2JvYXJkL2JvYXJkJztcbmltcG9ydCB7U3F1YXJlfSBmcm9tICcuLi8uLi9zaGFyZWQvYm9hcmQvc3F1YXJlJztcbmltcG9ydCB7Qm9hcmRTZXJ2aWNlfSBmcm9tICcuLi8uLi9zaGFyZWQvYm9hcmQvYm9hcmQuc2VydmljZSc7XG5pbXBvcnQge1Njb3JlU2VydmljZX0gZnJvbSAnLi4vLi4vc2hhcmVkL3Njb3JlL3Njb3JlLnNlcnZpY2UnO1xuaW1wb3J0IHtTdGF0ZX0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0YXRlL1N0YXRlJztcbmltcG9ydCB7U3RhdGVTZXJ2aWNlfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RhdGUvc3RhdGUuc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGV2ZWwtb25lJyxcbiAgdGVtcGxhdGVVcmw6ICdwYWdlcy9sZXZlbC1vbmUvbGV2ZWwtb25lLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3BhZ2VzL2xldmVsLW9uZS9sZXZlbC1vbmUtY29tbW9uLmNzcycsICdwYWdlcy9sZXZlbC1vbmUvbGV2ZWwtb25lLmNzcyddLFxuICBwcm92aWRlcnM6IFtCb2FyZFNlcnZpY2UsIFNjb3JlU2VydmljZSwgU3RhdGVTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBMZXZlbE9uZUNvbXBvbmVudCBleHRlbmRzIEJhc2UgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGJvYXJkOiBCb2FyZDtcbiAgaXNEZXY6IEJvb2xlYW47XG4gIGlzQm9hcmRMb2FkZWQ6IEJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICAgICAgICBwcml2YXRlIF9wYWdlOiBQYWdlLFxuICAgICAgICAgICAgICBwcml2YXRlIF9ib2FyZFNlcnZpY2U6IEJvYXJkU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfc2NvcmVTZXJ2aWNlOiBTY29yZVNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3N0YXRlU2VydmljZTogU3RhdGVTZXJ2aWNlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaXNEZXYgPSBDb25maWcuaXNEZXY7XG4gICAgdGhpcy5pc0JvYXJkTG9hZGVkID0gZmFsc2U7XG5cbiAgICBpZiAoYXBwbGljYXRpb24uYW5kcm9pZCkge1xuICAgICAgYXBwbGljYXRpb24uYW5kcm9pZC5vbihhcHBsaWNhdGlvbi5BbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCAoKSA9PiB0aGlzLm9uQmFja0J1dHRvblByZXNzZWQpO1xuICAgIH1cblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKF9ib2FyZFNlcnZpY2UuZ2FtZUJvYXJkQ2hhbmdlJFxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKGJvYXJkOiBhbnkpID0+IHRoaXMub25HYW1lQm9hcmRDaGFuZ2UoYm9hcmQpXG4gICAgICApKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKF9zdGF0ZVNlcnZpY2Uuc3RhdGVDaGFuZ2UkXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoc3RhdGU6IGFueSkgPT4gdGhpcy5vblN0YXRlQ2hhbmdlKHN0YXRlKVxuICAgICAgKSk7XG5cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnbGV2ZWwtb25lLmNvbXBvbmVudCcsICduZ09uSW5pdCcpO1xuICAgIHRoaXMub25Jbml0KCk7XG4gIH1cblxuICBvbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdsZXZlbC1vbmUuY29tcG9uZW50JywgJ29uSW5pdENoYW5nZScpO1xuICAgIHRoaXMuX2JvYXJkU2VydmljZS5pbml0Qm9hcmQoMywgMywgQ29uZmlnLnRpdGxlICsgJyAtIExldmVsIDEnLCAxLCAwLCAnbGV2ZWwtdHdvJyk7XG4gIH1cblxuICBvbkdhbWVCb2FyZENoYW5nZShib2FyZDogQm9hcmQpIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2xldmVsLW9uZS5jb21wb25lbnQnLCAnb25HYW1lQm9hcmRDaGFuZ2UnKTtcbiAgICB0aGlzLmJvYXJkID0gYm9hcmQ7XG4gICAgdGhpcy5pc0JvYXJkTG9hZGVkID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5fYm9hcmRTZXJ2aWNlLmlzR2FtZU92ZXIoKSkge1xuICAgICAgaWYgKHRoaXMuX3Njb3JlU2VydmljZS5pc0hpZ2hTY29yZSh0aGlzLmJvYXJkLm1vdmVzLCB0aGlzLmJvYXJkLmxldmVsKSkge1xuICAgICAgICB0aGlzLm9uSGlnaFNjb3JlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uTG93U2NvcmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblN0YXRlQ2hhbmdlKHN0YXRlOiBTdGF0ZVtdKSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdsZXZlbC1vbmUuY29tcG9uZW50JywgJ29uU3RhdGVDaGFuZ2UnKTtcbiAgICBpZiAodGhpcy5pc0JvYXJkTG9hZGVkICYmIHN0YXRlICYmIHN0YXRlLmxlbmd0aCkge1xuICAgICAgbGV0IGxldmVsVmFsdWU6IGFueSA9IHRoaXMuX3N0YXRlU2VydmljZS5nZXRLZXlWYWx1ZSgnbGV2ZWwnKSxcbiAgICAgICAgc3RhdGVMZXZlbDogbnVtYmVyID0gbGV2ZWxWYWx1ZSAmJiBsZXZlbFZhbHVlICE9PSB1bmRlZmluZWQgPyBOdW1iZXIobGV2ZWxWYWx1ZSkgOiAxLFxuICAgICAgICBib2FyZExldmVsOiBudW1iZXIgPSB0aGlzLmJvYXJkICYmIHRoaXMuYm9hcmQubGV2ZWwgPyB0aGlzLmJvYXJkLmxldmVsIDogMTtcbiAgICAgIGlmIChzdGF0ZUxldmVsID4gYm9hcmRMZXZlbCkge1xuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW3RoaXMuYm9hcmQubmV4dFNjcmVlbl0sIENvbmZpZy50cmFuc2l0aW9uV2l0aG91dEhpc3RvcnkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uUmVzZXRUYXAoKTogdm9pZCB7XG4gICAgdGhpcy5vbkluaXQoKTtcbiAgfVxuXG4gIG9uU3F1YXJlR2VzdHVyZShzcXVhcmU6IFNxdWFyZSk6IHZvaWQge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnbGV2ZWwtb25lLmNvbXBvbmVudCcsICdvblNxdWFyZUdlc3R1cmUnKTtcblxuICAgIGxldCBzcXVhcmVCOiBTcXVhcmUgPSB0aGlzLl9ib2FyZFNlcnZpY2UuZW1wdHlTcXVhcmU7XG5cbiAgICBpZiAoIXRoaXMuX2JvYXJkU2VydmljZS5pc0VtcHR5KHNxdWFyZSkgJiYgdGhpcy5fYm9hcmRTZXJ2aWNlLmlzVmFsaWRNb3ZlKHNxdWFyZSwgc3F1YXJlQikpIHtcbiAgICAgIHRoaXMuX2JvYXJkU2VydmljZS5tb3ZlU3F1YXJlKHNxdWFyZSwgc3F1YXJlQik7XG4gICAgfVxuXG4gIH1cblxuICBvbkxvd1Njb3JlKCk6IHZvaWQge1xuICAgIERpYWxvZ3MuY29uZmlybSh7XG4gICAgICB0aXRsZTogJ1cgaSBuIG4gZSByJyxcbiAgICAgIG1lc3NhZ2U6ICdZb3Ugc29sdmVkIHRoZSBwdXp6bGUgaW4gJyArIHRoaXMuYm9hcmQubW92ZXMgKyAnIG1vdmVzIScsXG4gICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuX3N0YXRlU2VydmljZS51cGRhdGVMZXZlbCgyKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uSGlnaFNjb3JlKCk6IHZvaWQge1xuICAgIERpYWxvZ3MuY29uZmlybSh7XG4gICAgICB0aXRsZTogJ1cgaSBuIG4gZSByJyxcbiAgICAgIG1lc3NhZ2U6ICdZb3Ugc29sdmVkIHRoZSBwdXp6bGUgaW4gJyArIHRoaXMuYm9hcmQubW92ZXMgKyAnIG1vdmVzIScsXG4gICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuX3N0YXRlU2VydmljZS51cGRhdGVMZXZlbCgyKTtcbiAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXG4gICAgICAgICdhZGQtaGlnaC1zY29yZS86bGV2ZWw6bW92ZXM6Y2FsbGVyJywge1xuICAgICAgICAgIG1vdmVzOiB0aGlzLmJvYXJkLm1vdmVzLFxuICAgICAgICAgIGxldmVsOiB0aGlzLmJvYXJkLmxldmVsLFxuICAgICAgICAgIGNhbGxlcjogdGhpcy5ib2FyZC5uZXh0U2NyZWVuXG4gICAgICAgIH1cbiAgICAgIF0sIENvbmZpZy50cmFuc2l0aW9uV2l0aEhpc3RvcnkpO1xuICAgIH0pO1xuICB9XG5cbiAgb25Ta2lwTGV2ZWxUYXAoKTogdm9pZCB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdsZXZlbC1vbmUuY29tcG9uZW50JywgJ29uU2tpcExldmVsVGFwJyk7XG4gICAgdGhpcy5vbkhpZ2hTY29yZSgpO1xuICB9XG5cbiAgb25CYWNrQnV0dG9uUHJlc3NlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycnXSwgQ29uZmlnLnRyYW5zaXRpb25XaXRob3V0SGlzdG9yeSk7XG4gIH1cblxuXG59XG4iXX0=