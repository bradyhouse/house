"use strict";
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var index_1 = require("./components/index");
var index_2 = require("./actions/index");
var index_3 = require("./services/index");
var PuzzleModule = (function () {
    function PuzzleModule(parentModule) {
        if (parentModule) {
            throw new Error('EniPuzzleModule already loaded; Import in root module only.');
        }
    }
    return PuzzleModule;
}());
PuzzleModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            router_1.RouterModule
        ],
        providers: [
            index_2.ACTION_PROVIDERS,
            index_3.PUZZLE_PROVIDERS
        ],
        declarations: [
            index_1.PUZZLE_COMPONENTS
        ],
        exports: [
            index_1.PUZZLE_COMPONENTS
        ],
        schemas: [
            core_1.NO_ERRORS_SCHEMA,
            core_1.CUSTOM_ELEMENTS_SCHEMA
        ],
    }),
    __param(0, core_1.Optional()), __param(0, core_1.SkipSelf()),
    __metadata("design:paramtypes", [PuzzleModule])
], PuzzleModule);
exports.PuzzleModule = PuzzleModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHV6emxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInB1enpsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFxRztBQUNyRywwQ0FBNkM7QUFDN0Msd0NBQTJDO0FBQzNDLHNDQUF5QztBQUN6QywwQ0FBNkM7QUFDN0MsNENBQXFEO0FBQ3JELHlDQUFpRDtBQUNqRCwwQ0FBa0Q7QUF3QmxELElBQWEsWUFBWTtJQUV2QixzQkFBb0MsWUFBMEI7UUFDNUQsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLDZEQUE2RCxDQUFDLENBQUM7UUFDakYsQ0FBQztJQUNILENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBUFksWUFBWTtJQXRCeEIsZUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AscUJBQVk7WUFDWixtQkFBVztZQUNYLGlCQUFVO1lBQ1YscUJBQVk7U0FDYjtRQUNELFNBQVMsRUFBRTtZQUNULHdCQUFnQjtZQUNoQix3QkFBZ0I7U0FDakI7UUFDRCxZQUFZLEVBQUU7WUFDWix5QkFBaUI7U0FDbEI7UUFDRCxPQUFPLEVBQUU7WUFDUCx5QkFBaUI7U0FDbEI7UUFDRCxPQUFPLEVBQUU7WUFDUCx1QkFBZ0I7WUFDaEIsNkJBQXNCO1NBQ3ZCO0tBQ0YsQ0FBQztJQUdhLFdBQUEsZUFBUSxFQUFFLENBQUEsRUFBRSxXQUFBLGVBQVEsRUFBRSxDQUFBO3FDQUFlLFlBQVk7R0FGbkQsWUFBWSxDQU94QjtBQVBZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSwgT3B0aW9uYWwsIFNraXBTZWxmLCBOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtIdHRwTW9kdWxlfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7Um91dGVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtQVVpaTEVfQ09NUE9ORU5UU30gZnJvbSAnLi9jb21wb25lbnRzL2luZGV4JztcbmltcG9ydCB7QUNUSU9OX1BST1ZJREVSU30gZnJvbSAnLi9hY3Rpb25zL2luZGV4JztcbmltcG9ydCB7UFVaWkxFX1BST1ZJREVSU30gZnJvbSAnLi9zZXJ2aWNlcy9pbmRleCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgSHR0cE1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQUNUSU9OX1BST1ZJREVSUyxcbiAgICBQVVpaTEVfUFJPVklERVJTXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFBVWlpMRV9DT01QT05FTlRTXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBQVVpaTEVfQ09NUE9ORU5UU1xuICBdLFxuICBzY2hlbWFzOiBbXG4gICAgTk9fRVJST1JTX1NDSEVNQSxcbiAgICBDVVNUT01fRUxFTUVOVFNfU0NIRU1BXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFB1enpsZU1vZHVsZSB7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBQdXp6bGVNb2R1bGUpIHtcbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VuaVB1enpsZU1vZHVsZSBhbHJlYWR5IGxvYWRlZDsgSW1wb3J0IGluIHJvb3QgbW9kdWxlIG9ubHkuJyk7XG4gICAgfVxuICB9XG59XG4iXX0=