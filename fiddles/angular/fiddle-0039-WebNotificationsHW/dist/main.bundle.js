webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_dashboard_component__ = __webpack_require__("./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notification_queue_notification_queue_component__ = __webpack_require__("./src/app/notification-queue/notification-queue.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_2__dashboard_dashboard_component__["a" /* DashboardComponent */] },
    { path: 'notification', component: __WEBPACK_IMPORTED_MODULE_3__notification_queue_notification_queue_component__["a" /* NotificationQueueComponent */] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot(routes, { onSameUrlNavigation: 'reload' })],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<nav class=\"navbar navbar-expand navbar-dark bg-primary navbar-top\">\n  <div class=\"collapse navbar-collapse\">\n    <ul class=\"navbar-nav mr-auto\">\n      <li id=\"description\" class=\"navbar-brand\" style=\"font-weight: 700; color: whitesmoke;\">\n        Web Notification API - Hello World!\n      </li>\n    </ul>\n    <ul class=\"navbar-nav my-2 my-lg-0\">\n      <li class=\"nav-item\">\n        <a id=\"githubLink\" class=\"nav-item\" style=\"font-weight: 700; color: whitesmoke;\" alt=\"Fork me on GitHub\" target=\"_blank\" title=\"View Source\"\n           href=\"https://github.com/bradyhouse/house/blob/master/fiddles/angular2-cli/fiddle-0039-WebNotificationsHW\">\n          Fork Me On Github\n        </a>\n      </li>\n\n    </ul>\n  </div>\n</nav>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state_state_service__ = __webpack_require__("./src/app/state/state.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__state_local_storage_local_storage_service__ = __webpack_require__("./src/app/state/local-storage/local-storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notify_notify_service__ = __webpack_require__("./src/app/notify/notify.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app__ = __webpack_require__("./src/app/app.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var AppComponent = /** @class */ (function (_super) {
    __extends(AppComponent, _super);
    function AppComponent(_stateService, _localStorageService, _notifyService, _router) {
        var _this = _super.call(this) || this;
        _this._stateService = _stateService;
        _this._localStorageService = _localStorageService;
        _this._notifyService = _notifyService;
        _this._router = _router;
        _this.subscriptions.push(_stateService.notificationsChange$
            .subscribe(function (notifications) { return _this.onNotificationsStateChange(notifications); }));
        return _this;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._localStorageService.read();
        this._localStorageService.updateStateService(this._stateService.type, this._stateService);
        this._stateService.isReady = true;
        this._notifyService.requestPermission();
        this._notifyService.isEnabled = true;
        window.setTimeout(function () {
            _this.showNotification(_this._stateService.notifications);
        }, 1000);
    };
    AppComponent.prototype.onNotificationsStateChange = function (notifications) {
        this.showNotification(notifications);
    };
    AppComponent.prototype.onNotificationClick = function (event) {
        console.log('onNotificationClick', event);
    };
    AppComponent.prototype.showNotification = function (notifications) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var lastNotification, options, registerServiceWorker, swRegistration;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(notifications.length && this._notifyService.isPermission && this._notifyService.isEnabled)) return [3 /*break*/, 2];
                        lastNotification = notifications[notifications.length - 1];
                        options = {
                            body: lastNotification.message,
                            icon: './assets/7.png',
                            actions: [{
                                    action: 0,
                                    title: 'Open',
                                    icon: './assets/question.png'
                                }, {
                                    action: 1,
                                    title: 'Acknowledge',
                                    icon: './assets/check.png'
                                }],
                            data: {
                                id: lastNotification.id
                            },
                            silent: false,
                            requireInteraction: false,
                            persistent: false,
                            sticky: false,
                            notificationCloseEvent: false
                        };
                        registerServiceWorker = function () { return __awaiter(_this, void 0, void 0, function () {
                            var swRegistration;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, navigator.serviceWorker.register('./sw.js')];
                                    case 1:
                                        swRegistration = _a.sent();
                                        return [2 /*return*/, swRegistration];
                                }
                            });
                        }); };
                        return [4 /*yield*/, registerServiceWorker()];
                    case 1:
                        swRegistration = _a.sent();
                        navigator.serviceWorker.addEventListener('message', function (event) {
                            var actionId = event && event.data.message.action ? Number(event.data.message.action) : null;
                            var notificationId = actionId ? Number(event.data.message.id) : null;
                            switch (actionId) {
                                case 0:
                                    _this._router.navigate(['/notification']);
                                    break;
                                case 1:
                                    _this._notifyService.acknowledge(notificationId);
                                    break;
                            }
                        });
                        window.setTimeout(function () {
                            _this._notifyService.playAlert();
                        }, 1000);
                        swRegistration.showNotification('Alert!!!', options);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__state_state_service__["a" /* StateService */],
            __WEBPACK_IMPORTED_MODULE_2__state_local_storage_local_storage_service__["a" /* LocalStorageService */],
            __WEBPACK_IMPORTED_MODULE_3__notify_notify_service__["a" /* NotifyService */],
            __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* Router */]])
    ], AppComponent);
    return AppComponent;
}(__WEBPACK_IMPORTED_MODULE_4__app__["a" /* BaseComponent */]));



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ag_grid_community_angular__ = __webpack_require__("./node_modules/@ag-grid-community/angular/main.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ag_grid_community_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ag_grid_community_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_components_module__ = __webpack_require__("./src/app/components/components.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_tooltip_tooltip_component__ = __webpack_require__("./src/app/components/tooltip/tooltip.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dashboard_dashboard_component__ = __webpack_require__("./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__state_state_module__ = __webpack_require__("./src/app/state/state.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_routing_module__ = __webpack_require__("./src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__notification_queue_notification_queue_component__ = __webpack_require__("./src/app/notification-queue/notification-queue.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__notify_notify_module__ = __webpack_require__("./src/app/notify/notify.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_10__notification_queue_notification_queue_component__["a" /* NotificationQueueComponent */],
                __WEBPACK_IMPORTED_MODULE_7__dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                // tslint:disable-next-line: deprecation
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3__ag_grid_community_angular__["AgGridModule"].withComponents([__WEBPACK_IMPORTED_MODULE_6__components_tooltip_tooltip_component__["a" /* TooltipComponent */]]),
                __WEBPACK_IMPORTED_MODULE_5__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_8__state_state_module__["a" /* StateModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_11__notify_notify_module__["a" /* NotifyModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_9__app_routing_module__["a" /* AppRoutingModule */]
            ],
            providers: [{
                    provide: __WEBPACK_IMPORTED_MODULE_12__angular_common__["g" /* LocationStrategy */],
                    useClass: __WEBPACK_IMPORTED_MODULE_12__angular_common__["d" /* HashLocationStrategy */]
                }],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseComponent; });
var BaseComponent = /** @class */ (function () {
    function BaseComponent() {
        this.subscriptions = [];
    }
    BaseComponent.prototype.ngOnDestroy = function () {
        this.clearSubscriptions();
    };
    BaseComponent.prototype.clearSubscriptions = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.subscriptions = [];
    };
    return BaseComponent;
}());



