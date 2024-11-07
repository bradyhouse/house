webpackJsonp([1,4],{

/***/ 135:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 135;


/***/ }),

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(161);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__id__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__reducers_people__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__reducers_party_filter__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__selectors__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__actions__ = __webpack_require__(41);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var AppComponent = (function () {
    function AppComponent(_store) {
        this._store = _store;
        this.model = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].combineLatest(_store.select('people'), _store.select('partyFilter'))
            .let(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__selectors__["a" /* partyModel */])());
        //for demonstration on combining selectors
        this.percentAttendance = _store.let(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__selectors__["b" /* percentAttending */])());
    }
    AppComponent.prototype.addPerson = function (name) {
        this._store.dispatch({ type: __WEBPACK_IMPORTED_MODULE_8__actions__["d" /* ADD_PERSON */], payload: { id: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__id__["a" /* id */])(), name: name } });
    };
    AppComponent.prototype.addGuest = function (id) {
        this._store.dispatch({ type: __WEBPACK_IMPORTED_MODULE_8__actions__["e" /* ADD_GUEST */], payload: id });
    };
    AppComponent.prototype.removeGuest = function (id) {
        this._store.dispatch({ type: __WEBPACK_IMPORTED_MODULE_8__actions__["f" /* REMOVE_GUEST */], payload: id });
    };
    AppComponent.prototype.removePerson = function (id) {
        this._store.dispatch({ type: __WEBPACK_IMPORTED_MODULE_8__actions__["g" /* REMOVE_PERSON */], payload: id });
    };
    AppComponent.prototype.toggleAttending = function (id) {
        this._store.dispatch({ type: __WEBPACK_IMPORTED_MODULE_8__actions__["h" /* TOGGLE_ATTENDING */], payload: id });
    };
    AppComponent.prototype.updateFilter = function (filter) {
        this._store.dispatch({ type: filter });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(223),
        styles: [__webpack_require__(216)],
        providers: [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* provideStore */])({ people: __WEBPACK_IMPORTED_MODULE_5__reducers_people__["a" /* people */], partyFilter: __WEBPACK_IMPORTED_MODULE_6__reducers_party_filter__["a" /* partyFilter */] })],
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* ChangeDetectionStrategy */].OnPush
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["b" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["b" /* Store */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_person_list_person_list_component__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_person_input_person_input_component__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_filter_select_filter_select_component__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_party_stats_party_stats_component__ = __webpack_require__(154);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_5__components_person_list_person_list_component__["a" /* PersonListComponent */],
            __WEBPACK_IMPORTED_MODULE_6__components_person_input_person_input_component__["a" /* PersonInputComponent */],
            __WEBPACK_IMPORTED_MODULE_7__components_filter_select_filter_select_component__["a" /* FilterSelectComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_party_stats_party_stats_component__["a" /* PartyStatsComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions__ = __webpack_require__(41);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterSelectComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FilterSelectComponent = (function () {
    function FilterSelectComponent() {
        this.filters = [
            { friendly: "All", action: __WEBPACK_IMPORTED_MODULE_1__actions__["a" /* SHOW_ALL */] },
            { friendly: "Attending", action: __WEBPACK_IMPORTED_MODULE_1__actions__["b" /* SHOW_ATTENDING */] },
            { friendly: "Attending w/ Guests", action: __WEBPACK_IMPORTED_MODULE_1__actions__["c" /* SHOW_WITH_GUESTS */] }
        ];
        this.updateFilter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
    }
    return FilterSelectComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]) === "function" && _a || Object)
], FilterSelectComponent.prototype, "updateFilter", void 0);
FilterSelectComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'app-filter-select',
        template: __webpack_require__(224),
        styles: [__webpack_require__(217)]
    })
], FilterSelectComponent);

var _a;
//# sourceMappingURL=filter-select.component.js.map

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(11);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PartyStatsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PartyStatsComponent = (function () {
    function PartyStatsComponent() {
    }
    return PartyStatsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Object)
], PartyStatsComponent.prototype, "invited", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Object)
], PartyStatsComponent.prototype, "attending", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Object)
], PartyStatsComponent.prototype, "guests", void 0);
PartyStatsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'app-party-stats',
        template: __webpack_require__(225),
        styles: [__webpack_require__(218)]
    })
], PartyStatsComponent);

