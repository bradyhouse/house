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
            var levelValue = this._stateService.getKeyValue('level'), stateLevel = levelValue && levelValue !== undefined ? Number(levelValue) : 1, boardLevel = this.board && this.board.level ? this.board.level : 1;
            if (stateLevel > boardLevel) {
                this._router.navigate([this.board.nextScreen], config_1.Config.transitionWithoutHistory);
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
                    caller: _this.board.nextScreen
                }
            ], config_1.Config.transitionWithoutHistory);
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
    __metadata("design:paramtypes", [router_1.RouterExtensions,
        page_1.Page,
        board_service_1.BoardService,
        score_service_1.ScoreService,
        state_service_1.StateService])
], LevelOneComponent);
exports.LevelOneComponent = LevelOneComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV2ZWwtb25lLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxldmVsLW9uZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFDbkMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUU5QixzQ0FBZ0Q7QUFHaEQsZ0NBQTZCO0FBRTdCLHNEQUE2RDtBQUU3RCxtQ0FBZ0M7QUFDaEMsOENBQTJDO0FBRzNDLGtFQUE4RDtBQUM5RCxrRUFBOEQ7QUFFOUQsa0VBQThEO0FBUzlELElBQWEsaUJBQWlCO0lBQVMscUNBQUk7SUFLekMsMkJBQW9CLE9BQXlCLEVBQ3pCLEtBQVcsRUFDWCxhQUEyQixFQUMzQixhQUEyQixFQUMzQixhQUEyQjtRQUovQyxZQUtFLGlCQUFPLFNBY1I7UUFuQm1CLGFBQU8sR0FBUCxPQUFPLENBQWtCO1FBQ3pCLFdBQUssR0FBTCxLQUFLLENBQU07UUFDWCxtQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUMzQixtQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUMzQixtQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUc3QyxLQUFJLENBQUMsS0FBSyxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUM7UUFFMUIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQjthQUNuRCxTQUFTLENBQ1IsVUFBQyxLQUFVLElBQUssT0FBQSxLQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEVBQTdCLENBQTZCLENBQzlDLENBQUMsQ0FBQztRQUVMLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZO2FBQy9DLFNBQVMsQ0FDUixVQUFDLEtBQVUsSUFBSyxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQXpCLENBQXlCLENBQzFDLENBQUMsQ0FBQzs7SUFF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O1FBQ3BGLFNBQVMsRUFBRSxDQUFDLDRCQUFZLEVBQUUsNEJBQVksRUFBRSw0QkFBWSxDQUFDO0tBQ3RELENBQUM7cUNBTTZCLHlCQUFnQjtRQUNsQixXQUFJO1FBQ0ksNEJBQVk7UUFDWiw0QkFBWTtRQUNaLDRCQUFZO0dBVHBDLGlCQUFpQixDQTBHN0I7QUExR1ksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRGlhbG9ncyA9IHJlcXVpcmUoJ3VpL2RpYWxvZ3MnKSxcbiAgZnJhbWUgPSByZXF1aXJlKCd1aS9mcmFtZScpO1xuXG5pbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Vmlld30gZnJvbSAndWkvY29yZS92aWV3JztcbmltcG9ydCB7Um91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtQYWdlfSBmcm9tICd1aS9wYWdlJztcbmltcG9ydCB7Q29sb3J9IGZyb20gJ2NvbG9yJztcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuXG5pbXBvcnQge0Jhc2V9IGZyb20gJy4uLy4uL2Jhc2UnO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4uLy4uL3NoYXJlZC9jb25maWcnO1xuaW1wb3J0IHtCb2FyZH0gZnJvbSAnLi4vLi4vc2hhcmVkL2JvYXJkL2JvYXJkJztcbmltcG9ydCB7U3F1YXJlfSBmcm9tICcuLi8uLi9zaGFyZWQvYm9hcmQvc3F1YXJlJztcbmltcG9ydCB7Qm9hcmRTZXJ2aWNlfSBmcm9tICcuLi8uLi9zaGFyZWQvYm9hcmQvYm9hcmQuc2VydmljZSc7XG5pbXBvcnQge1Njb3JlU2VydmljZX0gZnJvbSAnLi4vLi4vc2hhcmVkL3Njb3JlL3Njb3JlLnNlcnZpY2UnO1xuaW1wb3J0IHtTdGF0ZX0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0YXRlL1N0YXRlJztcbmltcG9ydCB7U3RhdGVTZXJ2aWNlfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RhdGUvc3RhdGUuc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGV2ZWwtb25lJyxcbiAgdGVtcGxhdGVVcmw6ICdwYWdlcy9sZXZlbC1vbmUvbGV2ZWwtb25lLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3BhZ2VzL2xldmVsLW9uZS9sZXZlbC1vbmUtY29tbW9uLmNzcycsICdwYWdlcy9sZXZlbC1vbmUvbGV2ZWwtb25lLmNzcyddLFxuICBwcm92aWRlcnM6IFtCb2FyZFNlcnZpY2UsIFNjb3JlU2VydmljZSwgU3RhdGVTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBMZXZlbE9uZUNvbXBvbmVudCBleHRlbmRzIEJhc2UgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGJvYXJkOiBCb2FyZDtcbiAgaXNEZXY6IEJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICAgICAgICBwcml2YXRlIF9wYWdlOiBQYWdlLFxuICAgICAgICAgICAgICBwcml2YXRlIF9ib2FyZFNlcnZpY2U6IEJvYXJkU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfc2NvcmVTZXJ2aWNlOiBTY29yZVNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3N0YXRlU2VydmljZTogU3RhdGVTZXJ2aWNlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaXNEZXYgPSBDb25maWcuaXNEZXY7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChfYm9hcmRTZXJ2aWNlLmdhbWVCb2FyZENoYW5nZSRcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIChib2FyZDogYW55KSA9PiB0aGlzLm9uR2FtZUJvYXJkQ2hhbmdlKGJvYXJkKVxuICAgICAgKSk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChfc3RhdGVTZXJ2aWNlLnN0YXRlQ2hhbmdlJFxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKHN0YXRlOiBhbnkpID0+IHRoaXMub25TdGF0ZUNoYW5nZShzdGF0ZSlcbiAgICAgICkpO1xuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2xldmVsLW9uZS5jb21wb25lbnQnLCAnbmdPbkluaXQnKTtcbiAgICB0aGlzLm9uSW5pdCgpO1xuICB9XG5cbiAgb25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnbGV2ZWwtb25lLmNvbXBvbmVudCcsICdvbkluaXRDaGFuZ2UnKTtcbiAgICB0aGlzLl9ib2FyZFNlcnZpY2UuaW5pdEJvYXJkKDMsIDMsIENvbmZpZy50aXRsZSArICcgLSBMZXZlbCAxJywgMSwgMCwgJ2xldmVsLXR3bycpO1xuICB9XG5cbiAgb25HYW1lQm9hcmRDaGFuZ2UoYm9hcmQ6IEJvYXJkKSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdsZXZlbC1vbmUuY29tcG9uZW50JywgJ29uR2FtZUJvYXJkQ2hhbmdlJyk7XG4gICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xuICAgIGlmICh0aGlzLl9ib2FyZFNlcnZpY2UuaXNHYW1lT3ZlcigpKSB7XG4gICAgICBpZiAodGhpcy5fc2NvcmVTZXJ2aWNlLmlzSGlnaFNjb3JlKHRoaXMuYm9hcmQubW92ZXMsIHRoaXMuYm9hcmQubGV2ZWwpKSB7XG4gICAgICAgIHRoaXMub25IaWdoU2NvcmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub25Mb3dTY29yZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uU3RhdGVDaGFuZ2Uoc3RhdGU6IFN0YXRlW10pIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2xldmVsLW9uZS5jb21wb25lbnQnLCAnb25TdGF0ZUNoYW5nZScpO1xuICAgIGlmIChzdGF0ZSAmJiBzdGF0ZS5sZW5ndGgpIHtcbiAgICAgIGxldCBsZXZlbFZhbHVlOiBhbnkgPSB0aGlzLl9zdGF0ZVNlcnZpY2UuZ2V0S2V5VmFsdWUoJ2xldmVsJyksXG4gICAgICAgIHN0YXRlTGV2ZWw6IG51bWJlciA9IGxldmVsVmFsdWUgJiYgbGV2ZWxWYWx1ZSAhPT0gdW5kZWZpbmVkID8gTnVtYmVyKGxldmVsVmFsdWUpIDogMSxcbiAgICAgICAgYm9hcmRMZXZlbDogbnVtYmVyID0gdGhpcy5ib2FyZCAmJiB0aGlzLmJvYXJkLmxldmVsID8gdGhpcy5ib2FyZC5sZXZlbCA6IDE7XG4gICAgICBpZiAoc3RhdGVMZXZlbCA+IGJvYXJkTGV2ZWwpIHtcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFt0aGlzLmJvYXJkLm5leHRTY3JlZW5dLCBDb25maWcudHJhbnNpdGlvbldpdGhvdXRIaXN0b3J5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblJlc2V0VGFwKCk6IHZvaWQge1xuICAgIHRoaXMub25Jbml0KCk7XG4gIH1cblxuICBvblNxdWFyZVRhcChzcXVhcmU6IFNxdWFyZSk6IHZvaWQge1xuICAgIGxldCBzcXVhcmVCOiBTcXVhcmUgPSB0aGlzLl9ib2FyZFNlcnZpY2UuZW1wdHlTcXVhcmU7XG5cbiAgICBpZiAoIXRoaXMuX2JvYXJkU2VydmljZS5pc0VtcHR5KHNxdWFyZSkgJiYgdGhpcy5fYm9hcmRTZXJ2aWNlLmlzVmFsaWRNb3ZlKHNxdWFyZSwgc3F1YXJlQikpIHtcbiAgICAgIHRoaXMuX2JvYXJkU2VydmljZS5tb3ZlU3F1YXJlKHNxdWFyZSwgc3F1YXJlQik7XG4gICAgfVxuXG4gIH1cblxuICBvbkxvd1Njb3JlKCk6IHZvaWQge1xuICAgIERpYWxvZ3MuY29uZmlybSh7XG4gICAgICB0aXRsZTogJ1cgaSBuIG4gZSByJyxcbiAgICAgIG1lc3NhZ2U6ICdZb3Ugc29sdmVkIHRoZSBwdXp6bGUgaW4gJyArIHRoaXMuYm9hcmQubW92ZXMgKyAnIG1vdmVzIScsXG4gICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuX3N0YXRlU2VydmljZS51cGRhdGVMZXZlbCgyKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uSGlnaFNjb3JlKCk6IHZvaWQge1xuICAgIERpYWxvZ3MuY29uZmlybSh7XG4gICAgICB0aXRsZTogJ1cgaSBuIG4gZSByJyxcbiAgICAgIG1lc3NhZ2U6ICdZb3Ugc29sdmVkIHRoZSBwdXp6bGUgaW4gJyArIHRoaXMuYm9hcmQubW92ZXMgKyAnIG1vdmVzIScsXG4gICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuX3N0YXRlU2VydmljZS51cGRhdGVMZXZlbCgyKTtcbiAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXG4gICAgICAgICdhZGQtaGlnaC1zY29yZS86bGV2ZWw6bW92ZXM6Y2FsbGVyJywge1xuICAgICAgICAgIG1vdmVzOiB0aGlzLmJvYXJkLm1vdmVzLFxuICAgICAgICAgIGxldmVsOiB0aGlzLmJvYXJkLmxldmVsLFxuICAgICAgICAgIGNhbGxlcjogdGhpcy5ib2FyZC5uZXh0U2NyZWVuXG4gICAgICAgIH1cbiAgICAgIF0sIENvbmZpZy50cmFuc2l0aW9uV2l0aG91dEhpc3RvcnkpO1xuICAgIH0pO1xuICB9XG5cbiAgb25Ta2lwTGV2ZWxUYXAoKTogdm9pZCB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdsZXZlbC1vbmUuY29tcG9uZW50JywgJ29uU2tpcExldmVsVGFwJyk7XG4gICAgdGhpcy5vbkhpZ2hTY29yZSgpO1xuICB9XG5cblxufVxuIl19