webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hero_team_builder_component__ = __webpack_require__("../../../../../src/app/hero-team-builder.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__hero_list_basic_component__ = __webpack_require__("../../../../../src/app/hero-list-basic.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__hero_list_inline_styles_component__ = __webpack_require__("../../../../../src/app/hero-list-inline-styles.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__hero_list_enter_leave_component__ = __webpack_require__("../../../../../src/app/hero-list-enter-leave.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__hero_list_enter_leave_states_component__ = __webpack_require__("../../../../../src/app/hero-list-enter-leave-states.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__hero_list_combined_transitions_component__ = __webpack_require__("../../../../../src/app/hero-list-combined-transitions.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__hero_list_twoway_component__ = __webpack_require__("../../../../../src/app/hero-list-twoway.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__hero_list_auto_component__ = __webpack_require__("../../../../../src/app/hero-list-auto.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__hero_list_groups_component__ = __webpack_require__("../../../../../src/app/hero-list-groups.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__hero_list_multistep_component__ = __webpack_require__("../../../../../src/app/hero-list-multistep.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__hero_list_timings_component__ = __webpack_require__("../../../../../src/app/hero-list-timings.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */]],
        // ... more stuff ...
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__hero_team_builder_component__["a" /* HeroTeamBuilderComponent */],
            __WEBPACK_IMPORTED_MODULE_4__hero_list_basic_component__["a" /* HeroListBasicComponent */],
            __WEBPACK_IMPORTED_MODULE_5__hero_list_inline_styles_component__["a" /* HeroListInlineStylesComponent */],
            __WEBPACK_IMPORTED_MODULE_8__hero_list_combined_transitions_component__["a" /* HeroListCombinedTransitionsComponent */],
            __WEBPACK_IMPORTED_MODULE_9__hero_list_twoway_component__["a" /* HeroListTwowayComponent */],
            __WEBPACK_IMPORTED_MODULE_6__hero_list_enter_leave_component__["a" /* HeroListEnterLeaveComponent */],
            __WEBPACK_IMPORTED_MODULE_7__hero_list_enter_leave_states_component__["a" /* HeroListEnterLeaveStatesComponent */],
            __WEBPACK_IMPORTED_MODULE_10__hero_list_auto_component__["a" /* HeroListAutoComponent */],
            __WEBPACK_IMPORTED_MODULE_13__hero_list_timings_component__["a" /* HeroListTimingsComponent */],
            __WEBPACK_IMPORTED_MODULE_12__hero_list_multistep_component__["a" /* HeroListMultistepComponent */],
            __WEBPACK_IMPORTED_MODULE_11__hero_list_groups_component__["a" /* HeroListGroupsComponent */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3__hero_team_builder_component__["a" /* HeroTeamBuilderComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/hero-list-auto.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("../../../animations/@angular/animations.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroListAutoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HeroListAutoComponent = (function () {
    function HeroListAutoComponent() {
    }
    return HeroListAutoComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Input */])(),
    __metadata("design:type", Array)
], HeroListAutoComponent.prototype, "heroes", void 0);
HeroListAutoComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'hero-list-auto',
        template: "\n    <ul>\n      <li *ngFor=\"let hero of heroes\"\n          [@shrinkOut]=\"'in'\">\n        {{hero.name}}\n      </li>\n    </ul>\n  ",
        styles: [__webpack_require__("../../../../../src/app/hero-list.component.css")],
        /* When the element leaves (transition "in => void" occurs),
         * get the element's current computed height and animate
         * it down to 0.
         */
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["a" /* trigger */])('shrinkOut', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["b" /* state */])('in', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ height: '*' })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* transition */])('* => void', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ height: '*' }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* animate */])(250, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ height: 0 }))
                ])
            ])
        ]
    })
], HeroListAutoComponent);

//# sourceMappingURL=hero-list-auto.component.js.map

/***/ }),