/***/ }),

/***/ "./src/app/components/components.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tooltip_tooltip_component__ = __webpack_require__("./src/app/components/tooltip/tooltip.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__header_header_component__ = __webpack_require__("./src/app/components/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__toolbar_toolbar_component__ = __webpack_require__("./src/app/components/toolbar/toolbar.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__tooltip_tooltip_component__["a" /* TooltipComponent */],
                __WEBPACK_IMPORTED_MODULE_4__toolbar_toolbar_component__["a" /* ToolbarComponent */],
                __WEBPACK_IMPORTED_MODULE_3__header_header_component__["b" /* HeaderComponent */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__tooltip_tooltip_component__["a" /* TooltipComponent */], __WEBPACK_IMPORTED_MODULE_3__header_header_component__["b" /* HeaderComponent */], __WEBPACK_IMPORTED_MODULE_4__toolbar_toolbar_component__["a" /* ToolbarComponent */]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());



/***/ }),

/***/ "./src/app/components/header/header.component.css":
/***/ (function(module, exports) {

module.exports = "table {\n    width: calc(100%) !important;\n    padding: 0;\n    margin: 0;\n}\n\na {\n    cursor: pointer;\n}\n\n/*label {*/\n\n/*color: white !important;*/\n\n/*}*/\n\n/*.badge-medium {*/\n\n/*color: var(--blue7);*/\n\n/*}*/"

/***/ }),

/***/ "./src/app/components/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<app-toolbar [componentId]=\"'appHeader'\">\n  <div content>\n    <nav class=\"navbar navbar-expand navbar-dark\" style=\"height: 25px;\">\n      <div class=\"collapse navbar-collapse\">\n        <ul class=\"navbar-nav mr-auto\">\n          <li *ngIf=\"!isPermission\" class=\"nav-item\">\n            <a class=\"nav-link\" [id]=\"'fiddleHeaderNotifyPermissionBtn'\" (click)=\"onNotifyPermissionBtnClick()\">\n              <i class=\"far fa-bell\"></i> Enable Notifications\n            </a>\n          </li>\n          <li *ngIf=\"isPermission\" class=\"nav-item\">\n            <a class=\"nav-link\" [id]=\"'fiddleHeaderDisableBtn'\" (click)=\"onDisableBtnClick()\">\n              <i class=\"fas fa-bell-slash\"></i> Disable Notifications\n            </a>\n          </li>\n          <li *ngIf=\"!isSound\" class=\"nav-item\">\n              <a class=\"nav-link\" [id]=\"'fiddleHeaderEnableSoundBtn'\" (click)=\"onEnableSoundBtnClick()\">\n                  <i class=\"fas fa-volume-up\"></i> Enable Sound\n              </a>\n          </li>\n          <li *ngIf=\"isSound\" class=\"nav-item\">\n              <a class=\"nav-link\" [id]=\"'fiddleHeaderDisableSoundBtn'\" (click)=\"onDisableSoundBtnClick()\">\n                  <i class=\"fas fa-volume-mute\"></i> Disable Sound\n              </a>\n          </li>\n            \n          <li class=\"nav-item\">\n            <a class=\"nav-link\" [id]=\"'fiddleHeaderResetBtn'\" (click)=\"onResetClick()\">\n              <i class=\"fas fa-undo\"></i> Reset Grid\n            </a>\n          </li>\n        </ul>\n      </div>\n\n    </nav>\n  </div>\n</app-toolbar>\n"

/***/ }),

/***/ "./src/app/components/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notify_notify_service__ = __webpack_require__("./src/app/notify/notify.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app__ = __webpack_require__("./src/app/app.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EventType;
(function (EventType) {
    EventType["Reset"] = "Reset";
})(EventType || (EventType = {}));
var HeaderComponent = /** @class */ (function (_super) {
    __extends(HeaderComponent, _super);
    function HeaderComponent(_notifyService) {
        var _this = _super.call(this) || this;
        _this._notifyService = _notifyService;
        _this.event = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.isSound = _notifyService.isSound;
        _this.isPermission = _notifyService.isPermission;
        _this.subscriptions.push(_notifyService.isSoundChange$
            .subscribe(function (sound) { return _this.onNotifyIsSoundChange(sound); }));
        _this.subscriptions.push(_notifyService.isPermissionChange$
            .subscribe(function (permission) { return _this.onNotifyIsPermissionChange(permission); }));
        _this.subscriptions.push(_notifyService.isEnabledChange$
            .subscribe(function (enable) { return _this.onNotifyIsEnabledChange(enable); }));
        return _this;
    }
    HeaderComponent.prototype.onResetClick = function () {
        this.event.emit(EventType.Reset);
    };
    HeaderComponent.prototype.onDisableBtnClick = function () {
        this._notifyService.isEnabled = false;
    };
    HeaderComponent.prototype.onEnableSoundBtnClick = function () {
        this._notifyService.isSound = this.isSound = true;
    };
    HeaderComponent.prototype.onDisableSoundBtnClick = function () {
        this._notifyService.isSound = this.isSound = false;
    };
    HeaderComponent.prototype.onNotifyPermissionBtnClick = function () {
        var _this = this;
        this._notifyService.requestPermission();
        window.setTimeout(function () {
            if (_this._notifyService.isPermission) {
                _this.isPermission = true;
            }
        }, 1000);
    };
    HeaderComponent.prototype.onNotifyIsSoundChange = function (sound) {
        this.isSound = sound;
    };
    HeaderComponent.prototype.onNotifyIsPermissionChange = function (isPermission) {
        this.isPermission = isPermission;
    };
    HeaderComponent.prototype.onNotifyIsEnabledChange = function (isEnabled) {
        this.isPermission = isEnabled;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], HeaderComponent.prototype, "event", void 0);
    HeaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-header',
            template: __webpack_require__("./src/app/components/header/header.component.html"),
            styles: [__webpack_require__("./src/app/components/header/header.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__notify_notify_service__["a" /* NotifyService */]])
    ], HeaderComponent);
    return HeaderComponent;
}(__WEBPACK_IMPORTED_MODULE_2__app__["a" /* BaseComponent */]));



