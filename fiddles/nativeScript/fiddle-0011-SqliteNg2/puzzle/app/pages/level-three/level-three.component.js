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
        if (application.android) {
            application.android.on(application.AndroidApplication.activityBackPressedEvent, function () { return _this.onBackButtonPressed; });
        }
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
        this._boardService.initBoard(5, 5, config_1.Config.title + ' - Level 3', 3, 0, 'level-three');
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
                this._router.navigate([this.board.nextScreen], config_1.Config.transitionWithoutHistory);
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
            _this._stateService.updateLevel(2);
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
    LevelThreeComponent.prototype.onSkipLevelTap = function () {
        this.consoleLogMsg('level-three.component', 'onSkipLevelTap');
        this.onHighScore();
    };
    LevelThreeComponent.prototype.onBackButtonPressed = function () {
        this._router.navigate([''], config_1.Config.transitionWithoutHistory);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV2ZWwtdGhyZWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGV2ZWwtdGhyZWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQ25DLEtBQUssR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQzNCLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFHdkMsc0NBQWdEO0FBR2hELGdDQUE2QjtBQUU3QixzREFBNkQ7QUFFN0QsbUNBQWdDO0FBQ2hDLDhDQUEyQztBQUczQyxrRUFBOEQ7QUFDOUQsa0VBQThEO0FBRTlELGtFQUE4RDtBQVM5RCxJQUFhLG1CQUFtQjtJQUFTLHVDQUFJO0lBTTNDLDZCQUFvQixPQUF5QixFQUN6QixLQUFXLEVBQ1gsYUFBMkIsRUFDM0IsYUFBMkIsRUFDM0IsYUFBMkI7UUFKL0MsWUFLRSxpQkFBTyxTQW1CUjtRQXhCbUIsYUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFDekIsV0FBSyxHQUFMLEtBQUssQ0FBTTtRQUNYLG1CQUFhLEdBQWIsYUFBYSxDQUFjO1FBQzNCLG1CQUFhLEdBQWIsYUFBYSxDQUFjO1FBQzNCLG1CQUFhLEdBQWIsYUFBYSxDQUFjO1FBRzdDLEtBQUksQ0FBQyxLQUFLLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQztRQUMxQixLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUUzQixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN4QixXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsd0JBQXdCLEVBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxtQkFBbUIsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO1FBQ2xILENBQUM7UUFFRCxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFh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SyxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztvQkFDdkIsTUFBTSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVTtpQkFDOUI7YUFDRixFQUFFLGVBQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDRDQUFjLEdBQWQ7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLHVCQUF1QixFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxpREFBbUIsR0FBbkI7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLGVBQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFSCwwQkFBQztBQUFELENBQUMsQUF2SEQsQ0FBeUMsV0FBSSxHQXVINUM7QUF2SFksbUJBQW1CO0lBTi9CLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsYUFBYTtRQUN2QixXQUFXLEVBQUUsOENBQThDO1FBQzNELFNBQVMsRUFBRSxDQUFDLDBDQUEwQyxFQUFFLG1DQUFtQyxDQUFDO1FBQzVGLFNBQVMsRUFBRSxDQUFDLDRCQUFZLEVBQUUsNEJBQVksRUFBRSw0QkFBWSxDQUFDO0tBQ3RELENBQUM7cUNBTzZCLHlCQUFnQjtRQUNsQixXQUFJO1FBQ0ksNEJBQVk7UUFDWiw0QkFBWTtRQUNaLDRCQUFZO0dBVnBDLG1CQUFtQixDQXVIL0I7QUF2SFksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRGlhbG9ncyA9IHJlcXVpcmUoJ3VpL2RpYWxvZ3MnKSxcbiAgZnJhbWUgPSByZXF1aXJlKCd1aS9mcmFtZScpLFxuICBhcHBsaWNhdGlvbiA9IHJlcXVpcmUoJ2FwcGxpY2F0aW9uJyk7XG5cblxuaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1ZpZXd9IGZyb20gJ3VpL2NvcmUvdmlldyc7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7UGFnZX0gZnJvbSAndWkvcGFnZSc7XG5pbXBvcnQge0NvbG9yfSBmcm9tICdjb2xvcic7XG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcblxuaW1wb3J0IHtCYXNlfSBmcm9tICcuLi8uLi9iYXNlJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuLi8uLi9zaGFyZWQvY29uZmlnJztcbmltcG9ydCB7Qm9hcmR9IGZyb20gJy4uLy4uL3NoYXJlZC9ib2FyZC9ib2FyZCc7XG5pbXBvcnQge1NxdWFyZX0gZnJvbSAnLi4vLi4vc2hhcmVkL2JvYXJkL3NxdWFyZSc7XG5pbXBvcnQge0JvYXJkU2VydmljZX0gZnJvbSAnLi4vLi4vc2hhcmVkL2JvYXJkL2JvYXJkLnNlcnZpY2UnO1xuaW1wb3J0IHtTY29yZVNlcnZpY2V9IGZyb20gJy4uLy4uL3NoYXJlZC9zY29yZS9zY29yZS5zZXJ2aWNlJztcbmltcG9ydCB7U3RhdGV9IGZyb20gJy4uLy4uL3NoYXJlZC9zdGF0ZS9TdGF0ZSc7XG5pbXBvcnQge1N0YXRlU2VydmljZX0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0YXRlL3N0YXRlLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xldmVsLXRocmVlJyxcbiAgdGVtcGxhdGVVcmw6ICdwYWdlcy9sZXZlbC10aHJlZS9sZXZlbC10aHJlZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwYWdlcy9sZXZlbC10aHJlZS9sZXZlbC10aHJlZS1jb21tb24uY3NzJywgJ3BhZ2VzL2xldmVsLXRocmVlL2xldmVsLXRocmVlLmNzcyddLFxuICBwcm92aWRlcnM6IFtCb2FyZFNlcnZpY2UsIFNjb3JlU2VydmljZSwgU3RhdGVTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBMZXZlbFRocmVlQ29tcG9uZW50IGV4dGVuZHMgQmFzZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgYm9hcmQ6IEJvYXJkO1xuICBpc0RldjogQm9vbGVhbjtcbiAgaXNCb2FyZExvYWRlZDogQm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3BhZ2U6IFBhZ2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2JvYXJkU2VydmljZTogQm9hcmRTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIF9zY29yZVNlcnZpY2U6IFNjb3JlU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfc3RhdGVTZXJ2aWNlOiBTdGF0ZVNlcnZpY2UpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5pc0RldiA9IENvbmZpZy5pc0RldjtcbiAgICB0aGlzLmlzQm9hcmRMb2FkZWQgPSBmYWxzZTtcblxuICAgIGlmIChhcHBsaWNhdGlvbi5hbmRyb2lkKSB7XG4gICAgICBhcHBsaWNhdGlvbi5hbmRyb2lkLm9uKGFwcGxpY2F0aW9uLkFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsICgpID0+IHRoaXMub25CYWNrQnV0dG9uUHJlc3NlZCk7XG4gICAgfVxuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goX2JvYXJkU2VydmljZS5nYW1lQm9hcmRDaGFuZ2UkXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoYm9hcmQ6IGFueSkgPT4gdGhpcy5vbkdhbWVCb2FyZENoYW5nZShib2FyZClcbiAgICAgICkpO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goX3N0YXRlU2VydmljZS5zdGF0ZUNoYW5nZSRcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIChzdGF0ZTogYW55KSA9PiB0aGlzLm9uU3RhdGVDaGFuZ2Uoc3RhdGUpXG4gICAgICApKTtcblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdsZXZlbC10aHJlZS5jb21wb25lbnQnLCAnbmdPbkluaXQnKTtcbiAgICB0aGlzLm9uSW5pdCgpO1xuICB9XG5cbiAgb25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnbGV2ZWwtdGhyZWUuY29tcG9uZW50JywgJ29uSW5pdENoYW5nZScpO1xuICAgIHRoaXMuX2JvYXJkU2VydmljZS5pbml0Qm9hcmQoNSwgNSwgQ29uZmlnLnRpdGxlICsgJyAtIExldmVsIDMnLCAzLCAwLCAnbGV2ZWwtdGhyZWUnKTtcbiAgfVxuXG4gIG9uR2FtZUJvYXJkQ2hhbmdlKGJvYXJkOiBCb2FyZCkge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnbGV2ZWwtdGhyZWUuY29tcG9uZW50JywgJ29uR2FtZUJvYXJkQ2hhbmdlJyk7XG4gICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xuICAgIHRoaXMuaXNCb2FyZExvYWRlZCA9IHRydWU7XG4gICAgaWYgKHRoaXMuX2JvYXJkU2VydmljZS5pc0dhbWVPdmVyKCkpIHtcbiAgICAgIGlmICh0aGlzLl9zY29yZVNlcnZpY2UuaXNIaWdoU2NvcmUodGhpcy5ib2FyZC5tb3ZlcywgdGhpcy5ib2FyZC5sZXZlbCkpIHtcbiAgICAgICAgdGhpcy5vbkhpZ2hTY29yZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vbkxvd1Njb3JlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25TdGF0ZUNoYW5nZShzdGF0ZTogU3RhdGVbXSkge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnbGV2ZWwtdGhyZWUuY29tcG9uZW50JywgJ29uU3RhdGVDaGFuZ2UnKTtcbiAgICBpZiAodGhpcy5pc0JvYXJkTG9hZGVkICYmIHN0YXRlICYmIHN0YXRlLmxlbmd0aCkge1xuICAgICAgbGV0IGxldmVsVmFsdWU6IGFueSA9IHRoaXMuX3N0YXRlU2VydmljZS5nZXRLZXlWYWx1ZSgnbGV2ZWwnKSxcbiAgICAgICAgc3RhdGVMZXZlbDogbnVtYmVyID0gbGV2ZWxWYWx1ZSAmJiBsZXZlbFZhbHVlICE9PSB1bmRlZmluZWQgPyBOdW1iZXIobGV2ZWxWYWx1ZSkgOiAxLFxuICAgICAgICBib2FyZExldmVsOiBudW1iZXIgPSB0aGlzLmJvYXJkICYmIHRoaXMuYm9hcmQubGV2ZWwgPyB0aGlzLmJvYXJkLmxldmVsIDogMTtcbiAgICAgIGlmIChzdGF0ZUxldmVsID4gYm9hcmRMZXZlbCkge1xuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW3RoaXMuYm9hcmQubmV4dFNjcmVlbl0sIENvbmZpZy50cmFuc2l0aW9uV2l0aG91dEhpc3RvcnkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uUmVzZXRUYXAoKTogdm9pZCB7XG4gICAgdGhpcy5vbkluaXQoKTtcbiAgfVxuXG4gIG9uU3F1YXJlR2VzdHVyZShzcXVhcmU6IFNxdWFyZSk6IHZvaWQge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnbGV2ZWwtdGhyZWUuY29tcG9uZW50JywgJ29uU3F1YXJlR2VzdHVyZScpO1xuXG4gICAgbGV0IHNxdWFyZUI6IFNxdWFyZSA9IHRoaXMuX2JvYXJkU2VydmljZS5lbXB0eVNxdWFyZTtcblxuICAgIGlmICghdGhpcy5fYm9hcmRTZXJ2aWNlLmlzRW1wdHkoc3F1YXJlKSAmJiB0aGlzLl9ib2FyZFNlcnZpY2UuaXNWYWxpZE1vdmUoc3F1YXJlLCBzcXVhcmVCKSkge1xuICAgICAgdGhpcy5fYm9hcmRTZXJ2aWNlLm1vdmVTcXVhcmUoc3F1YXJlLCBzcXVhcmVCKTtcbiAgICB9XG5cbiAgfVxuXG4gIG9uTG93U2NvcmUoKTogdm9pZCB7XG4gICAgRGlhbG9ncy5jb25maXJtKHtcbiAgICAgIHRpdGxlOiAnVyBpIG4gbiBlIHInLFxuICAgICAgbWVzc2FnZTogJ1lvdSBzb2x2ZWQgdGhlIHB1enpsZSBpbiAnICsgdGhpcy5ib2FyZC5tb3ZlcyArICcgbW92ZXMhJyxcbiAgICAgIG9rQnV0dG9uVGV4dDogJ09rJ1xuICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5fc3RhdGVTZXJ2aWNlLnVwZGF0ZUxldmVsKDIpO1xuICAgIH0pO1xuICB9XG5cbiAgb25IaWdoU2NvcmUoKTogdm9pZCB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdsZXZlbC10aHJlZS5jb21wb25lbnQnLCAnb25IaWdoU2NvcmUnKTtcbiAgICBEaWFsb2dzLmNvbmZpcm0oe1xuICAgICAgdGl0bGU6ICdXIGkgbiBuIGUgcicsXG4gICAgICBtZXNzYWdlOiAnWW91IHNvbHZlZCB0aGUgcHV6emxlIGluICcgKyB0aGlzLmJvYXJkLm1vdmVzICsgJyBtb3ZlcyEnLFxuICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgfSkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLl9zdGF0ZVNlcnZpY2UudXBkYXRlTGV2ZWwoMik7XG4gICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgICAnYWRkLWhpZ2gtc2NvcmUvOmxldmVsOm1vdmVzOmNhbGxlcicsIHtcbiAgICAgICAgICBtb3ZlczogdGhpcy5ib2FyZC5tb3ZlcyxcbiAgICAgICAgICBsZXZlbDogdGhpcy5ib2FyZC5sZXZlbCxcbiAgICAgICAgICBjYWxsZXI6IHRoaXMuYm9hcmQubmV4dFNjcmVlblxuICAgICAgICB9XG4gICAgICBdLCBDb25maWcudHJhbnNpdGlvbldpdGhIaXN0b3J5KTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uU2tpcExldmVsVGFwKCk6IHZvaWQge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnbGV2ZWwtdGhyZWUuY29tcG9uZW50JywgJ29uU2tpcExldmVsVGFwJyk7XG4gICAgdGhpcy5vbkhpZ2hTY29yZSgpO1xuICB9XG5cbiAgb25CYWNrQnV0dG9uUHJlc3NlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycnXSwgQ29uZmlnLnRyYW5zaXRpb25XaXRob3V0SGlzdG9yeSk7XG4gIH1cblxufVxuIl19