/***/ "../../../../../src/app/hero-list-basic.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("../../../animations/@angular/animations.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroListBasicComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HeroListBasicComponent = (function () {
    function HeroListBasicComponent() {
    }
    return HeroListBasicComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Input */])(),
    __metadata("design:type", Array)
], HeroListBasicComponent.prototype, "heroes", void 0);
HeroListBasicComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'hero-list-basic',
        /* The click event calls hero.toggleState(), which
         * causes the state of that hero to switch from
         * active to inactive or vice versa.
         */
        template: "\n    <ul>\n      <li *ngFor=\"let hero of heroes\"\n          [@heroState]=\"hero.state\"\n          (click)=\"hero.toggleState()\">\n        {{hero.name}}\n      </li>\n    </ul>\n  ",
        styles: [__webpack_require__("../../../../../src/app/hero-list.component.css")],
        /**
         * Define two states, "inactive" and "active", and the end
         * styles that apply whenever the element is in those states.
         * Then define animations for transitioning between the states,
         * one in each direction
         */
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["a" /* trigger */])('heroState', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["b" /* state */])('inactive', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({
                    backgroundColor: '#eee',
                    transform: 'scale(1)'
                })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["b" /* state */])('active', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({
                    backgroundColor: '#cfd8dc',
                    transform: 'scale(1.1)'
                })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* transition */])('inactive => active', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* animate */])('100ms ease-in')),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* transition */])('active => inactive', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* animate */])('100ms ease-out'))
            ])
        ]
    })
], HeroListBasicComponent);

//# sourceMappingURL=hero-list-basic.component.js.map

/***/ }),

/***/ "../../../../../src/app/hero-list-combined-transitions.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("../../../animations/@angular/animations.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroListCombinedTransitionsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HeroListCombinedTransitionsComponent = (function () {
    function HeroListCombinedTransitionsComponent() {
    }
    return HeroListCombinedTransitionsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Input */])(),
    __metadata("design:type", Array)
], HeroListCombinedTransitionsComponent.prototype, "heroes", void 0);
HeroListCombinedTransitionsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'hero-list-combined-transitions',
        template: "\n   <ul>\n     <li *ngFor=\"let hero of heroes\"\n         [@heroState]=\"hero.state\"\n         (click)=\"hero.toggleState()\">\n       {{hero.name}}\n     </li>\n   </ul>\n ",
        styles: [__webpack_require__("../../../../../src/app/hero-list.component.css")],
        /*
         * Define two states, "inactive" and "active", and the end
         * styles that apply whenever the element is in those states.
         * Then define an animated transition between these two
         * states, in *both* directions.
         */
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["a" /* trigger */])('heroState', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["b" /* state */])('inactive', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({
                    backgroundColor: '#eee',
                    transform: 'scale(1)'
                })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["b" /* state */])('active', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({
                    backgroundColor: '#cfd8dc',
                    transform: 'scale(1.1)'
                })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* transition */])('inactive => active, active => inactive', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* animate */])('100ms ease-out'))
            ])
        ]
    })
], HeroListCombinedTransitionsComponent);

//# sourceMappingURL=hero-list-combined-transitions.component.js.map

/***/ }),

/***/ "../../../../../src/app/hero-list-enter-leave-states.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("../../../animations/@angular/animations.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroListEnterLeaveStatesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HeroListEnterLeaveStatesComponent = (function () {
    function HeroListEnterLeaveStatesComponent() {
    }
    return HeroListEnterLeaveStatesComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Input */])(),
    __metadata("design:type", Array)
], HeroListEnterLeaveStatesComponent.prototype, "heroes", void 0);
HeroListEnterLeaveStatesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'hero-list-enter-leave-states',
        template: "\n    <ul>\n      <li *ngFor=\"let hero of heroes\"\n          (click)=\"hero.toggleState()\"\n          [@heroState]=\"hero.state\">\n        {{hero.name}}\n      </li>\n    </ul>\n  ",
        styles: [__webpack_require__("../../../../../src/app/hero-list.component.css")],
        /* The elements here have two possible states based
         * on the hero state, "active", or "inactive". We animate
         * six transitions: Between the two states in both directions,
         * and between each state and void. With this we can animate
         * the enter and leave of elements differently based on which
         * state they are in when they are added and removed.
         */
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["a" /* trigger */])('heroState', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["b" /* state */])('inactive', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ transform: 'translateX(0) scale(1)' })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["b" /* state */])('active', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ transform: 'translateX(0) scale(1.1)' })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* transition */])('inactive => active', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* animate */])('100ms ease-in')),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* transition */])('active => inactive', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* animate */])('100ms ease-out')),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* transition */])('void => inactive', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ transform: 'translateX(-100%) scale(1)' }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* animate */])(100)
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* transition */])('inactive => void', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* animate */])(100, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ transform: 'translateX(100%) scale(1)' }))
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* transition */])('void => active', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ transform: 'translateX(0) scale(0)' }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* animate */])(200)
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* transition */])('active => void', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* animate */])(200, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ transform: 'translateX(0) scale(0)' }))
                ])
            ])
        ]
    })
], HeroListEnterLeaveStatesComponent);

