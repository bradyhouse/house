webpackJsonp([2],{

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

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "\n\n<div class=\"grid grid-pad\">\n  <app-header [options]=\"headerOptions\" (itemSelected)=\"onItemSelected($event)\"></app-header>\n  <div *ngIf=\"noPanels()\">\n    <div class=\"container-fluid\">\n      <p class=\"lead\">Open some panels <i class=\"mdi mdi-arrow-up\"></i><i class=\"mdi mdi-arrow-up\"></i></p>\n    </div>\n  </div>\n  <div class=\"container-fluid\">\n    <div *ngFor=\"let panel of panels\">\n      <app-panel [options]=\"panel\" (events)=\"onPanelEvent($event)\"></app-panel>\n    </div>\n  </div>\n</div>\n\n\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_panel_panel_event__ = __webpack_require__("../../../../../src/app/components/panel/panel-event.ts");
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
    function AppComponent() {
        this.title = 'app';
        this.headerOptions = {
            selectListOptions: {
                data: [
                    { id: 1, text: 'Panel 1', order: 1 },
                    { id: 2, text: 'Panel 2', order: 2 },
                    { id: 3, text: 'Panel 3', order: 3 }
                ],
                value: null,
                placeholder: 'open a panel'
            }
        };
        this.panels = [];
    }
    AppComponent.prototype.noPanels = function () {
        return this.panels.length === 0 ? true : false;
    };
    AppComponent.prototype.onPanelEvent = function (event) {
        switch (event.type) {
            case __WEBPACK_IMPORTED_MODULE_1__components_panel_panel_event__["a" /* PanelEventTypes */].DRAG_START:
                if (event.data.panel.seq !== this.dragStartSeq) {
                    this.dragStartSeq = event.data.panel.seq;
                }
                break;
            case __WEBPACK_IMPORTED_MODULE_1__components_panel_panel_event__["a" /* PanelEventTypes */].DRAG_END:
                if (this.dragStartSeq !== this.dragOverSeq) {
                    this._rebuildPanels(this.dragStartSeq, this.dragOverSeq);
                    this.dragStartSeq = this.dragOverSeq = null;
                }
                break;
            case __WEBPACK_IMPORTED_MODULE_1__components_panel_panel_event__["a" /* PanelEventTypes */].DRAG_OVER:
                if (event.data.panel.seq !== this.dragOverSeq) {
                    this.dragOverSeq = event.data.panel.seq;
                }
                break;
            case __WEBPACK_IMPORTED_MODULE_1__components_panel_panel_event__["a" /* PanelEventTypes */].CLOSE:
                this.panels = this.panels.filter(function (panel) {
                    return panel.seq !== event.data.panel.seq;
                });
                this.headerOptions.selectListOptions.data.push({
                    id: event.data.panel.seq,
                    text: event.data.panel.title,
                    order: event.data.panel.id
                });
                if (this.headerOptions.selectListOptions.data.length > 1) {
                    this.headerOptions.selectListOptions.data.sort(function (itemA, itemB) {
                        return itemA.order - itemB.order;
                    });
                }
                break;
        }
    };
    AppComponent.prototype.onItemSelected = function (value) {
        var data = this.headerOptions.selectListOptions.data, modifiedData = [], selectedSite, id = !isNaN(Number(value)) ? Number(value) : null;
        if (id) {
            data.forEach(function (selectListItem) {
                if (selectListItem.id === Number(value)) {
                    selectedSite = selectListItem;
                }
                else {
                    modifiedData.push(selectListItem);
                }
            });
            this.headerOptions = {
                selectListOptions: {
                    data: modifiedData,
                    value: null,
                    placeholder: 'select a site'
                }
            };
            if (selectedSite) {
                var panelOptions = {
                    seq: selectedSite.id,
                    id: selectedSite.order,
                    url: String(selectedSite.id),
                    height: Math.floor(window.innerHeight * .3),
                    top: 0,
                    left: 0,
                    title: selectedSite.text,
                    active: true,
                    fullScreen: false,
                    canClose: true,
                    cssClass: this._seqCssClasses(selectedSite.order)
                };
                if (this.panels.length >= 1) {
                    var updatedPanels_1 = [];
                    updatedPanels_1.push(panelOptions);
                    this.panels.forEach(function (panel) {
                        var deepCopy = Object.assign({}, panel);
                        updatedPanels_1.push(deepCopy);
                    });
                    this.panels = updatedPanels_1;
                }
                else {
                    this.panels.push(panelOptions);
                }
            }
        }
    };
    AppComponent.prototype._seqCssClasses = function (seq) {
        switch (seq) {
            case 1:
                return ['panel', 'panel-primary'];
            case 2:
                return ['panel', 'panel-success'];
            case 3:
                return ['panel', 'panel-warning'];
        }
    };
    AppComponent.prototype._rebuildPanels = function (seqA, seqB) {
        if (this.panels.length > 1) {
            var panelsCopy = Object.assign([], this.panels), panelA = panelsCopy.filter(function (options) {
                return options.seq === seqA ? true : false;
            }).pop(), panelB = panelsCopy.filter(function (options) {
                return options.seq === seqB ? true : false;
            }).pop(), newPanels = panelsCopy.filter(function (options) {
                return options.seq !== seqB && options.seq !== seqA ? true : false;
            });
            if (panelA && panelB) {
                panelA.seq = seqB;
                panelB.seq = seqA;
                newPanels.push(panelA);
                newPanels.push(panelB);
                newPanels.sort(function (optionsA, optionsB) {
                    return optionsA.seq - optionsB.seq;
                });
                this.panels = newPanels;
            }
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [])
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__("../../../../../src/app/components/components.module.ts");
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
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["a" /* CommonModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/components/components.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__header_header_module__ = __webpack_require__("../../../../../src/app/components/header/header.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__panel_panel_module__ = __webpack_require__("../../../../../src/app/components/panel/panel.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__select_list_select_list_module__ = __webpack_require__("../../../../../src/app/components/select-list/select-list.module.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var ComponentsModule = (function () {
    function ComponentsModule() {
    }
    return ComponentsModule;
}());
ComponentsModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__header_header_module__["a" /* HeaderModule */],
            __WEBPACK_IMPORTED_MODULE_3__panel_panel_module__["a" /* PanelModule */],
            __WEBPACK_IMPORTED_MODULE_4__select_list_select_list_module__["a" /* SelectListModule */]
        ],
        declarations: [],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__header_header_module__["a" /* HeaderModule */],
            __WEBPACK_IMPORTED_MODULE_3__panel_panel_module__["a" /* PanelModule */],
            __WEBPACK_IMPORTED_MODULE_4__select_list_select_list_module__["a" /* SelectListModule */]
        ]
    })
], ComponentsModule);

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ "../../../../../src/app/components/header/header.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "\n  <nav class=\"navbar navbar-inverse\">\n    <div class=\"container-fixed\" [ngStyle]=\"{'width': width + 'px' }\" (resize)=\"onWindowResize($event)\">\n      <div class=\"collapse navbar-collapse pull-left\" id=\"bs-example-navbar-collapse-2\">\n        <ul class=\"nav navbar-nav\">\n          <li>\n            <app-select-list [options]=\"selectListOptions\"\n                             (changed)=\"onSelectListChange($event)\">\n            </app-select-list>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </nav>\n\n"

