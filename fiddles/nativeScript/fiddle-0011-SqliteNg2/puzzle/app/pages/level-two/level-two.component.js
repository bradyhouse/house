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
var LevelTwoComponent = (function (_super) {
    __extends(LevelTwoComponent, _super);
    function LevelTwoComponent(_router, _page, _boardService, _scoreService, _stateService) {
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
    LevelTwoComponent.prototype.ngOnInit = function () {
        this.consoleLogMsg('level-two.component', 'ngOnInit');
        this.onInit();
    };
    LevelTwoComponent.prototype.onInit = function () {
        this.consoleLogMsg('level-two.component', 'onInitChange');
        var title = config_1.Config.title + ' - Level 2';
        if (config_1.Config.isDev) {
            title += ' (Dev Mode)';
        }
        this._boardService.initBoard(4, 4, title, 2, 0, 'level-three');
    };
    LevelTwoComponent.prototype.onGameBoardChange = function (board) {
        this.consoleLogMsg('level-two.component', 'onGameBoardChange');
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
    LevelTwoComponent.prototype.onStateChange = function (state) {
        this.consoleLogMsg('level-two.component', 'onStateChange');
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
    LevelTwoComponent.prototype.onResetTap = function () {
        this.consoleLogMsg('level-two.component', 'onResetTap');
        this.onInit();
    };
    LevelTwoComponent.prototype.onSquareGesture = function (square) {
        this.consoleLogMsg('level-two.component', 'onSquareGesture');
        var squareB = this._boardService.emptySquare;
        if (!this._boardService.isEmpty(square) && this._boardService.isValidMove(square, squareB)) {
            this._boardService.moveSquare(square, squareB);
        }
    };
    LevelTwoComponent.prototype.onLowScore = function () {
        var _this = this;
        Dialogs.confirm({
            title: 'W i n n e r',
            message: 'You solved the puzzle in ' + this.board.moves + ' moves!',
            okButtonText: 'Ok'
        }).then(function () {
            _this._stateService.updateLevel(3);
        });
    };
    LevelTwoComponent.prototype.onHighScore = function () {
        var _this = this;
        this.consoleLogMsg('level-two.component', 'onHighScore');
        Dialogs.confirm({
            title: 'W i n n e r',
            message: 'You solved the puzzle in ' + this.board.moves + ' moves!',
            okButtonText: 'Ok'
        }).then(function () {
            _this.isBoardLoaded = false;
            _this._stateService.updateLevel(3);
            _this._router.navigate([
                'add-high-score/:level:moves:caller', {
                    moves: _this.board.moves,
                    level: _this.board.level,
                    caller: _this.board.nextScreen
                }
            ], config_1.Config.transition);
        });
    };
    LevelTwoComponent.prototype.onSkipLevelTap = function () {
        this.consoleLogMsg('level-two.component', 'onSkipLevelTap');
        this.onHighScore();
    };
    LevelTwoComponent.prototype.onNavBtnTap = function () {
        this._router.navigate([''], config_1.Config.transition);
    };
    return LevelTwoComponent;
}(base_1.Base));
LevelTwoComponent = __decorate([
    core_1.Component({
        selector: 'level-two',
        templateUrl: 'pages/level-two/level-two.component.html',
        styleUrls: ['pages/level-two/level-two-common.css', 'pages/level-two/level-two.css'],
        providers: [board_service_1.BoardService, score_service_1.ScoreService, state_service_1.StateService]
    }),
    __metadata("design:paramtypes", [router_1.RouterExtensions,
        page_1.Page,
        board_service_1.BoardService,
        score_service_1.ScoreService,
        state_service_1.StateService])
], LevelTwoComponent);
exports.LevelTwoComponent = LevelTwoComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV2ZWwtdHdvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxldmVsLXR3by5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFDbkMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFDM0IsV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUV2QyxzQ0FBZ0Q7QUFHaEQsZ0NBQTZCO0FBRzdCLHNEQUE2RDtBQUk3RCxtQ0FBZ0M7QUFDaEMsOENBQTJDO0FBRzNDLGtFQUE4RDtBQUM5RCxrRUFBOEQ7QUFFOUQsa0VBQThEO0FBUzlELElBQWEsaUJBQWlCO0lBQVMscUNBQUk7SUFNekMsMkJBQW9CLE9BQXlCLEVBQ3pCLEtBQVcsRUFDWCxhQUEyQixFQUMzQixhQUEyQixFQUMzQixhQUEyQjtRQUovQyxZQUtFLGlCQUFPLFNBZVI7UUFwQm1CLGFBQU8sR0FBUCxPQUFPLENBQWtCO1FBQ3pCLFdBQUssR0FBTCxLQUFLLENBQU07UUFDWCxtQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUMzQixtQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUMzQixtQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUc3QyxLQUFJLENBQUMsS0FBSyxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUM7UUFDMUIsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFFM0IsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQjthQUNuRCxTQUFTLENBQ1IsVUFBQyxLQUFVLElBQUssT0FBQSxLQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEVBQTdCLENBQTZCLENBQzlDLENBQUMsQ0FBQztRQUVMLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZO2FBQy9DLFNBQVMsQ0FDUixVQUFDLEtBQVUs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LENBQUM7Z0JBQ3BCLG9DQUFvQyxFQUFFO29CQUNwQyxLQUFLLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO29CQUN2QixLQUFLLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO29CQUN2QixNQUFNLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO2lCQUM5QjthQUNGLEVBQUUsZUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDBDQUFjLEdBQWQ7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCx1Q0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxlQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVILHdCQUFDO0FBQUQsQ0FBQyxBQTlIRCxDQUF1QyxXQUFJLEdBOEgxQztBQTlIWSxpQkFBaUI7SUFON0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFdBQVcsRUFBRSwwQ0FBMEM7UUFDdkQsU0FBUyxFQUFFLENBQUMsc0NBQXNDLEVBQUUsK0JBQStCLENBQUM7UUFDcEYsU0FBUyxFQUFFLENBQUMsNEJBQVksRUFBRSw0QkFBWSxFQUFFLDRCQUFZLENBQUM7S0FDdEQsQ0FBQztxQ0FPNkIseUJBQWdCO1FBQ2xCLFdBQUk7UUFDSSw0QkFBWTtRQUNaLDRCQUFZO1FBQ1osNEJBQVk7R0FWcEMsaUJBQWlCLENBOEg3QjtBQTlIWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBEaWFsb2dzID0gcmVxdWlyZSgndWkvZGlhbG9ncycpLFxuICBmcmFtZSA9IHJlcXVpcmUoJ3VpL2ZyYW1lJyksXG4gIGFwcGxpY2F0aW9uID0gcmVxdWlyZSgnYXBwbGljYXRpb24nKTtcblxuaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1ZpZXd9IGZyb20gJ3VpL2NvcmUvdmlldyc7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7UGFnZX0gZnJvbSAndWkvcGFnZSc7XG5pbXBvcnQge0NvbG9yfSBmcm9tICdjb2xvcic7XG5cbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFuZHJvaWRBcHBsaWNhdGlvbiwgQW5kcm9pZEFjdGl2aXR5QmFja1ByZXNzZWRFdmVudERhdGEgfSBmcm9tICdhcHBsaWNhdGlvbic7XG5cblxuaW1wb3J0IHtCYXNlfSBmcm9tICcuLi8uLi9iYXNlJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuLi8uLi9zaGFyZWQvY29uZmlnJztcbmltcG9ydCB7Qm9hcmR9IGZyb20gJy4uLy4uL3NoYXJlZC9ib2FyZC9ib2FyZCc7XG5pbXBvcnQge1NxdWFyZX0gZnJvbSAnLi4vLi4vc2hhcmVkL2JvYXJkL3NxdWFyZSc7XG5pbXBvcnQge0JvYXJkU2VydmljZX0gZnJvbSAnLi4vLi4vc2hhcmVkL2JvYXJkL2JvYXJkLnNlcnZpY2UnO1xuaW1wb3J0IHtTY29yZVNlcnZpY2V9IGZyb20gJy4uLy4uL3NoYXJlZC9zY29yZS9zY29yZS5zZXJ2aWNlJztcbmltcG9ydCB7U3RhdGV9IGZyb20gJy4uLy4uL3NoYXJlZC9zdGF0ZS9TdGF0ZSc7XG5pbXBvcnQge1N0YXRlU2VydmljZX0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0YXRlL3N0YXRlLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xldmVsLXR3bycsXG4gIHRlbXBsYXRlVXJsOiAncGFnZXMvbGV2ZWwtdHdvL2xldmVsLXR3by5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwYWdlcy9sZXZlbC10d28vbGV2ZWwtdHdvLWNvbW1vbi5jc3MnLCAncGFnZXMvbGV2ZWwtdHdvL2xldmVsLXR3by5jc3MnXSxcbiAgcHJvdmlkZXJzOiBbQm9hcmRTZXJ2aWNlLCBTY29yZVNlcnZpY2UsIFN0YXRlU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgTGV2ZWxUd29Db21wb25lbnQgZXh0ZW5kcyBCYXNlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICBib2FyZDogQm9hcmQ7XG4gIGlzRGV2OiBCb29sZWFuO1xuICBpc0JvYXJkTG9hZGVkOiBCb29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfcGFnZTogUGFnZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfYm9hcmRTZXJ2aWNlOiBCb2FyZFNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3Njb3JlU2VydmljZTogU2NvcmVTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIF9zdGF0ZVNlcnZpY2U6IFN0YXRlU2VydmljZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmlzRGV2ID0gQ29uZmlnLmlzRGV2O1xuICAgIHRoaXMuaXNCb2FyZExvYWRlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goX2JvYXJkU2VydmljZS5nYW1lQm9hcmRDaGFuZ2UkXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoYm9hcmQ6IGFueSkgPT4gdGhpcy5vbkdhbWVCb2FyZENoYW5nZShib2FyZClcbiAgICAgICkpO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goX3N0YXRlU2VydmljZS5zdGF0ZUNoYW5nZSRcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIChzdGF0ZTogYW55KSA9PiB0aGlzLm9uU3RhdGVDaGFuZ2Uoc3RhdGUpXG4gICAgICApKTtcblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdsZXZlbC10d28uY29tcG9uZW50JywgJ25nT25Jbml0Jyk7XG4gICAgdGhpcy5vbkluaXQoKTtcbiAgfVxuXG4gIG9uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2xldmVsLXR3by5jb21wb25lbnQnLCAnb25Jbml0Q2hhbmdlJyk7XG5cbiAgICBsZXQgdGl0bGUgPSBDb25maWcudGl0bGUgKyAnIC0gTGV2ZWwgMic7XG5cbiAgICBpZiAoQ29uZmlnLmlzRGV2KSB7XG4gICAgICB0aXRsZSArPSAnIChEZXYgTW9kZSknO1xuICAgIH1cblxuICAgIHRoaXMuX2JvYXJkU2VydmljZS5pbml0Qm9hcmQoNCwgNCwgdGl0bGUsIDIsIDAsICdsZXZlbC10aHJlZScpO1xuICB9XG5cbiAgb25HYW1lQm9hcmRDaGFuZ2UoYm9hcmQ6IEJvYXJkKSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdsZXZlbC10d28uY29tcG9uZW50JywgJ29uR2FtZUJvYXJkQ2hhbmdlJyk7XG4gICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xuICAgIHRoaXMuaXNCb2FyZExvYWRlZCA9IHRydWU7XG4gICAgaWYgKHRoaXMuX2JvYXJkU2VydmljZS5pc0dhbWVPdmVyKCkpIHtcbiAgICAgIGlmICh0aGlzLl9zY29yZVNlcnZpY2UuaXNIaWdoU2NvcmUodGhpcy5ib2FyZC5tb3ZlcywgdGhpcy5ib2FyZC5sZXZlbCkpIHtcbiAgICAgICAgdGhpcy5vbkhpZ2hTY29yZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vbkxvd1Njb3JlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25TdGF0ZUNoYW5nZShzdGF0ZTogU3RhdGVbXSkge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnbGV2ZWwtdHdvLmNvbXBvbmVudCcsICdvblN0YXRlQ2hhbmdlJyk7XG4gICAgaWYgKHRoaXMuaXNCb2FyZExvYWRlZCAmJiBzdGF0ZSAmJiBzdGF0ZS5sZW5ndGgpIHtcbiAgICAgIGxldCBsZXZlbFZhbHVlOiBhbnkgPSB0aGlzLl9zdGF0ZVNlcnZpY2UuZ2V0S2V5VmFsdWUoJ2xldmVsJyksXG4gICAgICAgIHN0YXRlTGV2ZWw6IG51bWJlciA9IGxldmVsVmFsdWUgJiYgbGV2ZWxWYWx1ZSAhPT0gdW5kZWZpbmVkID8gTnVtYmVyKGxldmVsVmFsdWUpIDogMSxcbiAgICAgICAgYm9hcmRMZXZlbDogbnVtYmVyID0gdGhpcy5ib2FyZCAmJiB0aGlzLmJvYXJkLmxldmVsID8gdGhpcy5ib2FyZC5sZXZlbCA6IDE7XG5cbiAgICAgIGlmICh0aGlzLmlzQm9hcmRMb2FkZWQgJiYgc3RhdGVMZXZlbCA+IGJvYXJkTGV2ZWwpIHtcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgICAnZ2FtZS86dGFyZ2V0Jywge1xuICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLmJvYXJkLm5leHRTY3JlZW5cbiAgICAgICAgICB9XG4gICAgICAgIF0sIENvbmZpZy50cmFuc2l0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblJlc2V0VGFwKCk6IHZvaWQge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnbGV2ZWwtdHdvLmNvbXBvbmVudCcsICdvblJlc2V0VGFwJyk7XG4gICAgdGhpcy5vbkluaXQoKTtcbiAgfVxuXG4gIG9uU3F1YXJlR2VzdHVyZShzcXVhcmU6IFNxdWFyZSk6IHZvaWQge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnbGV2ZWwtdHdvLmNvbXBvbmVudCcsICdvblNxdWFyZUdlc3R1cmUnKTtcbiAgICBsZXQgc3F1YXJlQjogU3F1YXJlID0gdGhpcy5fYm9hcmRTZXJ2aWNlLmVtcHR5U3F1YXJlO1xuICAgIGlmICghdGhpcy5fYm9hcmRTZXJ2aWNlLmlzRW1wdHkoc3F1YXJlKSAmJiB0aGlzLl9ib2FyZFNlcnZpY2UuaXNWYWxpZE1vdmUoc3F1YXJlLCBzcXVhcmVCKSkge1xuICAgICAgdGhpcy5fYm9hcmRTZXJ2aWNlLm1vdmVTcXVhcmUoc3F1YXJlLCBzcXVhcmVCKTtcbiAgICB9XG4gIH1cblxuICBvbkxvd1Njb3JlKCk6IHZvaWQge1xuICAgIERpYWxvZ3MuY29uZmlybSh7XG4gICAgICB0aXRsZTogJ1cgaSBuIG4gZSByJyxcbiAgICAgIG1lc3NhZ2U6ICdZb3Ugc29sdmVkIHRoZSBwdXp6bGUgaW4gJyArIHRoaXMuYm9hcmQubW92ZXMgKyAnIG1vdmVzIScsXG4gICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuX3N0YXRlU2VydmljZS51cGRhdGVMZXZlbCgzKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uSGlnaFNjb3JlKCk6IHZvaWQge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnbGV2ZWwtdHdvLmNvbXBvbmVudCcsICdvbkhpZ2hTY29yZScpO1xuICAgIERpYWxvZ3MuY29uZmlybSh7XG4gICAgICB0aXRsZTogJ1cgaSBuIG4gZSByJyxcbiAgICAgIG1lc3NhZ2U6ICdZb3Ugc29sdmVkIHRoZSBwdXp6bGUgaW4gJyArIHRoaXMuYm9hcmQubW92ZXMgKyAnIG1vdmVzIScsXG4gICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuaXNCb2FyZExvYWRlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5fc3RhdGVTZXJ2aWNlLnVwZGF0ZUxldmVsKDMpO1xuICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgJ2FkZC1oaWdoLXNjb3JlLzpsZXZlbDptb3ZlczpjYWxsZXInLCB7XG4gICAgICAgICAgbW92ZXM6IHRoaXMuYm9hcmQubW92ZXMsXG4gICAgICAgICAgbGV2ZWw6IHRoaXMuYm9hcmQubGV2ZWwsXG4gICAgICAgICAgY2FsbGVyOiB0aGlzLmJvYXJkLm5leHRTY3JlZW5cbiAgICAgICAgfVxuICAgICAgXSwgQ29uZmlnLnRyYW5zaXRpb24pO1xuICAgIH0pO1xuICB9XG5cbiAgb25Ta2lwTGV2ZWxUYXAoKTogdm9pZCB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdsZXZlbC10d28uY29tcG9uZW50JywgJ29uU2tpcExldmVsVGFwJyk7XG4gICAgdGhpcy5vbkhpZ2hTY29yZSgpO1xuICB9XG5cbiAgb25OYXZCdG5UYXAoKTogdm9pZCB7XG4gICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnJ10sIENvbmZpZy50cmFuc2l0aW9uKTtcbiAgfVxuXG59XG4iXX0=