//# sourceMappingURL=hero-list-enter-leave-states.component.js.map

/***/ }),

/***/ "../../../../../src/app/hero-list-enter-leave.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("../../../animations/@angular/animations.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroListEnterLeaveComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HeroListEnterLeaveComponent = (function () {
    function HeroListEnterLeaveComponent() {
    }
    return HeroListEnterLeaveComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Input */])(),
    __metadata("design:type", Array)
], HeroListEnterLeaveComponent.prototype, "heroes", void 0);
HeroListEnterLeaveComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'hero-list-enter-leave',
        template: "\n    <ul>\n      <li *ngFor=\"let hero of heroes\"\n          [@flyInOut]=\"'in'\">\n        {{hero.name}}\n      </li>\n    </ul>\n  ",
        styles: [__webpack_require__("../../../../../src/app/hero-list.component.css")],
        /* The element here always has the state "in" when it
         * is present. We animate two transitions: From void
         * to in and from in to void, to achieve an animated
         * enter and leave transition. The element enters from
         * the left and leaves to the right using translateX.
         */
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["a" /* trigger */])('flyInOut', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["b" /* state */])('in', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ transform: 'translateX(0)' })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* transition */])('void => *', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ transform: 'translateX(-100%)' }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* animate */])(100)
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* transition */])('* => void', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* animate */])(100, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ transform: 'translateX(100%)' }))
                ])
            ])
        ]
    })
], HeroListEnterLeaveComponent);

//# sourceMappingURL=hero-list-enter-leave.component.js.map

/***/ }),

/***/ "../../../../../src/app/hero-list-groups.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("../../../animations/@angular/animations.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroListGroupsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HeroListGroupsComponent = (function () {
    function HeroListGroupsComponent() {
    }
    return HeroListGroupsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Input */])(),
    __metadata("design:type", Array)
], HeroListGroupsComponent.prototype, "heroes", void 0);
HeroListGroupsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'hero-list-groups',
        template: "\n    <ul>\n      <li *ngFor=\"let hero of heroes\"\n          [@flyInOut]=\"'in'\">\n        {{hero.name}}\n      </li>\n    </ul>\n  ",
        styles: [__webpack_require__("../../../../../src/app/hero-list.component.css")],
        styles: ["\n    li {\n      padding: 0 !important;\n      text-align: center;\n    }\n  "],
        /* The element here always has the state "in" when it
         * is present. We animate two transitions: From void
         * to in and from in to void, to achieve an animated
         * enter and leave transition.
         *
         * The transitions have  *parallel group* that allow
         * animating several properties at the same time but
         * with different timing configurations. On enter
         * (void => *) we start the opacity animation 0.1s
         * earlier than the translation/width animation.
         * On leave (* => void) we do the opposite -
         * the translation/width animation begins immediately
         * and the opacity animation 0.1s later.
         */
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["a" /* trigger */])('flyInOut', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["b" /* state */])('in', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ width: 120, transform: 'translateX(0)', opacity: 1 })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* transition */])('void => *', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ width: 10, transform: 'translateX(50px)', opacity: 0 }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* group */])([
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* animate */])('0.3s 0.1s ease', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({
                            transform: 'translateX(0)',
                            width: 120
                        })),
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* animate */])('0.3s ease', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({
                            opacity: 1
                        }))
                    ])
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* transition */])('* => void', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* group */])([
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* animate */])('0.3s ease', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({
                            transform: 'translateX(50px)',
                            width: 10
                        })),
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* animate */])('0.3s 0.2s ease', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({
                            opacity: 0
                        }))
                    ])
                ])
            ])
        ]
    })
], HeroListGroupsComponent);

//# sourceMappingURL=hero-list-groups.component.js.map

/***/ }),