/***/ }),

/***/ "../../../../../src/app/components/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__header__ = __webpack_require__("../../../../../src/app/components/header/header.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__header___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__header__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HeaderComponent = (function () {
    function HeaderComponent(_changeDetector, _differs) {
        this._changeDetector = _changeDetector;
        this._differs = _differs;
        this._differ = null;
        this.itemSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */]();
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this._calcWidth();
    };
    HeaderComponent.prototype.ngOnChanges = function (changes) {
        if ('options' in changes) {
            var value = changes['options'].currentValue;
            if (!this._differ && value) {
                this._differ = this._differs.find(value).create(this._changeDetector);
            }
        }
    };
    HeaderComponent.prototype.ngDoCheck = function () {
        var _this = this;
        if (this._differ) {
            var changes = this._differ.diff(this.options);
            if (changes) {
                changes.forEachChangedItem(function (item) {
                    _this._applyChange(item);
                });
                changes.forEachAddedItem(function (item) {
                    _this._applyChange(item);
                });
            }
        }
    };
    HeaderComponent.prototype.onWindowResize = function (event) {
        var _this = this;
        if (this.timeOut) {
            window.clearTimeout(this.timeOut);
        }
        this.timeOut = window.setTimeout(function () {
            _this._calcWidth();
        }, 64);
    };
    HeaderComponent.prototype.onSelectListChange = function (value) {
        this.itemSelected.emit(value);
    };
    HeaderComponent.prototype._applyChange = function (item) {
        switch (item.key) {
            case 'selectListOptions':
                this.selectListOptions = this.options.selectListOptions;
                break;
        }
        ;
    };
    HeaderComponent.prototype._calcWidth = function () {
        this.width = window.innerWidth - Math.floor(window.innerWidth * .10);
    };
    return HeaderComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__header__["HeaderOptions"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__header__["HeaderOptions"]) === "function" && _a || Object)
], HeaderComponent.prototype, "options", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */]) === "function" && _b || Object)
], HeaderComponent.prototype, "itemSelected", void 0);
HeaderComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Component */])({
        selector: 'app-header',
        template: __webpack_require__("../../../../../src/app/components/header/header.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/header/header.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* ChangeDetectorRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* ChangeDetectorRef */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* KeyValueDiffers */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* KeyValueDiffers */]) === "function" && _d || Object])
], HeaderComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/header/header.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__header_component__ = __webpack_require__("../../../../../src/app/components/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__select_list_select_list_module__ = __webpack_require__("../../../../../src/app/components/select-list/select-list.module.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var HeaderModule = (function () {
    function HeaderModule() {
    }
    return HeaderModule;
}());
HeaderModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_3__select_list_select_list_module__["a" /* SelectListModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__header_component__["a" /* HeaderComponent */]],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__header_component__["a" /* HeaderComponent */]
        ]
    })
], HeaderModule);

