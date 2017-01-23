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
        if (config_1.Config.isDev) {
            this.title += ' (Dev Mode)';
        }
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
        this._router.navigate([
            'game/:target', {
                target: this.caller
            }
        ], config_1.Config.transition);
    };
    AddHighScoreComponent.prototype.onCancelButtonTap = function () {
        this._router.navigate([
            'game/:target', {
                target: this.caller
            }
        ], config_1.Config.transition);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWhpZ2gtc2NvcmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkLWhpZ2gtc2NvcmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQ25DLEtBQUssR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFHOUIsc0NBQXVFO0FBQ3ZFLDBDQUF1RDtBQUN2RCxzREFBNkQ7QUFPN0Qsc0NBQW1DO0FBQ25DLGlEQUE4QztBQUM5QyxxREFBa0Q7QUFDbEQscUVBQWlFO0FBVWpFLElBQWEscUJBQXFCO0lBQVMseUNBQUk7SUFTN0MsK0JBQW9CLE9BQXlCLEVBQ3pCLE1BQXNCLEVBQ3RCLGFBQTJCO1FBRi9DLFlBR0UsaUJBQU8sU0FXUjtRQWRtQixhQUFPLEdBQVAsT0FBTyxDQUFrQjtRQUN6QixZQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUN0QixtQkFBYSxHQUFiLGFBQWEsQ0FBYztRQVIvQyxVQUFJLEdBQUcsRUFBRSxDQUFDO1FBV1IsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFXO1lBQzFELGFBQWEsQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkQsS0FBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0IsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0IsS0FBSSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsRUFBRSxVQUFVLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hFLEtBQUksQ0FBQyxhQUFhLENBQUMsMEJBQTBCLEVBQUUsVUFBVSxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4RSxLQUFJLENBQUMsYUFBYSxDQUFDLDBCQUEwQixFQUFFLFdBQVcsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7SUFFTixDQUFDO0lBRUQsd0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsMEJBQTBCLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFNLENBQUMsS0FBSyxHQUFHLG1CQUFtQixDQUFDO1FBQ2hELEVBQUUsQ0FBQyxDQUFDLGVBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxLQUFLLElBQUksYUFBYSxDQUFDO1FBQzlCLENBQUM7SUFDSCxDQUFDO0lBRUQsOENBQWMsR0FBZDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsMEJBQTBCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsYUFBYSxDQUFDLDBCQUEwQixFQUFFLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFHN0UsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7UUFDNUQsU0FBUyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBRTNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1QixLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUM7UUFDVCxDQUFDO1FBRUQsSUFBSSxLQUFLLEdBQVUsSUFBSSxhQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQ3BELElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFVLElBQUksQ0FBQyxDQUFDO1FBRWhFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWpDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1lBQ3BCLGNBQWMsRUFBRTtnQkFDZCxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07YUFDcEI7U0FDRixFQUFFLGVBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUV4QixDQUFDO0lBRUQsaURBQWlCLEdBQWpCO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7WUFDcEIsY0FBYyxFQUFFO2dCQUNkLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTthQUNwQjtTQUNGLEVBQUUsZUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFSCw0QkFBQztBQUFELENBQUMsQUFwRUQsQ0FBMkMsV0FBSSxHQW9FOUM7QUFsRTZCO0lBQTNCLGdCQUFTLENBQUMsZUFBZSxDQUFDOzhCQUFnQixpQkFBVTs0REFBQztBQUYzQyxxQkFBcUI7SUFQakMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLCtEQUErRDtRQUM1RSxTQUFTLEVBQUUsQ0FBQywyREFBMkQ7WUFDckUsb0RBQW9ELENBQUM7UUFDdkQsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztLQUMxQixDQUFDO3FDQVU2Qix5QkFBZ0I7UUFDakIsdUJBQWM7UUFDUCw0QkFBWTtHQVhwQyxxQkFBcUIsQ0FvRWpDO0FBcEVZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERpYWxvZ3MgPSByZXF1aXJlKCd1aS9kaWFsb2dzJyksXG4gIGZyYW1lID0gcmVxdWlyZSgndWkvZnJhbWUnKTtcblxuXG5pbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBFbGVtZW50UmVmLCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xuXG5cbmltcG9ydCB7QmFzZX0gZnJvbSAnLi4vLi4vLi4vYmFzZSc7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbmZpZyc7XG5pbXBvcnQge1Njb3JlfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2NvcmUvc2NvcmUnO1xuaW1wb3J0IHtTY29yZVNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zY29yZS9zY29yZS5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhZGQtaGlnaC1zY29yZScsXG4gIHRlbXBsYXRlVXJsOiAncGFnZXMvaGlnaC1zY29yZS9hZGQtaGlnaC1zY29yZS9hZGQtaGlnaC1zY29yZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwYWdlcy9oaWdoLXNjb3JlL2FkZC1oaWdoLXNjb3JlL2FkZC1oaWdoLXNjb3JlLWNvbW1vbi5jc3MnLFxuICAgICdwYWdlcy9oaWdoLXNjb3JlL2FkZC1oaWdoLXNjb3JlL2FkZC1oaWdoLXNjb3JlLmNzcyddLFxuICBwcm92aWRlcnM6IFtTY29yZVNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIEFkZEhpZ2hTY29yZUNvbXBvbmVudCBleHRlbmRzIEJhc2UgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBWaWV3Q2hpbGQoXCJuYW1lVGV4dEZpZWxkXCIpIG5hbWVUZXh0RmllbGQ6IEVsZW1lbnRSZWY7XG4gIG5hbWUgPSBcIlwiO1xuICBsZXZlbDogYW55O1xuICBtb3ZlczogYW55O1xuICB0aXRsZTogc3RyaW5nO1xuICBjYWxsZXI6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3JvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfc2NvcmVTZXJ2aWNlOiBTY29yZVNlcnZpY2UpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goX3JvdXRlLnBhcmFtcy5zdWJzY3JpYmUoKHBhcmFtczogYW55KSA9PiB7XG4gICAgICBfc2NvcmVTZXJ2aWNlLmxldmVsID0gdGhpcy5sZXZlbCA9IHBhcmFtc1snbGV2ZWwnXTtcbiAgICAgIHRoaXMubW92ZXMgPSBwYXJhbXNbJ21vdmVzJ107XG4gICAgICB0aGlzLmNhbGxlciA9IHBhcmFtc1snY2FsbGVyJ107XG4gICAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ2FkZC1oaWdoLXNjb3JlLmNvbXBvbmVudCcsICdsZXZlbCA9ICcgKyB0aGlzLmxldmVsKTtcbiAgICAgIHRoaXMuY29uc29sZUxvZ01zZygnYWRkLWhpZ2gtc2NvcmUuY29tcG9uZW50JywgJ21vdmVzID0gJyArIHRoaXMubW92ZXMpO1xuICAgICAgdGhpcy5jb25zb2xlTG9nTXNnKCdhZGQtaGlnaC1zY29yZS5jb21wb25lbnQnLCAnY2FsbGVyID0gJyArIHRoaXMuY2FsbGVyKTtcbiAgICB9KSk7XG5cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnYWRkLWhpZ2gtc2NvcmUuY29tcG9uZW50JywgJ25nT25Jbml0Jyk7XG4gICAgdGhpcy50aXRsZSA9IENvbmZpZy50aXRsZSArICcgLSBBZGQgSGlnaCBTY29yZSc7XG4gICAgaWYgKENvbmZpZy5pc0Rldikge1xuICAgICAgdGhpcy50aXRsZSArPSAnIChEZXYgTW9kZSknO1xuICAgIH1cbiAgfVxuXG4gIG9uQWRkQnV0dG9uVGFwKCkge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnYWRkLWhpZ2gtc2NvcmUuY29tcG9uZW50JywgJ29uQWRkQnV0dG9uVGFwJyk7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdhZGQtaGlnaC1zY29yZS5jb21wb25lbnQnLCAnbmFtZSA9ICcgKyB0aGlzLm5hbWUudHJpbSgpKTtcblxuXG4gICAgbGV0IHRleHRGaWVsZCA9IDxUZXh0RmllbGQ+dGhpcy5uYW1lVGV4dEZpZWxkLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGV4dEZpZWxkLmRpc21pc3NTb2Z0SW5wdXQoKTtcbiAgICB0aGlzLm5hbWUgPSB0ZXh0RmllbGQudGV4dDtcblxuICAgIGlmICh0aGlzLm5hbWUudHJpbSgpID09PSBcIlwiKSB7XG4gICAgICBhbGVydChcIkVudGVyIHlvdXIgbmFtZVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgc2NvcmU6IFNjb3JlID0gbmV3IFNjb3JlKHRoaXMuX3Njb3JlU2VydmljZS5uZXh0SWQsXG4gICAgICB0aGlzLm5hbWUsICcwMDowMDowMCcsICt0aGlzLm1vdmVzLCB0aGlzLmxldmVsLCA8c3RyaW5nPm51bGwpO1xuXG4gICAgdGhpcy5fc2NvcmVTZXJ2aWNlLmluc2VydChzY29yZSk7XG5cbiAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgJ2dhbWUvOnRhcmdldCcsIHtcbiAgICAgICAgdGFyZ2V0OiB0aGlzLmNhbGxlclxuICAgICAgfVxuICAgIF0sIENvbmZpZy50cmFuc2l0aW9uKTtcblxuICB9XG5cbiAgb25DYW5jZWxCdXR0b25UYXAoKSB7XG4gICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICdnYW1lLzp0YXJnZXQnLCB7XG4gICAgICAgIHRhcmdldDogdGhpcy5jYWxsZXJcbiAgICAgIH1cbiAgICBdLCBDb25maWcudHJhbnNpdGlvbik7XG4gIH1cblxufVxuIl19