"use strict";
var core_1 = require("@angular/core");
var toolbar_state_enum_1 = require("./toolbar-state.enum");
var index_1 = require("../../index");
var base_component_1 = require("../base.component");
var ToolbarComponent = (function (_super) {
    __extends(ToolbarComponent, _super);
    function ToolbarComponent() {
        var _this = _super.call(this) || this;
        _this.toggle = new core_1.EventEmitter();
        _this.about = new core_1.EventEmitter();
        return _this;
    }
    ToolbarComponent.prototype.ngOnChanges = function (changes) {
        if (this.options) {
            this.options = this.transform(this.options);
        }
    };
    Object.defineProperty(ToolbarComponent.prototype, "database", {
        get: function () {
            var stateService = this.options &&
                this.options.hasOwnProperty('stateService') ? this.options.stateService : null;
            return stateService ? stateService.databaseService : null;
        },
        enumerable: true,
        configurable: true
    });
    ToolbarComponent.prototype.onToggleClick = function () {
        var action = this.options && this.options.actionService ? this.options.actionService.action : null;
        if (this.options.state === toolbar_state_enum_1.ToolbarStateEnum.PLAY) {
            this.options.state = toolbar_state_enum_1.ToolbarStateEnum.SOLVE;
        }
        else {
            this.options.state = toolbar_state_enum_1.ToolbarStateEnum.PLAY;
        }
        this.persist(this.options);
        this.options = this.transform(this.options);
        if (action !== null) {
            action = this.options.state === toolbar_state_enum_1.ToolbarStateEnum.PLAY ? index_1.ActionsEnum.SOLVE : index_1.ActionsEnum.PLAY;
            this.options.actionService.action = action;
        }
        this.toggle.emit(this);
    };
    ToolbarComponent.prototype.onAboutClick = function () {
        this.about.emit(this);
    };
    ToolbarComponent.prototype.onActionChange = function (action) {
        var state = this.options ? this.options.state : null;
        if (state) {
            switch (action) {
                case index_1.ActionsEnum.PLAY:
                    state = toolbar_state_enum_1.ToolbarStateEnum.SOLVE;
                    break;
                case index_1.ActionsEnum.SOLVE:
                    state = toolbar_state_enum_1.ToolbarStateEnum.PLAY;
                    break;
            }
            if (state !== this.options.state) {
                this.options.state = state;
                this.persist(this.options);
                this.transform(this.options);
            }
        }
    };
    ToolbarComponent.prototype.transform = function (options) {
        var _this = this;
        var state = this.isToolbarPersisted(options.id) ?
            this.restoreToolbarOptions(options.id) : options.state;
        if (this.subscriptions.length === 0) {
            if (options.actionService) {
                this.subscriptions.push(options.actionService.actionChange$
                    .subscribe(function (action) { return _this.onActionChange(action); }));
            }
        }
        switch (state) {
            case toolbar_state_enum_1.ToolbarStateEnum.PLAY:
                {
                    options.toggleText = 'Play';
                    options.toggleTitle = 'Play game';
                }
                break;
            default:
                {
                    options.toggleText = 'Solve';
                    options.toggleTitle = 'Solve puzzle';
                }
                break;
        }
        return options;
    };
    ToolbarComponent.prototype.isToolbarPersisted = function (id) {
        var databaseService = this.database;
        if (databaseService) {
            return databaseService.exists(id);
        }
        return false;
    };
    ToolbarComponent.prototype.restoreToolbarOptions = function (id) {
        var databaseService = this.database, state = null;
        if (databaseService) {
            state = databaseService.pull(id);
        }
        return state;
    };
    ToolbarComponent.prototype.clearState = function (id) {
        var databaseService = this.database;
        if (databaseService) {
            databaseService.delete(id);
        }
    };
    ToolbarComponent.prototype.persist = function (options) {
        var databaseService = this.database;
        if (databaseService) {
            databaseService.push(options.id, options.state);
        }
    };
    return ToolbarComponent;
}(base_component_1.BaseComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ToolbarComponent.prototype, "options", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ToolbarComponent.prototype, "toggle", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ToolbarComponent.prototype, "about", void 0);
ToolbarComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'pz-toolbar',
        templateUrl: 'toolbar.component.html',
        styleUrls: [
            'toolbar.component.css',
        ],
    }),
    __metadata("design:paramtypes", [])
], ToolbarComponent);
exports.ToolbarComponent = ToolbarComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0b29sYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQStGO0FBRy9GLDJEQUFzRDtBQUN0RCxxQ0FBeUY7QUFDekYsb0RBQWdEO0FBVWhELElBQWEsZ0JBQWdCO0lBQVMsb0NBQWE7SUFNakQ7UUFBQSxZQUNFLGlCQUFPLFNBR1I7UUFGQyxLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksbUJBQVksRUFBb0IsQ0FBQztRQUNuRCxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksbUJBQVksRUFBb0IsQ0FBQzs7SUFDcEQsQ0FBQztJQUVELHNDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLENBQUM7SUFDSCxDQUFDO0lBRUQsc0JBQUksc0NBQVE7YUFBWjtZQUNFLElBQUksWUFBWSxHQUEwQixJQUFJLENBQUMsT0FBTztnQkFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQy9FLE1BQU0sQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUQsQ0FBQzs7O09BQUE7SUFFRCx3Q0FBYSxHQUFiO1FBQ0UsSUFBSSxNQUFNLEdBQWdCLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUdoSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxD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QUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLENBQUM7SUFDSCxDQUFDO0lBRU8sa0NBQU8sR0FBZixVQUFnQixPQUFnQztRQUM5QyxJQUFJLGVBQWUsR0FBNkIsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUU5RCxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEQsQ0FBQztJQUNILENBQUM7SUFFSCx1QkFBQztBQUFELENBQUMsQUFoSUQsQ0FBc0MsOEJBQWEsR0FnSWxEO0FBOUhVO0lBQVIsWUFBSyxFQUFFOztpREFBa0M7QUFDaEM7SUFBVCxhQUFNLEVBQUU7OEJBQVMsbUJBQVk7Z0RBQW1CO0FBQ3ZDO0lBQVQsYUFBTSxFQUFFOzhCQUFRLG1CQUFZOytDQUFtQjtBQUpyQyxnQkFBZ0I7SUFSNUIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixRQUFRLEVBQUUsWUFBWTtRQUN0QixXQUFXLEVBQUUsd0JBQXdCO1FBQ3JDLFNBQVMsRUFBRTtZQUNULHVCQUF1QjtTQUN4QjtLQUNGLENBQUM7O0dBQ1csZ0JBQWdCLENBZ0k1QjtBQWhJWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtUb29sYmFySW50ZXJmYWNlfSBmcm9tICcuL3Rvb2xiYXIuaW50ZXJmYWNlJztcbmltcG9ydCB7VG9vbGJhck9wdGlvbnNJbnRlcmZhY2V9IGZyb20gJy4vdG9vbGJhci1vcHRpb25zLmludGVyZmFjZSc7XG5pbXBvcnQge1Rvb2xiYXJTdGF0ZUVudW19IGZyb20gJy4vdG9vbGJhci1zdGF0ZS5lbnVtJztcbmltcG9ydCB7QWN0aW9uc0VudW0sIERhdGFiYXNlU2VydmljZUludGVyZmFjZSwgU3RhdGVTZXJ2aWNlSW50ZXJmYWNlfSBmcm9tICcuLi8uLi9pbmRleCc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uL2Jhc2UuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAncHotdG9vbGJhcicsXG4gIHRlbXBsYXRlVXJsOiAndG9vbGJhci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogW1xuICAgICd0b29sYmFyLmNvbXBvbmVudC5jc3MnLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBUb29sYmFyQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIFRvb2xiYXJJbnRlcmZhY2UsIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgb3B0aW9uczogVG9vbGJhck9wdGlvbnNJbnRlcmZhY2U7XG4gIEBPdXRwdXQoKSB0b2dnbGU6IEV2ZW50RW1pdHRlcjxUb29sYmFyQ29tcG9uZW50PjtcbiAgQE91dHB1dCgpIGFib3V0OiBFdmVudEVtaXR0ZXI8VG9vbGJhckNvbXBvbmVudD47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnRvZ2dsZSA9IG5ldyBFdmVudEVtaXR0ZXI8VG9vbGJhckNvbXBvbmVudD4oKTtcbiAgICB0aGlzLmFib3V0ID0gbmV3IEV2ZW50RW1pdHRlcjxUb29sYmFyQ29tcG9uZW50PigpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IHRoaXMudHJhbnNmb3JtKHRoaXMub3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGRhdGFiYXNlKCk6IERhdGFiYXNlU2VydmljZUludGVyZmFjZSB7XG4gICAgbGV0IHN0YXRlU2VydmljZTogU3RhdGVTZXJ2aWNlSW50ZXJmYWNlID0gdGhpcy5vcHRpb25zICYmXG4gICAgdGhpcy5vcHRpb25zLmhhc093blByb3BlcnR5KCdzdGF0ZVNlcnZpY2UnKSA/IHRoaXMub3B0aW9ucy5zdGF0ZVNlcnZpY2UgOiBudWxsO1xuICAgIHJldHVybiBzdGF0ZVNlcnZpY2UgPyBzdGF0ZVNlcnZpY2UuZGF0YWJhc2VTZXJ2aWNlIDogbnVsbDtcbiAgfVxuXG4gIG9uVG9nZ2xlQ2xpY2soKTogdm9pZCB7XG4gICAgbGV0IGFjdGlvbjogQWN0aW9uc0VudW0gPSB0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmFjdGlvblNlcnZpY2UgPyB0aGlzLm9wdGlvbnMuYWN0aW9uU2VydmljZS5hY3Rpb24gOiBudWxsO1xuXG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnN0YXRlID09PSBUb29sYmFyU3RhdGVFbnVtLlBMQVkpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5zdGF0ZSA9IFRvb2xiYXJTdGF0ZUVudW0uU09MVkU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3B0aW9ucy5zdGF0ZSA9IFRvb2xiYXJTdGF0ZUVudW0uUExBWTtcbiAgICB9XG4gICAgdGhpcy5wZXJzaXN0KHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy50cmFuc2Zvcm0odGhpcy5vcHRpb25zKTtcbiAgICBpZiAoYWN0aW9uICE9PSBudWxsKSB7XG4gICAgICBhY3Rpb24gPSB0aGlzLm9wdGlvbnMuc3RhdGUgPT09IFRvb2xiYXJTdGF0ZUVudW0uUExBWSA/IEFjdGlvbnNFbnVtLlNPTFZFIDogQWN0aW9uc0VudW0uUExBWTtcbiAgICAgIHRoaXMub3B0aW9ucy5hY3Rpb25TZXJ2aWNlLmFjdGlvbiA9IGFjdGlvbjtcbiAgICB9XG4gICAgdGhpcy50b2dnbGUuZW1pdCh0aGlzKTtcbiAgfVxuXG4gIG9uQWJvdXRDbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLmFib3V0LmVtaXQodGhpcyk7XG4gIH1cblxuICBvbkFjdGlvbkNoYW5nZShhY3Rpb246IEFjdGlvbnNFbnVtKTogdm9pZCB7XG4gICAgbGV0IHN0YXRlOiBUb29sYmFyU3RhdGVFbnVtID0gdGhpcy5vcHRpb25zID8gdGhpcy5vcHRpb25zLnN0YXRlIDogbnVsbDtcbiAgICBpZiAoc3RhdGUpIHtcbiAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAgIGNhc2UgQWN0aW9uc0VudW0uUExBWTpcbiAgICAgICAgICBzdGF0ZSA9IFRvb2xiYXJTdGF0ZUVudW0uU09MVkU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQWN0aW9uc0VudW0uU09MVkU6XG4gICAgICAgICAgc3RhdGUgPSBUb29sYmFyU3RhdGVFbnVtLlBMQVk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoc3RhdGUgIT09IHRoaXMub3B0aW9ucy5zdGF0ZSkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5wZXJzaXN0KHRoaXMub3B0aW9ucyk7XG4gICAgICAgIHRoaXMudHJhbnNmb3JtKHRoaXMub3B0aW9ucyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdHJhbnNmb3JtKG9wdGlvbnM6IFRvb2xiYXJPcHRpb25zSW50ZXJmYWNlKTogVG9vbGJhck9wdGlvbnNJbnRlcmZhY2Uge1xuXG4gICAgbGV0IHN0YXRlOiBUb29sYmFyU3RhdGVFbnVtID0gdGhpcy5pc1Rvb2xiYXJQZXJzaXN0ZWQob3B0aW9ucy5pZCkgP1xuICAgICAgdGhpcy5yZXN0b3JlVG9vbGJhck9wdGlvbnMob3B0aW9ucy5pZCkgOiBvcHRpb25zLnN0YXRlO1xuXG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgIGlmIChvcHRpb25zLmFjdGlvblNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2gob3B0aW9ucy5hY3Rpb25TZXJ2aWNlLmFjdGlvbkNoYW5nZSRcbiAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKGFjdGlvbjogYW55KSA9PiB0aGlzLm9uQWN0aW9uQ2hhbmdlKGFjdGlvbilcbiAgICAgICAgICApKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICBjYXNlIFRvb2xiYXJTdGF0ZUVudW0uUExBWToge1xuICAgICAgICBvcHRpb25zLnRvZ2dsZVRleHQgPSAnUGxheSc7XG4gICAgICAgIG9wdGlvbnMudG9nZ2xlVGl0bGUgPSAnUGxheSBnYW1lJztcbiAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIG9wdGlvbnMudG9nZ2xlVGV4dCA9ICdTb2x2ZSc7XG4gICAgICAgIG9wdGlvbnMudG9nZ2xlVGl0bGUgPSAnU29sdmUgcHV6emxlJztcbiAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdGlvbnM7XG5cbiAgfVxuXG4gIGlzVG9vbGJhclBlcnNpc3RlZChpZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgbGV0IGRhdGFiYXNlU2VydmljZTogRGF0YWJhc2VTZXJ2aWNlSW50ZXJmYWNlID0gdGhpcy5kYXRhYmFzZTtcbiAgICBpZiAoZGF0YWJhc2VTZXJ2aWNlKSB7XG4gICAgICByZXR1cm4gZGF0YWJhc2VTZXJ2aWNlLmV4aXN0cyhpZCk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJlc3RvcmVUb29sYmFyT3B0aW9ucyhpZDogc3RyaW5nKTogVG9vbGJhclN0YXRlRW51bSB7XG4gICAgbGV0IGRhdGFiYXNlU2VydmljZTogRGF0YWJhc2VTZXJ2aWNlSW50ZXJmYWNlID0gdGhpcy5kYXRhYmFzZSxcbiAgICAgIHN0YXRlOiBUb29sYmFyU3RhdGVFbnVtID0gbnVsbDtcbiAgICBpZiAoZGF0YWJhc2VTZXJ2aWNlKSB7XG4gICAgICBzdGF0ZSA9IGRhdGFiYXNlU2VydmljZS5wdWxsKGlkKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhclN0YXRlKGlkOiBzdHJpbmcpIHtcbiAgICBsZXQgZGF0YWJhc2VTZXJ2aWNlOiBEYXRhYmFzZVNlcnZpY2VJbnRlcmZhY2UgPSB0aGlzLmRhdGFiYXNlO1xuICAgIGlmIChkYXRhYmFzZVNlcnZpY2UpIHtcbiAgICAgIGRhdGFiYXNlU2VydmljZS5kZWxldGUoaWQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcGVyc2lzdChvcHRpb25zOiBUb29sYmFyT3B0aW9uc0ludGVyZmFjZSk6IHZvaWQge1xuICAgIGxldCBkYXRhYmFzZVNlcnZpY2U6IERhdGFiYXNlU2VydmljZUludGVyZmFjZSA9IHRoaXMuZGF0YWJhc2U7XG5cbiAgICBpZiAoZGF0YWJhc2VTZXJ2aWNlKSB7XG4gICAgICBkYXRhYmFzZVNlcnZpY2UucHVzaChvcHRpb25zLmlkLCBvcHRpb25zLnN0YXRlKTtcbiAgICB9XG4gIH1cblxufVxuIl19