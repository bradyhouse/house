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
        _this.subscriptions.push(_boardService.gameBoardChange$
            .subscribe(function (board) { return _this.onGameBoardChange(board); }));
        _this.subscriptions.push(_stateService.stateChange$
            .subscribe(function (state) { return _this.onStateChange(state); }));
        return _this;
    }
    LevelTwoComponent.prototype.ngOnInit = function () {
        this.onInit();
    };
    LevelTwoComponent.prototype.onGameBoardChange = function (board) {
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
    LevelTwoComponent.prototype.onStateChange = function (state) {
        this.consoleLogMsg('level-one.component', 'onStateChange');
        if (state && state.length) {
            var levelValue = this._stateService.getKeyValue('level'), stateLevel = levelValue && levelValue != 'undefined' ? Number(levelValue) : 1, boardLevel = this.board.level;
            if (stateLevel > boardLevel) {
                this._router.navigate([this.board.nextScreen]);
            }
        }
    };
    LevelTwoComponent.prototype.onResetTap = function () {
        this.onInit();
    };
    LevelTwoComponent.prototype.onSquareTap = function (square) {
        var squareB = this._boardService.emptySquare;
        if (!this._boardService.isEmpty(square) && this._boardService.isValidMove(square, squareB)) {
            this._boardService.moveSquare(square, squareB);
        }
    };
    LevelTwoComponent.prototype.onInit = function () {
        this._boardService.initBoard(4, 4, config_1.Config.title + ' - Level 2', 2, 0, 'level-three');
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
            ]);
        });
    };
    LevelTwoComponent.prototype.onSkipLevelTap = function () {
        this.consoleLogMsg('level-two.component', 'onSkipLevelTap');
        //this.onHighScore();
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
    __metadata("design:paramtypes", [router_1.Router,
        page_1.Page,
        board_service_1.BoardService,
        score_service_1.ScoreService,
        state_service_1.StateService])
], LevelTwoComponent);
exports.LevelTwoComponent = LevelTwoComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV2ZWwtdHdvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxldmVsLXR3by5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFDbkMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUU5QixzQ0FBZ0Q7QUFFaEQsMENBQXVDO0FBQ3ZDLGdDQUE2QjtBQUc3QixtQ0FBZ0M7QUFDaEMsOENBQTJDO0FBRzNDLGtFQUE4RDtBQUM5RCxrRUFBOEQ7QUFFOUQsa0VBQThEO0FBUzlELElBQWEsaUJBQWlCO0lBQVMscUNBQUk7SUFLekMsMkJBQW9CLE9BQWUsRUFDZixLQUFXLEVBQ1gsYUFBMkIsRUFDM0IsYUFBMkIsRUFDM0IsYUFBMkI7UUFKL0MsWUFLRSxpQkFBTyxTQWNSO1FBbkJtQixhQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsV0FBSyxHQUFMLEtBQUssQ0FBTTtRQUNYLG1CQUFhLEdBQWIsYUFBYSxDQUFjO1FBQzNCLG1CQUFhLEdBQWIsYUFBYSxDQUFjO1FBQzNCLG1CQUFhLEdBQWIsYUFBYSxDQUFjO1FBRzdDLEtBQUksQ0FBQyxLQUFLLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQztRQUUxQixLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCO2FBQ25ELFNBQVMsQ0FDUixVQUFDLEtBQVUsSUFBSyxPQUFBLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsRUFBN0IsQ0FBNkIsQ0FDOUMsQ0FBQyxDQUFDO1FBRUwsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVk7YUFDL0MsU0FBUyxDQUNSLFVBQUMsS0FBVSxJQUFLLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBekIsQ0FBeUIsQ0FDMUMsQ0FBQyxDQUFDOztJQUVQLENB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LEtBQUssQ0FBQyxLQUFLLEdBQUcsU0FBUztZQUNuRSxZQUFZLEVBQUUsSUFBSTtTQUNuQixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ04sS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7Z0JBQ3BCLG9DQUFvQyxFQUFFO29CQUNwQyxLQUFLLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO29CQUN2QixLQUFLLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO29CQUN2QixNQUFNLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO2lCQUM5QjthQUNGLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDBDQUFjLEdBQWQ7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDNUQscUJBQXFCO0lBQ3ZCLENBQUM7SUFFSCx3QkFBQztBQUFELENBQUMsQUFuR0QsQ0FBdUMsV0FBSSxHQW1HMUM7QUFuR1ksaUJBQWlCO0lBTjdCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsV0FBVztRQUNyQixXQUFXLEVBQUUsMENBQTBDO1FBQ3ZELFNBQVMsRUFBRSxDQUFDLHNDQUFzQyxFQUFFLCtCQUErQixDQUFDO1FBQ3BGLFNBQVMsRUFBRSxDQUFDLDRCQUFZLEVBQUUsNEJBQVksRUFBRSw0QkFBWSxDQUFDO0tBQ3RELENBQUM7cUNBTTZCLGVBQU07UUFDUixXQUFJO1FBQ0ksNEJBQVk7UUFDWiw0QkFBWTtRQUNaLDRCQUFZO0dBVHBDLGlCQUFpQixDQW1HN0I7QUFuR1ksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRGlhbG9ncyA9IHJlcXVpcmUoJ3VpL2RpYWxvZ3MnKSxcbiAgZnJhbWUgPSByZXF1aXJlKCd1aS9mcmFtZScpO1xuXG5pbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Vmlld30gZnJvbSAndWkvY29yZS92aWV3JztcbmltcG9ydCB7Um91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtQYWdlfSBmcm9tICd1aS9wYWdlJztcbmltcG9ydCB7Q29sb3J9IGZyb20gJ2NvbG9yJztcblxuaW1wb3J0IHtCYXNlfSBmcm9tICcuLi8uLi9iYXNlJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuLi8uLi9zaGFyZWQvY29uZmlnJztcbmltcG9ydCB7Qm9hcmR9IGZyb20gJy4uLy4uL3NoYXJlZC9ib2FyZC9ib2FyZCc7XG5pbXBvcnQge1NxdWFyZX0gZnJvbSAnLi4vLi4vc2hhcmVkL2JvYXJkL3NxdWFyZSc7XG5pbXBvcnQge0JvYXJkU2VydmljZX0gZnJvbSAnLi4vLi4vc2hhcmVkL2JvYXJkL2JvYXJkLnNlcnZpY2UnO1xuaW1wb3J0IHtTY29yZVNlcnZpY2V9IGZyb20gJy4uLy4uL3NoYXJlZC9zY29yZS9zY29yZS5zZXJ2aWNlJztcbmltcG9ydCB7U3RhdGV9IGZyb20gJy4uLy4uL3NoYXJlZC9zdGF0ZS9TdGF0ZSc7XG5pbXBvcnQge1N0YXRlU2VydmljZX0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0YXRlL3N0YXRlLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xldmVsLXR3bycsXG4gIHRlbXBsYXRlVXJsOiAncGFnZXMvbGV2ZWwtdHdvL2xldmVsLXR3by5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwYWdlcy9sZXZlbC10d28vbGV2ZWwtdHdvLWNvbW1vbi5jc3MnLCAncGFnZXMvbGV2ZWwtdHdvL2xldmVsLXR3by5jc3MnXSxcbiAgcHJvdmlkZXJzOiBbQm9hcmRTZXJ2aWNlLCBTY29yZVNlcnZpY2UsIFN0YXRlU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgTGV2ZWxUd29Db21wb25lbnQgZXh0ZW5kcyBCYXNlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICBib2FyZDogQm9hcmQ7XG4gIGlzRGV2OiBCb29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlcjogUm91dGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIF9wYWdlOiBQYWdlLFxuICAgICAgICAgICAgICBwcml2YXRlIF9ib2FyZFNlcnZpY2U6IEJvYXJkU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfc2NvcmVTZXJ2aWNlOiBTY29yZVNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3N0YXRlU2VydmljZTogU3RhdGVTZXJ2aWNlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaXNEZXYgPSBDb25maWcuaXNEZXY7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChfYm9hcmRTZXJ2aWNlLmdhbWVCb2FyZENoYW5nZSRcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIChib2FyZDogYW55KSA9PiB0aGlzLm9uR2FtZUJvYXJkQ2hhbmdlKGJvYXJkKVxuICAgICAgKSk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChfc3RhdGVTZXJ2aWNlLnN0YXRlQ2hhbmdlJFxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKHN0YXRlOiBhbnkpID0+IHRoaXMub25TdGF0ZUNoYW5nZShzdGF0ZSlcbiAgICAgICkpO1xuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9uSW5pdCgpO1xuICB9XG5cbiAgb25HYW1lQm9hcmRDaGFuZ2UoYm9hcmQ6IEJvYXJkKSB7XG4gICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xuICAgIGlmICh0aGlzLl9ib2FyZFNlcnZpY2UuaXNHYW1lT3ZlcigpKSB7XG4gICAgICBpZiAodGhpcy5fc2NvcmVTZXJ2aWNlLmlzSGlnaFNjb3JlKHRoaXMuYm9hcmQubW92ZXMsIHRoaXMuYm9hcmQubGV2ZWwpKSB7XG4gICAgICAgIHRoaXMub25IaWdoU2NvcmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub25Mb3dTY29yZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uU3RhdGVDaGFuZ2Uoc3RhdGU6IFN0YXRlW10pIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2xldmVsLW9uZS5jb21wb25lbnQnLCAnb25TdGF0ZUNoYW5nZScpO1xuICAgIGlmIChzdGF0ZSAmJiBzdGF0ZS5sZW5ndGgpIHtcbiAgICAgIGxldCBsZXZlbFZhbHVlOiBhbnkgPSB0aGlzLl9zdGF0ZVNlcnZpY2UuZ2V0S2V5VmFsdWUoJ2xldmVsJyksXG4gICAgICAgIHN0YXRlTGV2ZWw6IG51bWJlciA9IGxldmVsVmFsdWUgJiYgbGV2ZWxWYWx1ZSAhPSAndW5kZWZpbmVkJyA/IE51bWJlcihsZXZlbFZhbHVlKSA6IDEsXG4gICAgICAgIGJvYXJkTGV2ZWw6IG51bWJlciA9IHRoaXMuYm9hcmQubGV2ZWw7XG4gICAgICBpZiAoc3RhdGVMZXZlbCA+IGJvYXJkTGV2ZWwpIHtcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFt0aGlzLmJvYXJkLm5leHRTY3JlZW5dKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblJlc2V0VGFwKCk6IHZvaWQge1xuICAgIHRoaXMub25Jbml0KCk7XG4gIH1cblxuICBvblNxdWFyZVRhcChzcXVhcmU6IFNxdWFyZSk6IHZvaWQge1xuICAgIGxldCBzcXVhcmVCOiBTcXVhcmUgPSB0aGlzLl9ib2FyZFNlcnZpY2UuZW1wdHlTcXVhcmU7XG4gICAgaWYgKCF0aGlzLl9ib2FyZFNlcnZpY2UuaXNFbXB0eShzcXVhcmUpICYmIHRoaXMuX2JvYXJkU2VydmljZS5pc1ZhbGlkTW92ZShzcXVhcmUsIHNxdWFyZUIpKSB7XG4gICAgICB0aGlzLl9ib2FyZFNlcnZpY2UubW92ZVNxdWFyZShzcXVhcmUsIHNxdWFyZUIpO1xuICAgIH1cbiAgfVxuXG4gIG9uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9ib2FyZFNlcnZpY2UuaW5pdEJvYXJkKDQsIDQsIENvbmZpZy50aXRsZSArICcgLSBMZXZlbCAyJywgMiwgMCwgJ2xldmVsLXRocmVlJyk7XG4gIH1cblxuICBvbkxvd1Njb3JlKCk6IHZvaWQge1xuICAgIERpYWxvZ3MuY29uZmlybSh7XG4gICAgICB0aXRsZTogJ1cgaSBuIG4gZSByJyxcbiAgICAgIG1lc3NhZ2U6ICdZb3Ugc29sdmVkIHRoZSBwdXp6bGUgaW4gJyArIHRoaXMuYm9hcmQubW92ZXMgKyAnIG1vdmVzIScsXG4gICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuX3N0YXRlU2VydmljZS51cGRhdGVMZXZlbCgzKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uSGlnaFNjb3JlKCk6IHZvaWQge1xuICAgIERpYWxvZ3MuY29uZmlybSh7XG4gICAgICB0aXRsZTogJ1cgaSBuIG4gZSByJyxcbiAgICAgIG1lc3NhZ2U6ICdZb3Ugc29sdmVkIHRoZSBwdXp6bGUgaW4gJyArIHRoaXMuYm9hcmQubW92ZXMgKyAnIG1vdmVzIScsXG4gICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXG4gICAgICAgICdhZGQtaGlnaC1zY29yZS86bGV2ZWw6bW92ZXM6Y2FsbGVyJywge1xuICAgICAgICAgIG1vdmVzOiB0aGlzLmJvYXJkLm1vdmVzLFxuICAgICAgICAgIGxldmVsOiB0aGlzLmJvYXJkLmxldmVsLFxuICAgICAgICAgIGNhbGxlcjogdGhpcy5ib2FyZC5uZXh0U2NyZWVuXG4gICAgICAgIH1cbiAgICAgIF0pO1xuICAgIH0pO1xuICB9XG5cbiAgb25Ta2lwTGV2ZWxUYXAoKTogdm9pZCB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdsZXZlbC10d28uY29tcG9uZW50JywgJ29uU2tpcExldmVsVGFwJyk7XG4gICAgLy90aGlzLm9uSGlnaFNjb3JlKCk7XG4gIH1cblxufVxuIl19