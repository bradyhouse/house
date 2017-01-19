"use strict";
var Dialogs = require('ui/dialogs'), frame = require('ui/frame');
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
        this._boardService.initBoard(5, 5, config_1.Config.title + ' - Level 3', 3, 0, 'level-n');
    };
    LevelThreeComponent.prototype.onGameBoardChange = function (board) {
        this.consoleLogMsg('level-three.component', 'onGameBoardChange');
        this.board = board;
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
        if (state && state.length) {
            var levelValue = this._stateService.getKeyValue('level'), stateLevel = levelValue && levelValue !== undefined ? Number(levelValue) : 1, boardLevel = this.board && this.board.level ? this.board.level : 1;
            if (stateLevel > boardLevel) {
                this._router.navigate([this.board.nextScreen], config_1.Config.transitionWithoutHistory);
            }
        }
    };
    LevelThreeComponent.prototype.onResetTap = function () {
        this.onInit();
    };
    LevelThreeComponent.prototype.onSquareTap = function (square) {
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
            ], config_1.Config.transitionWithoutHistory);
        });
    };
    LevelThreeComponent.prototype.onSkipLevelTap = function () {
        this.consoleLogMsg('level-three.component', 'onSkipLevelTap');
        this.onHighScore();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV2ZWwtdGhyZWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGV2ZWwtdGhyZWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQ25DLEtBQUssR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFOUIsc0NBQWdEO0FBR2hELGdDQUE2QjtBQUU3QixzREFBNkQ7QUFFN0QsbUNBQWdDO0FBQ2hDLDhDQUEyQztBQUczQyxrRUFBOEQ7QUFDOUQsa0VBQThEO0FBRTlELGtFQUE4RDtBQVM5RCxJQUFhLG1CQUFtQjtJQUFTLHVDQUFJO0lBSzNDLDZCQUFvQixPQUF5QixFQUN6QixLQUFXLEVBQ1gsYUFBMkIsRUFDM0IsYUFBMkIsRUFDM0IsYUFBMkI7UUFKL0MsWUFLRSxpQkFBTyxTQWNSO1FBbkJtQixhQUFPLEdBQVAsT0FBTyxDQUFrQjtRQUN6QixXQUFLLEdBQUwsS0FBSyxDQUFNO1FBQ1gsbUJBQWEsR0FBYixhQUFhLENBQWM7UUFDM0IsbUJBQWEsR0FBYixhQUFhLENBQWM7UUFDM0IsbUJBQWEsR0FBYixhQUFhLENBQWM7UUFHN0MsS0FBSSxDQUFDLEtBQUssR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFDO1FBRTFCLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0I7YUFDbkQsU0FBUyxDQUNSLFVBQUMsS0FBVSxJQUFLLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxFQUE3QixDQUE2QixDQUM5QyxDQUFDLENBQUM7UUFFTCxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWTthQUMvQyxTQUFTLENBQ1IsVUFBQyxLQUFVLElBQUssT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUF6QixDQUF5QixDQUMxQyxDQUFDLENBQUM7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Q0FBQztRQUM1RixTQUFTLEVBQUUsQ0FBQyw0QkFBWSxFQUFFLDRCQUFZLEVBQUUsNEJBQVksQ0FBQztLQUN0RCxDQUFDO3FDQU02Qix5QkFBZ0I7UUFDbEIsV0FBSTtRQUNJLDRCQUFZO1FBQ1osNEJBQVk7UUFDWiw0QkFBWTtHQVRwQyxtQkFBbUIsQ0EwRy9CO0FBMUdZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERpYWxvZ3MgPSByZXF1aXJlKCd1aS9kaWFsb2dzJyksXG4gIGZyYW1lID0gcmVxdWlyZSgndWkvZnJhbWUnKTtcblxuaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1ZpZXd9IGZyb20gJ3VpL2NvcmUvdmlldyc7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7UGFnZX0gZnJvbSAndWkvcGFnZSc7XG5pbXBvcnQge0NvbG9yfSBmcm9tICdjb2xvcic7XG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcblxuaW1wb3J0IHtCYXNlfSBmcm9tICcuLi8uLi9iYXNlJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuLi8uLi9zaGFyZWQvY29uZmlnJztcbmltcG9ydCB7Qm9hcmR9IGZyb20gJy4uLy4uL3NoYXJlZC9ib2FyZC9ib2FyZCc7XG5pbXBvcnQge1NxdWFyZX0gZnJvbSAnLi4vLi4vc2hhcmVkL2JvYXJkL3NxdWFyZSc7XG5pbXBvcnQge0JvYXJkU2VydmljZX0gZnJvbSAnLi4vLi4vc2hhcmVkL2JvYXJkL2JvYXJkLnNlcnZpY2UnO1xuaW1wb3J0IHtTY29yZVNlcnZpY2V9IGZyb20gJy4uLy4uL3NoYXJlZC9zY29yZS9zY29yZS5zZXJ2aWNlJztcbmltcG9ydCB7U3RhdGV9IGZyb20gJy4uLy4uL3NoYXJlZC9zdGF0ZS9TdGF0ZSc7XG5pbXBvcnQge1N0YXRlU2VydmljZX0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0YXRlL3N0YXRlLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xldmVsLXRocmVlJyxcbiAgdGVtcGxhdGVVcmw6ICdwYWdlcy9sZXZlbC10aHJlZS9sZXZlbC10aHJlZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwYWdlcy9sZXZlbC10aHJlZS9sZXZlbC10aHJlZS1jb21tb24uY3NzJywgJ3BhZ2VzL2xldmVsLXRocmVlL2xldmVsLXRocmVlLmNzcyddLFxuICBwcm92aWRlcnM6IFtCb2FyZFNlcnZpY2UsIFNjb3JlU2VydmljZSwgU3RhdGVTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBMZXZlbFRocmVlQ29tcG9uZW50IGV4dGVuZHMgQmFzZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgYm9hcmQ6IEJvYXJkO1xuICBpc0RldjogQm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3BhZ2U6IFBhZ2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2JvYXJkU2VydmljZTogQm9hcmRTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIF9zY29yZVNlcnZpY2U6IFNjb3JlU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfc3RhdGVTZXJ2aWNlOiBTdGF0ZVNlcnZpY2UpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5pc0RldiA9IENvbmZpZy5pc0RldjtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKF9ib2FyZFNlcnZpY2UuZ2FtZUJvYXJkQ2hhbmdlJFxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKGJvYXJkOiBhbnkpID0+IHRoaXMub25HYW1lQm9hcmRDaGFuZ2UoYm9hcmQpXG4gICAgICApKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKF9zdGF0ZVNlcnZpY2Uuc3RhdGVDaGFuZ2UkXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoc3RhdGU6IGFueSkgPT4gdGhpcy5vblN0YXRlQ2hhbmdlKHN0YXRlKVxuICAgICAgKSk7XG5cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnbGV2ZWwtdGhyZWUuY29tcG9uZW50JywgJ25nT25Jbml0Jyk7XG4gICAgdGhpcy5vbkluaXQoKTtcbiAgfVxuXG4gIG9uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2xldmVsLXRocmVlLmNvbXBvbmVudCcsICdvbkluaXRDaGFuZ2UnKTtcbiAgICB0aGlzLl9ib2FyZFNlcnZpY2UuaW5pdEJvYXJkKDUsIDUsIENvbmZpZy50aXRsZSArICcgLSBMZXZlbCAzJywgMywgMCwgJ2xldmVsLW4nKTtcbiAgfVxuXG4gIG9uR2FtZUJvYXJkQ2hhbmdlKGJvYXJkOiBCb2FyZCkge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnbGV2ZWwtdGhyZWUuY29tcG9uZW50JywgJ29uR2FtZUJvYXJkQ2hhbmdlJyk7XG4gICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xuICAgIGlmICh0aGlzLl9ib2FyZFNlcnZpY2UuaXNHYW1lT3ZlcigpKSB7XG4gICAgICBpZiAodGhpcy5fc2NvcmVTZXJ2aWNlLmlzSGlnaFNjb3JlKHRoaXMuYm9hcmQubW92ZXMsIHRoaXMuYm9hcmQubGV2ZWwpKSB7XG4gICAgICAgIHRoaXMub25IaWdoU2NvcmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub25Mb3dTY29yZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uU3RhdGVDaGFuZ2Uoc3RhdGU6IFN0YXRlW10pIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2xldmVsLXRocmVlLmNvbXBvbmVudCcsICdvblN0YXRlQ2hhbmdlJyk7XG4gICAgaWYgKHN0YXRlICYmIHN0YXRlLmxlbmd0aCkge1xuICAgICAgbGV0IGxldmVsVmFsdWU6IGFueSA9IHRoaXMuX3N0YXRlU2VydmljZS5nZXRLZXlWYWx1ZSgnbGV2ZWwnKSxcbiAgICAgICAgc3RhdGVMZXZlbDogbnVtYmVyID0gbGV2ZWxWYWx1ZSAmJiBsZXZlbFZhbHVlICE9PSB1bmRlZmluZWQgPyBOdW1iZXIobGV2ZWxWYWx1ZSkgOiAxLFxuICAgICAgICBib2FyZExldmVsOiBudW1iZXIgPSB0aGlzLmJvYXJkICYmIHRoaXMuYm9hcmQubGV2ZWwgPyB0aGlzLmJvYXJkLmxldmVsIDogMTtcbiAgICAgIGlmIChzdGF0ZUxldmVsID4gYm9hcmRMZXZlbCkge1xuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW3RoaXMuYm9hcmQubmV4dFNjcmVlbl0sIENvbmZpZy50cmFuc2l0aW9uV2l0aG91dEhpc3RvcnkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uUmVzZXRUYXAoKTogdm9pZCB7XG4gICAgdGhpcy5vbkluaXQoKTtcbiAgfVxuXG4gIG9uU3F1YXJlVGFwKHNxdWFyZTogU3F1YXJlKTogdm9pZCB7XG4gICAgbGV0IHNxdWFyZUI6IFNxdWFyZSA9IHRoaXMuX2JvYXJkU2VydmljZS5lbXB0eVNxdWFyZTtcblxuICAgIGlmICghdGhpcy5fYm9hcmRTZXJ2aWNlLmlzRW1wdHkoc3F1YXJlKSAmJiB0aGlzLl9ib2FyZFNlcnZpY2UuaXNWYWxpZE1vdmUoc3F1YXJlLCBzcXVhcmVCKSkge1xuICAgICAgdGhpcy5fYm9hcmRTZXJ2aWNlLm1vdmVTcXVhcmUoc3F1YXJlLCBzcXVhcmVCKTtcbiAgICB9XG5cbiAgfVxuXG4gIG9uTG93U2NvcmUoKTogdm9pZCB7XG4gICAgRGlhbG9ncy5jb25maXJtKHtcbiAgICAgIHRpdGxlOiAnVyBpIG4gbiBlIHInLFxuICAgICAgbWVzc2FnZTogJ1lvdSBzb2x2ZWQgdGhlIHB1enpsZSBpbiAnICsgdGhpcy5ib2FyZC5tb3ZlcyArICcgbW92ZXMhJyxcbiAgICAgIG9rQnV0dG9uVGV4dDogJ09rJ1xuICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5fc3RhdGVTZXJ2aWNlLnVwZGF0ZUxldmVsKDIpO1xuICAgIH0pO1xuICB9XG5cbiAgb25IaWdoU2NvcmUoKTogdm9pZCB7XG4gICAgRGlhbG9ncy5jb25maXJtKHtcbiAgICAgIHRpdGxlOiAnVyBpIG4gbiBlIHInLFxuICAgICAgbWVzc2FnZTogJ1lvdSBzb2x2ZWQgdGhlIHB1enpsZSBpbiAnICsgdGhpcy5ib2FyZC5tb3ZlcyArICcgbW92ZXMhJyxcbiAgICAgIG9rQnV0dG9uVGV4dDogJ09rJ1xuICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5fc3RhdGVTZXJ2aWNlLnVwZGF0ZUxldmVsKDIpO1xuICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgJ2FkZC1oaWdoLXNjb3JlLzpsZXZlbDptb3ZlczpjYWxsZXInLCB7XG4gICAgICAgICAgbW92ZXM6IHRoaXMuYm9hcmQubW92ZXMsXG4gICAgICAgICAgbGV2ZWw6IHRoaXMuYm9hcmQubGV2ZWwsXG4gICAgICAgICAgY2FsbGVyOiB0aGlzLmJvYXJkLm5leHRTY3JlZW5cbiAgICAgICAgfVxuICAgICAgXSwgQ29uZmlnLnRyYW5zaXRpb25XaXRob3V0SGlzdG9yeSk7XG4gICAgfSk7XG4gIH1cblxuICBvblNraXBMZXZlbFRhcCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2xldmVsLXRocmVlLmNvbXBvbmVudCcsICdvblNraXBMZXZlbFRhcCcpO1xuICAgIHRoaXMub25IaWdoU2NvcmUoKTtcbiAgfVxuXG5cbn1cbiJdfQ==