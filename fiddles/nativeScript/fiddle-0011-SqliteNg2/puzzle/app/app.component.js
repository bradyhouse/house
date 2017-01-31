"use strict";
var core_1 = require("@angular/core");
var Sqlite = require("nativescript-sqlite");
var AppComponent = (function () {
    function AppComponent() {
        if (!Sqlite.exists("highscore.db")) {
            Sqlite.copyDatabase("highscore.db");
        }
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: "main",
        template: "<page-router-outlet></page-router-outlet>"
    }),
    __metadata("design:paramtypes", [])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUEwQztBQUMxQyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQU01QyxJQUFhLFlBQVk7SUFHckI7UUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDeEMsQ0FBQztJQUNMLENBQUM7SUFFTCxtQkFBQztBQUFELENBQUMsQUFURCxJQVNDO0FBVFksWUFBWTtJQUp4QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU07UUFDaEIsUUFBUSxFQUFFLDJDQUEyQztLQUN4RCxDQUFDOztHQUNXLFlBQVksQ0FTeEI7QUFUWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG52YXIgU3FsaXRlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1zcWxpdGVcIik7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm1haW5cIixcbiAgICB0ZW1wbGF0ZTogXCI8cGFnZS1yb3V0ZXItb3V0bGV0PjwvcGFnZS1yb3V0ZXItb3V0bGV0PlwiXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG4gICAgcHJpdmF0ZSBkYXRhYmFzZTogYW55O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBpZiAoIVNxbGl0ZS5leGlzdHMoXCJoaWdoc2NvcmUuZGJcIikpIHtcbiAgICAgICAgICAgIFNxbGl0ZS5jb3B5RGF0YWJhc2UoXCJoaWdoc2NvcmUuZGJcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iXX0=