//# sourceMappingURL=party-stats.component.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(11);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PersonInputComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PersonInputComponent = (function () {
    function PersonInputComponent() {
        this.addPerson = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
    }
    PersonInputComponent.prototype.add = function (personInput) {
        this.addPerson.emit(personInput.value);
        personInput.value = '';
    };
    return PersonInputComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* Output */])(),
    __metadata("design:type", Object)
], PersonInputComponent.prototype, "addPerson", void 0);
PersonInputComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'app-person-input',
        template: __webpack_require__(226),
        styles: [__webpack_require__(219)]
    })
], PersonInputComponent);

//# sourceMappingURL=person-input.component.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(11);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PersonListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PersonListComponent = (function () {
    function PersonListComponent() {
        this.addGuest = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
        this.removeGuest = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
        this.removePerson = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
        this.toggleAttending = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
    }
    return PersonListComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Object)
], PersonListComponent.prototype, "people", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* Output */])(),
    __metadata("design:type", Object)
], PersonListComponent.prototype, "addGuest", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* Output */])(),
    __metadata("design:type", Object)
], PersonListComponent.prototype, "removeGuest", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* Output */])(),
    __metadata("design:type", Object)
], PersonListComponent.prototype, "removePerson", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* Output */])(),
    __metadata("design:type", Object)
], PersonListComponent.prototype, "toggleAttending", void 0);
PersonListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'app-person-list',
        template: __webpack_require__(227),
        styles: [__webpack_require__(220)],
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* ChangeDetectionStrategy */].OnPush
    })
], PersonListComponent);

//# sourceMappingURL=person-list.component.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return id; });
var start = Math.floor(Math.random() * (5000));
var id = function () {
    return ++start;
};
//# sourceMappingURL=id.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(41);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return partyFilter; });

//return appropriate function depending on selected filter
var partyFilter = function (state, action) {
    if (state === void 0) { state = function (person) { return person; }; }
    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_0__actions__["b" /* SHOW_ATTENDING */]:
            return function (person) { return person.attending; };
        case __WEBPACK_IMPORTED_MODULE_0__actions__["a" /* SHOW_ALL */]:
            return function (person) { return person; };
        case __WEBPACK_IMPORTED_MODULE_0__actions__["c" /* SHOW_WITH_GUESTS */]:
            return function (person) { return person.guests; };
        default:
            return state;
    }
};
//# sourceMappingURL=party-filter.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(41);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return people; });

var details = function (state, action) {
    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_0__actions__["e" /* ADD_GUEST */]:
            if (state.id === action.payload) {
                return Object.assign({}, state, { guests: state.guests + 1 });
            }
            return state;
        case __WEBPACK_IMPORTED_MODULE_0__actions__["f" /* REMOVE_GUEST */]:
            if (state.id === action.payload) {
                return Object.assign({}, state, { guests: state.guests - 1 });
            }
            return state;
        case __WEBPACK_IMPORTED_MODULE_0__actions__["h" /* TOGGLE_ATTENDING */]:
            if (state.id === action.id) {
                return Object.assign({}, state, { attending: !state.attending });
            }
            return state;
        default:
            return state;
    }
};
var people = function (state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_0__actions__["d" /* ADD_PERSON */]:
            return state.concat([
                Object.assign({}, { id: action.payload.id, name: action.payload.name, guests: 0, attending: false })
            ]);
        case __WEBPACK_IMPORTED_MODULE_0__actions__["g" /* REMOVE_PERSON */]:
            return state
                .filter(function (person) { return person.id !== action.payload; });
        case __WEBPACK_IMPORTED_MODULE_0__actions__["e" /* ADD_GUEST */]:
            return state.map(function (person) { return details(person, action); });
        case __WEBPACK_IMPORTED_MODULE_0__actions__["f" /* REMOVE_GUEST */]:
            return state.map(function (person) { return details(person, action); });
        case __WEBPACK_IMPORTED_MODULE_0__actions__["h" /* TOGGLE_ATTENDING */]:
            return state.map(function (person) { return details(person, action); });
        default:
            return state;
    }
};
//# sourceMappingURL=people.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return partyModel; });
/* unused harmony export attendees */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return percentAttending; });
var partyModel = function () {
    return function (state) { return state
        .map(function (_a) {
        var people = _a[0], filter = _a[1];
        return {
            total: people.length,
            people: people.filter(filter),
            attending: people.filter(function (person) { return person.attending; }).length,
            guests: people.reduce(function (acc, curr) { return acc + curr.guests; }, 0)
        };
    }); };
};
var attendees = function () {
    return function (state) { return state
        .map(function (s) { return s.people; })
        .distinctUntilChanged(); };
};
var percentAttending = function () {
    return function (state) { return state
        .let(attendees())
        .map(function (p) {
        var totalAttending = p.filter(function (person) { return person.attending; }).length;
        var total = p.length;
        return total > 0 ? (totalAttending / total) * 100 : 0;
    }); };
};
//# sourceMappingURL=selectors.js.map

