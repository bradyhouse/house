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
        if (state && state.length) {
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
    LevelTwoComponent.prototype.onSquareTap = function (square) {
        this.consoleLogMsg('level-two.component', 'onSquareTap');
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
            _this._stateService.updateLevel(2);
        });
    };
    LevelTwoComponent.prototype.onHighScore = function () {
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
    LevelTwoComponent.prototype.onSkipLevelTap = function () {
        this.consoleLogMsg('level-two.component', 'onSkipLevelTap');
        this.onHighScore();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV2ZWwtdHdvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxldmVsLXR3by5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFDbkMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUU5QixzQ0FBZ0Q7QUFHaEQsZ0NBQTZCO0FBRTdCLHNEQUE2RDtBQUU3RCxtQ0FBZ0M7QUFDaEMsOENBQTJDO0FBRzNDLGtFQUE4RDtBQUM5RCxrRUFBOEQ7QUFFOUQsa0VBQThEO0FBUzlELElBQWEsaUJBQWlCO0lBQVMscUNBQUk7SUFLekMsMkJBQW9CLE9BQXlCLEVBQ3pCLEtBQVcsRUFDWCxhQUEyQixFQUMzQixhQUEyQixFQUMzQixhQUEyQjtRQUovQyxZQUtFLGlCQUFPLFNBY1I7UUFuQm1CLGFBQU8sR0FBUCxPQUFPLENBQWtCO1FBQ3pCLFdBQUssR0FBTCxLQUFLLENBQU07UUFDWCxtQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUMzQixtQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUMzQixtQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUc3QyxLQUFJLENBQUMsS0FBSyxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUM7UUFFMUIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQjthQUNuRCxTQUFTLENBQ1IsVUFBQyxLQUFVLElBQUssT0FBQSxLQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEVBQTdCLENBQTZCLENBQzlDLENBQUMsQ0FBQztRQUVMLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZO2FBQy9DLFNBQVMsQ0FDUixVQUFDLEtBQVUsSUFBSyxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQXpCLENBQXlCLENBQzFDLENBQUMsQ0FBQzs7SUFF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QjtJQU43QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFdBQVc7UUFDckIsV0FBVyxFQUFFLDBDQUEwQztRQUN2RCxTQUFTLEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRSwrQkFBK0IsQ0FBQztRQUNwRixTQUFTLEVBQUUsQ0FBQyw0QkFBWSxFQUFFLDRCQUFZLEVBQUUsNEJBQVksQ0FBQztLQUN0RCxDQUFDO3FDQU02Qix5QkFBZ0I7UUFDbEIsV0FBSTtRQUNJLDRCQUFZO1FBQ1osNEJBQVk7UUFDWiw0QkFBWTtHQVRwQyxpQkFBaUIsQ0EwRzdCO0FBMUdZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERpYWxvZ3MgPSByZXF1aXJlKCd1aS9kaWFsb2dzJyksXG4gIGZyYW1lID0gcmVxdWlyZSgndWkvZnJhbWUnKTtcblxuaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1ZpZXd9IGZyb20gJ3VpL2NvcmUvdmlldyc7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7UGFnZX0gZnJvbSAndWkvcGFnZSc7XG5pbXBvcnQge0NvbG9yfSBmcm9tICdjb2xvcic7XG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcblxuaW1wb3J0IHtCYXNlfSBmcm9tICcuLi8uLi9iYXNlJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuLi8uLi9zaGFyZWQvY29uZmlnJztcbmltcG9ydCB7Qm9hcmR9IGZyb20gJy4uLy4uL3NoYXJlZC9ib2FyZC9ib2FyZCc7XG5pbXBvcnQge1NxdWFyZX0gZnJvbSAnLi4vLi4vc2hhcmVkL2JvYXJkL3NxdWFyZSc7XG5pbXBvcnQge0JvYXJkU2VydmljZX0gZnJvbSAnLi4vLi4vc2hhcmVkL2JvYXJkL2JvYXJkLnNlcnZpY2UnO1xuaW1wb3J0IHtTY29yZVNlcnZpY2V9IGZyb20gJy4uLy4uL3NoYXJlZC9zY29yZS9zY29yZS5zZXJ2aWNlJztcbmltcG9ydCB7U3RhdGV9IGZyb20gJy4uLy4uL3NoYXJlZC9zdGF0ZS9TdGF0ZSc7XG5pbXBvcnQge1N0YXRlU2VydmljZX0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0YXRlL3N0YXRlLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xldmVsLXR3bycsXG4gIHRlbXBsYXRlVXJsOiAncGFnZXMvbGV2ZWwtdHdvL2xldmVsLXR3by5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwYWdlcy9sZXZlbC10d28vbGV2ZWwtdHdvLWNvbW1vbi5jc3MnLCAncGFnZXMvbGV2ZWwtdHdvL2xldmVsLXR3by5jc3MnXSxcbiAgcHJvdmlkZXJzOiBbQm9hcmRTZXJ2aWNlLCBTY29yZVNlcnZpY2UsIFN0YXRlU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgTGV2ZWxUd29Db21wb25lbnQgZXh0ZW5kcyBCYXNlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICBib2FyZDogQm9hcmQ7XG4gIGlzRGV2OiBCb29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfcGFnZTogUGFnZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfYm9hcmRTZXJ2aWNlOiBCb2FyZFNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3Njb3JlU2VydmljZTogU2NvcmVTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIF9zdGF0ZVNlcnZpY2U6IFN0YXRlU2VydmljZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmlzRGV2ID0gQ29uZmlnLmlzRGV2O1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goX2JvYXJkU2VydmljZS5nYW1lQm9hcmRDaGFuZ2UkXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoYm9hcmQ6IGFueSkgPT4gdGhpcy5vbkdhbWVCb2FyZENoYW5nZShib2FyZClcbiAgICAgICkpO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goX3N0YXRlU2VydmljZS5zdGF0ZUNoYW5nZSRcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIChzdGF0ZTogYW55KSA9PiB0aGlzLm9uU3RhdGVDaGFuZ2Uoc3RhdGUpXG4gICAgICApKTtcblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdsZXZlbC10d28uY29tcG9uZW50JywgJ25nT25Jbml0Jyk7XG4gICAgdGhpcy5vbkluaXQoKTtcbiAgfVxuXG4gIG9uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2xldmVsLXR3by5jb21wb25lbnQnLCAnb25Jbml0Q2hhbmdlJyk7XG4gICAgdGhpcy5fYm9hcmRTZXJ2aWNlLmluaXRCb2FyZCg0LCA0LCBDb25maWcudGl0bGUgKyAnIC0gTGV2ZWwgMicsIDIsIDAsICdsZXZlbC10aHJlZScpO1xuICB9XG5cbiAgb25HYW1lQm9hcmRDaGFuZ2UoYm9hcmQ6IEJvYXJkKSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdsZXZlbC10d28uY29tcG9uZW50JywgJ29uR2FtZUJvYXJkQ2hhbmdlJyk7XG4gICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xuICAgIGlmICh0aGlzLl9ib2FyZFNlcnZpY2UuaXNHYW1lT3ZlcigpKSB7XG4gICAgICBpZiAodGhpcy5fc2NvcmVTZXJ2aWNlLmlzSGlnaFNjb3JlKHRoaXMuYm9hcmQubW92ZXMsIHRoaXMuYm9hcmQubGV2ZWwpKSB7XG4gICAgICAgIHRoaXMub25IaWdoU2NvcmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub25Mb3dTY29yZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uU3RhdGVDaGFuZ2Uoc3RhdGU6IFN0YXRlW10pIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2xldmVsLXR3by5jb21wb25lbnQnLCAnb25TdGF0ZUNoYW5nZScpO1xuICAgIGlmIChzdGF0ZSAmJiBzdGF0ZS5sZW5ndGgpIHtcbiAgICAgIGxldCBsZXZlbFZhbHVlOiBhbnkgPSB0aGlzLl9zdGF0ZVNlcnZpY2UuZ2V0S2V5VmFsdWUoJ2xldmVsJyksXG4gICAgICAgIHN0YXRlTGV2ZWw6IG51bWJlciA9IGxldmVsVmFsdWUgJiYgbGV2ZWxWYWx1ZSAhPT0gdW5kZWZpbmVkID8gTnVtYmVyKGxldmVsVmFsdWUpIDogMSxcbiAgICAgICAgYm9hcmRMZXZlbDogbnVtYmVyID0gdGhpcy5ib2FyZCAmJiB0aGlzLmJvYXJkLmxldmVsID8gdGhpcy5ib2FyZC5sZXZlbCA6IDE7XG4gICAgICBpZiAoc3RhdGVMZXZlbCA+IGJvYXJkTGV2ZWwpIHtcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFt0aGlzLmJvYXJkLm5leHRTY3JlZW5dLCBDb25maWcudHJhbnNpdGlvbldpdGhvdXRIaXN0b3J5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblJlc2V0VGFwKCk6IHZvaWQge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnbGV2ZWwtdHdvLmNvbXBvbmVudCcsICdvblJlc2V0VGFwJyk7XG4gICAgdGhpcy5vbkluaXQoKTtcbiAgfVxuXG4gIG9uU3F1YXJlVGFwKHNxdWFyZTogU3F1YXJlKTogdm9pZCB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdsZXZlbC10d28uY29tcG9uZW50JywgJ29uU3F1YXJlVGFwJyk7XG4gICAgbGV0IHNxdWFyZUI6IFNxdWFyZSA9IHRoaXMuX2JvYXJkU2VydmljZS5lbXB0eVNxdWFyZTtcbiAgICBpZiAoIXRoaXMuX2JvYXJkU2VydmljZS5pc0VtcHR5KHNxdWFyZSkgJiYgdGhpcy5fYm9hcmRTZXJ2aWNlLmlzVmFsaWRNb3ZlKHNxdWFyZSwgc3F1YXJlQikpIHtcbiAgICAgIHRoaXMuX2JvYXJkU2VydmljZS5tb3ZlU3F1YXJlKHNxdWFyZSwgc3F1YXJlQik7XG4gICAgfVxuICB9XG5cbiAgb25Mb3dTY29yZSgpOiB2b2lkIHtcbiAgICBEaWFsb2dzLmNvbmZpcm0oe1xuICAgICAgdGl0bGU6ICdXIGkgbiBuIGUgcicsXG4gICAgICBtZXNzYWdlOiAnWW91IHNvbHZlZCB0aGUgcHV6emxlIGluICcgKyB0aGlzLmJvYXJkLm1vdmVzICsgJyBtb3ZlcyEnLFxuICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgfSkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLl9zdGF0ZVNlcnZpY2UudXBkYXRlTGV2ZWwoMik7XG4gICAgfSk7XG4gIH1cblxuICBvbkhpZ2hTY29yZSgpOiB2b2lkIHtcbiAgICBEaWFsb2dzLmNvbmZpcm0oe1xuICAgICAgdGl0bGU6ICdXIGkgbiBuIGUgcicsXG4gICAgICBtZXNzYWdlOiAnWW91IHNvbHZlZCB0aGUgcHV6emxlIGluICcgKyB0aGlzLmJvYXJkLm1vdmVzICsgJyBtb3ZlcyEnLFxuICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgfSkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLl9zdGF0ZVNlcnZpY2UudXBkYXRlTGV2ZWwoMik7XG4gICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgICAnYWRkLWhpZ2gtc2NvcmUvOmxldmVsOm1vdmVzOmNhbGxlcicsIHtcbiAgICAgICAgICBtb3ZlczogdGhpcy5ib2FyZC5tb3ZlcyxcbiAgICAgICAgICBsZXZlbDogdGhpcy5ib2FyZC5sZXZlbCxcbiAgICAgICAgICBjYWxsZXI6IHRoaXMuYm9hcmQubmV4dFNjcmVlblxuICAgICAgICB9XG4gICAgICBdLCBDb25maWcudHJhbnNpdGlvbldpdGhvdXRIaXN0b3J5KTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uU2tpcExldmVsVGFwKCk6IHZvaWQge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnbGV2ZWwtdHdvLmNvbXBvbmVudCcsICdvblNraXBMZXZlbFRhcCcpO1xuICAgIHRoaXMub25IaWdoU2NvcmUoKTtcbiAgfVxuXG5cbn1cbiJdfQ==