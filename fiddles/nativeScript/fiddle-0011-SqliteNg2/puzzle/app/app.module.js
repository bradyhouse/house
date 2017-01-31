"use strict";
var core_1 = require("@angular/core");
var http_1 = require("nativescript-angular/http");
var platform_1 = require("nativescript-angular/platform");
var router_1 = require("nativescript-angular/router");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_1.NativeScriptModule,
            http_1.NativeScriptHttpModule,
            router_1.NativeScriptRouterModule,
            router_1.NativeScriptRouterModule.forRoot(app_routing_1.routes)
        ],
        declarations: [
            app_component_1.AppComponent
        ].concat(app_routing_1.navigatableComponents),
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUF5QztBQUN6QyxrREFBbUU7QUFDbkUsMERBQW1FO0FBQ25FLHNEQUF1RTtBQUV2RSxpREFBK0M7QUFDL0MsNkNBQThEO0FBZTlELElBQWEsU0FBUztJQUF0QjtJQUF3QixDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQUFDLEFBQXpCLElBQXlCO0FBQVosU0FBUztJQWJyQixlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCw2QkFBa0I7WUFDbEIsNkJBQXNCO1lBQ3RCLGlDQUF3QjtZQUN4QixpQ0FBd0IsQ0FBQyxPQUFPLENBQUMsb0JBQU0sQ0FBQztTQUN6QztRQUNELFlBQVk7WUFDViw0QkFBWTtpQkFDVCxtQ0FBcUIsQ0FDekI7UUFDRCxTQUFTLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO0tBQzFCLENBQUM7R0FDVyxTQUFTLENBQUc7QUFBWiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3BsYXRmb3JtXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7IHJvdXRlcywgbmF2aWdhdGFibGVDb21wb25lbnRzIH0gZnJvbSBcIi4vYXBwLnJvdXRpbmdcIjtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFwcENvbXBvbmVudCxcbiAgICAuLi5uYXZpZ2F0YWJsZUNvbXBvbmVudHNcbiAgXSxcbiAgYm9vdHN0cmFwOiBbQXBwQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUge30iXX0=