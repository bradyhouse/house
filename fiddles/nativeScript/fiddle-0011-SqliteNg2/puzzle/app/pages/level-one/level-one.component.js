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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV2ZWwtb25lLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxldmVsLW9uZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFDbkMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFDM0IsV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUV2QyxzQ0FBZ0Q7QUFHaEQsZ0NBQTZCO0FBRTdCLHNEQUE2RDtBQUc3RCxtQ0FBZ0M7QUFDaEMsOENBQTJDO0FBRzNDLGtFQUE4RDtBQUM5RCxrRUFBOEQ7QUFFOUQsa0VBQThEO0FBUzlELElBQWEsaUJBQWlCO0lBQVMscUNBQUk7SUFNekMsMkJBQW9CLE9BQXlCLEVBQ3pCLEtBQVcsRUFDWCxhQUEyQixFQUMzQixhQUEyQixFQUMzQixhQUEyQjtRQUovQyxZQUtFLGlCQUFPLFNBZVI7UUFwQm1CLGFBQU8sR0FBUCxPQUFPLENBQWtCO1FBQ3pCLFdBQUssR0FBTCxLQUFLLENBQU07UUFDWCxtQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUMzQixtQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUMzQixtQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUc3QyxLQUFJLENBQUMsS0FBSyxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUM7UUFDMUIsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFFM0IsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQjthQUNuRCxTQUFTLENBQ1IsVUFBQyxLQUFVLElBQUssT0FBQSxLQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEVBQTdCLENBQTZCLENBQzlDLENBQUMsQ0FBQztRQUVMLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZO2FBQy9DLFNBQVMsQ0FDUixVQUFDLEtBQVUs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SztvQkFDdkIsTUFBTSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVTtpQkFDOUI7YUFDRixFQUFFLGVBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwwQ0FBYyxHQUFkO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsdUNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsZUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFSCx3QkFBQztBQUFELENBQUMsQUE5SEQsQ0FBdUMsV0FBSSxHQThIMUM7QUE5SFksaUJBQWlCO0lBTjdCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsV0FBVztRQUNyQixXQUFXLEVBQUUsMENBQTBDO1FBQ3ZELFNBQVMsRUFBRSxDQUFDLHNDQUFzQyxFQUFFLCtCQUErQixDQUFDO1FBQ3BGLFNBQVMsRUFBRSxDQUFDLDRCQUFZLEVBQUUsNEJBQVksRUFBRSw0QkFBWSxDQUFDO0tBQ3RELENBQUM7cUNBTzZCLHlCQUFnQjtRQUNsQixXQUFJO1FBQ0ksNEJBQVk7UUFDWiw0QkFBWTtRQUNaLDRCQUFZO0dBVnBDLGlCQUFpQixDQThIN0I7QUE5SFksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRGlhbG9ncyA9IHJlcXVpcmUoJ3VpL2RpYWxvZ3MnKSxcbiAgZnJhbWUgPSByZXF1aXJlKCd1aS9mcmFtZScpLFxuICBhcHBsaWNhdGlvbiA9IHJlcXVpcmUoJ2FwcGxpY2F0aW9uJyk7XG5cbmltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtWaWV3fSBmcm9tICd1aS9jb3JlL3ZpZXcnO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1BhZ2V9IGZyb20gJ3VpL3BhZ2UnO1xuaW1wb3J0IHtDb2xvcn0gZnJvbSAnY29sb3InO1xuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cblxuaW1wb3J0IHtCYXNlfSBmcm9tICcuLi8uLi9iYXNlJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuLi8uLi9zaGFyZWQvY29uZmlnJztcbmltcG9ydCB7Qm9hcmR9IGZyb20gJy4uLy4uL3NoYXJlZC9ib2FyZC9ib2FyZCc7XG5pbXBvcnQge1NxdWFyZX0gZnJvbSAnLi4vLi4vc2hhcmVkL2JvYXJkL3NxdWFyZSc7XG5pbXBvcnQge0JvYXJkU2VydmljZX0gZnJvbSAnLi4vLi4vc2hhcmVkL2JvYXJkL2JvYXJkLnNlcnZpY2UnO1xuaW1wb3J0IHtTY29yZVNlcnZpY2V9IGZyb20gJy4uLy4uL3NoYXJlZC9zY29yZS9zY29yZS5zZXJ2aWNlJztcbmltcG9ydCB7U3RhdGV9IGZyb20gJy4uLy4uL3NoYXJlZC9zdGF0ZS9TdGF0ZSc7XG5pbXBvcnQge1N0YXRlU2VydmljZX0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0YXRlL3N0YXRlLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xldmVsLW9uZScsXG4gIHRlbXBsYXRlVXJsOiAncGFnZXMvbGV2ZWwtb25lL2xldmVsLW9uZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwYWdlcy9sZXZlbC1vbmUvbGV2ZWwtb25lLWNvbW1vbi5jc3MnLCAncGFnZXMvbGV2ZWwtb25lL2xldmVsLW9uZS5jc3MnXSxcbiAgcHJvdmlkZXJzOiBbQm9hcmRTZXJ2aWNlLCBTY29yZVNlcnZpY2UsIFN0YXRlU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgTGV2ZWxPbmVDb21wb25lbnQgZXh0ZW5kcyBCYXNlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICBib2FyZDogQm9hcmQ7XG4gIGlzRGV2OiBCb29sZWFuO1xuICBpc0JvYXJkTG9hZGVkOiBCb29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfcGFnZTogUGFnZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfYm9hcmRTZXJ2aWNlOiBCb2FyZFNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3Njb3JlU2VydmljZTogU2NvcmVTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIF9zdGF0ZVNlcnZpY2U6IFN0YXRlU2VydmljZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmlzRGV2ID0gQ29uZmlnLmlzRGV2O1xuICAgIHRoaXMuaXNCb2FyZExvYWRlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goX2JvYXJkU2VydmljZS5nYW1lQm9hcmRDaGFuZ2UkXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoYm9hcmQ6IGFueSkgPT4gdGhpcy5vbkdhbWVCb2FyZENoYW5nZShib2FyZClcbiAgICAgICkpO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goX3N0YXRlU2VydmljZS5zdGF0ZUNoYW5nZSRcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIChzdGF0ZTogYW55KSA9PiB0aGlzLm9uU3RhdGVDaGFuZ2Uoc3RhdGUpXG4gICAgICApKTtcblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdsZXZlbC1vbmUuY29tcG9uZW50JywgJ25nT25Jbml0Jyk7XG4gICAgdGhpcy5vbkluaXQoKTtcbiAgfVxuXG4gIG9uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2xldmVsLW9uZS5jb21wb25lbnQnLCAnb25Jbml0Q2hhbmdlJyk7XG5cbiAgICBsZXQgdGl0bGUgPSBDb25maWcudGl0bGUgKyAnIC0gTGV2ZWwgMSc7XG5cbiAgICBpZiAoQ29uZmlnLmlzRGV2KSB7XG4gICAgICB0aXRsZSArPSAnIChEZXYgTW9kZSknO1xuICAgIH1cblxuICAgIHRoaXMuX2JvYXJkU2VydmljZS5pbml0Qm9hcmQoMywgMywgdGl0bGUsIDEsIDAsICdsZXZlbC10d28nKTtcbiAgfVxuXG4gIG9uR2FtZUJvYXJkQ2hhbmdlKGJvYXJkOiBCb2FyZCkge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnbGV2ZWwtb25lLmNvbXBvbmVudCcsICdvbkdhbWVCb2FyZENoYW5nZScpO1xuICAgIHRoaXMuYm9hcmQgPSBib2FyZDtcbiAgICB0aGlzLmlzQm9hcmRMb2FkZWQgPSB0cnVlO1xuICAgIGlmICh0aGlzLl9ib2FyZFNlcnZpY2UuaXNHYW1lT3ZlcigpKSB7XG4gICAgICBpZiAodGhpcy5fc2NvcmVTZXJ2aWNlLmlzSGlnaFNjb3JlKHRoaXMuYm9hcmQubW92ZXMsIHRoaXMuYm9hcmQubGV2ZWwpKSB7XG4gICAgICAgIHRoaXMub25IaWdoU2NvcmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub25Mb3dTY29yZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uU3RhdGVDaGFuZ2Uoc3RhdGU6IFN0YXRlW10pIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2xldmVsLW9uZS5jb21wb25lbnQnLCAnb25TdGF0ZUNoYW5nZScpO1xuICAgIGlmICh0aGlzLmlzQm9hcmRMb2FkZWQgJiYgc3RhdGUgJiYgc3RhdGUubGVuZ3RoKSB7XG4gICAgICBsZXQgbGV2ZWxWYWx1ZTogYW55ID0gdGhpcy5fc3RhdGVTZXJ2aWNlLmdldEtleVZhbHVlKCdsZXZlbCcpLFxuICAgICAgICBzdGF0ZUxldmVsOiBudW1iZXIgPSBsZXZlbFZhbHVlICYmIGxldmVsVmFsdWUgIT09IHVuZGVmaW5lZCA/IE51bWJlcihsZXZlbFZhbHVlKSA6IDEsXG4gICAgICAgIGJvYXJkTGV2ZWw6IG51bWJlciA9IHRoaXMuYm9hcmQgJiYgdGhpcy5ib2FyZC5sZXZlbCA/IHRoaXMuYm9hcmQubGV2ZWwgOiAxO1xuICAgICAgaWYgKHRoaXMuaXNCb2FyZExvYWRlZCAmJiBzdGF0ZUxldmVsID4gYm9hcmRMZXZlbCkge1xuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgICAgICdnYW1lLzp0YXJnZXQnLCB7XG4gICAgICAgICAgICB0YXJnZXQ6IHRoaXMuYm9hcmQubmV4dFNjcmVlblxuICAgICAgICAgIH1cbiAgICAgICAgXSwgQ29uZmlnLnRyYW5zaXRpb24pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uUmVzZXRUYXAoKTogdm9pZCB7XG4gICAgdGhpcy5vbkluaXQoKTtcbiAgfVxuXG4gIG9uU3F1YXJlR2VzdHVyZShzcXVhcmU6IFNxdWFyZSk6IHZvaWQge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnbGV2ZWwtb25lLmNvbXBvbmVudCcsICdvblNxdWFyZUdlc3R1cmUnKTtcblxuICAgIGxldCBzcXVhcmVCOiBTcXVhcmUgPSB0aGlzLl9ib2FyZFNlcnZpY2UuZW1wdHlTcXVhcmU7XG5cbiAgICBpZiAoIXRoaXMuX2JvYXJkU2VydmljZS5pc0VtcHR5KHNxdWFyZSkgJiYgdGhpcy5fYm9hcmRTZXJ2aWNlLmlzVmFsaWRNb3ZlKHNxdWFyZSwgc3F1YXJlQikpIHtcbiAgICAgIHRoaXMuX2JvYXJkU2VydmljZS5tb3ZlU3F1YXJlKHNxdWFyZSwgc3F1YXJlQik7XG4gICAgfVxuXG4gIH1cblxuICBvbkxvd1Njb3JlKCk6IHZvaWQge1xuICAgIERpYWxvZ3MuY29uZmlybSh7XG4gICAgICB0aXRsZTogJ1cgaSBuIG4gZSByJyxcbiAgICAgIG1lc3NhZ2U6ICdZb3Ugc29sdmVkIHRoZSBwdXp6bGUgaW4gJyArIHRoaXMuYm9hcmQubW92ZXMgKyAnIG1vdmVzIScsXG4gICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuX3N0YXRlU2VydmljZS51cGRhdGVMZXZlbCgyKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uSGlnaFNjb3JlKCk6IHZvaWQge1xuICAgIERpYWxvZ3MuY29uZmlybSh7XG4gICAgICB0aXRsZTogJ1cgaSBuIG4gZSByJyxcbiAgICAgIG1lc3NhZ2U6ICdZb3Ugc29sdmVkIHRoZSBwdXp6bGUgaW4gJyArIHRoaXMuYm9hcmQubW92ZXMgKyAnIG1vdmVzIScsXG4gICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuaXNCb2FyZExvYWRlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5fc3RhdGVTZXJ2aWNlLnVwZGF0ZUxldmVsKDIpO1xuICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgJ2FkZC1oaWdoLXNjb3JlLzpsZXZlbDptb3ZlczpjYWxsZXInLCB7XG4gICAgICAgICAgbW92ZXM6IHRoaXMuYm9hcmQubW92ZXMsXG4gICAgICAgICAgbGV2ZWw6IHRoaXMuYm9hcmQubGV2ZWwsXG4gICAgICAgICAgY2FsbGVyOiB0aGlzLmJvYXJkLm5leHRTY3JlZW5cbiAgICAgICAgfVxuICAgICAgXSwgQ29uZmlnLnRyYW5zaXRpb24pO1xuICAgIH0pO1xuICB9XG5cbiAgb25Ta2lwTGV2ZWxUYXAoKTogdm9pZCB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdsZXZlbC1vbmUuY29tcG9uZW50JywgJ29uU2tpcExldmVsVGFwJyk7XG4gICAgdGhpcy5vbkhpZ2hTY29yZSgpO1xuICB9XG5cbiAgb25OYXZCdG5UYXAoKTogdm9pZCB7XG4gICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnJ10sIENvbmZpZy50cmFuc2l0aW9uKTtcbiAgfVxuXG59XG4iXX0=