/***/ }),

/***/ 161:
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

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)();
// imports


// module
exports.push([module.i, ".app-component {\n  padding: 20px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 217:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)();
// imports


// module
exports.push([module.i, ".party-stats-component {\n  padding-bottom: 20px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)();
// imports


// module
exports.push([module.i, ".person-input-component {\n  padding-top: 20px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)();
// imports


// module
exports.push([module.i, ".person-list-component {\n  padding-top: 20px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 223:
/***/ (function(module, exports) {

module.exports = "<div class=\"app-component\">\n  <h3>@ngrx/store Hello World</h3>\n  <div class=\"margin-bottom-10\">\n    Percent Attendance: {{percentAttendance | async}}%\n  </div>\n  <app-party-stats\n    [invited]=\"(model | async)?.total\"\n    [attending]=\"(model | async)?.attending\"\n    [guests]=\"(model | async)?.guests\"\n  >\n    {{guests | async | json}}\n  </app-party-stats>\n  <app-filter-select\n    (updateFilter)=\"updateFilter($event)\"\n  >\n  </app-filter-select>\n  <app-person-input\n    (addPerson)=\"addPerson($event)\"\n  >\n  </app-person-input>\n  <app-person-list\n    [people]=\"(model | async)?.people\"\n    (addGuest)=\"addGuest($event)\"\n    (removeGuest)=\"removeGuest($event)\"\n    (removePerson)=\"removePerson($event)\"\n    (toggleAttending)=\"toggleAttending($event)\"\n  >\n  </app-person-list>\n\n</div>\n"

/***/ }),

/***/ 224:
/***/ (function(module, exports) {

module.exports = "<div class=\"margin-bottom-10\">\n  <select #selectList (change)=\"updateFilter.emit(selectList.value)\">\n    <option *ngFor=\"let filter of filters\" value=\"{{filter.action}}\">\n      {{filter.friendly}}\n    </option>\n  </select>\n  <hr>\n</div>\n"

/***/ }),

/***/ 225:
/***/ (function(module, exports) {

module.exports = "<div class=\"party-stats-component\">\n  <strong>Invited:</strong> {{invited}}\n  <strong>Attending:</strong> {{attending}}\n  <strong>Guests:</strong> {{guests}}\n  <hr>\n</div>\n"

/***/ }),

/***/ 226:
/***/ (function(module, exports) {

module.exports = "<div class=\"person-input-component\">\n  <input #personName type=\"text\" />\n  <button (click)=\"add(personName)\">Add Person</button>\n  <hr>\n</div>\n"

/***/ }),

/***/ 227:
/***/ (function(module, exports) {

module.exports = "<div class=\"person-list-component\">\n  <ul class=\"list-group\">\n    <li class=\"list-group-item\"\n      *ngFor=\"let person of people\"\n      [class.attending]=\"person.attending\"\n    >\n      {{person.name}} - Guests: {{person.guests}}\n      <button (click)=\"addGuest.emit(person.id)\">+</button>\n      <button *ngIf=\"person.guests\" (click)=\"removeGuest.emit(person.id)\">-</button>\n      Attending?\n      <input type=\"checkbox\" [(ngModel)]=\"person.attending\" (change)=\"toggleAttending.emit(person.id)\" />\n      <button (click)=\"removePerson.emit(person.id)\">Delete</button>\n    </li>\n  </ul>\n\n</div>\n"

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ADD_PERSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return REMOVE_PERSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ADD_GUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return REMOVE_GUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return TOGGLE_ATTENDING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SHOW_ATTENDING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SHOW_ALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SHOW_WITH_GUESTS; });
// Person Action Constants
var ADD_PERSON = 'ADD_PERSON';
var REMOVE_PERSON = 'REMOVE_PERSON';
var ADD_GUEST = 'ADD_GUEST';
var REMOVE_GUEST = 'REMOVE_GUEST';
var TOGGLE_ATTENDING = 'TOGGLE_ATTENDING';
// Party Filter Constants
var SHOW_ATTENDING = 'SHOW_ATTENDING';
var SHOW_ALL = 'SHOW_ALL';
var SHOW_WITH_GUESTS = 'SHOW_GUESTS';
//# sourceMappingURL=actions.js.map

/***/ }),

/***/ 503:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(136);


/***/ })

},[503]);
//# sourceMappingURL=main.bundle.js.map