/***/ "../../../../../src/app/hero-list-inline-styles.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("../../../animations/@angular/animations.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroListInlineStylesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HeroListInlineStylesComponent = (function () {
    function HeroListInlineStylesComponent() {
    }
    return HeroListInlineStylesComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Input */])(),
    __metadata("design:type", Array)
], HeroListInlineStylesComponent.prototype, "heroes", void 0);
HeroListInlineStylesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'hero-list-inline-styles',
        template: "\n   <ul>\n     <li *ngFor=\"let hero of heroes\"\n         [@heroState]=\"hero.state\"\n         (click)=\"hero.toggleState()\">\n       {{hero.name}}\n     </li>\n   </ul>\n ",
        styles: [__webpack_require__("../../../../../src/app/hero-list.component.css")],
        /**
         * Define two states, "inactive" and "active", and the end
         * styles that apply whenever the element is in those states.
         * Then define an animation for the inactive => active transition.
         * This animation has no end styles, but only styles that are
         * defined inline inside the transition and thus are only kept
         * as long as the animation is running.
         */
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["a" /* trigger */])('heroState', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* transition */])('inactive => active', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({
                        backgroundColor: '#cfd8dc',
                        transform: 'scale(1.3)'
                    }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* animate */])('80ms ease-in', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({
                        backgroundColor: '#eee',
                        transform: 'scale(1)'
                    }))
                ]),
            ])
        ]
    })
], HeroListInlineStylesComponent);

//# sourceMappingURL=hero-list-inline-styles.component.js.map

/***/ }),

/***/ "../../../../../src/app/hero-list-multistep.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("../../../animations/@angular/animations.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroListMultistepComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HeroListMultistepComponent = (function () {
    function HeroListMultistepComponent() {
    }
    HeroListMultistepComponent.prototype.animationStarted = function (event) {
        console.warn('Animation started: ', event);
    };
    HeroListMultistepComponent.prototype.animationDone = function (event) {
        console.warn('Animation done: ', event);
    };
    return HeroListMultistepComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Input */])(),
    __metadata("design:type", Array)
], HeroListMultistepComponent.prototype, "heroes", void 0);
HeroListMultistepComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'hero-list-multistep',
        template: "\n    <ul>\n      <li *ngFor=\"let hero of heroes\"\n          (@flyInOut.start)=\"animationStarted($event)\"\n          (@flyInOut.done)=\"animationDone($event)\"\n          [@flyInOut]=\"'in'\">\n        {{hero.name}}\n      </li>\n    </ul>\n  ",
        styles: [__webpack_require__("../../../../../src/app/hero-list.component.css")],
        /* The element here always has the state "in" when it
         * is present. We animate two transitions: From void
         * to in and from in to void, to achieve an animated
         * enter and leave transition. Each transition is
         * defined in terms of multiple keyframes, to give it
         * a bounce effect.
         */
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["a" /* trigger */])('flyInOut', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["b" /* state */])('in', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ transform: 'translateX(0)' })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* transition */])('void => *', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* animate */])(300, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["g" /* keyframes */])([
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
                    ]))
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* transition */])('* => void', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* animate */])(300, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["g" /* keyframes */])([
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
                    ]))
                ])
            ])
        ]
    })
], HeroListMultistepComponent);

//# sourceMappingURL=hero-list-multistep.component.js.map

/***/ }),

/***/ "../../../../../src/app/hero-list-timings.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("../../../animations/@angular/animations.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroListTimingsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HeroListTimingsComponent = (function () {
    function HeroListTimingsComponent() {
    }
    return HeroListTimingsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Input */])(),
    __metadata("design:type", Array)
], HeroListTimingsComponent.prototype, "heroes", void 0);
HeroListTimingsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'hero-list-timings',
        template: "\n    <ul>\n      <li *ngFor=\"let hero of heroes\"\n          [@flyInOut]=\"'in'\"\n          (click)=\"hero.toggleState()\">\n         {{hero.name}}\n      </li>\n    </ul>\n  ",
        styles: [__webpack_require__("../../../../../src/app/hero-list.component.css")],
        /* The element here always has the state "in" when it
         * is present. We animate two transitions: From void
         * to in and from in to void, to achieve an animated
         * enter and leave transition. The element enters from
         * the left and leaves to the right using translateX,
         * and fades in/out using opacity. We use different easings
         * for enter and leave.
         */
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["a" /* trigger */])('flyInOut', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["b" /* state */])('in', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ opacity: 1, transform: 'translateX(0)' })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* transition */])('void => *', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({
                        opacity: 0,
                        transform: 'translateX(-100%)'
                    }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* animate */])('0.2s ease-in')
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* transition */])('* => void', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* animate */])('0.2s 0.1s ease-out', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({
                        opacity: 0,
                        transform: 'translateX(100%)'
                    }))
                ])
            ])
        ]
    })
], HeroListTimingsComponent);