/***/ }),

/***/ "./src/app/components/toolbar/toolbar.component.css":
/***/ (function(module, exports) {

module.exports = "* {\n    background-color: var(--grey2) !important;\n    color: white;\n}\n\n.panel--raised {\n    margin: 0;\n    padding: .5em 1em;\n    font-size: .75em;\n}"

/***/ }),

/***/ "./src/app/components/toolbar/toolbar.component.html":
/***/ (function(module, exports) {

module.exports = "<div [id]=\"componentId || 'toolbar1'\" class=\"panel--raised\">\n  <div class=\"panel__body\">\n      <ng-content select=\"[content]\"></ng-content>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/components/toolbar/toolbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToolbarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ToolbarComponent = /** @class */ (function () {
    function ToolbarComponent() {
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], ToolbarComponent.prototype, "componentId", void 0);
    ToolbarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-toolbar',
            template: __webpack_require__("./src/app/components/toolbar/toolbar.component.html"),
            styles: [__webpack_require__("./src/app/components/toolbar/toolbar.component.css")]
        })
    ], ToolbarComponent);
    return ToolbarComponent;
}());



/***/ }),

/***/ "./src/app/components/tooltip/tooltip.component.css":
/***/ (function(module, exports) {

module.exports = ":host {\n  position: absolute;\n  width: auto;\n  min-width: 200px;\n  max-width: 250px;\n  height: auto;\n  border: 1px solid var(--blue6);\n  background-color: var(--blue7);\n  overflow: hidden;\n  pointer-events: none;\n  -webkit-transition: opacity 1s;\n  transition: opacity 1s;\n  padding: 5px;\n  -webkit-filter: drop-shadow(4px 4px 4px gray);\n          filter: drop-shadow(4px 4px 4px gray);\n}\n\n:host.ag-tooltip-hiding {\n  opacity: 0;\n}\n\n.custom-tooltip p {\n  margin: 5px;\n  white-space: nowrap;\n}\n\n.custom-tooltip {\n  font-weight: bold;\n}\n"

/***/ }),

/***/ "./src/app/components/tooltip/tooltip.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"custom-tooltip\">\n  {{tooltipText}}\n</div>\n"

/***/ }),

