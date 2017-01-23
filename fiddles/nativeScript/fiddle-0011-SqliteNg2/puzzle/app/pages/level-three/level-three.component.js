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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV2ZWwtdGhyZWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGV2ZWwtdGhyZWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQ25DLEtBQUssR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQzNCLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFHdkMsc0NBQWdEO0FBR2hELGdDQUE2QjtBQUU3QixzREFBNkQ7QUFFN0QsbUNBQWdDO0FBQ2hDLDhDQUEyQztBQUczQyxrRUFBOEQ7QUFDOUQsa0VBQThEO0FBRTlELGtFQUE4RDtBQVM5RCxJQUFhLG1CQUFtQjtJQUFTLHVDQUFJO0lBTTNDLDZCQUFvQixPQUF5QixFQUN6QixLQUFXLEVBQ1gsYUFBMkIsRUFDM0IsYUFBMkIsRUFDM0IsYUFBMkI7UUFKL0MsWUFLRSxpQkFBTyxTQWVSO1FBcEJtQixhQUFPLEdBQVAsT0FBTyxDQUFrQjtRQUN6QixXQUFLLEdBQUwsS0FBSyxDQUFNO1FBQ1gsbUJBQWEsR0FBYixhQUFhLENBQWM7UUFDM0IsbUJBQWEsR0FBYixhQUFhLENBQWM7UUFDM0IsbUJBQWEsR0FBYixhQUFhLENBQWM7UUFHN0MsS0FBSSxDQUFDLEtBQUssR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFDO1FBQzFCLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBRTNCLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0I7YUFDbkQsU0FBUyxDQUNSLFVBQUMsS0FBVSxJQUFLLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxFQUE3QixDQUE2QixDQUM5QyxDQUFDLENBQUM7UUFFTCxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWTthQUMvQyxTQUFTLENBQ1IsVUFBQyxL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LEtBQUssRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7b0JBQ3ZCLE1BQU0sRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLFVBQVU7aUJBQzlCO2FBQ0YsRUFBRSxlQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsNENBQWMsR0FBZDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELHlDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLGVBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUgsMEJBQUM7QUFBRCxDQUFDLEFBaklELENBQXlDLFdBQUksR0FpSTVDO0FBaklZLG1CQUFtQjtJQU4vQixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGFBQWE7UUFDdkIsV0FBVyxFQUFFLDhDQUE4QztRQUMzRCxTQUFTLEVBQUUsQ0FBQywwQ0FBMEMsRUFBRSxtQ0FBbUMsQ0FBQztRQUM1RixTQUFTLEVBQUUsQ0FBQyw0QkFBWSxFQUFFLDRCQUFZLEVBQUUsNEJBQVksQ0FBQztLQUN0RCxDQUFDO3FDQU82Qix5QkFBZ0I7UUFDbEIsV0FBSTtRQUNJLDRCQUFZO1FBQ1osNEJBQVk7UUFDWiw0QkFBWTtHQVZwQyxtQkFBbUIsQ0FpSS9CO0FBaklZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERpYWxvZ3MgPSByZXF1aXJlKCd1aS9kaWFsb2dzJyksXG4gIGZyYW1lID0gcmVxdWlyZSgndWkvZnJhbWUnKSxcbiAgYXBwbGljYXRpb24gPSByZXF1aXJlKCdhcHBsaWNhdGlvbicpO1xuXG5cbmltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtWaWV3fSBmcm9tICd1aS9jb3JlL3ZpZXcnO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1BhZ2V9IGZyb20gJ3VpL3BhZ2UnO1xuaW1wb3J0IHtDb2xvcn0gZnJvbSAnY29sb3InO1xuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7QmFzZX0gZnJvbSAnLi4vLi4vYmFzZSc7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi4vLi4vc2hhcmVkL2NvbmZpZyc7XG5pbXBvcnQge0JvYXJkfSBmcm9tICcuLi8uLi9zaGFyZWQvYm9hcmQvYm9hcmQnO1xuaW1wb3J0IHtTcXVhcmV9IGZyb20gJy4uLy4uL3NoYXJlZC9ib2FyZC9zcXVhcmUnO1xuaW1wb3J0IHtCb2FyZFNlcnZpY2V9IGZyb20gJy4uLy4uL3NoYXJlZC9ib2FyZC9ib2FyZC5zZXJ2aWNlJztcbmltcG9ydCB7U2NvcmVTZXJ2aWNlfSBmcm9tICcuLi8uLi9zaGFyZWQvc2NvcmUvc2NvcmUuc2VydmljZSc7XG5pbXBvcnQge1N0YXRlfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RhdGUvU3RhdGUnO1xuaW1wb3J0IHtTdGF0ZVNlcnZpY2V9IGZyb20gJy4uLy4uL3NoYXJlZC9zdGF0ZS9zdGF0ZS5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsZXZlbC10aHJlZScsXG4gIHRlbXBsYXRlVXJsOiAncGFnZXMvbGV2ZWwtdGhyZWUvbGV2ZWwtdGhyZWUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsncGFnZXMvbGV2ZWwtdGhyZWUvbGV2ZWwtdGhyZWUtY29tbW9uLmNzcycsICdwYWdlcy9sZXZlbC10aHJlZS9sZXZlbC10aHJlZS5jc3MnXSxcbiAgcHJvdmlkZXJzOiBbQm9hcmRTZXJ2aWNlLCBTY29yZVNlcnZpY2UsIFN0YXRlU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgTGV2ZWxUaHJlZUNvbXBvbmVudCBleHRlbmRzIEJhc2UgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGJvYXJkOiBCb2FyZDtcbiAgaXNEZXY6IEJvb2xlYW47XG4gIGlzQm9hcmRMb2FkZWQ6IEJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICAgICAgICBwcml2YXRlIF9wYWdlOiBQYWdlLFxuICAgICAgICAgICAgICBwcml2YXRlIF9ib2FyZFNlcnZpY2U6IEJvYXJkU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfc2NvcmVTZXJ2aWNlOiBTY29yZVNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3N0YXRlU2VydmljZTogU3RhdGVTZXJ2aWNlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaXNEZXYgPSBDb25maWcuaXNEZXY7XG4gICAgdGhpcy5pc0JvYXJkTG9hZGVkID0gZmFsc2U7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChfYm9hcmRTZXJ2aWNlLmdhbWVCb2FyZENoYW5nZSRcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIChib2FyZDogYW55KSA9PiB0aGlzLm9uR2FtZUJvYXJkQ2hhbmdlKGJvYXJkKVxuICAgICAgKSk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChfc3RhdGVTZXJ2aWNlLnN0YXRlQ2hhbmdlJFxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKHN0YXRlOiBhbnkpID0+IHRoaXMub25TdGF0ZUNoYW5nZShzdGF0ZSlcbiAgICAgICkpO1xuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2xldmVsLXRocmVlLmNvbXBvbmVudCcsICduZ09uSW5pdCcpO1xuICAgIHRoaXMub25Jbml0KCk7XG4gIH1cblxuICBvbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdsZXZlbC10aHJlZS5jb21wb25lbnQnLCAnb25Jbml0Q2hhbmdlJyk7XG5cbiAgICBsZXQgdGl0bGUgPSBDb25maWcudGl0bGUgKyAnIC0gTGV2ZWwgMyc7XG5cbiAgICBpZiAoQ29uZmlnLmlzRGV2KSB7XG4gICAgICB0aXRsZSArPSAnIChEZXYgTW9kZSknO1xuICAgIH1cblxuICAgIHRoaXMuX2JvYXJkU2VydmljZS5pbml0Qm9hcmQoNSwgNSwgdGl0bGUsIDMsIDAsICdsZXZlbC10aHJlZScpO1xuICB9XG5cbiAgb25HYW1lQm9hcmRDaGFuZ2UoYm9hcmQ6IEJvYXJkKSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdsZXZlbC10aHJlZS5jb21wb25lbnQnLCAnb25HYW1lQm9hcmRDaGFuZ2UnKTtcbiAgICB0aGlzLmJvYXJkID0gYm9hcmQ7XG4gICAgdGhpcy5pc0JvYXJkTG9hZGVkID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5fYm9hcmRTZXJ2aWNlLmlzR2FtZU92ZXIoKSkge1xuICAgICAgaWYgKHRoaXMuX3Njb3JlU2VydmljZS5pc0hpZ2hTY29yZSh0aGlzLmJvYXJkLm1vdmVzLCB0aGlzLmJvYXJkLmxldmVsKSkge1xuICAgICAgICB0aGlzLm9uSGlnaFNjb3JlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uTG93U2NvcmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblN0YXRlQ2hhbmdlKHN0YXRlOiBTdGF0ZVtdKSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdsZXZlbC10aHJlZS5jb21wb25lbnQnLCAnb25TdGF0ZUNoYW5nZScpO1xuICAgIGlmICh0aGlzLmlzQm9hcmRMb2FkZWQgJiYgc3RhdGUgJiYgc3RhdGUubGVuZ3RoKSB7XG4gICAgICBsZXQgbGV2ZWxWYWx1ZTogYW55ID0gdGhpcy5fc3RhdGVTZXJ2aWNlLmdldEtleVZhbHVlKCdsZXZlbCcpLFxuICAgICAgICBzdGF0ZUxldmVsOiBudW1iZXIgPSBsZXZlbFZhbHVlICYmIGxldmVsVmFsdWUgIT09IHVuZGVmaW5lZCA/IE51bWJlcihsZXZlbFZhbHVlKSA6IDEsXG4gICAgICAgIGJvYXJkTGV2ZWw6IG51bWJlciA9IHRoaXMuYm9hcmQgJiYgdGhpcy5ib2FyZC5sZXZlbCA/IHRoaXMuYm9hcmQubGV2ZWwgOiAxO1xuICAgICAgaWYgKHN0YXRlTGV2ZWwgPiBib2FyZExldmVsKSB7XG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXG4gICAgICAgICAgJ2dhbWUvOnRhcmdldCcsIHtcbiAgICAgICAgICAgIHRhcmdldDogdGhpcy5ib2FyZC5uZXh0U2NyZWVuXG4gICAgICAgICAgfVxuICAgICAgICBdLCBDb25maWcudHJhbnNpdGlvbik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25SZXNldFRhcCgpOiB2b2lkIHtcbiAgICB0aGlzLm9uSW5pdCgpO1xuICB9XG5cbiAgb25TcXVhcmVHZXN0dXJlKHNxdWFyZTogU3F1YXJlKTogdm9pZCB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdsZXZlbC10aHJlZS5jb21wb25lbnQnLCAnb25TcXVhcmVHZXN0dXJlJyk7XG5cbiAgICBsZXQgc3F1YXJlQjogU3F1YXJlID0gdGhpcy5fYm9hcmRTZXJ2aWNlLmVtcHR5U3F1YXJlO1xuXG4gICAgaWYgKCF0aGlzLl9ib2FyZFNlcnZpY2UuaXNFbXB0eShzcXVhcmUpICYmIHRoaXMuX2JvYXJkU2VydmljZS5pc1ZhbGlkTW92ZShzcXVhcmUsIHNxdWFyZUIpKSB7XG4gICAgICB0aGlzLl9ib2FyZFNlcnZpY2UubW92ZVNxdWFyZShzcXVhcmUsIHNxdWFyZUIpO1xuICAgIH1cblxuICB9XG5cbiAgb25Mb3dTY29yZSgpOiB2b2lkIHtcbiAgICBEaWFsb2dzLmNvbmZpcm0oe1xuICAgICAgdGl0bGU6ICdXIGkgbiBuIGUgcicsXG4gICAgICBtZXNzYWdlOiAnWW91IHNvbHZlZCB0aGUgcHV6emxlIGluICcgKyB0aGlzLmJvYXJkLm1vdmVzICsgJyBtb3ZlcyEnLFxuICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgfSkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgICAnLzp0YXJnZXQnLCB7XG4gICAgICAgICAgdGFyZ2V0OiB0aGlzLmJvYXJkLm5leHRTY3JlZW5cbiAgICAgICAgfVxuICAgICAgXSwgQ29uZmlnLnRyYW5zaXRpb24pO1xuICAgIH0pO1xuICB9XG5cbiAgb25IaWdoU2NvcmUoKTogdm9pZCB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdsZXZlbC10aHJlZS5jb21wb25lbnQnLCAnb25IaWdoU2NvcmUnKTtcbiAgICBEaWFsb2dzLmNvbmZpcm0oe1xuICAgICAgdGl0bGU6ICdXIGkgbiBuIGUgcicsXG4gICAgICBtZXNzYWdlOiAnWW91IHNvbHZlZCB0aGUgcHV6emxlIGluICcgKyB0aGlzLmJvYXJkLm1vdmVzICsgJyBtb3ZlcyEnLFxuICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgfSkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgICAnYWRkLWhpZ2gtc2NvcmUvOmxldmVsOm1vdmVzOmNhbGxlcicsIHtcbiAgICAgICAgICBtb3ZlczogdGhpcy5ib2FyZC5tb3ZlcyxcbiAgICAgICAgICBsZXZlbDogdGhpcy5ib2FyZC5sZXZlbCxcbiAgICAgICAgICBjYWxsZXI6IHRoaXMuYm9hcmQubmV4dFNjcmVlblxuICAgICAgICB9XG4gICAgICBdLCBDb25maWcudHJhbnNpdGlvbik7XG4gICAgfSk7XG4gIH1cblxuICBvblNraXBMZXZlbFRhcCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2xldmVsLXRocmVlLmNvbXBvbmVudCcsICdvblNraXBMZXZlbFRhcCcpO1xuICAgIHRoaXMub25IaWdoU2NvcmUoKTtcbiAgfVxuXG4gIG9uTmF2QnRuVGFwKCk6IHZvaWQge1xuICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJyddLCBDb25maWcudHJhbnNpdGlvbik7XG4gIH1cblxufVxuIl19