//# sourceMappingURL=header.module.js.map

/***/ }),

/***/ "../../../../../src/app/components/header/header.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=header.js.map

/***/ }),

/***/ "../../../../../src/app/components/panel/panel-event.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PanelEventTypes; });
var PanelEventTypes;
(function (PanelEventTypes) {
    PanelEventTypes[PanelEventTypes["DRAG_START"] = 0] = "DRAG_START";
    PanelEventTypes[PanelEventTypes["DRAG_OVER"] = 1] = "DRAG_OVER";
    PanelEventTypes[PanelEventTypes["DRAG_END"] = 2] = "DRAG_END";
    PanelEventTypes[PanelEventTypes["CLOSE"] = 3] = "CLOSE";
})(PanelEventTypes || (PanelEventTypes = {}));
//# sourceMappingURL=panel-event.js.map

/***/ }),

/***/ "../../../../../src/app/components/panel/panel.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "div.panel-heading.move {\n    cursor: move !important;\n}\n\ni.mdi.mdi-close.hand {\n    cursor: pointer !important;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/panel/panel.component.html":
/***/ (function(module, exports) {

module.exports = "<div (resize)=\"onWindowResize($event)\">\n  <div [ngClass]=\"cssClasses\" [ngStyle]=\"{'height': height + 'px', 'width': width + 'px'}\">\n    <div class=\"panel-heading move\"\n         [draggable]=\"true\"\n         (dragstart)=\"onDragStart($event)\"\n         (dragend)=\"onDragEnd($event)\"\n         (dragover)=\"onDragOver($event)\"\n    >\n      <div class=\"panel-title\">{{title}}\n        <a *ngIf=\"isClose\" class=\"round pull-right\">\n          <i class=\"mdi mdi-close hand\"\n             (click)=\"onEvents({type: 'close'})\">\n          </i>\n        </a>\n      </div>\n    </div>\n    <div class=\"panel-body\">\n      Drag the Panel Header up or down.\n    </div>\n  </div>\n</div>\n\n\n\n\n\n"

/***/ }),

/***/ "../../../../../src/app/components/panel/panel.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__subscriptions__ = __webpack_require__("../../../../../src/app/components/subscriptions.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__panel__ = __webpack_require__("../../../../../src/app/components/panel/panel.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__panel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__panel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__panel_event__ = __webpack_require__("../../../../../src/app/components/panel/panel-event.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PanelComponent; });
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