/***/ "./src/app/components/tooltip/tooltip.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TooltipComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TooltipComponent = /** @class */ (function () {
    function TooltipComponent() {
    }
    TooltipComponent.prototype.agInit = function (params) {
        this.params = params;
        this.data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
        this.tooltipText = this.params.tooltip || 'n/a';
    };
    TooltipComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-tooltip',
            template: __webpack_require__("./src/app/components/tooltip/tooltip.component.html"),
            styles: [__webpack_require__("./src/app/components/tooltip/tooltip.component.css")]
        })
    ], TooltipComponent);
    return TooltipComponent;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-light bg-light\" style=\"height: 25px;\">\n  <ul class=\"navbar-nav mr-auto\">\n    <li class=\"nav-item active\"><a routerLink=\"/dashboard\" class=\"nav-link\" routerLinkActive=\"active\">Dashboard</a></li>\n    <li class=\"nav-item\"><a routerLink=\"/notification\" class=\"nav-link\" routerLinkActive=\"active\">Notifications</a></li>\n  </ul>\n</nav>\n<app-header (event)=\"onHeaderClick($event)\"></app-header>\n<ag-grid-angular\n      #agGrid style=\"width: 100%; height: 100%;\" id=\"myGrid\" class=\"ag-theme-balham\" [columnDefs]=\"columnDefs\"\n       [masterDetail]=\"true\"\n       [modules]=\"modules\"\n       [keepDetailRows]=\"true\"\n       [defaultColDef]=\"defaultColDef\"\n       [keepDetailRowsCount]=\"keepDetailRowsCount\"\n       [detailCellRendererParams]=\"detailCellRendererParams\"\n       [defaultExportParams]=\"defaultExportParams\"\n       [frameworkComponents]=\"frameworkComponents\"\n       [excelStyles]=\"excelStyles\"\n       [rowData]=\"rowData\"\n       (firstDataRendered)=\"onFirstDataRendered($event)\"\n       (gridReady)=\"onGridReady($event)\"\n       (sortChanged)=\"onGridStateChanged()\"\n      (filterChanged)=\"onGridStateChanged()\"\n      (columnMoved)=\"onGridStateChanged()\"\n      (columnPinned)=\"onGridStateChanged()\"\n      (columnResized)=\"onGridStateChanged()\"\n      (columnVisible)=\"onGridStateChanged()\"\n    ></ag-grid-angular>\n    <!--<nav *ngIf=\"ifInstructions\" class=\"navbar navbar-expand navbar-dark bg-success fixed-bottom navbar-bottom\">\n      <div class=\"collapse navbar-collapse\">\n        <ul class=\"navbar-nav my-2 my-lg-0\">\n          <li class=\"nav-item\">\n            <span id=\"instructions\" style=\"font-weight: 700; color: whitesmoke;\" >\n              \n            </span>\n          </li>\n        </ul>\n      </div>\n    </nav>-->\n"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_tooltip_tooltip_component__ = __webpack_require__("./src/app/components/tooltip/tooltip.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ag_grid_enterprise_all_modules__ = __webpack_require__("./node_modules/@ag-grid-enterprise/all-modules/dist/es6/main.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__state_local_storage_local_storage_service__ = __webpack_require__("./src/app/state/local-storage/local-storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app__ = __webpack_require__("./src/app/app.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__state_state_service__ = __webpack_require__("./src/app/state/state.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_header_header_component__ = __webpack_require__("./src/app/components/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__notify_notify_service__ = __webpack_require__("./src/app/notify/notify.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











function cell(text, styleId) {
    if (styleId === void 0) { styleId = null; }
    return {
        styleId: styleId,
        data: {
            type: /^\d+$/.test(text) ? 'Number' : 'String',
            value: String(text)
        }
    };
}
var DashboardComponent = /** @class */ (function (_super) {
    __extends(DashboardComponent, _super);
    // tslint:disable-next-line: deprecation
    function DashboardComponent(http, stateService, localStorageService, notifyService, router) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.stateService = stateService;
        _this.localStorageService = localStorageService;
        _this.notifyService = notifyService;
        _this.router = router;
        _this.modules = __WEBPACK_IMPORTED_MODULE_4__ag_grid_enterprise_all_modules__["a" /* AllModules */];
        _this.keepDetailRowsCount = 2;
        _this.ifInstructions = true;
        _this.isReady = false;
        return _this;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.configGrid();
    };
    DashboardComponent.prototype.onFirstDataRendered = function (params) {
        this.autoSizeAllColumns(params);
    };
    DashboardComponent.prototype.onGridReady = function (params) {
        var _this = this;
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.http
            .get('https://raw.githubusercontent.com/ag-grid/ag-grid-docs/latest/src/javascript-grid-master-detail/simple/data/data.json')
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.restoreGridState(data);
        });
        setTimeout(function () {
            _this.ifInstructions = false;
        }, 3000);
    };
    DashboardComponent.prototype.onGridStateChanged = function () {
        if (this.isReady) {
            this.stateService.gridState = this.captureGridState();
        }
    };
    DashboardComponent.prototype.onHeaderClick = function (eventType) {
        if (eventType === __WEBPACK_IMPORTED_MODULE_8__components_header_header_component__["a" /* EventType */].Reset) {
            this.stateService.gridState = {};
            window.location.reload();
        }
    };
    DashboardComponent.prototype.configGrid = function () {
        var _this = this;
        this.columnDefs = [{
                field: 'name',
                cellRenderer: 'agGroupCellRenderer',
                cellClass: 'body',
                tooltipField: 'name',
                tooltipComponentParams: {
                    tooltip: 'Customer\'s Name or nickname or alias or whatever'
                }
            },
            {
                field: 'account',
                colId: 'account',
                cellClass: 'body',
                tooltipField: 'account',
                tooltipComponentParams: {
                    tooltip: 'Six digit System Generated Customer\'s Account Number'
                }
            },
            {
                field: 'calls',
                cellClass: 'body',
                tooltipField: 'calls',
                tooltipComponentParams: {
                    tooltip: 'Total Calls Involving this Customer'
                }
            },
            {
                field: 'minutes',
                valueFormatter: 'x.toLocaleString() + "m"',
                cellClass: 'bodyFloat',
                tooltipField: 'minutes',
                tooltipComponentParams: {
                    tooltip: 'Duration of all Calls Involving this Specific Customer'
                }
            },
            {
                field: 'Comment',
                cellClass: 'body'
            },
            {
                field: 'rating',
                cellClass: 'body',
                tooltipField: 'rating',
                tooltipComponentParams: {
                    tooltip: 'customer\'s rating'
                }
            }
        ];
        this.defaultColDef = {
            filter: true,
            resizable: true,
            sortable: true,
            tooltipComponent: 'fiddleTooltipComponent'
        };
        this.frameworkComponents = {
            fiddleTooltipComponent: __WEBPACK_IMPORTED_MODULE_3__components_tooltip_tooltip_component__["a" /* TooltipComponent */]
        };
        this.detailCellRendererParams = {
            detailGridOptions: {
                columnDefs: [{
                        field: 'callId',
                        tooltipField: 'callId',
                        tooltipComponentParams: {
                            tooltip: 'Id used to Identify the Call'
                        }
                    },
                    {
                        field: 'direction',
                        tooltipField: 'direction',
                        tooltipComponentParams: {
                            tooltip: 'Inbound or Outbound Call'
                        }
                    },
                    {
                        field: 'number',
                        tooltipField: 'number',
                        tooltipComponentParams: {
                            tooltip: 'The Caller\'s Phone Number'
                        }
                    },
                    {
                        field: 'duration',
                        tooltipField: 'duration',
                        valueFormatter: 'x.toLocaleString() + "s"',
                        tooltipComponentParams: {
                            tooltip: 'Length of all Call'
                        }
                    },
                    {
                        field: 'switchCode',
                        tooltipField: 'switchCode',
                        tooltipComponentParams: {
                            tooltip: 'Switch Board Indicator'
                        }
                    }
                ],
                defaultColDef: {
                    filter: true,
                    resizable: true,
                    sortable: true,
                    tooltipComponent: 'fiddleTooltipComponent'
                },
                frameworkComponents: {
                    fiddleTooltipComponent: __WEBPACK_IMPORTED_MODULE_3__components_tooltip_tooltip_component__["a" /* TooltipComponent */]
                },
                onFirstDataRendered: function (params) {
                    _this.autoSizeAllColumns(params);
                }
            },
            getDetailRowData: function (params) {
                setTimeout(function () {
                    params.successCallback(params.data.callRecords);
                }, 2000);
            },
            template: '<div style="height: 100%; background-color: var(--blue6); padding: 10px;">' +
                '  <div ref="eDetailGrid" style="height: 100%;"></div>' +
                '</div>',
            sheetName: 'EntAgGridHierarchicalExport',
            fileName: 'fiddle-0035',
            columnWidth: '20'
        };
        this.defaultExportParams = {
            getCustomContentBelowRow: function (params) {
                if (params.node.data.callRecords && params.node.data.callRecords.length) {
                    return [
                        [
                            cell(''),
                            cell('callId', 'header'),
                            cell('direction', 'header'),
                            cell('number', 'header'),
                            cell('duration', 'header'),
                            cell('switchCode', 'header')
                        ]
                    ].concat(params.node.data.callRecords.map(function (record) {
                        return [
                            cell(''),
                            cell(record.callId, 'body'),
                            cell(record.direction, 'body'),
                            cell(record.number, 'body'),
                            cell(record.duration, 'body'),
                            cell(record.switchCode, 'body')
                        ];
                    }), [
                        []
                    ]);
                }
                return false;
            }
        };
        this.excelStyles = [{
                id: 'header',
                interior: {
                    color: '#007BFF',
                    pattern: 'Solid'
                },
                font: {
                    color: '#FFFFFF'
                },
                alignment: {
                    horizontal: 'Left',
                    vertical: 'Middle'
                }
            },
            {
                id: 'headerNum',
                interior: {
                    color: '#007BFF',
                    pattern: 'Solid'
                },
                alignment: {
                    horizontal: 'Right',
                    vertical: 'Middle'
                }
            },
            {
                id: 'body',
                interior: {
                    color: '#ebf9ff',
                    pattern: 'DiagCross'
                }
            },
            {
                id: 'bodyInt',
                interior: {
                    color: '#ebf9ff',
                    pattern: 'Solid'
                },
                numberFormat: {
                    format: '#,##0_);[Red](#,##0)'
                },
                alignment: {
                    horizontal: 'Right',
                    vertical: 'Middle'
                }
            },
            {
                id: 'bodyFloat',
                numberFormat: {
                    format: '0.00'
                },
                interior: {
                    color: '#ebf9ff',
                    pattern: 'Solid'
                },
                alignment: {
                    horizontal: 'Right',
                    vertical: 'Middle'
                }
            },
        ];
    };
    DashboardComponent.prototype.restoreGridState = function (data) {
        var _this = this;
        var state = this.stateService.gridState;
        console.log('restoreGridState > state', state);
        window.setTimeout(function () {
            if (_this.gridApi && _this.gridColumnApi && state) {
                if (state.columnState) {
                    _this.gridColumnApi.setColumnState(state.columnState);
                }
                if (state.columnGroupsState) {
                    _this.gridColumnApi.setColumnGroupState(state.columnGroupsState);
                }
                if (state.sortModel) {
                    _this.gridApi.setSortModel(state.sortModel);
                }
                if (state.filterModel) {
                    _this.gridApi.setFilterModel(state.filterModel);
                }
                _this.isReady = true;
            }
        }, 1000);
        this.rowData = data;
    };
    DashboardComponent.prototype.captureGridState = function () {
        if (this.gridApi && this.gridColumnApi) {
            return {
                columnState: this.gridColumnApi.getColumnState(),
                columnGroupsState: this.gridColumnApi.getColumnGroupState(),
                sortModel: this.gridApi.getSortModel(),
                filterModel: this.gridApi.getFilterModel()
            };
        }
        return null;
    };
    DashboardComponent.prototype.autoSizeAllColumns = function (params) {
        var allColumnIds = [];
        params.columnApi.getAllColumns().forEach(function (column) {
            allColumnIds.push(column.colId);
        });
        params.columnApi.autoSizeColumns(allColumnIds, false);
    };
    DashboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__("./src/app/dashboard/dashboard.component.html"),
            styles: [__webpack_require__("./src/app/dashboard/dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_7__state_state_service__["a" /* StateService */],
            __WEBPACK_IMPORTED_MODULE_5__state_local_storage_local_storage_service__["a" /* LocalStorageService */],
            __WEBPACK_IMPORTED_MODULE_9__notify_notify_service__["a" /* NotifyService */],
            __WEBPACK_IMPORTED_MODULE_10__angular_router__["a" /* Router */]])
    ], DashboardComponent);
    return DashboardComponent;
}(__WEBPACK_IMPORTED_MODULE_6__app__["a" /* BaseComponent */]));



