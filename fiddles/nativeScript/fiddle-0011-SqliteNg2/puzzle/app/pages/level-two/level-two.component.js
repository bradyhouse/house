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
        if (application.android) {
            application.android.on(application.AndroidApplication.activityBackPressedEvent, function (data) { return _this.onBackButtonPressed; });
        }
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
        this._boardService.initBoard(4, 4, config_1.Config.title + ' - Level 2', 2, 0, 'level-three');
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
            if (stateLevel > boardLevel) {
                this._router.navigate([this.board.nextScreen], config_1.Config.transitionWithoutHistory);
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
            _this._stateService.updateLevel(3);
            _this._router.navigate([
                'add-high-score/:level:moves:caller', {
                    moves: _this.board.moves,
                    level: _this.board.level,
                    caller: _this.board.nextScreen
                }
            ], config_1.Config.transitionWithHistory);
        });
    };
    LevelTwoComponent.prototype.onSkipLevelTap = function () {
        this.consoleLogMsg('level-two.component', 'onSkipLevelTap');
        this.onHighScore();
    };
    LevelTwoComponent.prototype.onBackButtonPressed = function (data) {
        this.consoleLogMsg('level-two.component', 'onBackButtonPressed');
        data.cancel = true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV2ZWwtdHdvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxldmVsLXR3by5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFDbkMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFDM0IsV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUV2QyxzQ0FBZ0Q7QUFHaEQsZ0NBQTZCO0FBRzdCLHNEQUE2RDtBQUk3RCxtQ0FBZ0M7QUFDaEMsOENBQTJDO0FBRzNDLGtFQUE4RDtBQUM5RCxrRUFBOEQ7QUFFOUQsa0VBQThEO0FBUzlELElBQWEsaUJBQWlCO0lBQVMscUNBQUk7SUFNekMsMkJBQW9CLE9BQXlCLEVBQ3pCLEtBQVcsRUFDWCxhQUEyQixFQUMzQixhQUEyQixFQUMzQixhQUEyQjtRQUovQyxZQUtFLGlCQUFPLFNBbUJSO1FBeEJtQixhQUFPLEdBQVAsT0FBTyxDQUFrQjtRQUN6QixXQUFLLEdBQUwsS0FBSyxDQUFNO1FBQ1gsbUJBQWEsR0FBYixhQUFhLENBQWM7UUFDM0IsbUJBQWEsR0FBYixhQUFhLENBQWM7UUFDM0IsbUJBQWEsR0FBYixhQUFhLENBQWM7UUFHN0MsS0FBSSxDQUFDLEtBQUssR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFDO1FBQzFCLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBRTNCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyx3QkFBd0IsRUFBRSxVQUFDLElBQXlDLElBQUssT0FBQSxLQUFJLENBQUMsbUJBQW1CLEVBQXhCLENBQXdCLENBQUMsQ0FBQztRQUMzSixDQUFDO1FBRUQsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENB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b0MsRUFBRTtvQkFDcEMsS0FBSyxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztvQkFDdkIsS0FBSyxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztvQkFDdkIsTUFBTSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVTtpQkFDOUI7YUFDRixFQUFFLGVBQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDBDQUFjLEdBQWQ7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCwrQ0FBbUIsR0FBbkIsVUFBb0IsSUFBeUM7UUFDM0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFSCx3QkFBQztBQUFELENBQUMsQUF2SEQsQ0FBdUMsV0FBSSxHQXVIMUM7QUF2SFksaUJBQWlCO0lBTjdCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsV0FBVztRQUNyQixXQUFXLEVBQUUsMENBQTBDO1FBQ3ZELFNBQVMsRUFBRSxDQUFDLHNDQUFzQyxFQUFFLCtCQUErQixDQUFDO1FBQ3BGLFNBQVMsRUFBRSxDQUFDLDRCQUFZLEVBQUUsNEJBQVksRUFBRSw0QkFBWSxDQUFDO0tBQ3RELENBQUM7cUNBTzZCLHlCQUFnQjtRQUNsQixXQUFJO1FBQ0ksNEJBQVk7UUFDWiw0QkFBWTtRQUNaLDRCQUFZO0dBVnBDLGlCQUFpQixDQXVIN0I7QUF2SFksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRGlhbG9ncyA9IHJlcXVpcmUoJ3VpL2RpYWxvZ3MnKSxcbiAgZnJhbWUgPSByZXF1aXJlKCd1aS9mcmFtZScpLFxuICBhcHBsaWNhdGlvbiA9IHJlcXVpcmUoJ2FwcGxpY2F0aW9uJyk7XG5cbmltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtWaWV3fSBmcm9tICd1aS9jb3JlL3ZpZXcnO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1BhZ2V9IGZyb20gJ3VpL3BhZ2UnO1xuaW1wb3J0IHtDb2xvcn0gZnJvbSAnY29sb3InO1xuXG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBbmRyb2lkQXBwbGljYXRpb24sIEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhIH0gZnJvbSAnYXBwbGljYXRpb24nO1xuXG5cbmltcG9ydCB7QmFzZX0gZnJvbSAnLi4vLi4vYmFzZSc7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi4vLi4vc2hhcmVkL2NvbmZpZyc7XG5pbXBvcnQge0JvYXJkfSBmcm9tICcuLi8uLi9zaGFyZWQvYm9hcmQvYm9hcmQnO1xuaW1wb3J0IHtTcXVhcmV9IGZyb20gJy4uLy4uL3NoYXJlZC9ib2FyZC9zcXVhcmUnO1xuaW1wb3J0IHtCb2FyZFNlcnZpY2V9IGZyb20gJy4uLy4uL3NoYXJlZC9ib2FyZC9ib2FyZC5zZXJ2aWNlJztcbmltcG9ydCB7U2NvcmVTZXJ2aWNlfSBmcm9tICcuLi8uLi9zaGFyZWQvc2NvcmUvc2NvcmUuc2VydmljZSc7XG5pbXBvcnQge1N0YXRlfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RhdGUvU3RhdGUnO1xuaW1wb3J0IHtTdGF0ZVNlcnZpY2V9IGZyb20gJy4uLy4uL3NoYXJlZC9zdGF0ZS9zdGF0ZS5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsZXZlbC10d28nLFxuICB0ZW1wbGF0ZVVybDogJ3BhZ2VzL2xldmVsLXR3by9sZXZlbC10d28uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsncGFnZXMvbGV2ZWwtdHdvL2xldmVsLXR3by1jb21tb24uY3NzJywgJ3BhZ2VzL2xldmVsLXR3by9sZXZlbC10d28uY3NzJ10sXG4gIHByb3ZpZGVyczogW0JvYXJkU2VydmljZSwgU2NvcmVTZXJ2aWNlLCBTdGF0ZVNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIExldmVsVHdvQ29tcG9uZW50IGV4dGVuZHMgQmFzZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgYm9hcmQ6IEJvYXJkO1xuICBpc0RldjogQm9vbGVhbjtcbiAgaXNCb2FyZExvYWRlZDogQm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3BhZ2U6IFBhZ2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2JvYXJkU2VydmljZTogQm9hcmRTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIF9zY29yZVNlcnZpY2U6IFNjb3JlU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfc3RhdGVTZXJ2aWNlOiBTdGF0ZVNlcnZpY2UpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5pc0RldiA9IENvbmZpZy5pc0RldjtcbiAgICB0aGlzLmlzQm9hcmRMb2FkZWQgPSBmYWxzZTtcblxuICAgIGlmIChhcHBsaWNhdGlvbi5hbmRyb2lkKSB7XG4gICAgICBhcHBsaWNhdGlvbi5hbmRyb2lkLm9uKGFwcGxpY2F0aW9uLkFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIChkYXRhOiBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSkgPT4gdGhpcy5vbkJhY2tCdXR0b25QcmVzc2VkKTtcbiAgICB9XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChfYm9hcmRTZXJ2aWNlLmdhbWVCb2FyZENoYW5nZSRcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIChib2FyZDogYW55KSA9PiB0aGlzLm9uR2FtZUJvYXJkQ2hhbmdlKGJvYXJkKVxuICAgICAgKSk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChfc3RhdGVTZXJ2aWNlLnN0YXRlQ2hhbmdlJFxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKHN0YXRlOiBhbnkpID0+IHRoaXMub25TdGF0ZUNoYW5nZShzdGF0ZSlcbiAgICAgICkpO1xuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2xldmVsLXR3by5jb21wb25lbnQnLCAnbmdPbkluaXQnKTtcbiAgICB0aGlzLm9uSW5pdCgpO1xuICB9XG5cbiAgb25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnbGV2ZWwtdHdvLmNvbXBvbmVudCcsICdvbkluaXRDaGFuZ2UnKTtcbiAgICB0aGlzLl9ib2FyZFNlcnZpY2UuaW5pdEJvYXJkKDQsIDQsIENvbmZpZy50aXRsZSArICcgLSBMZXZlbCAyJywgMiwgMCwgJ2xldmVsLXRocmVlJyk7XG4gIH1cblxuICBvbkdhbWVCb2FyZENoYW5nZShib2FyZDogQm9hcmQpIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2xldmVsLXR3by5jb21wb25lbnQnLCAnb25HYW1lQm9hcmRDaGFuZ2UnKTtcbiAgICB0aGlzLmJvYXJkID0gYm9hcmQ7XG4gICAgdGhpcy5pc0JvYXJkTG9hZGVkID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5fYm9hcmRTZXJ2aWNlLmlzR2FtZU92ZXIoKSkge1xuICAgICAgaWYgKHRoaXMuX3Njb3JlU2VydmljZS5pc0hpZ2hTY29yZSh0aGlzLmJvYXJkLm1vdmVzLCB0aGlzLmJvYXJkLmxldmVsKSkge1xuICAgICAgICB0aGlzLm9uSGlnaFNjb3JlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uTG93U2NvcmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblN0YXRlQ2hhbmdlKHN0YXRlOiBTdGF0ZVtdKSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdsZXZlbC10d28uY29tcG9uZW50JywgJ29uU3RhdGVDaGFuZ2UnKTtcbiAgICBpZiAodGhpcy5pc0JvYXJkTG9hZGVkICYmIHN0YXRlICYmIHN0YXRlLmxlbmd0aCkge1xuICAgICAgbGV0IGxldmVsVmFsdWU6IGFueSA9IHRoaXMuX3N0YXRlU2VydmljZS5nZXRLZXlWYWx1ZSgnbGV2ZWwnKSxcbiAgICAgICAgc3RhdGVMZXZlbDogbnVtYmVyID0gbGV2ZWxWYWx1ZSAmJiBsZXZlbFZhbHVlICE9PSB1bmRlZmluZWQgPyBOdW1iZXIobGV2ZWxWYWx1ZSkgOiAxLFxuICAgICAgICBib2FyZExldmVsOiBudW1iZXIgPSB0aGlzLmJvYXJkICYmIHRoaXMuYm9hcmQubGV2ZWwgPyB0aGlzLmJvYXJkLmxldmVsIDogMTtcblxuICAgICAgaWYgKHN0YXRlTGV2ZWwgPiBib2FyZExldmVsKSB7XG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbdGhpcy5ib2FyZC5uZXh0U2NyZWVuXSwgQ29uZmlnLnRyYW5zaXRpb25XaXRob3V0SGlzdG9yeSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25SZXNldFRhcCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2xldmVsLXR3by5jb21wb25lbnQnLCAnb25SZXNldFRhcCcpO1xuICAgIHRoaXMub25Jbml0KCk7XG4gIH1cblxuICBvblNxdWFyZUdlc3R1cmUoc3F1YXJlOiBTcXVhcmUpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2xldmVsLXR3by5jb21wb25lbnQnLCAnb25TcXVhcmVHZXN0dXJlJyk7XG4gICAgbGV0IHNxdWFyZUI6IFNxdWFyZSA9IHRoaXMuX2JvYXJkU2VydmljZS5lbXB0eVNxdWFyZTtcbiAgICBpZiAoIXRoaXMuX2JvYXJkU2VydmljZS5pc0VtcHR5KHNxdWFyZSkgJiYgdGhpcy5fYm9hcmRTZXJ2aWNlLmlzVmFsaWRNb3ZlKHNxdWFyZSwgc3F1YXJlQikpIHtcbiAgICAgIHRoaXMuX2JvYXJkU2VydmljZS5tb3ZlU3F1YXJlKHNxdWFyZSwgc3F1YXJlQik7XG4gICAgfVxuICB9XG5cbiAgb25Mb3dTY29yZSgpOiB2b2lkIHtcbiAgICBEaWFsb2dzLmNvbmZpcm0oe1xuICAgICAgdGl0bGU6ICdXIGkgbiBuIGUgcicsXG4gICAgICBtZXNzYWdlOiAnWW91IHNvbHZlZCB0aGUgcHV6emxlIGluICcgKyB0aGlzLmJvYXJkLm1vdmVzICsgJyBtb3ZlcyEnLFxuICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgfSkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLl9zdGF0ZVNlcnZpY2UudXBkYXRlTGV2ZWwoMyk7XG4gICAgfSk7XG4gIH1cblxuICBvbkhpZ2hTY29yZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2xldmVsLXR3by5jb21wb25lbnQnLCAnb25IaWdoU2NvcmUnKTtcbiAgICBEaWFsb2dzLmNvbmZpcm0oe1xuICAgICAgdGl0bGU6ICdXIGkgbiBuIGUgcicsXG4gICAgICBtZXNzYWdlOiAnWW91IHNvbHZlZCB0aGUgcHV6emxlIGluICcgKyB0aGlzLmJvYXJkLm1vdmVzICsgJyBtb3ZlcyEnLFxuICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgfSkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLl9zdGF0ZVNlcnZpY2UudXBkYXRlTGV2ZWwoMyk7XG4gICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgICAnYWRkLWhpZ2gtc2NvcmUvOmxldmVsOm1vdmVzOmNhbGxlcicsIHtcbiAgICAgICAgICBtb3ZlczogdGhpcy5ib2FyZC5tb3ZlcyxcbiAgICAgICAgICBsZXZlbDogdGhpcy5ib2FyZC5sZXZlbCxcbiAgICAgICAgICBjYWxsZXI6IHRoaXMuYm9hcmQubmV4dFNjcmVlblxuICAgICAgICB9XG4gICAgICBdLCBDb25maWcudHJhbnNpdGlvbldpdGhIaXN0b3J5KTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uU2tpcExldmVsVGFwKCk6IHZvaWQge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnbGV2ZWwtdHdvLmNvbXBvbmVudCcsICdvblNraXBMZXZlbFRhcCcpO1xuICAgIHRoaXMub25IaWdoU2NvcmUoKTtcbiAgfVxuXG4gIG9uQmFja0J1dHRvblByZXNzZWQoZGF0YTogQW5kcm9pZEFjdGl2aXR5QmFja1ByZXNzZWRFdmVudERhdGEpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2xldmVsLXR3by5jb21wb25lbnQnLCAnb25CYWNrQnV0dG9uUHJlc3NlZCcpO1xuICAgIGRhdGEuY2FuY2VsID0gdHJ1ZTtcbiAgfVxuXG59XG4iXX0=