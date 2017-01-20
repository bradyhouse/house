"use strict";
var Dialogs = require('ui/dialogs'), frame = require('ui/frame');
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
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
        this._router.navigate([this.caller], config_1.Config.transitionWithoutHistory);
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
    __metadata("design:paramtypes", [router_2.RouterExtensions,
        router_1.ActivatedRoute,
        score_service_1.ScoreService])
], AddHighScoreComponent);
exports.AddHighScoreComponent = AddHighScoreComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWhpZ2gtc2NvcmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkLWhpZ2gtc2NvcmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQ25DLEtBQUssR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFHOUIsc0NBQXVFO0FBQ3ZFLDBDQUF1RDtBQUN2RCxzREFBNkQ7QUFPN0Qsc0NBQW1DO0FBQ25DLGlEQUE4QztBQUM5QyxxREFBa0Q7QUFDbEQscUVBQWlFO0FBVWpFLElBQWEscUJBQXFCO0lBQVMseUNBQUk7SUFTN0MsK0JBQW9CLE9BQXlCLEVBQ3pCLE1BQXNCLEVBQ3RCLGFBQTJCO1FBRi9DLFlBR0UsaUJBQU8sU0FXUjtRQWRtQixhQUFPLEdBQVAsT0FBTyxDQUFrQjtRQUN6QixZQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUN0QixtQkFBYSxHQUFiLGFBQWEsQ0FBYztRQVIvQyxVQUFJLEdBQUcsRUFBRSxDQUFDO1FBV1IsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFXO1lBQzFELGFBQWEsQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkQsS0FBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0IsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0IsS0FBSSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsRUFBRSxVQUFVLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hFLEtBQUksQ0FBQyxhQUFhLENBQUMsMEJBQTBCLEVBQUUsVUFBVSxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4RSxLQUFJLENBQUMsYUFBYSxDQUFDLDBCQUEwQixFQUFFLFdBQVcsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7SUFFTixDQUFDO0lBRUQsd0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsMEJBQTBCLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFNLENBQUMsS0FBSyxHQUFHLG1CQUFtQixDQUFDO0lBQ2xELENBQUM7SUFFRCw4Q0FBYyxHQUFkO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxhQUFhLENBQUMsMEJBQTBCLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUc3RSxJQUFJLFNBQVMsR0FBYyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztRQUM1RCxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFFM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVCLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQztRQUNULENBQUM7UUFFRCxJQUFJLEtBQUssR0FBVSxJQUFJLGFBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFDcEQsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQVUsSUFBSSxDQUFDLENBQUM7UUFFaEUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsZUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFFeEUsQ0FBQztJQUVELGlEQUFpQixHQUFqQjtRQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFDLFlBQVksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVILDRCQUFDO0FBQUQsQ0FBQyxBQXpERCxDQUEyQyxXQUFJLEdBeUQ5QztBQXZENkI7SUFBM0IsZ0JBQVMsQ0FBQyxlQUFlLENBQUM7OEJBQWdCLGlCQUFVOzREQUFDO0FBRjNDLHFCQUFxQjtJQVBqQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsK0RBQStEO1FBQzVFLFNBQVMsRUFBRSxDQUFDLDJEQUEyRDtZQUNyRSxvREFBb0QsQ0FBQztRQUN2RCxTQUFTLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO0tBQzFCLENBQUM7cUNBVTZCLHlCQUFnQjtRQUNqQix1QkFBYztRQUNQLDRCQUFZO0dBWHBDLHFCQUFxQixDQXlEakM7QUF6RFksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRGlhbG9ncyA9IHJlcXVpcmUoJ3VpL2RpYWxvZ3MnKSxcbiAgZnJhbWUgPSByZXF1aXJlKCd1aS9mcmFtZScpO1xuXG5cbmltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JvdXRlciwgQWN0aXZhdGVkUm91dGV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHtUZXh0RmllbGR9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5cblxuaW1wb3J0IHtCYXNlfSBmcm9tICcuLi8uLi8uLi9iYXNlJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29uZmlnJztcbmltcG9ydCB7U2NvcmV9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zY29yZS9zY29yZSc7XG5pbXBvcnQge1Njb3JlU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3Njb3JlL3Njb3JlLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FkZC1oaWdoLXNjb3JlJyxcbiAgdGVtcGxhdGVVcmw6ICdwYWdlcy9oaWdoLXNjb3JlL2FkZC1oaWdoLXNjb3JlL2FkZC1oaWdoLXNjb3JlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3BhZ2VzL2hpZ2gtc2NvcmUvYWRkLWhpZ2gtc2NvcmUvYWRkLWhpZ2gtc2NvcmUtY29tbW9uLmNzcycsXG4gICAgJ3BhZ2VzL2hpZ2gtc2NvcmUvYWRkLWhpZ2gtc2NvcmUvYWRkLWhpZ2gtc2NvcmUuY3NzJ10sXG4gIHByb3ZpZGVyczogW1Njb3JlU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgQWRkSGlnaFNjb3JlQ29tcG9uZW50IGV4dGVuZHMgQmFzZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQFZpZXdDaGlsZChcIm5hbWVUZXh0RmllbGRcIikgbmFtZVRleHRGaWVsZDogRWxlbWVudFJlZjtcbiAgbmFtZSA9IFwiXCI7XG4gIGxldmVsOiBhbnk7XG4gIG1vdmVzOiBhbnk7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGNhbGxlcjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICAgICAgICBwcml2YXRlIF9zY29yZVNlcnZpY2U6IFNjb3JlU2VydmljZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChfcm91dGUucGFyYW1zLnN1YnNjcmliZSgocGFyYW1zOiBhbnkpID0+IHtcbiAgICAgIF9zY29yZVNlcnZpY2UubGV2ZWwgPSB0aGlzLmxldmVsID0gcGFyYW1zWydsZXZlbCddO1xuICAgICAgdGhpcy5tb3ZlcyA9IHBhcmFtc1snbW92ZXMnXTtcbiAgICAgIHRoaXMuY2FsbGVyID0gcGFyYW1zWydjYWxsZXInXTtcbiAgICAgIHRoaXMuY29uc29sZUxvZ01zZygnYWRkLWhpZ2gtc2NvcmUuY29tcG9uZW50JywgJ2xldmVsID0gJyArIHRoaXMubGV2ZWwpO1xuICAgICAgdGhpcy5jb25zb2xlTG9nTXNnKCdhZGQtaGlnaC1zY29yZS5jb21wb25lbnQnLCAnbW92ZXMgPSAnICsgdGhpcy5tb3Zlcyk7XG4gICAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2FkZC1oaWdoLXNjb3JlLmNvbXBvbmVudCcsICdjYWxsZXIgPSAnICsgdGhpcy5jYWxsZXIpO1xuICAgIH0pKTtcblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdhZGQtaGlnaC1zY29yZS5jb21wb25lbnQnLCAnbmdPbkluaXQnKTtcbiAgICB0aGlzLnRpdGxlID0gQ29uZmlnLnRpdGxlICsgJyAtIEFkZCBIaWdoIFNjb3JlJztcbiAgfVxuXG4gIG9uQWRkQnV0dG9uVGFwKCkge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnYWRkLWhpZ2gtc2NvcmUuY29tcG9uZW50JywgJ29uQWRkQnV0dG9uVGFwJyk7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdhZGQtaGlnaC1zY29yZS5jb21wb25lbnQnLCAnbmFtZSA9ICcgKyB0aGlzLm5hbWUudHJpbSgpKTtcblxuXG4gICAgbGV0IHRleHRGaWVsZCA9IDxUZXh0RmllbGQ+dGhpcy5uYW1lVGV4dEZpZWxkLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGV4dEZpZWxkLmRpc21pc3NTb2Z0SW5wdXQoKTtcbiAgICB0aGlzLm5hbWUgPSB0ZXh0RmllbGQudGV4dDtcblxuICAgIGlmICh0aGlzLm5hbWUudHJpbSgpID09PSBcIlwiKSB7XG4gICAgICBhbGVydChcIkVudGVyIHlvdXIgbmFtZVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgc2NvcmU6IFNjb3JlID0gbmV3IFNjb3JlKHRoaXMuX3Njb3JlU2VydmljZS5uZXh0SWQsXG4gICAgICB0aGlzLm5hbWUsICcwMDowMDowMCcsICt0aGlzLm1vdmVzLCB0aGlzLmxldmVsLCA8c3RyaW5nPm51bGwpO1xuXG4gICAgdGhpcy5fc2NvcmVTZXJ2aWNlLmluc2VydChzY29yZSk7XG5cbiAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW3RoaXMuY2FsbGVyXSwgQ29uZmlnLnRyYW5zaXRpb25XaXRob3V0SGlzdG9yeSk7XG5cbiAgfVxuXG4gIG9uQ2FuY2VsQnV0dG9uVGFwKCkge1xuICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbdGhpcy5jYWxsZXIsIHtjbGVhckhpc3Rvcnk6IHRydWV9XSk7XG4gIH1cblxufVxuIl19