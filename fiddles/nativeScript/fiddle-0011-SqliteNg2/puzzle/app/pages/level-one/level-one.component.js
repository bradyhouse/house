"use strict";
var Dialogs = require('ui/dialogs'), frame = require('ui/frame');
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
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
        _this.subscriptions.push(_boardService.gameBoardChange$
            .subscribe(function (board) { return _this.onGameBoardChange(board); }));
        _this.subscriptions.push(_stateService.stateChange$
            .subscribe(function (state) { return _this.onStateChange(state); }));
        return _this;
    }
    LevelOneComponent.prototype.ngOnInit = function () {
        this.onInit();
    };
    LevelOneComponent.prototype.onInit = function () {
        this._boardService.initBoard(3, 3, config_1.Config.title + ' - Level 1', 1, 0, 'level-two');
    };
    LevelOneComponent.prototype.onGameBoardChange = function (board) {
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
    LevelOneComponent.prototype.onStateChange = function (state) {
        this.consoleLogMsg('level-one.component', 'onStateChange');
        if (state && state.length) {
            var levelValue = this._stateService.getKeyValue('level'), stateLevel = levelValue && levelValue !== 'undefined' ? Number(levelValue) : 1, boardLevel = this.board.level;
            if (stateLevel > boardLevel) {
                this._router.navigate([this.board.nextScreen]);
            }
        }
    };
    LevelOneComponent.prototype.onResetTap = function () {
        this.onInit();
    };
    LevelOneComponent.prototype.onSquareTap = function (square) {
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
                    caller: _this.board.nextScreen,
                    clearHistory: true
                }
            ]);
        });
    };
    LevelOneComponent.prototype.onSkipLevelTap = function () {
        this.consoleLogMsg('level-one.component', 'onSkipLevelTap');
        this.onHighScore();
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
    __metadata("design:paramtypes", [router_1.Router,
        page_1.Page,
        board_service_1.BoardService,
        score_service_1.ScoreService,
        state_service_1.StateService])
], LevelOneComponent);
exports.LevelOneComponent = LevelOneComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV2ZWwtb25lLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxldmVsLW9uZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFDbkMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUU5QixzQ0FBZ0Q7QUFFaEQsMENBQXVDO0FBQ3ZDLGdDQUE2QjtBQUc3QixtQ0FBZ0M7QUFDaEMsOENBQTJDO0FBRzNDLGtFQUE4RDtBQUM5RCxrRUFBOEQ7QUFFOUQsa0VBQThEO0FBUzlELElBQWEsaUJBQWlCO0lBQVMscUNBQUk7SUFLekMsMkJBQW9CLE9BQWUsRUFDZixLQUFXLEVBQ1gsYUFBMkIsRUFDM0IsYUFBMkIsRUFDM0IsYUFBMkI7UUFKL0MsWUFLRSxpQkFBTyxTQWNSO1FBbkJtQixhQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsV0FBSyxHQUFMLEtBQUssQ0FBTTtRQUNYLG1CQUFhLEdBQWIsYUFBYSxDQUFjO1FBQzNCLG1CQUFhLEdBQWIsYUFBYSxDQUFjO1FBQzNCLG1CQUFhLEdBQWIsYUFBYSxDQUFjO1FBRzdDLEtBQUksQ0FBQyxLQUFLLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQztRQUUxQixLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCO2FBQ25ELFNBQVMsQ0FDUixVQUFDLEtBQVUsSUFBSyxPQUFBLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsRUFBN0IsQ0FBNkIsQ0FDOUMsQ0FBQyxDQUFDO1FBRUwsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVk7YUFDL0MsU0FBUyxDQUNSLFVBQUMsS0FBVSxJQUFLLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBekIsQ0FBeUIsQ0FDMUMsQ0FBQyxDQUFDOztJQUVQLENB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QyxLQUFLLENBQUMsS0FBSyxHQUFHLFNBQVM7WUFDbkUsWUFBWSxFQUFFLElBQUk7U0FDbkIsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNOLEtBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO2dCQUNwQixvQ0FBb0MsRUFBRTtvQkFDcEMsS0FBSyxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztvQkFDdkIsS0FBSyxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztvQkFDdkIsTUFBTSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVTtvQkFDN0IsWUFBWSxFQUFFLElBQUk7aUJBQ25CO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsMENBQWMsR0FBZDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUdILHdCQUFDO0FBQUQsQ0FBQyxBQXhHRCxDQUF1QyxXQUFJLEdBd0cxQztBQXhHWSxpQkFBaUI7SUFON0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFdBQVcsRUFBRSwwQ0FBMEM7UUFDdkQsU0FBUyxFQUFFLENBQUMsc0NBQXNDLEVBQUUsK0JBQStCLENBQUM7UUFDcEYsU0FBUyxFQUFFLENBQUMsNEJBQVksRUFBRSw0QkFBWSxFQUFFLDRCQUFZLENBQUM7S0FDdEQsQ0FBQztxQ0FNNkIsZUFBTTtRQUNSLFdBQUk7UUFDSSw0QkFBWTtRQUNaLDRCQUFZO1FBQ1osNEJBQVk7R0FUcEMsaUJBQWlCLENBd0c3QjtBQXhHWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBEaWFsb2dzID0gcmVxdWlyZSgndWkvZGlhbG9ncycpLFxuICBmcmFtZSA9IHJlcXVpcmUoJ3VpL2ZyYW1lJyk7XG5cbmltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtWaWV3fSBmcm9tICd1aS9jb3JlL3ZpZXcnO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1BhZ2V9IGZyb20gJ3VpL3BhZ2UnO1xuaW1wb3J0IHtDb2xvcn0gZnJvbSAnY29sb3InO1xuXG5pbXBvcnQge0Jhc2V9IGZyb20gJy4uLy4uL2Jhc2UnO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4uLy4uL3NoYXJlZC9jb25maWcnO1xuaW1wb3J0IHtCb2FyZH0gZnJvbSAnLi4vLi4vc2hhcmVkL2JvYXJkL2JvYXJkJztcbmltcG9ydCB7U3F1YXJlfSBmcm9tICcuLi8uLi9zaGFyZWQvYm9hcmQvc3F1YXJlJztcbmltcG9ydCB7Qm9hcmRTZXJ2aWNlfSBmcm9tICcuLi8uLi9zaGFyZWQvYm9hcmQvYm9hcmQuc2VydmljZSc7XG5pbXBvcnQge1Njb3JlU2VydmljZX0gZnJvbSAnLi4vLi4vc2hhcmVkL3Njb3JlL3Njb3JlLnNlcnZpY2UnO1xuaW1wb3J0IHtTdGF0ZX0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0YXRlL1N0YXRlJztcbmltcG9ydCB7U3RhdGVTZXJ2aWNlfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RhdGUvc3RhdGUuc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGV2ZWwtb25lJyxcbiAgdGVtcGxhdGVVcmw6ICdwYWdlcy9sZXZlbC1vbmUvbGV2ZWwtb25lLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3BhZ2VzL2xldmVsLW9uZS9sZXZlbC1vbmUtY29tbW9uLmNzcycsICdwYWdlcy9sZXZlbC1vbmUvbGV2ZWwtb25lLmNzcyddLFxuICBwcm92aWRlcnM6IFtCb2FyZFNlcnZpY2UsIFNjb3JlU2VydmljZSwgU3RhdGVTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBMZXZlbE9uZUNvbXBvbmVudCBleHRlbmRzIEJhc2UgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGJvYXJkOiBCb2FyZDtcbiAgaXNEZXY6IEJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3BhZ2U6IFBhZ2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2JvYXJkU2VydmljZTogQm9hcmRTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIF9zY29yZVNlcnZpY2U6IFNjb3JlU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfc3RhdGVTZXJ2aWNlOiBTdGF0ZVNlcnZpY2UpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5pc0RldiA9IENvbmZpZy5pc0RldjtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKF9ib2FyZFNlcnZpY2UuZ2FtZUJvYXJkQ2hhbmdlJFxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKGJvYXJkOiBhbnkpID0+IHRoaXMub25HYW1lQm9hcmRDaGFuZ2UoYm9hcmQpXG4gICAgICApKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKF9zdGF0ZVNlcnZpY2Uuc3RhdGVDaGFuZ2UkXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoc3RhdGU6IGFueSkgPT4gdGhpcy5vblN0YXRlQ2hhbmdlKHN0YXRlKVxuICAgICAgKSk7XG5cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub25Jbml0KCk7XG4gIH1cblxuICBvbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fYm9hcmRTZXJ2aWNlLmluaXRCb2FyZCgzLCAzLCBDb25maWcudGl0bGUgKyAnIC0gTGV2ZWwgMScsIDEsIDAsICdsZXZlbC10d28nKTtcbiAgfVxuXG4gIG9uR2FtZUJvYXJkQ2hhbmdlKGJvYXJkOiBCb2FyZCkge1xuICAgIHRoaXMuYm9hcmQgPSBib2FyZDtcbiAgICBpZiAodGhpcy5fYm9hcmRTZXJ2aWNlLmlzR2FtZU92ZXIoKSkge1xuICAgICAgaWYgKHRoaXMuX3Njb3JlU2VydmljZS5pc0hpZ2hTY29yZSh0aGlzLmJvYXJkLm1vdmVzLCB0aGlzLmJvYXJkLmxldmVsKSkge1xuICAgICAgICB0aGlzLm9uSGlnaFNjb3JlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uTG93U2NvcmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblN0YXRlQ2hhbmdlKHN0YXRlOiBTdGF0ZVtdKSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdsZXZlbC1vbmUuY29tcG9uZW50JywgJ29uU3RhdGVDaGFuZ2UnKTtcbiAgICBpZiAoc3RhdGUgJiYgc3RhdGUubGVuZ3RoKSB7XG4gICAgICBsZXQgbGV2ZWxWYWx1ZTogYW55ID0gdGhpcy5fc3RhdGVTZXJ2aWNlLmdldEtleVZhbHVlKCdsZXZlbCcpLFxuICAgICAgICBzdGF0ZUxldmVsOiBudW1iZXIgPSBsZXZlbFZhbHVlICYmIGxldmVsVmFsdWUgIT09ICd1bmRlZmluZWQnID8gTnVtYmVyKGxldmVsVmFsdWUpIDogMSxcbiAgICAgICAgYm9hcmRMZXZlbDogbnVtYmVyID0gdGhpcy5ib2FyZC5sZXZlbDtcbiAgICAgIGlmIChzdGF0ZUxldmVsID4gYm9hcmRMZXZlbCkge1xuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW3RoaXMuYm9hcmQubmV4dFNjcmVlbl0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uUmVzZXRUYXAoKTogdm9pZCB7XG4gICAgdGhpcy5vbkluaXQoKTtcbiAgfVxuXG4gIG9uU3F1YXJlVGFwKHNxdWFyZTogU3F1YXJlKTogdm9pZCB7XG4gICAgbGV0IHNxdWFyZUI6IFNxdWFyZSA9IHRoaXMuX2JvYXJkU2VydmljZS5lbXB0eVNxdWFyZTtcblxuICAgIGlmICghdGhpcy5fYm9hcmRTZXJ2aWNlLmlzRW1wdHkoc3F1YXJlKSAmJiB0aGlzLl9ib2FyZFNlcnZpY2UuaXNWYWxpZE1vdmUoc3F1YXJlLCBzcXVhcmVCKSkge1xuICAgICAgdGhpcy5fYm9hcmRTZXJ2aWNlLm1vdmVTcXVhcmUoc3F1YXJlLCBzcXVhcmVCKTtcbiAgICB9XG5cbiAgfVxuXG4gIG9uTG93U2NvcmUoKTogdm9pZCB7XG4gICAgRGlhbG9ncy5jb25maXJtKHtcbiAgICAgIHRpdGxlOiAnVyBpIG4gbiBlIHInLFxuICAgICAgbWVzc2FnZTogJ1lvdSBzb2x2ZWQgdGhlIHB1enpsZSBpbiAnICsgdGhpcy5ib2FyZC5tb3ZlcyArICcgbW92ZXMhJyxcbiAgICAgIG9rQnV0dG9uVGV4dDogJ09rJ1xuICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5fc3RhdGVTZXJ2aWNlLnVwZGF0ZUxldmVsKDIpO1xuICAgIH0pO1xuICB9XG5cbiAgb25IaWdoU2NvcmUoKTogdm9pZCB7XG4gICAgRGlhbG9ncy5jb25maXJtKHtcbiAgICAgIHRpdGxlOiAnVyBpIG4gbiBlIHInLFxuICAgICAgbWVzc2FnZTogJ1lvdSBzb2x2ZWQgdGhlIHB1enpsZSBpbiAnICsgdGhpcy5ib2FyZC5tb3ZlcyArICcgbW92ZXMhJyxcbiAgICAgIG9rQnV0dG9uVGV4dDogJ09rJ1xuICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5fc3RhdGVTZXJ2aWNlLnVwZGF0ZUxldmVsKDIpO1xuICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgJ2FkZC1oaWdoLXNjb3JlLzpsZXZlbDptb3ZlczpjYWxsZXInLCB7XG4gICAgICAgICAgbW92ZXM6IHRoaXMuYm9hcmQubW92ZXMsXG4gICAgICAgICAgbGV2ZWw6IHRoaXMuYm9hcmQubGV2ZWwsXG4gICAgICAgICAgY2FsbGVyOiB0aGlzLmJvYXJkLm5leHRTY3JlZW4sXG4gICAgICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF0pO1xuICAgIH0pO1xuICB9XG5cbiAgb25Ta2lwTGV2ZWxUYXAoKTogdm9pZCB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdsZXZlbC1vbmUuY29tcG9uZW50JywgJ29uU2tpcExldmVsVGFwJyk7XG4gICAgdGhpcy5vbkhpZ2hTY29yZSgpO1xuICB9XG5cblxufVxuIl19