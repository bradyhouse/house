"use strict";
var Dialogs = require('ui/dialogs'), frame = require('ui/frame');
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var base_1 = require("../../../base");
var config_1 = require("../../../shared/config");
var score_1 = require("../../../shared/score/score");
var score_service_1 = require("../../../shared/score/score.service");
var AddHighScoreComponent = (function (_super) {
    __extends(AddHighScoreComponent, _super);
    function AddHighScoreComponent(_router, _route, _scoreService) {
        var _this = _super.call(this) || this;
        _this._router = _router;
        _this._route = _route;
        _this._scoreService = _scoreService;
        _this.name = "";
        _this.subscriptions.push(_route.params.subscribe(function (params) {
            _scoreService.level = _this.level = params['level'];
            _this.moves = params['moves'];
            _this.caller = params['caller'];
            _this.consoleLogMsg('add-high-score.component', 'level = ' + _this.level);
            _this.consoleLogMsg('add-high-score.component', 'moves = ' + _this.moves);
            _this.consoleLogMsg('add-high-score.component', 'caller = ' + _this.caller);
        }));
        return _this;
    }
    AddHighScoreComponent.prototype.ngOnInit = function () {
        this.consoleLogMsg('add-high-score.component', 'ngOnInit');
        this.title = config_1.Config.title + ' - Add High Score';
    };
    AddHighScoreComponent.prototype.onAddButtonTap = function () {
        this.consoleLogMsg('add-high-score.component', 'onAddButtonTap');
        this.consoleLogMsg('add-high-score.component', 'name = ' + this.name.trim());
        var textField = this.nameTextField.nativeElement;
        textField.dismissSoftInput();
        this.name = textField.text;
        if (this.name.trim() === "") {
            alert("Enter your name");
            return;
        }
        var score = new score_1.Score(this._scoreService.nextId, this.name, '00:00:00', +this.moves, this.level, null);
        this._scoreService.insert(score);
        this._router.navigate([this.caller, { clearHistory: true }]);
    };
    AddHighScoreComponent.prototype.onCancelButtonTap = function () {
        this._router.navigate([this.caller, { clearHistory: true }]);
    };
    return AddHighScoreComponent;
}(base_1.Base));
__decorate([
    core_1.ViewChild("nameTextField"),
    __metadata("design:type", core_1.ElementRef)
], AddHighScoreComponent.prototype, "nameTextField", void 0);
AddHighScoreComponent = __decorate([
    core_1.Component({
        selector: 'add-high-score',
        templateUrl: 'pages/high-score/add-high-score/add-high-score.component.html',
        styleUrls: ['pages/high-score/add-high-score/add-high-score-common.css',
            'pages/high-score/add-high-score/add-high-score.css'],
        providers: [score_service_1.ScoreService]
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        score_service_1.ScoreService])
], AddHighScoreComponent);
exports.AddHighScoreComponent = AddHighScoreComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWhpZ2gtc2NvcmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkLWhpZ2gtc2NvcmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQ25DLEtBQUssR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFHOUIsc0NBQXVFO0FBQ3ZFLDBDQUF1RDtBQU12RCxzQ0FBbUM7QUFDbkMsaURBQThDO0FBQzlDLHFEQUFrRDtBQUNsRCxxRUFBaUU7QUFVakUsSUFBYSxxQkFBcUI7SUFBUyx5Q0FBSTtJQVM3QywrQkFBb0IsT0FBZSxFQUNmLE1BQXNCLEVBQ3RCLGFBQTJCO1FBRi9DLFlBR0UsaUJBQU8sU0FXUjtRQWRtQixhQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsWUFBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDdEIsbUJBQWEsR0FBYixhQUFhLENBQWM7UUFSL0MsVUFBSSxHQUFHLEVBQUUsQ0FBQztRQVdSLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBVztZQUMxRCxhQUFhLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25ELEtBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdCLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQy9CLEtBQUksQ0FBQyxhQUFhLENBQUMsMEJBQTBCLEVBQUUsVUFBVSxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4RSxLQUFJLENBQUMsYUFBYSxDQUFDLDBCQUEwQixFQUFFLFVBQVUsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEUsS0FBSSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsRUFBRSxXQUFXLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVFLENBQUMsQ0FBQyxDQUFDLENBQUM7O0lBRU4sQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLDBCQUEwQixFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBTSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQztJQUNsRCxDQUFDO0lBRUQsOENBQWMsR0FBZDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsMEJBQTBCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsYUFBYSxDQUFDLDBCQUEwQixFQUFFLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFHN0UsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7UUFDNUQsU0FBUyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBRTNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1QixLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUM7UUFDVCxDQUFDO1FBRUQsSUFBSSxLQUFLLEdBQVMsSUFBSSxhQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQ25ELElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFVLElBQUksQ0FBQyxDQUFDO1FBRWhFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWpDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFL0QsQ0FBQztJQUVELGlEQUFpQixHQUFqQjtRQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBRSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVILDRCQUFDO0FBQUQsQ0FBQyxBQXpERCxDQUEyQyxXQUFJLEdBeUQ5QztBQXZENkI7SUFBM0IsZ0JBQVMsQ0FBQyxlQUFlLENBQUM7OEJBQWdCLGlCQUFVOzREQUFDO0FBRjNDLHFCQUFxQjtJQVBqQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsK0RBQStEO1FBQzVFLFNBQVMsRUFBRSxDQUFDLDJEQUEyRDtZQUNyRSxvREFBb0QsQ0FBQztRQUN2RCxTQUFTLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO0tBQzFCLENBQUM7cUNBVTZCLGVBQU07UUFDUCx1QkFBYztRQUNQLDRCQUFZO0dBWHBDLHFCQUFxQixDQXlEakM7QUF6RFksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRGlhbG9ncyA9IHJlcXVpcmUoJ3VpL2RpYWxvZ3MnKSxcbiAgZnJhbWUgPSByZXF1aXJlKCd1aS9mcmFtZScpO1xuXG5cbmltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JvdXRlciwgQWN0aXZhdGVkUm91dGV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xuXG5cbmltcG9ydCB7QmFzZX0gZnJvbSAnLi4vLi4vLi4vYmFzZSc7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbmZpZyc7XG5pbXBvcnQge1Njb3JlfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2NvcmUvc2NvcmUnO1xuaW1wb3J0IHtTY29yZVNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zY29yZS9zY29yZS5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhZGQtaGlnaC1zY29yZScsXG4gIHRlbXBsYXRlVXJsOiAncGFnZXMvaGlnaC1zY29yZS9hZGQtaGlnaC1zY29yZS9hZGQtaGlnaC1zY29yZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwYWdlcy9oaWdoLXNjb3JlL2FkZC1oaWdoLXNjb3JlL2FkZC1oaWdoLXNjb3JlLWNvbW1vbi5jc3MnLFxuICAgICdwYWdlcy9oaWdoLXNjb3JlL2FkZC1oaWdoLXNjb3JlL2FkZC1oaWdoLXNjb3JlLmNzcyddLFxuICBwcm92aWRlcnM6IFtTY29yZVNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIEFkZEhpZ2hTY29yZUNvbXBvbmVudCBleHRlbmRzIEJhc2UgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBWaWV3Q2hpbGQoXCJuYW1lVGV4dEZpZWxkXCIpIG5hbWVUZXh0RmllbGQ6IEVsZW1lbnRSZWY7XG4gIG5hbWUgPSBcIlwiO1xuICBsZXZlbDogYW55O1xuICBtb3ZlczogYW55O1xuICB0aXRsZTogc3RyaW5nO1xuICBjYWxsZXI6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICAgICAgICBwcml2YXRlIF9zY29yZVNlcnZpY2U6IFNjb3JlU2VydmljZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChfcm91dGUucGFyYW1zLnN1YnNjcmliZSgocGFyYW1zOiBhbnkpID0+IHtcbiAgICAgIF9zY29yZVNlcnZpY2UubGV2ZWwgPSB0aGlzLmxldmVsID0gcGFyYW1zWydsZXZlbCddO1xuICAgICAgdGhpcy5tb3ZlcyA9IHBhcmFtc1snbW92ZXMnXTtcbiAgICAgIHRoaXMuY2FsbGVyID0gcGFyYW1zWydjYWxsZXInXTtcbiAgICAgIHRoaXMuY29uc29sZUxvZ01zZygnYWRkLWhpZ2gtc2NvcmUuY29tcG9uZW50JywgJ2xldmVsID0gJyArIHRoaXMubGV2ZWwpO1xuICAgICAgdGhpcy5jb25zb2xlTG9nTXNnKCdhZGQtaGlnaC1zY29yZS5jb21wb25lbnQnLCAnbW92ZXMgPSAnICsgdGhpcy5tb3Zlcyk7XG4gICAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2FkZC1oaWdoLXNjb3JlLmNvbXBvbmVudCcsICdjYWxsZXIgPSAnICsgdGhpcy5jYWxsZXIpO1xuICAgIH0pKTtcblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdhZGQtaGlnaC1zY29yZS5jb21wb25lbnQnLCAnbmdPbkluaXQnKTtcbiAgICB0aGlzLnRpdGxlID0gQ29uZmlnLnRpdGxlICsgJyAtIEFkZCBIaWdoIFNjb3JlJztcbiAgfVxuXG4gIG9uQWRkQnV0dG9uVGFwKCkge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnYWRkLWhpZ2gtc2NvcmUuY29tcG9uZW50JywgJ29uQWRkQnV0dG9uVGFwJyk7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdhZGQtaGlnaC1zY29yZS5jb21wb25lbnQnLCAnbmFtZSA9ICcgKyB0aGlzLm5hbWUudHJpbSgpKTtcblxuXG4gICAgbGV0IHRleHRGaWVsZCA9IDxUZXh0RmllbGQ+dGhpcy5uYW1lVGV4dEZpZWxkLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGV4dEZpZWxkLmRpc21pc3NTb2Z0SW5wdXQoKTtcbiAgICB0aGlzLm5hbWUgPSB0ZXh0RmllbGQudGV4dDtcblxuICAgIGlmICh0aGlzLm5hbWUudHJpbSgpID09PSBcIlwiKSB7XG4gICAgICBhbGVydChcIkVudGVyIHlvdXIgbmFtZVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgc2NvcmU6U2NvcmUgPSBuZXcgU2NvcmUodGhpcy5fc2NvcmVTZXJ2aWNlLm5leHRJZCxcbiAgICAgIHRoaXMubmFtZSwgJzAwOjAwOjAwJywgK3RoaXMubW92ZXMsIHRoaXMubGV2ZWwsIDxzdHJpbmc+bnVsbCk7XG5cbiAgICB0aGlzLl9zY29yZVNlcnZpY2UuaW5zZXJ0KHNjb3JlKTtcblxuICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbdGhpcy5jYWxsZXIsIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH1dKTtcblxuICB9XG5cbiAgb25DYW5jZWxCdXR0b25UYXAoKSB7XG4gICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFt0aGlzLmNhbGxlciwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSBdKTtcbiAgfVxuXG59XG4iXX0=