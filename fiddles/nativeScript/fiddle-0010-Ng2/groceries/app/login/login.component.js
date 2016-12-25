"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var color_1 = require("color");
var connectivity_1 = require("connectivity");
var animation_1 = require("ui/animation");
var dialogs_1 = require("ui/dialogs");
var page_1 = require("ui/page");
var shared_1 = require("../shared");
var LoginComponent = (function () {
    function LoginComponent(router, userService, page) {
        this.router = router;
        this.userService = userService;
        this.page = page;
        this.isLoggingIn = true;
        this.isAuthenticating = false;
        this.user = new shared_1.User();
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
    };
    LoginComponent.prototype.focusPassword = function () {
        this.password.nativeElement.focus();
    };
    LoginComponent.prototype.submit = function () {
        if (!this.user.isValidEmail()) {
            shared_1.alert("Enter a valid email address.");
            return;
        }
        this.isAuthenticating = true;
        if (this.isLoggingIn) {
            this.login();
        }
        else {
            this.signUp();
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        if (connectivity_1.getConnectionType() === connectivity_1.connectionType.none) {
            shared_1.alert("Groceries requires an internet connection to log in.");
            return;
        }
        this.userService.login(this.user)
            .subscribe(function () {
            _this.isAuthenticating = false;
            _this.router.navigate(["/"]);
        }, function (error) {
            shared_1.alert("Unfortunately we could not find your account.");
            _this.isAuthenticating = false;
        });
    };
    LoginComponent.prototype.signUp = function () {
        var _this = this;
        if (connectivity_1.getConnectionType() === connectivity_1.connectionType.none) {
            shared_1.alert("Groceries requires an internet connection to register.");
            return;
        }
        this.userService.register(this.user)
            .subscribe(function () {
            shared_1.alert("Your account was successfully created.");
            _this.isAuthenticating = false;
            _this.toggleDisplay();
        }, function (message) {
            // TODO: Verify this works
            if (message.match(/same user/)) {
                shared_1.alert("This email address is already in use.");
            }
            else {
                shared_1.alert("Unfortunately we were unable to create your account.");
            }
            _this.isAuthenticating = false;
        });
    };
    LoginComponent.prototype.forgotPassword = function () {
        var _this = this;
        dialogs_1.prompt({
            title: "Forgot Password",
            message: "Enter the email address you used to register for Groceries to reset your password.",
            defaultText: "",
            okButtonText: "Ok",
            cancelButtonText: "Cancel"
        }).then(function (data) {
            if (data.result) {
                _this.userService.resetPassword(data.text.trim())
                    .subscribe(function () {
                    shared_1.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
                }, function () {
                    shared_1.alert("Unfortunately, an error occurred resetting your password.");
                });
            }
        });
    };
    LoginComponent.prototype.toggleDisplay = function () {
        this.isLoggingIn = !this.isLoggingIn;
        var mainContainer = this.mainContainer.nativeElement;
        mainContainer.animate({
            backgroundColor: this.isLoggingIn ? new color_1.Color("white") : new color_1.Color("#301217"),
            duration: 200
        });
    };
    LoginComponent.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    LoginComponent.prototype.showMainContent = function () {
        var initialContainer = this.initialContainer.nativeElement;
        var mainContainer = this.mainContainer.nativeElement;
        var logoContainer = this.logoContainer.nativeElement;
        var formControls = this.formControls.nativeElement;
        var signUpStack = this.signUpStack.nativeElement;
        var animations = [];
        // Fade out the initial content over one half second
        initialContainer.animate({
            opacity: 0,
            duration: 500
        }).then(function () {
            // After the animation completes, hide the initial container and
            // show the main container and logo. The main container and logo will
            // not immediately appear because their opacity is set to 0 in CSS.
            initialContainer.style.visibility = "collapse";
            mainContainer.style.visibility = "visible";
            logoContainer.style.visibility = "visible";
            // Fade in the main container and logo over one half second.
            animations.push({ target: mainContainer, opacity: 1, duration: 500 });
            animations.push({ target: logoContainer, opacity: 1, duration: 500 });
            // Slide up the form controls and sign up container.
            animations.push({ target: signUpStack, translate: { x: 0, y: 0 }, opacity: 1, delay: 500, duration: 150 });
            animations.push({ target: formControls, translate: { x: 0, y: 0 }, opacity: 1, delay: 650, duration: 150 });
            // Kick off the animation queue
            new animation_1.Animation(animations, false).play();
        });
    };
    return LoginComponent;
}());
__decorate([
    core_1.ViewChild("initialContainer"),
    __metadata("design:type", core_1.ElementRef)
], LoginComponent.prototype, "initialContainer", void 0);
__decorate([
    core_1.ViewChild("mainContainer"),
    __metadata("design:type", core_1.ElementRef)
], LoginComponent.prototype, "mainContainer", void 0);
__decorate([
    core_1.ViewChild("logoContainer"),
    __metadata("design:type", core_1.ElementRef)
], LoginComponent.prototype, "logoContainer", void 0);
__decorate([
    core_1.ViewChild("formControls"),
    __metadata("design:type", core_1.ElementRef)
], LoginComponent.prototype, "formControls", void 0);
__decorate([
    core_1.ViewChild("signUpStack"),
    __metadata("design:type", core_1.ElementRef)
], LoginComponent.prototype, "signUpStack", void 0);
__decorate([
    core_1.ViewChild("password"),
    __metadata("design:type", core_1.ElementRef)
], LoginComponent.prototype, "password", void 0);
LoginComponent = __decorate([
    core_1.Component({
        selector: "gr-login",
        templateUrl: "login/login.component.html",
        styleUrls: ["login/login-common.css", "login/login.component.css"],
    }),
    __metadata("design:paramtypes", [router_1.Router,
        shared_1.LoginService,
        page_1.Page])
], LoginComponent);
exports.LoginComponent = LoginComponent;
