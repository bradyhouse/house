"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var config_1 = require("../../shared/config");
var AboutComponent = (function () {
    function AboutComponent(router, page) {
        this.router = router;
        this.page = page;
    }
    AboutComponent.prototype.ngOnInit = function () {
        this.title = config_1.Config.title + ' - About';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJvdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWJvdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBZ0Q7QUFFaEQsMENBQXVDO0FBQ3ZDLGdDQUE2QjtBQUc3Qiw4Q0FBMkM7QUFRM0MsSUFBYSxjQUFjO0lBR3pCLHdCQUFvQixNQUFjLEVBQVUsSUFBVTtRQUFsQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtJQUN0RCxDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBTSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7SUFDekMsQ0FBQztJQUVILHFCQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7QUFWWSxjQUFjO0lBTDFCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsT0FBTztRQUNqQixXQUFXLEVBQUUsa0NBQWtDO1FBQy9DLFNBQVMsRUFBRSxDQUFDLDhCQUE4QixFQUFFLHVCQUF1QixDQUFDO0tBQ3JFLENBQUM7cUNBSTRCLGVBQU0sRUFBZ0IsV0FBSTtHQUgzQyxjQUFjLENBVTFCO0FBVlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Vmlld30gZnJvbSAndWkvY29yZS92aWV3JztcbmltcG9ydCB7Um91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtQYWdlfSBmcm9tICd1aS9wYWdlJztcbmltcG9ydCB7Q29sb3J9IGZyb20gJ2NvbG9yJztcblxuaW1wb3J0IHtDb25maWd9IGZyb20gJy4uLy4uL3NoYXJlZC9jb25maWcnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fib3V0JyxcbiAgdGVtcGxhdGVVcmw6ICdwYWdlcy9hYm91dC9hYm91dC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwYWdlcy9hYm91dC9hYm91dC1jb21tb24uY3NzJywgJ3BhZ2VzL2Fib3V0L2Fib3V0LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEFib3V0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgdGl0bGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudGl0bGUgPSBDb25maWcudGl0bGUgKyAnIC0gQWJvdXQnO1xuICB9XG5cbn1cbiJdfQ==