/***/ }),

/***/ "./src/app/notification-queue/notification-queue.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/notification-queue/notification-queue.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-light bg-light\" style=\"height: 25px;\">\n  <ul class=\"navbar-nav mr-auto\">\n    <li class=\"nav-item\"><a routerLink=\"/dashboard\" class=\"nav-link\">Dashboard</a></li>\n    <li class=\"nav-item active\"><a routerLink=\"/notification\" class=\"nav-link\" routerLinkActive=\"active\">Notifications</a></li>\n  </ul>\n</nav>\n<app-header (event)=\"onHeaderClick($event)\"></app-header>\n<ag-grid-angular\n       #agGrid style=\"width: 100%; height: 100%;\" [id]=\"'queueGrid'\" class=\"ag-theme-balham\" \n       [columnDefs]=\"columnDefs\"\n       [modules]=\"modules\"\n       [rowData]=\"rowData\"\n       [defaultColDef]=\"defaultColDef\"\n       (gridReady)=\"onGridReady($event)\"\n       (sortChanged)=\"onGridStateChanged()\"\n       (filterChanged)=\"onGridStateChanged()\"\n       (columnMoved)=\"onGridStateChanged()\"\n       (columnPinned)=\"onGridStateChanged()\"\n       (columnResized)=\"onGridStateChanged()\"\n       (columnVisible)=\"onGridStateChanged()\"\n    ></ag-grid-angular>\n    \n\n"

/***/ }),

/***/ "./src/app/notification-queue/notification-queue.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationQueueComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ag_grid_enterprise_all_modules__ = __webpack_require__("./node_modules/@ag-grid-enterprise/all-modules/dist/es6/main.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app__ = __webpack_require__("./src/app/app.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__state_state_service__ = __webpack_require__("./src/app/state/state.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_header_header_component__ = __webpack_require__("./src/app/components/header/header.component.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NotificationQueueComponent = /** @class */ (function (_super) {
    __extends(NotificationQueueComponent, _super);
    function NotificationQueueComponent(_stateService) {
        var _this = _super.call(this) || this;
        _this._stateService = _stateService;
        _this.modules = __WEBPACK_IMPORTED_MODULE_1__ag_grid_enterprise_all_modules__["a" /* AllModules */];
        _this.isReady = false;
        _this.subscriptions.push(_stateService.notificationsChange$
            .subscribe(function (notifications) { return _this.onNotificationsStateChange(notifications); }));
        _this.subscriptions.push(_stateService.isReadyChange$
            .subscribe(function (isReady) { return _this.onIsReadyStateServiceChange(isReady); }));
        return _this;
    }
    NotificationQueueComponent.prototype.ngOnInit = function () {
        this.configGrid();
    };
    NotificationQueueComponent.prototype.onGridReady = function (params) {
        console.log('onGridReady');
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    };
    NotificationQueueComponent.prototype.onGridStateChanged = function () {
        if (this.isReady) {
            this._stateService.notificationsGridState = this.captureGridState();
        }
    };
    NotificationQueueComponent.prototype.onIsReadyStateServiceChange = function (isReady) {
        if (isReady && this._stateService.notifications && this._stateService.notifications.length) {
            this.restoreGridState(this._stateService.notifications);
        }
    };
    NotificationQueueComponent.prototype.onNotificationsStateChange = function (notifications) {
        console.log('notificationQueue > onNotificationsStateChange');
        if (notifications.length) {
            this.rowData = notifications;
            this.restoreGridState(notifications);
        }
    };
    NotificationQueueComponent.prototype.onHeaderClick = function (eventType) {
        if (eventType === __WEBPACK_IMPORTED_MODULE_4__components_header_header_component__["a" /* EventType */].Reset) {
            this._stateService.notificationsGridState = {};
            window.location.reload();
        }
    };
    NotificationQueueComponent.prototype.configGrid = function () {
        this.columnDefs = [{
                field: 'id'
            },
            {
                field: 'message'
            },
            {
                field: 'status'
            },
            {
                field: 'versionTimeStamp'
            }
        ];
        this.defaultColDef = {
            filter: true,
            resizable: true,
            sortable: true
        };
        if (this._stateService.notifications && this._stateService.notifications.length) {
            this.rowData = this._stateService.notifications;
        }
    };
    NotificationQueueComponent.prototype.restoreGridState = function (rowNodes) {
        var _this = this;
        var state = this._stateService.notificationsGridState;
        console.log('restoreGridState > state', state);
        window.setTimeout(function () {
            if (_this.gridApi && _this.gridColumnApi && state) {
                if (state.columnState) {
                    _this.gridColumnApi.setColumnState(state.columnState);
                }
                if (state.columnGroupsState) {
                    _this.gridColumnApi.setColumnGroupState(state.columnGroupsState);
                }
                if (state.sortModel) {
                    _this.gridApi.setSortModel(state.sortModel);
                }
                if (state.filterModel) {
                    _this.gridApi.setFilterModel(state.filterModel);
                }
                _this.isReady = true;
            }
        }, 1000);
        if (rowNodes && this.gridApi) {
            this.gridApi.redrawRows({
                rowNodes: rowNodes
            });
        }
    };
    NotificationQueueComponent.prototype.captureGridState = function () {
        if (this.gridApi && this.gridColumnApi) {
            return {
                columnState: this.gridColumnApi.getColumnState(),
                columnGroupsState: this.gridColumnApi.getColumnGroupState(),
                sortModel: this.gridApi.getSortModel(),
                filterModel: this.gridApi.getFilterModel()
            };
        }
        return null;
    };
    NotificationQueueComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-notification-queue',
            template: __webpack_require__("./src/app/notification-queue/notification-queue.component.html"),
            styles: [__webpack_require__("./src/app/notification-queue/notification-queue.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__state_state_service__["a" /* StateService */]])
    ], NotificationQueueComponent);
    return NotificationQueueComponent;
}(__WEBPACK_IMPORTED_MODULE_2__app__["a" /* BaseComponent */]));



