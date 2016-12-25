"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var dialogs_1 = require("ui/dialogs");
var page_1 = require("ui/page");
var SocialShare = require("nativescript-social-share");
var shared_1 = require("./shared");
var shared_2 = require("../shared");
var GroceriesComponent = (function () {
    function GroceriesComponent(router, store, loginService, page) {
        this.router = router;
        this.store = store;
        this.loginService = loginService;
        this.page = page;
        this.grocery = "";
        this.isShowingRecent = false;
        this.isLoading = false;
    }
    GroceriesComponent.prototype.ngOnInit = function () {
        this.isAndroid = !!this.page.android;
        this.page.actionBarHidden = true;
        this.page.className = "list-page";
    };
    // Prevent the first textfield from receiving focus on Android
    // See http://stackoverflow.com/questions/5056734/android-force-edittext-to-remove-focus
    GroceriesComponent.prototype.handleAndroidFocus = function (textField, container) {
        if (container.android) {
            container.android.setFocusableInTouchMode(true);
            container.android.setFocusable(true);
            textField.android.clearFocus();
        }
    };
    GroceriesComponent.prototype.showActivityIndicator = function () {
        this.isLoading = true;
    };
    GroceriesComponent.prototype.hideActivityIndicator = function () {
        this.isLoading = false;
    };
    GroceriesComponent.prototype.add = function (target) {
        var _this = this;
        // If showing recent groceries the add button should do nothing.
        if (this.isShowingRecent) {
            return;
        }
        var textField = this.groceryTextField.nativeElement;
        if (this.grocery.trim() === "") {
            // If the user clicked the add button, and the textfield is empty,
            // focus the text field and return.
            if (target === "button") {
                textField.focus();
            }
            else {
                // If the user clicked return with an empty text field show an error.
                shared_2.alert("Enter a grocery item");
            }
            return;
        }
        // Dismiss the keyboard
        // TODO: Is it better UX to dismiss the keyboard, or leave it up so the
        // user can continue to add more groceries?
        textField.dismissSoftInput();
        this.showActivityIndicator();
        this.store.add(this.grocery)
            .subscribe(function () {
            _this.grocery = "";
            _this.hideActivityIndicator();
        }, function () {
            shared_2.alert("An error occurred while adding an item to your list.");
            _this.hideActivityIndicator();
        });
    };
    GroceriesComponent.prototype.toggleRecent = function () {
        var _this = this;
        if (!this.isShowingRecent) {
            this.isShowingRecent = true;
            return;
        }
        this.showActivityIndicator();
        this.store.restore()
            .subscribe(function () {
            _this.isShowingRecent = false;
            _this.hideActivityIndicator();
        }, function () {
            shared_2.alert("An error occurred while adding groceries to your list.");
            _this.hideActivityIndicator();
        });
    };
    GroceriesComponent.prototype.showMenu = function () {
        var _this = this;
        dialogs_1.action({
            message: "What would you like to do?",
            actions: ["Share", "Log Off"],
            cancelButtonText: "Cancel"
        }).then(function (result) {
            if (result === "Share") {
                _this.share();
            }
            else if (result === "Log Off") {
                _this.logoff();
            }
        });
    };
    GroceriesComponent.prototype.share = function () {
        var items = this.store.items.value;
        var list = [];
        for (var i = 0, size = items.length; i < size; i++) {
            list.push(items[i].name);
        }
        SocialShare.shareText(list.join(", ").trim());
    };
    GroceriesComponent.prototype.logoff = function () {
        this.loginService.logoff();
        this.router.navigate(["/login"]);
    };
    return GroceriesComponent;
}());
__decorate([
    core_1.ViewChild("groceryTextField"),
    __metadata("design:type", core_1.ElementRef)
], GroceriesComponent.prototype, "groceryTextField", void 0);
GroceriesComponent = __decorate([
    core_1.Component({
        selector: "gr-groceries",
        templateUrl: "groceries/groceries.component.html",
        styleUrls: ["groceries/groceries-common.css", "groceries/groceries.component.css"],
        providers: [shared_1.GroceryService]
    }),
    __metadata("design:paramtypes", [router_1.Router,
        shared_1.GroceryService,
        shared_2.LoginService,
        page_1.Page])
], GroceriesComponent);
exports.GroceriesComponent = GroceriesComponent;
