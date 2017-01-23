"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var config_1 = require("../../shared/config");
var AboutComponent = (function () {
    function AboutComponent(_router, _page) {
        this._router = _router;
        this._page = _page;
        _page.className = 'page';
    }
    AboutComponent.prototype.ngOnInit = function () {
        this.title = config_1.Config.title + ' - About';
        if (config_1.Config.isDev) {
            this.title += ' (Dev Mode)';
        }
    };
    AboutComponent.prototype.onNavBtnTap = function () {
        this._router.navigate([''], config_1.Config.transition);
    };
    return AboutComponent;
}());
AboutComponent = __decorate([
    core_1.Component({
        selector: 'about',
        templateUrl: 'pages/about/about.component.html',
        styleUrls: ['pages/about/about-common.css', 'pages/about/about.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, page_1.Page])
], AboutComponent);
exports.AboutComponent = AboutComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJvdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWJvdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBZ0Q7QUFFaEQsMENBQXVDO0FBQ3ZDLGdDQUE2QjtBQUc3Qiw4Q0FBMkM7QUFRM0MsSUFBYSxjQUFjO0lBR3pCLHdCQUFvQixPQUFlLEVBQVUsS0FBVztRQUFwQyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUN0RCxLQUFLLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztJQUMzQixDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBTSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7UUFDdkMsRUFBRSxDQUFDLENBQUMsZUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLEtBQUssSUFBSSxhQUFhLENBQUM7UUFDOUIsQ0FBQztJQUNILENBQUM7SUFFRCxvQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxlQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVILHFCQUFDO0FBQUQsQ0FBQyxBQWxCRCxJQWtCQztBQWxCWSxjQUFjO0lBTDFCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsT0FBTztRQUNqQixXQUFXLEVBQUUsa0NBQWtDO1FBQy9DLFNBQVMsRUFBRSxDQUFDLDhCQUE4QixFQUFFLHVCQUF1QixDQUFDO0tBQ3JFLENBQUM7cUNBSTZCLGVBQU0sRUFBaUIsV0FBSTtHQUg3QyxjQUFjLENBa0IxQjtBQWxCWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtWaWV3fSBmcm9tICd1aS9jb3JlL3ZpZXcnO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1BhZ2V9IGZyb20gJ3VpL3BhZ2UnO1xuaW1wb3J0IHtDb2xvcn0gZnJvbSAnY29sb3InO1xuXG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi4vLi4vc2hhcmVkL2NvbmZpZyc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWJvdXQnLFxuICB0ZW1wbGF0ZVVybDogJ3BhZ2VzL2Fib3V0L2Fib3V0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3BhZ2VzL2Fib3V0L2Fib3V0LWNvbW1vbi5jc3MnLCAncGFnZXMvYWJvdXQvYWJvdXQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQWJvdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICB0aXRsZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlcjogUm91dGVyLCBwcml2YXRlIF9wYWdlOiBQYWdlKSB7XG4gICAgX3BhZ2UuY2xhc3NOYW1lID0gJ3BhZ2UnO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy50aXRsZSA9IENvbmZpZy50aXRsZSArICcgLSBBYm91dCc7XG4gICAgaWYgKENvbmZpZy5pc0Rldikge1xuICAgICAgdGhpcy50aXRsZSArPSAnIChEZXYgTW9kZSknO1xuICAgIH1cbiAgfVxuXG4gIG9uTmF2QnRuVGFwKCk6IHZvaWQge1xuICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJyddLCBDb25maWcudHJhbnNpdGlvbik7XG4gIH1cblxufVxuIl19