var PanelComponent = (function (_super) {
    __extends(PanelComponent, _super);
    function PanelComponent(_changeDetector, _differs, sanitizer) {
        var _this = _super.call(this) || this;
        _this._changeDetector = _changeDetector;
        _this._differs = _differs;
        _this.sanitizer = sanitizer;
        _this._differ = null;
        _this.events = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */]();
        _this.url = 'http://fiddle.sh';
        _this.width = window.innerWidth - 100;
        _this.title = 'Panel 1';
        _this.left = 0;
        _this.top = 0;
        _this.cssClasses = ['panel', 'panel-primary'];
        return _this;
    }
    Object.defineProperty(PanelComponent.prototype, "isFullScreen", {
        get: function () {
            return this._isFullScreen;
        },
        set: function (value) {
            this._isFullScreen = value;
            this._calcHeight();
        },
        enumerable: true,
        configurable: true
    });
    PanelComponent.prototype.ngOnChanges = function (changes) {
        if ('options' in changes) {
            var value = changes['options'].currentValue;
            if (!this._differ && value) {
                this._differ = this._differs.find(value).create(this._changeDetector);
            }
        }
    };
    PanelComponent.prototype.ngOnInit = function () {
        this._calcHeight();
        this._calcWidth();
    };
    PanelComponent.prototype.ngDoCheck = function () {
        var _this = this;
        if (this._differ) {
            var changes = this._differ.diff(this.options);
            if (changes) {
                changes.forEachChangedItem(function (item) {
                    _this._applyChange(item);
                });
                changes.forEachAddedItem(function (item) {
                    _this._applyChange(item);
                });
            }
        }
    };
    PanelComponent.prototype.onWindowResize = function (event) {
        var _this = this;
        if (this.timeOut) {
            window.clearTimeout(this.timeOut);
        }
        this.timeOut = window.setTimeout(function () {
            _this._calcHeight();
            _this._calcWidth();
        }, 64);
    };
    PanelComponent.prototype.onDragStart = function (event) {
        this.events.emit({
            type: __WEBPACK_IMPORTED_MODULE_4__panel_event__["a" /* PanelEventTypes */].DRAG_START,
            data: {
                event: event,
                panel: this.options
            }
        });
    };
    PanelComponent.prototype.onDragEnd = function (event) {
        this.events.emit({
            type: __WEBPACK_IMPORTED_MODULE_4__panel_event__["a" /* PanelEventTypes */].DRAG_END,
            data: {
                event: event,
                panel: this.options
            }
        });
    };
    PanelComponent.prototype.onDragOver = function (event) {
        this.events.emit({
            type: __WEBPACK_IMPORTED_MODULE_4__panel_event__["a" /* PanelEventTypes */].DRAG_OVER,
            data: {
                event: event,
                panel: this.options
            }
        });
    };
    PanelComponent.prototype.onEvents = function (event) {
        switch (event.type) {
            case 'close':
                this.events.emit({
                    type: __WEBPACK_IMPORTED_MODULE_4__panel_event__["a" /* PanelEventTypes */].CLOSE,
                    data: {
                        panel: this.options
                    }
                });
                break;
        }
    };
    PanelComponent.prototype._calcHeight = function () {
        if (this.isFullScreen) {
            this.height = this.el.nativeElement.offsetParent.offsetHeight - (48 * 2) - 16;
        }
        else {
            this.height = Math.floor(window.innerHeight * .3);
        }
    };
    PanelComponent.prototype._calcWidth = function () {
        this.width = window.innerWidth - Math.floor(window.innerWidth * .11);
    };
    PanelComponent.prototype._applyChange = function (item) {
        switch (item.key) {
            case 'url':
                this.url = this.options.url;
                break;
            case 'width':
                this.width = this.options.width;
                break;
            case 'height':
                this.height = this.options.height;
                break;
            case 'left':
                this.left = this.options.left;
                break;
            case 'top':
                this.top = this.options.top;
                break;
            case 'title':
                this.title = this.options.title;
                break;
            case 'active':
                this.isActive = this.options.active;
                break;
            case 'fullScreen':
                this.isFullScreen = this.options.fullScreen;
                break;
            case 'cssClass':
                this.cssClasses = this.options.cssClass;
                break;
            case 'canClose':
                this.isClose = this.options.canClose;
                break;
        }
    };
    return PanelComponent;
}(__WEBPACK_IMPORTED_MODULE_2__subscriptions__["a" /* Subscriptions */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* ViewChild */])('el'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* ElementRef */]) === "function" && _a || Object)
], PanelComponent.prototype, "el", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Input */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__panel__["PanelOptions"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__panel__["PanelOptions"]) === "function" && _b || Object)
], PanelComponent.prototype, "options", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Output */])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */]) === "function" && _c || Object)
], PanelComponent.prototype, "events", void 0);
PanelComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Component */])({
        selector: 'app-panel',
        template: __webpack_require__("../../../../../src/app/components/panel/panel.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/panel/panel.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* ChangeDetectorRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* ChangeDetectorRef */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* KeyValueDiffers */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* KeyValueDiffers */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DomSanitizer */]) === "function" && _f || Object])
], PanelComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=panel.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/panel/panel.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__panel_component__ = __webpack_require__("../../../../../src/app/components/panel/panel.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PanelModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PanelModule = (function () {
    function PanelModule() {
    }
    return PanelModule;
}());
PanelModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__panel_component__["a" /* PanelComponent */]],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__panel_component__["a" /* PanelComponent */]
        ]
    })
], PanelModule);