/***/ }),

/***/ "./src/app/notify/notify.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotifyModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notify_service__ = __webpack_require__("./src/app/notify/notify.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__refresh_refresh_service__ = __webpack_require__("./src/app/notify/refresh/refresh.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var NotifyModule = /** @class */ (function () {
    function NotifyModule() {
    }
    NotifyModule_1 = NotifyModule;
    NotifyModule.forRoot = function () {
        return {
            ngModule: NotifyModule_1,
            providers: [__WEBPACK_IMPORTED_MODULE_2__notify_service__["a" /* NotifyService */], __WEBPACK_IMPORTED_MODULE_3__refresh_refresh_service__["a" /* RefreshService */]]
        };
    };
    NotifyModule = NotifyModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */]
            ],
            declarations: [],
            providers: [__WEBPACK_IMPORTED_MODULE_2__notify_service__["a" /* NotifyService */], __WEBPACK_IMPORTED_MODULE_3__refresh_refresh_service__["a" /* RefreshService */]]
        })
    ], NotifyModule);
    return NotifyModule;
    var NotifyModule_1;
}());



/***/ }),

/***/ "./src/app/notify/notify.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotifyService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state_state_service__ = __webpack_require__("./src/app/state/state.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app__ = __webpack_require__("./src/app/app.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__refresh_refresh_service__ = __webpack_require__("./src/app/notify/refresh/refresh.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__refresh_refresh__ = __webpack_require__("./src/app/notify/refresh/refresh.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NotifyService = /** @class */ (function (_super) {
    __extends(NotifyService, _super);
    function NotifyService(_stateService, _refreshService) {
        var _this = _super.call(this) || this;
        _this._stateService = _stateService;
        _this._refreshService = _refreshService;
        _this.notifications = [];
        _this._isSound = false;
        _this.isPermissionChange$ = new __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["a" /* Observable */](function (observer) { return _this._isPermissionObserver = observer; }).share();
        _this.isEnabledChange$ = new __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["a" /* Observable */](function (observer) { return _this._isEnableObserver = observer; }).share();
        _this.isSoundChange$ = new __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["a" /* Observable */](function (observer) { return _this._isSoundObserver = observer; }).share();
        _this.subscriptions.push(_stateService.isReadyChange$
            .subscribe(function (isReady) { return _this.onStateServiceIsReadyChange(isReady); }));
        _this.subscriptions.push(_stateService.notificationsChange$
            .subscribe(function (notifications) { return _this.onNotificationsStateChange(notifications); }));
        _this.subscriptions.push(_refreshService.stateChange$
            .subscribe(function (state) { return _this.onRefreshChange(state); }));
        _this._refreshService.start();
        return _this;
    }
    Object.defineProperty(NotifyService.prototype, "isPermission", {
        get: function () {
            return this._isPermission;
        },
        set: function (permission) {
            if (!_.isEqual(permission, this._isPermission)) {
                this._isPermission = permission;
                if (this._isPermissionObserver) {
                    this._isPermissionObserver.next(permission);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NotifyService.prototype, "isSound", {
        get: function () {
            return this._isSound;
        },
        set: function (sound) {
            this._isSound = sound;
            if (this._isSoundObserver) {
                this._isPermissionObserver.next(sound);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NotifyService.prototype, "isEnabled", {
        get: function () {
            return this._isEnabled;
        },
        set: function (enabled) {
            if (!_.isEqual(enabled, this._isEnabled)) {
                this._isEnabled = enabled;
                if (this.isPermission) {
                    if (!enabled) {
                        this._refreshService.stop();
                    }
                    else {
                        this._refreshService.start();
                    }
                }
                if (this._isEnableObserver) {
                    this._isEnableObserver.next(enabled);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NotifyService.prototype, "isNotificationSupport", {
        get: function () {
            if (!('Notification' in window)) {
                return false;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    NotifyService.prototype.generate = function () {
        var id = this.notifications && this.notifications.length ? this.notifications.length + 1 : 1;
        var versionTimeStamp = (new Date()).getTime();
        var notification = {
            id: id,
            message: 'Call your mother! (' + id + ')',
            status: false,
            versionTimeStamp: versionTimeStamp
        };
        this.notifications.push(notification);
        this._stateService.notifications = this.notifications;
    };
    NotifyService.prototype.acknowledge = function (id) {
        this.notifications = this.notifications.filter(function (notification) {
            return notification.id !== id;
        });
        this._stateService.notifications = this.notifications;
    };
    NotifyService.prototype.playAlert = function () {
        if (this.isSound) {
            try {
                var audio = new Audio();
                audio.src = './assets/alert.mp3';
                audio.load();
                audio.play();
            }
            catch (_a) {
                // tslint:disable-next-line: no-console
                console.info('Attempt to play alert sound failed.');
            }
        }
    };
    NotifyService.prototype.requestPermission = function () {
        var _this = this;
        if (!('Notification' in window)) {
            console.warn('This browser does not support notifications.');
            this.isPermission = false;
        }
        else {
            if (this.checkNotificationPromise()) {
                Notification.requestPermission()
                    .then(function (permission) {
                    _this.handlePermission(permission);
                });
            }
            else {
                Notification.requestPermission(function (permission) {
                    _this.handlePermission(permission);
                });
            }
        }
    };
    NotifyService.prototype.handlePermission = function (permission) {
        if (permission === 'denied' || permission === 'default') {
            this.isPermission = false;
        }
        else {
            this.isPermission = true;
        }
    };
    NotifyService.prototype.checkNotificationPromise = function () {
        try {
            Notification.requestPermission().then();
        }
        catch (_a) {
            return false;
        }
        return true;
    };
    NotifyService.prototype.onNotificationsStateChange = function (notifications) {
        if (!_.isEqual(notifications, this.notifications)) {
            this.notifications = notifications;
        }
    };
    NotifyService.prototype.onStateServiceIsReadyChange = function (isReady) {
        if (isReady) {
            if (this._stateService.notifications && this._stateService.notifications.length) {
                this.notifications = this._stateService.notifications;
            }
        }
    };
    NotifyService.prototype.onRefreshChange = function (state) {
        console.log('onRefreshChange', state);
        if (state === __WEBPACK_IMPORTED_MODULE_4__refresh_refresh__["a" /* RefreshStateEnum */].refresh) {
            this.generate();
        }
    };
    NotifyService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__state_state_service__["a" /* StateService */],
            __WEBPACK_IMPORTED_MODULE_3__refresh_refresh_service__["a" /* RefreshService */]])
    ], NotifyService);
    return NotifyService;
}(__WEBPACK_IMPORTED_MODULE_2__app__["a" /* BaseComponent */]));



/***/ }),

/***/ "./src/app/notify/refresh/refresh.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RefreshService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__refresh__ = __webpack_require__("./src/app/notify/refresh/refresh.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_timer__ = __webpack_require__("./node_modules/rxjs/_esm5/observable/timer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subscription__ = __webpack_require__("./node_modules/rxjs/_esm5/Subscription.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RefreshService = /** @class */ (function () {
    //#endregion
    //#region - constructor
    function RefreshService() {
        var _this = this;
        this._state = __WEBPACK_IMPORTED_MODULE_1__refresh__["a" /* RefreshStateEnum */].stopped;
        this.interval = 30 * 1000;
        this.timerSubscription = __WEBPACK_IMPORTED_MODULE_4_rxjs_Subscription__["a" /* Subscription */].EMPTY;
        this.stateChange$ = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */](function (observer) { return _this.stateChangeObserver = observer; }).share();
    }
    Object.defineProperty(RefreshService.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (newState) {
            this._state = newState;
            if (this.stateChangeObserver) {
                this.stateChangeObserver.next(newState);
            }
        },
        enumerable: true,
        configurable: true
    });
    RefreshService.prototype.start = function () {
        if (this.state === __WEBPACK_IMPORTED_MODULE_1__refresh__["a" /* RefreshStateEnum */].stopped) {
            this.startTimer();
        }
    };
    RefreshService.prototype.stop = function () {
        if (this.state === __WEBPACK_IMPORTED_MODULE_1__refresh__["a" /* RefreshStateEnum */].started) {
            this.stopTimer();
        }
    };
    //#endregion
    //#region internal methods
    RefreshService.prototype.startTimer = function () {
        var _this = this;
        var ticker = Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_timer__["a" /* timer */])(this.interval, this.interval);
        this.state = __WEBPACK_IMPORTED_MODULE_1__refresh__["a" /* RefreshStateEnum */].started;
        this.timerSubscription = ticker.subscribe(function (tick) {
            _this.ticks = tick;
            _this.state = __WEBPACK_IMPORTED_MODULE_1__refresh__["a" /* RefreshStateEnum */].refresh;
        });
    };
    RefreshService.prototype.stopTimer = function () {
        this.timerSubscription.unsubscribe();
        this.state = __WEBPACK_IMPORTED_MODULE_1__refresh__["a" /* RefreshStateEnum */].stopped;
        this.ticks = 0;
    };
    RefreshService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], RefreshService);
    return RefreshService;
}());



/***/ }),

/***/ "./src/app/notify/refresh/refresh.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RefreshStateEnum; });
/**
 * Enumeration defining the 3 possible states
 * of the refresh service class.
 */
var RefreshStateEnum = /** @class */ (function () {
    function RefreshStateEnum() {
    }
    /**
     * Refresh process timer has started.
     */
    RefreshStateEnum.started = 'started';
    /**
     * Refresh process timer has stopped.
     */
    RefreshStateEnum.stopped = 'stopped';
    /**
     * Timer has triggered the target callback method.
     */
    RefreshStateEnum.refresh = 'refresh';
    return RefreshStateEnum;
}());



/***/ }),

/***/ "./src/app/state/local-storage/local-storage.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalStorageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable__ = __webpack_require__("./node_modules/immutable/dist/immutable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_immutable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LocalStorageService = /** @class */ (function () {
    function LocalStorageService() {
        this.params = new Map();
        this.options = {
            appKey: 'fiddle',
            blackList: []
        };
        if (window.localStorage) {
            this.isLocalStorageSupported = true;
        }
        else {
            console.warn('Local Storage is not supported');
        }
    }
    LocalStorageService.prototype.read = function () {
        var _this = this;
        if (this.isLocalStorageSupported) {
            Object.keys(window.localStorage).forEach(function (key) {
                var value = _this.getItem(key);
                if (value !== null && value !== undefined) {
                    _this.params[key] = value;
                }
            });
        }
    };
    LocalStorageService.prototype.updateStateService = function (key, stateService) {
        var _this = this;
        this.params.set(key, this.getItem(key));
        if (key !== this.options.appKey) {
            stateService.isReady = false;
        }
        var state = this.params.get(key);
        if (state && state !== undefined && Object.entries(state).length) {
            Object.keys(state).forEach(function (property) {
                var privateProperty = '_' + property;
                if (privateProperty in stateService && property !== 'type') {
                    var isValid = _this.options.blackList.indexOf(property) === -1;
                    if (isValid) {
                        var value = state[property];
                        if (stateService.hasOwnProperty(privateProperty)) {
                            if (stateService[privateProperty] && stateService[privateProperty].constructor === __WEBPACK_IMPORTED_MODULE_1_immutable__["List"]) {
                                if (!value || value.constructor !== Array) {
                                    value = [];
                                }
                                stateService[privateProperty] = Object(__WEBPACK_IMPORTED_MODULE_1_immutable__["List"])(value);
                            }
                            else {
                                console.log('stateService[privateProperty] = ', value);
                                stateService[privateProperty] = value;
                            }
                        }
                    }
                }
            });
        }
        if (key !== this.options.appKey) {
            stateService.isReady = true;
        }
    };
    LocalStorageService.prototype.write = function (key, value, stateType) {
        if (!this.params.has(stateType)) {
            this.params[stateType] = {};
        }
        this.params.set(stateType, value);
        this.setItem(stateType, this.params.get(stateType));
    };
    LocalStorageService.prototype.clear = function (stateType) {
        this.params.set(stateType, {});
        this.setItem(stateType, this.params.get(stateType));
    };
    LocalStorageService.prototype.getItem = function (key) {
        var value;
        if (this.isLocalStorageSupported) {
            if (window.localStorage[key]) {
                try {
                    value = JSON.parse(window.localStorage[key]);
                }
                catch (e) {
                    value = {};
                }
            }
        }
        return value;
    };
    LocalStorageService.prototype.setItem = function (key, value) {
        if (this.isLocalStorageSupported) {
            window.localStorage[key] = JSON.stringify(value);
        }
    };
    LocalStorageService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], LocalStorageService);
    return LocalStorageService;
}());