//# sourceMappingURL=hero-list-timings.component.js.map

/***/ }),

/***/ "../../../../../src/app/hero-list-twoway.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("../../../animations/@angular/animations.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroListTwowayComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HeroListTwowayComponent = (function () {
    function HeroListTwowayComponent() {
    }
    return HeroListTwowayComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Input */])(),
    __metadata("design:type", Array)
], HeroListTwowayComponent.prototype, "heroes", void 0);
HeroListTwowayComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'hero-list-twoway',
        template: "\n   <ul>\n     <li *ngFor=\"let hero of heroes\"\n         [@heroState]=\"hero.state\"\n         (click)=\"hero.toggleState()\">\n       {{hero.name}}\n     </li>\n   </ul>\n ",
        styles: [__webpack_require__("../../../../../src/app/hero-list.component.css")],
        /*
         * Define two states, "inactive" and "active", and the end
         * styles that apply whenever the element is in those states.
         * Then define an animated transition between these two
         * states, in *both* directions.
         */
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["a" /* trigger */])('heroState', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["b" /* state */])('inactive', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({
                    backgroundColor: '#eee',
                    transform: 'scale(1)'
                })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["b" /* state */])('active', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({
                    backgroundColor: '#cfd8dc',
                    transform: 'scale(1.1)'
                })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* transition */])('inactive <=> active', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* animate */])('100ms ease-out'))
            ])
        ]
    })
], HeroListTwowayComponent);

//# sourceMappingURL=hero-list-twoway.component.js.map

/***/ }),

