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