//# sourceMappingURL=panel.module.js.map

/***/ }),

/***/ "../../../../../src/app/components/panel/panel.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=panel.js.map

/***/ }),

/***/ "../../../../../src/app/components/select-list/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__select_list__ = __webpack_require__("../../../../../src/app/components/select-list/select-list.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__select_list___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__select_list__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__select_list__, "SelectListOptions")) __webpack_require__.d(__webpack_exports__, "SelectListOptions", function() { return __WEBPACK_IMPORTED_MODULE_0__select_list__["SelectListOptions"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__select_list__, "SelectListService")) __webpack_require__.d(__webpack_exports__, "SelectListService", function() { return __WEBPACK_IMPORTED_MODULE_0__select_list__["SelectListService"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__select_list_component__ = __webpack_require__("../../../../../src/app/components/select-list/select-list.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__select_list_service__ = __webpack_require__("../../../../../src/app/components/select-list/select-list.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "SelectListService", function() { return __WEBPACK_IMPORTED_MODULE_2__select_list_service__["a"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/components/select-list/select-list.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".select.invisible {\n  position: absolute;\n  right: 0;\n  top: 0; }\n.select.invisible .select2-container {\n  height: 30px; }\n\n.app-select-list select {\n  width: 185px;\n  background-color: white;\n  border: 1px solid #ccc;\n  min-width: 80px;\n  height: 30px; }\n\n.app-select-list .select2-container .select2-selection {\n  border-color: #ccc;\n  height: 30px;\n  border-radius: 0; }\n.app-select-list .select2-container .select2-selection .select2-selection__rendered {\n  font-weight: 500; }\n.app-select-list .select2-container .select2-selection .select2-selection__rendered .select2-selection__choice {\n  min-height: 22px;\n  line-height: 20px;\n  background-color: inherit;\n  margin-right: 4px;\n  border-color: #ccc; }\n\n.app-select-list .select2-container .select2-selection--multiple {\n  position: relative;\n  padding-right: 15px;\n  height: auto;\n  min-height: 30px; }\n.app-select-list .select2-container .select2-selection--multiple .select2-selection__rendered {\n  white-space: normal; }\n.app-select-list .select2-container .select2-selection--multiple :before {\n  content: ' ';\n  border-color: #888 transparent transparent transparent;\n  border-style: solid;\n  border-width: 5px 4px 0 4px;\n  height: 0;\n  right: 6px;\n  margin-left: -4px;\n  margin-top: -2px;\n  position: absolute;\n  top: 50%;\n  width: 0; }\n\n.app-select-list .select2-container--open .select2-selection--multiple:before {\n  border-color: transparent transparent #888 transparent;\n  border-width: 0 4px 5px 4px; }\n\n.select2-container--open .select2-dropdown {\n  border-radius: 0;\n  border: 1px solid #CCC;\n  margin-top: -1px;\n  z-index: 2000; }\n.select2-container--open .select2-dropdown .select2-results__option[aria-selected=true],\n.select2-container--open .select2-dropdown .select2-results__option--highlighted[aria-selected] {\n  background-color: #f5f5f5;\n  color: #262626; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/select-list/select-list.component.html":
/***/ (function(module, exports) {

module.exports = "<span class=\"app-select-list\">\n  <select [disabled]=\"options?.isDisabled\">\n    <option *ngIf=\"options?.placeholder\"></option>\n    <option\n      *ngFor=\"let item of data\"\n      class=\"{{item.className}}\"\n      [value]=\"item.id\">\n      {{item.text}}\n    </option>\n  </select>\n</span>\n"

/***/ }),

/***/ "../../../../../src/app/components/select-list/select-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__("../../../../../src/app/components/select-list/index.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var SelectListComponent = (function () {
    function SelectListComponent(elementRef, _select2Service) {
        this.elementRef = elementRef;
        this._select2Service = _select2Service;
        this.changed = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */]();
        this.userAction = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */]();
        this._isUserAction = true;
        this.options = {};
    }
    SelectListComponent.prototype.ngOnChanges = function (changes) {
        if (changes.options) {
            this.data = this.options.data;
            if (this.options.isFilterSelectedOptions) {
                this.data = this._select2Service.filterSelectedOptions(this.options);
            }
            if (!this._isInit) {
                this.render();
            }
            else {
                this.validateValue();
            }
        }
    };
    SelectListComponent.prototype.open = function () {
        this._select2.select2('open');
    };
    SelectListComponent.prototype.render = function () {
        var _this = this;
        this._select2 = jQuery(this.elementRef.nativeElement).find('select');
        this._select2.select2(this._select2Service.getSelect2Options(this.options))
            .on('change', function (e) {
            var value = _this._select2.val();
            if (_this.options.isMultiSelect && !value) {
                value = [];
            }
            _this.change(value);
        }).on('select2:open', function (e) {
            if (_this.options.isManualEntry) {
                var value = jQuery(_this.elementRef.nativeElement).find('.select2-selection__rendered').text();
                if (value) {
                    value = value.replace(/\s/g, '');
                }
                jQuery('.select2-container--open .select2-dropdown--below .select2-search__field').val(value);
            }
        });
        this.validateValue();
        this._isInit = true;
    };
    SelectListComponent.prototype.validateValue = function () {
        if (this.data && this.data.length > 0) {
            var validatedValue = this._select2Service.getValidatedValue(this.options);
            if (this.options.isManualEntry && !this.options.isMultiSelect && validatedValue !== this.options.value) {
                validatedValue = this.options.value;
                this.addManualEntry(validatedValue);
            }
            this.updateSelect2Value(validatedValue);
        }
    };
    SelectListComponent.prototype.updateSelect2Value = function (value) {
        var _this = this;
        if (this._changeTimeout) {
            clearTimeout(this._changeTimeout);
        }
        this._changeTimeout = setTimeout(function () {
            if (value) {
                _this._isUserAction = false;
                _this._select2.val(value).trigger('change');
            }
        }, 10);
    };
    SelectListComponent.prototype.addManualEntry = function (value) {
        if (this.options.manualEntry) {
            this.options.data.push(this.options.manualEntry({ id: value, term: value }));
        }
        else {
            this.options.data.push({ id: value, text: value });
        }
    };
    SelectListComponent.prototype.change = function (newValue) {
        if (JSON.stringify(this.options.value) !== JSON.stringify(newValue)) {
            if (this.options.isFilterSelectedOptions && this.options.isMultiSelect) {
                this.filterSelected(newValue);
            }
            else {
                this.options.value = newValue;
            }
            this.userAction.emit(this._isUserAction);
            this.changed.emit(this.options.value);
            this._isUserAction = true;
        }
    };
    SelectListComponent.prototype.filterSelected = function (newValue) {
        var _this = this;
        if (!this.options.value) {
            this.options.value = [];
        }
        if (newValue && newValue.constructor === Array) {
            newValue.forEach(function (item) {
                if (_this.options.value.indexOf(item) === -1) {
                    _this.options.value.push(item);
                }
            });
        }
        this.data = this._select2Service.filterSelectedOptions(this.options);
    };
    return SelectListComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__index__["SelectListOptions"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__index__["SelectListOptions"]) === "function" && _a || Object)
], SelectListComponent.prototype, "options", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */]) === "function" && _b || Object)
], SelectListComponent.prototype, "changed", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Output */])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */]) === "function" && _c || Object)
], SelectListComponent.prototype, "userAction", void 0);
SelectListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Component */])({
        selector: 'app-select-list',
        template: __webpack_require__("../../../../../src/app/components/select-list/select-list.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/select-list/select-list.component.css")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* ViewEncapsulation */].None,
        providers: [__WEBPACK_IMPORTED_MODULE_1__index__["SelectListService"]]
    }),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Inject */])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* ElementRef */])),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* ElementRef */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__index__["SelectListService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__index__["SelectListService"]) === "function" && _e || Object])
], SelectListComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=select-list.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/select-list/select-list.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__select_list_component__ = __webpack_require__("../../../../../src/app/components/select-list/select-list.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectListModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SelectListModule = (function () {
    function SelectListModule() {
    }
    return SelectListModule;
}());
SelectListModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__select_list_component__["a" /* SelectListComponent */]],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__select_list_component__["a" /* SelectListComponent */]
        ]
    })
], SelectListModule);