/***/ }),

/***/ "./src/app/state/state.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StateModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__local_storage_local_storage_service__ = __webpack_require__("./src/app/state/local-storage/local-storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__state_service__ = __webpack_require__("./src/app/state/state.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var StateModule = /** @class */ (function () {
    function StateModule() {
    }
    StateModule_1 = StateModule;
    StateModule.forRoot = function () {
        return {
            ngModule: StateModule_1,
            providers: [__WEBPACK_IMPORTED_MODULE_2__local_storage_local_storage_service__["a" /* LocalStorageService */], __WEBPACK_IMPORTED_MODULE_3__state_service__["a" /* StateService */]]
        };
    };
    StateModule = StateModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */]
            ],
            declarations: [],
            providers: [__WEBPACK_IMPORTED_MODULE_2__local_storage_local_storage_service__["a" /* LocalStorageService */], __WEBPACK_IMPORTED_MODULE_3__state_service__["a" /* StateService */]]
        })
    ], StateModule);
    return StateModule;
    var StateModule_1;
}());



/***/ }),

/***/ "./src/app/state/state.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StateService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_share__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/share.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__local_storage_local_storage_service__ = __webpack_require__("./src/app/state/local-storage/local-storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__state__ = __webpack_require__("./src/app/state/state.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var StateService = /** @class */ (function () {
    function StateService(localStorageService) {
        var _this = this;
        this.localStorageService = localStorageService;
        this._isReady = false;
        this._type = __WEBPACK_IMPORTED_MODULE_4__state__["a" /* PersistedTypesEnum */].localStorageKey;
        this._isPreloader = true;
        this._gridState = {};
        this._notificationsGridState = {};
        this._notifications = [];
        this.gridStateChange$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */](function (observer) { return _this._gridStateObserver = observer; }).share();
        this.notificationsGridStateChange$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */](function (observer) { return _this._notificationsGridObserver = observer; }).share();
        this.isReadyChange$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */](function (observer) { return _this._isReadyObserver = observer; }).share();
        this.notificationsChange$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */](function (observer) { return _this._notificationsObserver = observer; }).share();
        this.typeChange$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */](function (observer) { return _this._typeObserver = observer; }).share();
    }
    Object.defineProperty(StateService.prototype, "isPreloader", {
        get: function () {
            return this._isPreloader;
        },
        set: function (newValue) {
            if (this._isPreloader !== newValue) {
                this._isPreloader = newValue;
                if (this._isPreloaderObserver) {
                    this._isPreloaderObserver.next(newValue);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateService.prototype, "isReady", {
        get: function () {
            return this._isReady;
        },
        set: function (newValue) {
            if (this._isReady !== newValue) {
                this._isReady = newValue;
                if (this._isReadyObserver) {
                    this._isReadyObserver.next(newValue);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateService.prototype, "gridState", {
        get: function () {
            return this._gridState;
        },
        set: function (newValue) {
            if (!_.isEqual(newValue, this._gridState)) {
                this._gridState = newValue;
                if (this.isReady) {
                    this.updateState(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* PersistedTypesEnum */].gridState, { gridState: newValue });
                }
                if (this._gridStateObserver) {
                    this._gridStateObserver.next(newValue);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateService.prototype, "notificationsGridState", {
        get: function () {
            return this._notificationsGridState;
        },
        set: function (newValue) {
            if (!_.isEqual(newValue, this._notificationsGridState)) {
                this._notificationsGridState = newValue;
                if (this.isReady) {
                    this.updateState(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* PersistedTypesEnum */].notificationsGridState, { notificationGridState: newValue });
                }
                if (this._notificationsGridStateObserver) {
                    this._notificationsGridStateObserver.next(newValue);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateService.prototype, "notifications", {
        get: function () {
            return this._notifications;
        },
        set: function (newValue) {
            if (!_.isEqual(newValue, this._notifications)) {
                this._notifications = newValue;
                if (this.isReady) {
                    this.updateState(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* PersistedTypesEnum */].notifications, { notifications: newValue });
                }
                if (this._notificationsObserver) {
                    this._notificationsObserver.next(newValue);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateService.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (newValue) {
            if (this._type !== newValue) {
                this._type = newValue;
                if (this._typeObserver) {
                    this._typeObserver.next(newValue);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    StateService.prototype.updateState = function (key, value, type) {
        if (type === void 0) { type = null; }
        if (this.type) {
            this.localStorageService.write(key, value, this.type);
        }
    };
    StateService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__local_storage_local_storage_service__["a" /* LocalStorageService */]])
    ], StateService);
    return StateService;
}());



/***/ }),

/***/ "./src/app/state/state.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PersistedTypesEnum; });
var PersistedTypesEnum = /** @class */ (function () {
    function PersistedTypesEnum() {
    }
    PersistedTypesEnum.localStorageKey = 'fiddle-0037';
    PersistedTypesEnum.gridState = 'gridState';
    PersistedTypesEnum.notificationsGridState = 'notificationsGridState';
    PersistedTypesEnum.notifications = 'notifications';
    return PersistedTypesEnum;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ag_grid_enterprise_all_modules__ = __webpack_require__("./node_modules/@ag-grid-enterprise/all-modules/dist/es6/main.js");





fetch('assets/license.json').then(function (response) {
    return response.json();
}).then(function (data) {
    __WEBPACK_IMPORTED_MODULE_4__ag_grid_enterprise_all_modules__["b" /* LicenseManager */].setLicenseKey(data.license);
    if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
    }
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
        .catch(function (err) { return console.error(err); });
});


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map