/***/ "../../../../../src/app/hero-list.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "ul {\n  list-style-type: none;\n  padding: 0;\n}\n\nli {\n  display: block;\n  width: 120px;\n  line-height: 50px;\n  padding: 0 10px;\n  box-sizing: border-box;\n  background-color: #eee;\n  border-radius: 4px;\n  margin: 10px;\n  cursor: pointer;\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n.active {\n  background-color: #cfd8dc;\n  -webkit-transform: scale(1.1);\n          transform: scale(1.1);\n}\n.inactive {\n  background-color: #eee;\n  -webkit-transform: scale(1);\n          transform: scale(1);\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/hero-team-builder.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hero_service__ = __webpack_require__("../../../../../src/app/hero.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroTeamBuilderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HeroTeamBuilderComponent = (function () {
    function HeroTeamBuilderComponent(heroService) {
        this.heroService = heroService;
        this.heroes = heroService.heroes;
    }
    return HeroTeamBuilderComponent;
}());
HeroTeamBuilderComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'hero-team-builder',
        template: "\n    <div class=\"buttons\">\n      <button [disabled]=\"!heroService.canAdd()\" (click)=\"heroService.addInactive()\">Add inactive hero</button>\n      <button [disabled]=\"!heroService.canAdd()\" (click)=\"heroService.addActive()\">Add active hero</button>\n      <button [disabled]=\"!heroService.canRemove()\" (click)=\"heroService.remove()\">Remove hero</button>\n    </div>\n\n    <div class=\"columns\">\n      <div class=\"column\">\n        <h4>Basic State</h4>\n        <p>Switch between active/inactive on click.</p>\n        <hero-list-basic [heroes]=\"heroes\"></hero-list-basic>\n      </div>\n      <div class=\"column\">\n        <h4>Styles inline in transitions</h4>\n        <p>Animated effect on click, no persistent end styles.</p>\n        <hero-list-inline-styles [heroes]=\"heroes\"></hero-list-inline-styles>\n      </div>\n      <div class=\"column\">\n        <h4>Combined transition syntax</h4>\n        <p>Switch between active/inactive on click. Define just one transition used in both directions.</p>\n        <hero-list-combined-transitions [heroes]=\"heroes\"></hero-list-combined-transitions>\n      </div>\n      <div class=\"column\">\n        <h4>Two-way transition syntax</h4>\n        <p>Switch between active/inactive on click. Define just one transition used in both directions using the <=> syntax.</p>\n        <hero-list-twoway [heroes]=\"heroes\"></hero-list-twoway>\n      </div>\n      <div class=\"column\">\n        <h4>Enter & Leave</h4>\n        <p>Enter and leave animations using the void state.</p>\n        <hero-list-enter-leave [heroes]=\"heroes\"></hero-list-enter-leave>\n      </div>\n    </div>\n    <div class=\"columns\">\n      <div class=\"column\">\n        <h4>Enter & Leave & States</h4>\n        <p>\n          Enter and leave animations combined with active/inactive state animations.\n          Different enter and leave transitions depending on state.\n        </p>\n        <hero-list-enter-leave-states [heroes]=\"heroes\"></hero-list-enter-leave-states>\n      </div>\n      <div class=\"column\">\n        <h4>Auto Style Calc</h4>\n        <p>Leave animation from the current computed height using the auto-style value *.</p>\n        <hero-list-auto [heroes]=\"heroes\"></hero-list-auto>\n      </div>\n      <div class=\"column\">\n        <h4>Different Timings</h4>\n        <p>Enter and leave animations with different easings, ease-in for enter, ease-out for leave.</p>\n        <hero-list-timings [heroes]=\"heroes\"></hero-list-timings>\n      </div>\n      <div class=\"column\">\n        <h4>Multiple Keyframes</h4>\n        <p>Enter and leave animations with three keyframes in each, to give the transition some bounce.</p>\n        <hero-list-multistep [heroes]=\"heroes\"></hero-list-multistep>\n      </div>\n      <div class=\"column\">\n        <h4>Parallel Groups</h4>\n        <p>Enter and leave animations with multiple properties animated in parallel with different timings.</p>\n        <hero-list-groups [heroes]=\"heroes\"></hero-list-groups>\n      </div>\n    </div>\n  ",
        styles: ["\n    .buttons {\n      text-align: center;\n    }\n    button {\n      padding: 1.5em 3em;\n    }\n    .columns {\n      display: flex;\n      flex-direction: row;\n    }\n    .column {\n      flex: 1;\n      padding: 10px;\n    }\n    .column p {\n      min-height: 6em;\n    }\n  "],
        providers: [__WEBPACK_IMPORTED_MODULE_1__hero_service__["a" /* HeroService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__hero_service__["a" /* HeroService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__hero_service__["a" /* HeroService */]) === "function" && _a || Object])
], HeroTeamBuilderComponent);

var _a;
//# sourceMappingURL=hero-team-builder.component.js.map

/***/ }),

/***/ "../../../../../src/app/hero.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* unused harmony export Hero */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Hero = (function () {
    function Hero(name, state) {
        if (state === void 0) { state = 'inactive'; }
        this.name = name;
        this.state = state;
    }
    Hero.prototype.toggleState = function () {
        this.state = this.state === 'active' ? 'inactive' : 'active';
    };
    return Hero;
}());

var ALL_HEROES = [
    'Windstorm',
    'RubberMan',
    'Bombasto',
    'Magneta',
    'Dynama',
    'Narco',
    'Celeritas',
    'Dr IQ',
    'Magma',
    'Tornado',
    'Mr. Nice'
].map(function (name) { return new Hero(name); });
var HeroService = (function () {
    function HeroService() {
        this.heroes = [];
    }
    HeroService.prototype.canAdd = function () {
        return this.heroes.length < ALL_HEROES.length;
    };
    HeroService.prototype.canRemove = function () {
        return this.heroes.length > 0;
    };
    HeroService.prototype.addActive = function (active) {
        if (active === void 0) { active = true; }
        var hero = ALL_HEROES[this.heroes.length];
        hero.state = active ? 'active' : 'inactive';
        this.heroes.push(hero);
    };
    HeroService.prototype.addInactive = function () {
        this.addActive(false);
    };
    HeroService.prototype.remove = function () {
        this.heroes.length -= 1;
    };
    return HeroService;
}());
HeroService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Injectable */])()
], HeroService);

//# sourceMappingURL=hero.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map