//# sourceMappingURL=select-list.module.js.map

/***/ }),

/***/ "../../../../../src/app/components/select-list/select-list.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectListService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SelectListService = (function () {
    function SelectListService() {
    }
    SelectListService.prototype.getSelect2Options = function (options) {
        var selectOptions = {};
        for (var key in options) {
            var property = options[key];
            if (property !== null && property !== undefined) {
                switch (key) {
                    case 'isHideSearchBox':
                        selectOptions.minimumResultsForSearch = -1;
                        break;
                    case 'width':
                        selectOptions.width = property;
                        break;
                    case 'placeholder':
                        selectOptions.placeholder = property;
                        if (!options.isMultiSelect) {
                            selectOptions.allowClear = true;
                        }
                        break;
                    case 'manualEntry':
                        selectOptions.createTag = property;
                        break;
                    case 'isMultiSelect':
                        selectOptions.multiple = property;
                        break;
                    case 'isManualEntry':
                        selectOptions.tags = property;
                        break;
                }
            }
        }
        selectOptions.templateResult = this.templateResult;
        return selectOptions;
    };
    SelectListService.prototype.getValidatedValue = function (options) {
        var value = options.value;
        if (options.isMultiSelect) {
            var validValue_1 = [];
            if (value) {
                value.forEach(function (item) {
                    if (_.find(options.data, { id: item })) {
                        validValue_1.push(item);
                    }
                });
            }
            if (validValue_1.length !== value.length) {
                value = validValue_1;
            }
        }
        else {
            if (!_.find(options.data, { id: value })) {
                if (!options.placeholder && options.data[0] !== undefined) {
                    value = options.data[0].id;
                }
            }
        }
        return value;
    };
    SelectListService.prototype.filterSelectedOptions = function (options) {
        var data = [];
        if (options.data) {
            data = options.data.filter(function (item) {
                return !options.value || (options.value && options.value.indexOf(item.id) === -1);
            });
        }
        return data;
    };
    SelectListService.prototype.templateResult = function (data) {
        var template = data.text;
        if (data.element && data.element.className) {
            template = jQuery('<span class="' + data.element.className + '">' + data.text + '</span>');
        }
        return template;
    };
    return SelectListService;
}());
SelectListService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], SelectListService);

//# sourceMappingURL=select-list.service.js.map

/***/ }),

/***/ "../../../../../src/app/components/select-list/select-list.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=select-list.js.map

/***/ }),

/***/ "../../../../../src/app/components/subscriptions.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Subscriptions; });
var Subscriptions = (function () {
    function Subscriptions() {
        this.subscriptions = [];
    }
    Subscriptions.prototype.ngOnDestroy = function () {
        this.clearSubscriptions();
    };
    Subscriptions.prototype.clearSubscriptions = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.subscriptions = [];
    };
    return Subscriptions;
}());

//# sourceMappingURL=subscriptions.js.map

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

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[1]);
//# sourceMappingURL=main.bundle.js.map