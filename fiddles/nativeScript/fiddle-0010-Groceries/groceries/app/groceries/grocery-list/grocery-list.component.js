"use strict";
var core_1 = require("@angular/core");
var utils = require("utils/utils");
var shared_1 = require("../shared");
var shared_2 = require("../../shared");
var GroceryListComponent = (function () {
    function GroceryListComponent(store) {
        this.store = store;
        this.loading = new core_1.EventEmitter();
        this.loaded = new core_1.EventEmitter();
        this.listLoaded = false;
    }
    GroceryListComponent.prototype.load = function () {
        var _this = this;
        this.loading.next("");
        this.store.load()
            .subscribe(function () {
            _this.loaded.next("");
            _this.listLoaded = true;
        }, function () {
            shared_2.alert("An error occurred loading your grocery list.");
        });
    };
    // The following trick makes the background color of each cell
    // in the UITableView transparent as it’s created.
    GroceryListComponent.prototype.makeBackgroundTransparent = function (args) {
        var cell = args.ios;
        if (cell) {
            // support XCode 8
            cell.backgroundColor = utils.ios.getter(UIColor, UIColor.clearColor);
        }
    };
    GroceryListComponent.prototype.imageSource = function (grocery) {
        if (grocery.deleted) {
            return grocery.done ? "res://selected" : "res://nonselected";
        }
        return grocery.done ? "res://checked" : "res://unchecked";
    };
    GroceryListComponent.prototype.toggleDone = function (grocery) {
        if (grocery.deleted) {
            grocery.done = !grocery.done;
            return;
        }
        this.store.toggleDoneFlag(grocery)
            .subscribe(function () { }, function () {
            shared_2.alert("An error occurred managing your grocery list.");
        });
    };
    GroceryListComponent.prototype.delete = function (grocery) {
        var _this = this;
        this.loading.next("");
        var successHandler = function () { return _this.loaded.next(""); };
        var errorHandler = function () {
            shared_2.alert("An error occurred while deleting an item from your list.");
            _this.loaded.next("");
        };
        if (grocery.deleted) {
            this.store.permanentlyDelete(grocery)
                .subscribe(successHandler, errorHandler);
        }
        else {
            this.store.setDeleteFlag(grocery)
                .subscribe(successHandler, errorHandler);
        }
    };
    return GroceryListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], GroceryListComponent.prototype, "showDeleted", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], GroceryListComponent.prototype, "row", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], GroceryListComponent.prototype, "loading", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], GroceryListComponent.prototype, "loaded", void 0);
GroceryListComponent = __decorate([
    core_1.Component({
        selector: "gr-grocery-list",
        templateUrl: "groceries/grocery-list/grocery-list.component.html",
        styleUrls: ["groceries/grocery-list/grocery-list.component.css"],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [shared_1.GroceryService])
], GroceryListComponent);
exports.GroceryListComponent = GroceryListComponent;
