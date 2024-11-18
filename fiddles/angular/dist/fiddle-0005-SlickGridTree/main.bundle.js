webpackJsonp([1,5],{

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(218),
        styles: [__webpack_require__(192)]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__content_content_component__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sidebar_sidebar_component__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_index__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_tree_grid_tree_grid_module__ = __webpack_require__(61);
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
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_7__components_tree_grid_tree_grid_module__["a" /* TreeGridModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* ReactiveFormsModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_4__sidebar_sidebar_component__["a" /* SidebarComponent */],
            __WEBPACK_IMPORTED_MODULE_3__content_content_component__["a" /* ContentComponent */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_6__shared_index__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_6__shared_index__["b" /* StateService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__search_bar_component__ = __webpack_require__(119);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__search_bar_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_index__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchBarComponent; });
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




var SearchBarComponent = (function (_super) {
    __extends(SearchBarComponent, _super);
    function SearchBarComponent() {
        var _this = _super.call(this) || this;
        _this.changed = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */]();
        _this.filterControl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */]();
        _this.subscriptions.push(_this.filterControl.valueChanges
            .debounceTime(300)
            .subscribe(function (filter) { return _this.changeFilter(filter); }));
        return _this;
    }
    SearchBarComponent.prototype.ngOnChanges = function (changes) {
        if (changes.filter) {
            this.filterControl.setValue(this.filter, {});
            this.changed.emit(this.filter);
        }
    };
    SearchBarComponent.prototype.onClearClick = function () {
        this.filterControl.setValue('', {});
    };
    SearchBarComponent.prototype.changeFilter = function (filter) {
        this.filter = filter;
        this.changed.emit(filter);
    };
    return SearchBarComponent;
}(__WEBPACK_IMPORTED_MODULE_2__shared_index__["a" /* Subscriptions */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", String)
], SearchBarComponent.prototype, "filter", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */]) === "function" && _a || Object)
], SearchBarComponent.prototype, "changed", void 0);
SearchBarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'search-bar',
        template: __webpack_require__(219)
    }),
    __metadata("design:paramtypes", [])
], SearchBarComponent);

var _a;
//# sourceMappingURL=search-bar.component.js.map

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index__ = __webpack_require__(118);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchBarModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SearchBarModule = (function () {
    function SearchBarModule() {
    }
    return SearchBarModule;
}());
SearchBarModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* ReactiveFormsModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__index__["a" /* SearchBarComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__index__["a" /* SearchBarComponent */]
        ]
    })
], SearchBarModule);

//# sourceMappingURL=search-bar.module.js.map

/***/ }),

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedUtils; });
var SharedUtils = (function () {
    function SharedUtils() {
    }
    SharedUtils.guid = function () {
        return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, this.randomGuidDigit);
    };
    SharedUtils.randomGuidDigit = function () {
        var crypto = window.crypto;
        if (crypto && crypto.getRandomValues) {
            var rands = new Uint8Array(1);
            crypto.getRandomValues(rands);
            return (rands[0] % 16).toString(16);
        }
        else {
            return ((Math.random() * 16) | 0).toString(16);
        }
    };
    return SharedUtils;
}());

//# sourceMappingURL=shared-utils.js.map

/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeGridCmds; });
var TreeGridCmds;
(function (TreeGridCmds) {
    TreeGridCmds[TreeGridCmds["ShowAll"] = 1] = "ShowAll";
    TreeGridCmds[TreeGridCmds["ShowSelected"] = 2] = "ShowSelected";
    TreeGridCmds[TreeGridCmds["ClearSelected"] = 3] = "ClearSelected";
    TreeGridCmds[TreeGridCmds["Reload"] = 4] = "Reload";
    TreeGridCmds[TreeGridCmds["ExpandAll"] = 5] = "ExpandAll";
    TreeGridCmds[TreeGridCmds["CollapseAll"] = 6] = "CollapseAll";
    TreeGridCmds[TreeGridCmds["SelectAll"] = 7] = "SelectAll";
    TreeGridCmds[TreeGridCmds["Export"] = 8] = "Export";
})(TreeGridCmds || (TreeGridCmds = {}));
//# sourceMappingURL=tree-grid-cmds.enum.js.map

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeGridEvents; });
var TreeGridEvents;
(function (TreeGridEvents) {
    TreeGridEvents[TreeGridEvents["cmd"] = 1] = "cmd";
    TreeGridEvents[TreeGridEvents["nodeChange"] = 2] = "nodeChange";
    TreeGridEvents[TreeGridEvents["filter"] = 3] = "filter";
    TreeGridEvents[TreeGridEvents["selectBubble"] = 4] = "selectBubble";
    TreeGridEvents[TreeGridEvents["nodeRequest"] = 5] = "nodeRequest";
})(TreeGridEvents || (TreeGridEvents = {}));
//# sourceMappingURL=tree-grid-events.enum.js.map

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enums_index__ = __webpack_require__(33);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "TreeGridCmds", function() { return __WEBPACK_IMPORTED_MODULE_0__enums_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interfaces_index__ = __webpack_require__(57);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__interfaces_index__, "Subscriptions")) __webpack_require__.d(__webpack_exports__, "Subscriptions", function() { return __WEBPACK_IMPORTED_MODULE_1__interfaces_index__["Subscriptions"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tree_grid_component__ = __webpack_require__(60);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tree_grid_module__ = __webpack_require__(61);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_index__ = __webpack_require__(58);
/* unused harmony namespace reexport */





//# sourceMappingURL=index.js.map

/***/ }),

/***/ 125:
/***/ (function(module, exports) {

//# sourceMappingURL=tree-grid-event.interface.js.map

/***/ }),

/***/ 126:
/***/ (function(module, exports) {

//# sourceMappingURL=tree-grid-node.interface.js.map

/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise__);

//# sourceMappingURL=tree-grid.interface.js.map

/***/ }),

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tree_grid_node_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__enums_index__ = __webpack_require__(33);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeGridEventsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TreeGridEventsService = (function () {
    function TreeGridEventsService(_nodeService) {
        var _this = this;
        this._nodeService = _nodeService;
        this.dataViewRowsChange$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) { return _this._dataViewRowsObserver = observer; }).share();
    }
    TreeGridEventsService.prototype.init = function (grid, dataView, events) {
        var _this = this;
        if (grid && dataView && events) {
            grid.onClick.subscribe(function (e, args) { return _this.onGridCellClick(e, args, dataView, events); });
            if (this._nodeService.dataView) {
                this._nodeService.dataView.onRowsChanged.subscribe(function (e, args) { return _this.onDataViewRowsChanged(e, args, grid); });
            }
        }
    };
    TreeGridEventsService.prototype.onDataViewRowsChanged = function (e, args, grid) {
        grid.invalidateRows(args.rows);
        grid.render();
        if (this._dataViewRowsObserver) {
            this._dataViewRowsObserver.next(e);
        }
    };
    TreeGridEventsService.prototype.onGridCellClick = function (e, args, dataView, events) {
        var node = dataView.getItem(args.row), cssClass = this._parseTargetClass(e);
        if (cssClass) {
            switch (cssClass) {
                case 'expanded':
                    {
                        if (node) {
                            this._nodeService.updateNode(node, node.selected, false);
                        }
                    }
                    break;
                case 'collapsed':
                    {
                        if (node) {
                            this._nodeService.updateNode(node, node.selected, true);
                        }
                    }
                    break;
                case 'child-selected':
                    {
                        if (node) {
                            this._nodeService.updateNode(node, false);
                        }
                    }
                    break;
                case 'selected':
                    {
                        if (node) {
                            this._nodeService.updateNode(node, false, false);
                            this._nodeService.updateNodeChildren(node, false);
                        }
                    }
                    break;
                case 'unselected':
                    {
                        if (node) {
                            this._nodeService.updateNode(node, true, true);
                            if (node.bubbleSelect) {
                                this.bubbleSelect(node, events);
                            }
                        }
                    }
                    break;
                case 'child-unselected':
                    {
                        if (node) {
                            this._nodeService.updateNode(node, true);
                        }
                    }
                    break;
                case 'request-children':
                    {
                        if (node) {
                            this.requestChildren(node, events);
                        }
                    }
                    break;
                case 'select-children':
                    {
                        if (node) {
                            this._nodeService.updateNodeChildren(node, true);
                        }
                    }
                    break;
                case 'unselect-children':
                    {
                        if (node) {
                            this._nodeService.updateNodeChildren(node, false);
                        }
                    }
                    break;
            }
        }
    };
    TreeGridEventsService.prototype.requestChildren = function (node, events) {
        events.emit({
            type: __WEBPACK_IMPORTED_MODULE_3__enums_index__["b" /* TreeGridEvents */].nodeRequest,
            data: [node]
        });
    };
    TreeGridEventsService.prototype.bubbleSelect = function (node, events) {
        events.emit({
            type: __WEBPACK_IMPORTED_MODULE_3__enums_index__["b" /* TreeGridEvents */].selectBubble,
            data: node
        });
    };
    TreeGridEventsService.prototype._parseTargetClass = function (e) {
        var srcElement = e && e.target ? e.target : null, cssClassAttributeValue = srcElement ? srcElement.getAttribute('class') : null, cssClasses = cssClassAttributeValue ? cssClassAttributeValue.split(' ') : null;
        return cssClasses && cssClasses.length ? cssClasses.pop() : null;
    };
    return TreeGridEventsService;
}());
TreeGridEventsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__tree_grid_node_service__["a" /* TreeGridNodeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__tree_grid_node_service__["a" /* TreeGridNodeService */]) === "function" && _a || Object])
], TreeGridEventsService);

var _a;
//# sourceMappingURL=tree-grid-events.service.js.map

/***/ }),

/***/ 129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeGridResizeService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TreeGridResizeService = (function () {
    function TreeGridResizeService() {
    }
    TreeGridResizeService.prototype.init = function (element, grid, table) {
        var _this = this;
        if (element && grid && table) {
            this.resize(grid, table);
            if (ResizeSensor) {
                this._resizeSensor = new ResizeSensor(element, function () {
                    _this.resize(grid, table);
                });
            }
        }
    };
    TreeGridResizeService.prototype.resize = function (grid, table) {
        var _this = this;
        if (this._resizeTimeout) {
            clearTimeout(this._resizeTimeout);
        }
        this._resizeTimeout = setTimeout(function () {
            if (grid) {
                grid.resizeCanvas();
                var columns = grid.getColumns();
                _this._stretchColumns(columns, table);
                grid.setColumns(columns);
                columns = null;
            }
        }, 132);
    };
    TreeGridResizeService.prototype._stretchColumns = function (columns, table) {
        var totalWidth = this._calculateTotalWidth(columns);
        var panelWidth = table.offsetWidth - 18;
        if (totalWidth < panelWidth) {
            var addition_1 = (panelWidth - totalWidth) / columns.length;
            var padding_1 = 0;
            columns.forEach(function (column) {
                column.width += addition_1 + padding_1;
                padding_1 = 0;
            });
        }
    };
    TreeGridResizeService.prototype._calculateTotalWidth = function (columns) {
        var width = 0;
        columns.forEach(function (column) {
            width += column.width;
        });
        return width;
    };
    return TreeGridResizeService;
}());
TreeGridResizeService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])()
], TreeGridResizeService);

//# sourceMappingURL=tree-grid-resize.service.js.map

/***/ }),

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_index__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_index__ = __webpack_require__(54);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentComponent; });
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



var ContentComponent = (function (_super) {
    __extends(ContentComponent, _super);
    function ContentComponent(_stateService) {
        var _this = _super.call(this) || this;
        _this._stateService = _stateService;
        _this.emptyJson = 'No nodes selected.';
        _this.json = _this.emptyJson;
        _this.subscriptions.push(_stateService.selectedNodesChange$
            .subscribe(function (nodes) { return _this.onSelectedNodesChange(nodes); }));
        return _this;
    }
    ContentComponent.prototype.onSelectedNodesChange = function (nodes) {
        if (nodes && nodes.length) {
            this.json = JSON.stringify(nodes);
        }
        else {
            this.json = this.emptyJson;
        }
    };
    ContentComponent.prototype.onShowSelectedClick = function () {
        this._stateService.updateTreeGrid(__WEBPACK_IMPORTED_MODULE_2__components_index__["TreeGridCmds"].ShowSelected);
    };
    ContentComponent.prototype.onClearSelectedClick = function () {
        this._stateService.updateTreeGrid(__WEBPACK_IMPORTED_MODULE_2__components_index__["TreeGridCmds"].ClearSelected);
    };
    ContentComponent.prototype.onExpandAllClick = function () {
        this._stateService.updateTreeGrid(__WEBPACK_IMPORTED_MODULE_2__components_index__["TreeGridCmds"].ExpandAll);
    };
    ContentComponent.prototype.onCollapseAllClick = function () {
        this._stateService.updateTreeGrid(__WEBPACK_IMPORTED_MODULE_2__components_index__["TreeGridCmds"].CollapseAll);
    };
    ContentComponent.prototype.onSelectAllClick = function () {
        this._stateService.updateTreeGrid(__WEBPACK_IMPORTED_MODULE_2__components_index__["TreeGridCmds"].SelectAll);
    };
    ContentComponent.prototype.onShowAllClick = function () {
        this._stateService.updateTreeGrid(__WEBPACK_IMPORTED_MODULE_2__components_index__["TreeGridCmds"].ShowAll);
    };
    return ContentComponent;
}(__WEBPACK_IMPORTED_MODULE_2__components_index__["Subscriptions"]));
ContentComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'content',
        template: __webpack_require__(221),
        styles: [__webpack_require__(194)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_index__["b" /* StateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_index__["b" /* StateService */]) === "function" && _a || Object])
], ContentComponent);

var _a;
//# sourceMappingURL=content.component.js.map

/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_share__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_share__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DataService = (function () {
    function DataService() {
        var _this = this;
        this._json = {
            data: []
        };
        this.responseChange$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) { return _this._responseObserver = observer; }).share();
        this.errorChange$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) { return _this._errorObserver = observer; }).share();
        this.request('assets/json/big-data.json');
    }
    Object.defineProperty(DataService.prototype, "response", {
        get: function () {
            return this._response;
        },
        set: function (resp) {
            this._response = resp;
            if (this._responseObserver) {
                this._responseObserver.next(resp);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataService.prototype, "error", {
        get: function () {
            return this._error;
        },
        set: function (err) {
            this._error = err;
            if (this._errorObserver) {
                this._errorObserver.next(err);
            }
        },
        enumerable: true,
        configurable: true
    });
    DataService.prototype.request = function (url) {
        var self = this, req = new XMLHttpRequest(), data;
        req.open('GET', url);
        req.onload = function () {
            if (req.status == 200) {
                window.setTimeout(function () {
                    data = req.responseText.trimLeft().trimRight();
                    self._json.data = JSON.parse(data);
                    self.response = self._json;
                }, 1000);
            }
            else {
                self.error = req.statusText;
            }
        };
        req.onerror = function () {
            self.error = "Unknown Error";
        };
        req.send();
    };
    return DataService;
}());
DataService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], DataService);

//# sourceMappingURL=data.service.js.map

/***/ }),

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_share__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_share__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_immutable__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_immutable__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StateService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var StateService = (function () {
    function StateService() {
        var _this = this;
        this._selectedNodes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_immutable__["List"])([]);
        this.selectedNodesChange$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) { return _this._selectedNodesObserver = observer; }).share();
        this.treeGridCommandChange$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) { return _this._treeGridCommandObserver = observer; }).share();
    }
    Object.defineProperty(StateService.prototype, "selectedNodes", {
        get: function () {
            return this._selectedNodes.toArray();
        },
        set: function (value) {
            var list = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_immutable__["List"])(value);
            if (!this._selectedNodes.equals(list)) {
                this._selectedNodes = list;
                if (this._selectedNodesObserver) {
                    this._selectedNodesObserver.next(value);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    StateService.prototype.updateTreeGrid = function (cmd) {
        if (this._treeGridCommandObserver) {
            this._treeGridCommandObserver.next(cmd);
        }
    };
    return StateService;
}());
StateService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], StateService);

//# sourceMappingURL=state.service.js.map

/***/ }),

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_index__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_index__ = __webpack_require__(34);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidebarComponent; });
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



var SidebarComponent = (function (_super) {
    __extends(SidebarComponent, _super);
    function SidebarComponent(_dataService, _stateService) {
        var _this = _super.call(this) || this;
        _this._dataService = _dataService;
        _this._stateService = _stateService;
        _this.options = {
            nodes: [],
            cmd: null
        };
        _this.subscriptions.push(_dataService.responseChange$
            .subscribe(function (data) { return _this.dataLoaded(data); }));
        _this.subscriptions.push(_stateService.treeGridCommandChange$
            .subscribe(function (cmd) { return _this.onTreeCmd(cmd); }));
        return _this;
    }
    SidebarComponent.prototype.dataLoaded = function (data) {
        this.options = {
            nodes: data.data.children,
            height: $(this.el.nativeElement).height()
        };
    };
    SidebarComponent.prototype.onGridEvent = function (args) {
        if (args.type === 2) {
            this._stateService.selectedNodes = args.data;
        }
    };
    SidebarComponent.prototype.onTreeCmd = function (cmd) {
        this.options.macro = cmd;
    };
    return SidebarComponent;
}(__WEBPACK_IMPORTED_MODULE_1__components_index__["Subscriptions"]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* ViewChild */])('sidebarEl'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* ElementRef */]) === "function" && _a || Object)
], SidebarComponent.prototype, "el", void 0);
SidebarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'sidebar',
        template: __webpack_require__(222),
        styles: [__webpack_require__(195)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_index__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_index__["a" /* DataService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__shared_index__["b" /* StateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_index__["b" /* StateService */]) === "function" && _c || Object])
], SidebarComponent);

var _a, _b, _c;
//# sourceMappingURL=sidebar.component.js.map

/***/ }),

/***/ 134:
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

/***/ 192:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, "\n.wrapper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row nowrap;\n          flex-flow: row nowrap;\n  font-weight: bold;\n  text-align: left;\n}\n\n.wrapper > * {\n  padding: 0rem;\n  -webkit-box-flex: 1;\n      -ms-flex: 1 calc(98vh);\n          flex: 1 calc(98vh);\n}\n\n.north {\n  background: tomato;\n}\n\n.south {\n  background: lightgreen;\n}\n\n.main {\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: column nowrap;\n          flex-flow: column nowrap;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n}\n\n.main > * {\n  padding: 0rem;\n  -webkit-box-flex: 1;\n      -ms-flex: 1 100%;\n          flex: 1 100%;\n  height: calc(97vh);\n  overflow: hidden;\n}\n\n.west {\n  padding: 0px;\n  min-width: 333px;\n  max-width: calc(20vw);\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  text-align: left;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: column nowrap;\n          flex-flow: column nowrap;\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.west > * {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 100%;\n          flex: 1 100%;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n@media all and (min-width: 37.5rem) {\n  .west {\n    -webkit-box-flex: 1;\n        -ms-flex: 1 auto;\n            flex: 1 auto;\n  }\n\n}\n\n@media all and (min-width: 50rem) {\n  .main {\n    -webkit-box-flex: 5;\n        -ms-flex: 5 0rem;\n            flex: 5 0rem;\n  }\n\n  .west {\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1;\n  }\n\n  .main {\n    -webkit-box-ordinal-group: 5;\n        -ms-flex-order: 4;\n            order: 4;\n  }\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, "\n.tree-grid-container {\n  width: 100%;\n  height: 100%;\n}\n\n.tree-grid-container .ui-widget {\n  width: 100%;\n  height: 100%;\n}\n\n.tree-grid-container .mdi {\n  vertical-align: middle;\n  cursor: pointer !important;\n}\n\n.tree-grid-container .slick-viewport {\n  background: white;\n  border: none;\n}\n\n.tree-grid-container .slick-pane.slick-pane-header.slick-pane-left {\n  display: none;\n}\n\n\n.tree-grid-container .fs-8\n{\n  font-size: .7rem;\n  line-height: 1.4;\n  vertical-align: middle;\n}\n\n.tree-grid-container .fs-11\n{\n  font-size: 14.4px;\n  line-height: 1.4;\n}\n\n.tree-grid-container .text-pull-right {\n  font-size: inherit;\n  line-height: inherit;\n  vertical-align: text-bottom;\n  padding-top: .2rem;\n}\n\n.tree-grid-container .slick-header-column .fa,\n.tree-grid-container .slick-group-toggle {\n  vertical-align: middle;\n  font: normal normal normal 20px/1 'Material Design Icons';\n  text-rendering: auto;\n  font-size: 1.1rem;\n  line-height: 1.4;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n\n.tree-grid-container .slick-group-toggle.expanded:before {\n  content: \"\\F143\";\n}\n\n.tree-grid-container .slick-group-toggle.childless:before {\n  content: \"\\F143\";\n  color: white;\n  cursor: none;\n}\n\n.tree-grid-container .slick-group-toggle.unselected:before {\n  content: \"\\F131\";\n}\n\n.tree-grid-container .slick-group-toggle.selected:before {\n  content: \"\\F132\";\n}\n\n.tree-grid-container .slick-group-toggle.collapsed:before {\n  content: \"\\F140\";\n}\n\n.tree-grid-container .slick-group-toggle.request-children:before\n{\n  content: \"\\F415\";\n}\n\n.tree-grid-container .slick-group-toggle.select-children:before\n{\n  content: \"\\F63C\";\n}\n\n.tree-grid-container .slick-group-toggle.unselect-children:before\n{\n  content: \"\\F63E\";\n}\n\n.slick-group-toggle.child-selected:before {\n  content: \"\\F132\";\n}\n\n.slick-group-toggle.child-unselected:before {\n  content: \"\\F131\";\n}\n\n.tree-grid-container .slick-header-column {\n  display: none;\n  float: none;\n  position: absolute;\n}\n\n\n.tree-grid-container .slick-row.even,\n.tree-grid-container .slick-row.odd {\n  border-bottom: 1px solid #DDD;\n}\n\n.tree-grid-container .slick-group.odd,\n.tree-grid-container .slick-group.even {\n  border-bottom: 1px solid #DDD;\n}\n\n.tree-grid-container .slick-group .slick-cell {\n  text-align: left;\n  cursor: pointer !important;\n}\n\n.tree-grid-container .slick-cell {\n  border: none;\n  line-height: 20px;\n\n}\n\n.tree-grid-container .slick-cell .slick-group-toggle {\n  cursor: pointer;\n}\n\n.tree-grid-container .slick-cell .bg {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n\n.tree-grid-container .slick-cell .red-bg {\n  background: #d9534f;\n  color: white;\n}\n\n.tree-grid-container .slick-cell .green-bg {\n  background: #8ce196;\n  color: white;\n}\n\n.tree-grid-container input[type=\"checkbox\"] {\n  margin: 2px 0 0 0;\n  cursor: pointer !important;\n}\n\n.tree-grid-container .slick-header-column input[type=\"checkbox\"] {\n  margin-top: 7px;\n}\n\n.tree-grid-container .slick-cell-checkboxsel {\n  text-align: center;\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, ".content-component {\n  padding: .3rem;\n  background-color: white;\n  border: 1px solid gainsboro;\n  color: white;\n  height: 100%;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 195:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, ".navbar .navbar-default {\n  padding-bottom: 0px;\n\n}\n\n.sidebar-component {\n  width: 333px;\n  padding: 0;\n  margin: 0;\n  height: calc(100vh);\n}\n\n.sidebar-component .btn .btn-primary {\n  margin-right: 1.25rem;\n  float: right;\n}\n\n.sidebar-component p {\n  padding: 1.25rem;\n}\n\n.sidebar-component .tree-grid-loader {\n  padding-left: 20px;\n  background: url(" + __webpack_require__(270) + ") no-repeat center left;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 218:
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\n  <div class=\"west\">\n    <sidebar></sidebar>\n  </div>\n  <div class=\"main\">\n    <content></content>\n  </div>\n</div>\n"

/***/ }),

/***/ 219:
/***/ (function(module, exports) {

module.exports = "<div class=\"input-group\">\n  <input type=\"text\"\n         class=\"form-control\"\n         placeholder=\"Enter Search Criteria\"\n         [formControl]=\"filterControl\">\n      <span class=\"input-group-btn\">\n          <button class=\"btn btn-default\"\n                  type=\"button\"\n                  (click)=\"onClearClick()\"\n                  title=\"Clear text\">\n            <i class=\"mdi mdi-close\"></i>\n          </button>\n      </span>\n</div>\n"

/***/ }),

/***/ 220:
/***/ (function(module, exports) {

module.exports = "<div [ngStyle]=\"{'height': !isDataValid ? height + 'px' : '0px'}\"\n     (window:resize)=\"onWindowResize()\">\n\n  <div class=\"list-group-item border-bottom\">\n    <search-bar [filter]=\"filter\"\n                    (changed)=\"onFilterChanged($event)\">\n    </search-bar>\n  </div>\n  <div #containerEl>\n    <div #gridEl>\n    </div>\n  </div>\n</div>\n\n"

/***/ }),

/***/ 221:
/***/ (function(module, exports) {

module.exports = "<div class=\"content-component\">\n  <nav class=\"navbar\">\n    <ul class=\"nav navbar-nav\">\n      <li>\n        <button (click)=\"onClearSelectedClick()\" class=\"btn btn-default\" title=\"clear selected\"><i class=\"mdi mdi-notification-clear-all\"></i></button>\n      </li>\n      <li>\n        <button (click)=\"onExpandAllClick()\" class=\"btn btn-default\" title=\"expand all\"><i class=\"mdi mdi-plus\"></i></button>\n      </li>\n      <li>\n        <button (click)=\"onCollapseAllClick()\" class=\"btn btn-default\" title=\"collapse all\"><i class=\"mdi mdi-playlist-minus\"></i></button>\n      </li>\n    </ul>\n  </nav>\n  <code>\n    {{json}}\n  </code>\n</div>\n"

/***/ }),

/***/ 222:
/***/ (function(module, exports) {

module.exports = "\n<div #sidebarEl class=\"sidebar-component\">\n  <tree-grid [options]=\"options\" (events)=\"onGridEvent($event)\">\n    <div class=\"tree-grid-loader\"></div>\n  </tree-grid>\n</div>\n\n"

/***/ }),

/***/ 270:
/***/ (function(module, exports) {

module.exports = "data:image/gif;base64,R0lGODlhEAAQAPQAAP///wAAAPDw8IqKiuDg4EZGRnp6egAAAFhYWCQkJKysrL6+vhQUFJycnAQEBDY2NmhoaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFdyAgAgIJIeWoAkRCCMdBkKtIHIngyMKsErPBYbADpkSCwhDmQCBethRB6Vj4kFCkQPG4IlWDgrNRIwnO4UKBXDufzQvDMaoSDBgFb886MiQadgNABAokfCwzBA8LCg0Egl8jAggGAA1kBIA1BAYzlyILczULC2UhACH5BAkKAAAALAAAAAAQABAAAAV2ICACAmlAZTmOREEIyUEQjLKKxPHADhEvqxlgcGgkGI1DYSVAIAWMx+lwSKkICJ0QsHi9RgKBwnVTiRQQgwF4I4UFDQQEwi6/3YSGWRRmjhEETAJfIgMFCnAKM0KDV4EEEAQLiF18TAYNXDaSe3x6mjidN1s3IQAh+QQJCgAAACwAAAAAEAAQAAAFeCAgAgLZDGU5jgRECEUiCI+yioSDwDJyLKsXoHFQxBSHAoAAFBhqtMJg8DgQBgfrEsJAEAg4YhZIEiwgKtHiMBgtpg3wbUZXGO7kOb1MUKRFMysCChAoggJCIg0GC2aNe4gqQldfL4l/Ag1AXySJgn5LcoE3QXI3IQAh+QQJCgAAACwAAAAAEAAQAAAFdiAgAgLZNGU5joQhCEjxIssqEo8bC9BRjy9Ag7GILQ4QEoE0gBAEBcOpcBA0DoxSK/e8LRIHn+i1cK0IyKdg0VAoljYIg+GgnRrwVS/8IAkICyosBIQpBAMoKy9dImxPhS+GKkFrkX+TigtLlIyKXUF+NjagNiEAIfkECQoAAAAsAAAAABAAEAAABWwgIAICaRhlOY4EIgjH8R7LKhKHGwsMvb4AAy3WODBIBBKCsYA9TjuhDNDKEVSERezQEL0WrhXucRUQGuik7bFlngzqVW9LMl9XWvLdjFaJtDFqZ1cEZUB0dUgvL3dgP4WJZn4jkomWNpSTIyEAIfkECQoAAAAsAAAAABAAEAAABX4gIAICuSxlOY6CIgiD8RrEKgqGOwxwUrMlAoSwIzAGpJpgoSDAGifDY5kopBYDlEpAQBwevxfBtRIUGi8xwWkDNBCIwmC9Vq0aiQQDQuK+VgQPDXV9hCJjBwcFYU5pLwwHXQcMKSmNLQcIAExlbH8JBwttaX0ABAcNbWVbKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICSRBlOY7CIghN8zbEKsKoIjdFzZaEgUBHKChMJtRwcWpAWoWnifm6ESAMhO8lQK0EEAV3rFopIBCEcGwDKAqPh4HUrY4ICHH1dSoTFgcHUiZjBhAJB2AHDykpKAwHAwdzf19KkASIPl9cDgcnDkdtNwiMJCshACH5BAkKAAAALAAAAAAQABAAAAV3ICACAkkQZTmOAiosiyAoxCq+KPxCNVsSMRgBsiClWrLTSWFoIQZHl6pleBh6suxKMIhlvzbAwkBWfFWrBQTxNLq2RG2yhSUkDs2b63AYDAoJXAcFRwADeAkJDX0AQCsEfAQMDAIPBz0rCgcxky0JRWE1AmwpKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICKZzkqJ4nQZxLqZKv4NqNLKK2/Q4Ek4lFXChsg5ypJjs1II3gEDUSRInEGYAw6B6zM4JhrDAtEosVkLUtHA7RHaHAGJQEjsODcEg0FBAFVgkQJQ1pAwcDDw8KcFtSInwJAowCCA6RIwqZAgkPNgVpWndjdyohACH5BAkKAAAALAAAAAAQABAAAAV5ICACAimc5KieLEuUKvm2xAKLqDCfC2GaO9eL0LABWTiBYmA06W6kHgvCqEJiAIJiu3gcvgUsscHUERm+kaCxyxa+zRPk0SgJEgfIvbAdIAQLCAYlCj4DBw0IBQsMCjIqBAcPAooCBg9pKgsJLwUFOhCZKyQDA3YqIQAh+QQJCgAAACwAAAAAEAAQAAAFdSAgAgIpnOSonmxbqiThCrJKEHFbo8JxDDOZYFFb+A41E4H4OhkOipXwBElYITDAckFEOBgMQ3arkMkUBdxIUGZpEb7kaQBRlASPg0FQQHAbEEMGDSVEAA1QBhAED1E0NgwFAooCDWljaQIQCE5qMHcNhCkjIQAh+QQJCgAAACwAAAAAEAAQAAAFeSAgAgIpnOSoLgxxvqgKLEcCC65KEAByKK8cSpA4DAiHQ/DkKhGKh4ZCtCyZGo6F6iYYPAqFgYy02xkSaLEMV34tELyRYNEsCQyHlvWkGCzsPgMCEAY7Cg04Uk48LAsDhRA8MVQPEF0GAgqYYwSRlycNcWskCkApIyEAOwAAAAAAAAAAAA=="

/***/ }),

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(91);


/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tree_grid_events_enum__ = __webpack_require__(123);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__tree_grid_events_enum__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tree_grid_cmds_enum__ = __webpack_require__(122);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__tree_grid_cmds_enum__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data_service__ = __webpack_require__(131);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__data_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state_service__ = __webpack_require__(132);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__state_service__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tree_grid_index__ = __webpack_require__(124);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__tree_grid_index__, "TreeGridCmds")) __webpack_require__.d(__webpack_exports__, "TreeGridCmds", function() { return __WEBPACK_IMPORTED_MODULE_0__tree_grid_index__["TreeGridCmds"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__tree_grid_index__, "Subscriptions")) __webpack_require__.d(__webpack_exports__, "Subscriptions", function() { return __WEBPACK_IMPORTED_MODULE_0__tree_grid_index__["Subscriptions"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_index__ = __webpack_require__(55);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "Subscriptions", function() { return __WEBPACK_IMPORTED_MODULE_1__shared_index__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__subscriptions__ = __webpack_require__(56);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__subscriptions__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 56:
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

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tree_grid_node_interface__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tree_grid_node_interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__tree_grid_node_interface__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__tree_grid_node_interface__, "Subscriptions")) __webpack_require__.d(__webpack_exports__, "Subscriptions", function() { return __WEBPACK_IMPORTED_MODULE_0__tree_grid_node_interface__["Subscriptions"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__tree_grid_node_interface__, "TreeGridInterface")) __webpack_require__.d(__webpack_exports__, "TreeGridInterface", function() { return __WEBPACK_IMPORTED_MODULE_0__tree_grid_node_interface__["TreeGridInterface"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tree_grid_interface__ = __webpack_require__(127);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__tree_grid_interface__, "Subscriptions")) __webpack_require__.d(__webpack_exports__, "Subscriptions", function() { return __WEBPACK_IMPORTED_MODULE_1__tree_grid_interface__["Subscriptions"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__tree_grid_interface__, "TreeGridInterface")) __webpack_require__.d(__webpack_exports__, "TreeGridInterface", function() { return __WEBPACK_IMPORTED_MODULE_1__tree_grid_interface__["TreeGridInterface"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tree_grid_event_interface__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tree_grid_event_interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__tree_grid_event_interface__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2__tree_grid_event_interface__, "Subscriptions")) __webpack_require__.d(__webpack_exports__, "Subscriptions", function() { return __WEBPACK_IMPORTED_MODULE_2__tree_grid_event_interface__["Subscriptions"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2__tree_grid_event_interface__, "TreeGridInterface")) __webpack_require__.d(__webpack_exports__, "TreeGridInterface", function() { return __WEBPACK_IMPORTED_MODULE_2__tree_grid_event_interface__["TreeGridInterface"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tree_grid_events_service__ = __webpack_require__(128);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__tree_grid_events_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tree_grid_resize_service__ = __webpack_require__(129);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__tree_grid_resize_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tree_grid_node_service__ = __webpack_require__(59);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__tree_grid_node_service__["a"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_shared_utils__ = __webpack_require__(121);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeGridNodeService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TreeGridNodeService = (function () {
    function TreeGridNodeService() {
        var _this = this;
        this.nodes = [];
        this.schema = [
            {
                id: 'title', field: 'title', index: 0,
                formatter: function (node, cell, value, columnDef, data) { return _this.formatNode(node, cell, value, columnDef, data); },
                width: 200
            }
        ];
        this.collapsedNodeGuids = [];
        this.childlessNodeGuids = [];
        this._selectedNodeGuids = '[]';
        this._keywords = ['is'];
        this.dataView = null;
        this.selectedNodesChange$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) { return _this._selectedNodesObserver = observer; }).share();
    }
    Object.defineProperty(TreeGridNodeService.prototype, "selectedNodeGuids", {
        get: function () {
            return JSON.parse(this._selectedNodeGuids);
        },
        set: function (value) {
            var _this = this;
            var list = JSON.stringify(value);
            if (this._selectedNodeGuids !== list) {
                this._selectedNodeGuids = list;
                setTimeout(function () {
                    _this._updateSelectedNodes();
                }, 66);
            }
        },
        enumerable: true,
        configurable: true
    });
    TreeGridNodeService.prototype.transform = function (nodes) {
        var _this = this;
        var flatNodes = [], ids = {}, treeGridNodes;
        this._selectedNodeGuids = '[]';
        this.collapsedNodeGuids = [];
        nodes.forEach(function (node) {
            flatNodes = _this._flattenNodes(node, flatNodes, -1, 0, true);
        });
        treeGridNodes = flatNodes.map(function (node, index) {
            node = Object.assign({}, node);
            node.order = index;
            ids[node.order] = true;
            return node;
        });
        this._initSelectedNodeGuids(treeGridNodes);
        return treeGridNodes;
    };
    TreeGridNodeService.prototype.append = function (nodeId, children) {
        var _this = this;
        var top = this.nodes.filter(function (node) {
            return node.order < nodeId;
        }), bottom = this.nodes.filter(function (node) {
            return node.order > nodeId;
        }), childNodes = [], index = nodeId + 1, parentNode = this.dataView ? this.dataView.getItemById(nodeId) : this._findNodeByOrderId(nodeId), parentGuid = parentNode ? parentNode.guid : null;
        if (parentNode) {
            if (children && children.length) {
                children.forEach(function (child, childIndex) {
                    childNodes.push(_this._generateTreeGridNode(child, childIndex, nodeId, 1, parentGuid));
                    index++;
                });
                parentNode.children = childNodes;
                parentNode.expanded = true;
            }
            else {
                parentNode.barren = true;
            }
            top.push(parentNode);
            top = top.concat(childNodes);
            bottom.forEach(function (currentNode) {
                currentNode.order = index;
                top.push(Object.assign({}, currentNode));
                index++;
            });
            this.nodes = top;
            if (this.dataView) {
                this.dataView.setItems(this.nodes, 'order');
                this.dataView.updateItem(parentNode.order, parentNode);
                this.dataView.refresh();
            }
            return parentNode;
        }
        return null;
    };
    TreeGridNodeService.prototype.expandAll = function () {
        var _this = this;
        var collapsedGuids = this.collapsedNodeGuids;
        if (collapsedGuids && collapsedGuids.length) {
            collapsedGuids.forEach(function (guid) {
                var node = _this._findNodeByGuid(guid);
                if (node) {
                    node.expanded = true;
                    if (_this.dataView) {
                        _this.dataView.updateItem(node.order, node);
                    }
                }
            });
        }
        this.collapsedNodeGuids = [];
        if (this.dataView) {
            this.dataView.refresh();
        }
    };
    TreeGridNodeService.prototype.collapseAll = function () {
        var _this = this;
        var collapsedNodes = [];
        this.nodes.forEach(function (node) {
            var dataNode = _this.dataView ? _this.dataView.getItemById(node.order) : _this._findNodeByOrderId(node.order);
            if (dataNode && dataNode.children && dataNode.children.length > 0) {
                if (!collapsedNodes[node.order]) {
                    collapsedNodes.push(node.order);
                }
                dataNode.expanded = false;
                if (_this.dataView) {
                    _this.dataView.updateItem(node.order, dataNode);
                }
            }
        });
        this.collapsedNodeGuids = collapsedNodes;
        if (this.dataView) {
            this.dataView.refresh();
        }
    };
    TreeGridNodeService.prototype.selectAll = function () {
        var _this = this;
        var selectedNodeGuids = [];
        this.nodes.forEach(function (node) {
            var dataNode = _this.dataView ? _this.dataView.getItemById(node.order) : _this._findNodeByOrderId(node.order);
            if (dataNode) {
                if (selectedNodeGuids.indexOf(dataNode.guid) === -1) {
                    selectedNodeGuids.push(node.guid);
                }
                dataNode.selected = true;
                if (_this.dataView) {
                    _this.dataView.updateItem(node.order, dataNode);
                }
            }
        });
        this.selectedNodeGuids = selectedNodeGuids;
        if (this.dataView) {
            this.dataView.refresh();
        }
    };
    TreeGridNodeService.prototype.deselectAll = function () {
        var _this = this;
        var guids = this.selectedNodeGuids;
        if (guids.length) {
            guids.forEach(function (guid) {
                var node = _this._findNodeByGuid(guid);
                if (node) {
                    node.selected = false;
                    if (node.hasOwnProperty('children') && node.children.length > 0) {
                        node.expanded = false;
                        node.children.forEach(function (child) {
                            var childNode = _this.dataView ? _this.dataView.getItemById(child.order) :
                                _this._findNodeByOrderId(child.order);
                            if (childNode) {
                                childNode.selected = false;
                                if (_this.dataView) {
                                    _this.dataView.updateItem(childNode.order, childNode);
                                }
                            }
                        });
                    }
                    if (_this.dataView) {
                        _this.dataView.updateItem(node.order, node);
                    }
                }
            });
            this.selectedNodeGuids = [];
            if (this.dataView) {
                this.dataView.refresh();
            }
        }
    };
    TreeGridNodeService.prototype.isSiblingSelected = function (node, skipGuid) {
        var _this = this;
        var selectedChildren = node.children && node.children.length > 0 ?
            node.children.filter(function (child) {
                var childRow = _this.dataView ? _this.dataView.getItemById(child.order) : _this._findNodeByOrderId(child.order);
                return childRow && childRow.guid !== skipGuid && childRow.selected;
            }) : null;
        return selectedChildren && selectedChildren.length ? true : false;
    };
    TreeGridNodeService.prototype.filter = function (node, value) {
        return this._valueFilter(node, value);
    };
    TreeGridNodeService.prototype.formatNode = function (node, cell, value, columnDef, data) {
        var indent = '<span style="display:inline-block;height:1px;width:'
            + (25 * data.indent || 0) + 'px"></span>', childIndent = '<span style="display:inline-block;height:1px;width:'
            + (15 * data.indent || 0) + 'px"></span>';
        if (this.childlessNodeGuids.indexOf(data.guid) !== -1) {
            return this._formatChildlessNode(value, data);
        }
        if (data.children && data.children.length > 0) {
            if (data.expanded === true) {
                return indent + this._formatExpandedNode(value, data, 'fs-11');
            }
            else {
                return indent + this._formatCollapsedNode(value, data, 'fs-11');
            }
        }
        else {
            return indent + childIndent + this._formatChildNode(value, data, 'fs-8');
        }
    };
    TreeGridNodeService.prototype.updateNode = function (node, selected, expanded, isChild) {
        var _this = this;
        if (expanded === void 0) { expanded = false; }
        if (isChild === void 0) { isChild = false; }
        var selectedNodeGuids = this.selectedNodeGuids, parentNode = null;
        if (node && node.hasOwnProperty('order')) {
            selectedNodeGuids = this._selectNode(selectedNodeGuids, node, selected);
            if (!isChild && node.hasOwnProperty('children') && node.children.length > 0) {
                if (selected !== node.selected) {
                    if (selected) {
                        node.expanded = true;
                    }
                    else {
                        node.expanded = false;
                    }
                }
                else {
                    node.expanded = expanded;
                }
                var index = this.collapsedNodeGuids.indexOf(node.guid);
                if (expanded && index !== -1) {
                    this.collapsedNodeGuids.splice(index, 1);
                }
                else if (!expanded && index === -1) {
                    this.collapsedNodeGuids.push(node.guid);
                }
                if (!node.bubbleSelect && node.selectable) {
                    node.children.forEach(function (child) {
                        if (child.hasOwnProperty('order')) {
                            var childRow = _this.dataView ? _this.dataView.getItemById(child.order) :
                                _this._findNodeByOrderId(child.order);
                            if (childRow) {
                                childRow.selected = selected;
                                selectedNodeGuids = _this._selectNode(selectedNodeGuids, childRow, selected);
                                if (_this.dataView) {
                                    _this.dataView.updateItem(childRow.order, childRow);
                                }
                            }
                        }
                    });
                }
            }
            if (node.hasOwnProperty('selectable') && node.selectable) {
                node.selected = selected;
            }
            if (node.parentGuid !== null) {
                parentNode = this._findNodeByGuid(node.parentGuid);
                if (parentNode && parentNode.selectable) {
                    if (selected) {
                        parentNode.selected = true;
                    }
                    else {
                        if (this.isSiblingSelected(parentNode, node.guid)) {
                            parentNode.selected = true;
                        }
                        else {
                            parentNode.selected = false;
                        }
                    }
                    selectedNodeGuids = this._selectNode(selectedNodeGuids, parentNode, parentNode.selected);
                    if (this.dataView) {
                        this.dataView.updateItem(parentNode.order, parentNode);
                    }
                }
            }
            this.selectedNodeGuids = selectedNodeGuids;
            if (this.dataView) {
                this.dataView.updateItem(node.order, node);
            }
            if (parentNode) {
                return this.updateNode(parentNode, parentNode.selected, parentNode.expanded, true);
            }
        }
        return true;
    };
    TreeGridNodeService.prototype.updateNodeChildren = function (node, selected) {
        var _this = this;
        if (node) {
            if (node.children && node.children.length) {
                node.children.forEach(function (child) {
                    _this.updateNode(child, selected);
                });
            }
            if (selected && !node.expanded) {
                node.expanded = true;
                if (this.dataView) {
                    this.dataView.updateItem(node.order, node);
                }
            }
            else if (!selected && node.expanded) {
                node.expanded = false;
                if (this.dataView) {
                    this.dataView.updateItem(node.order, node);
                }
            }
        }
        return true;
    };
    TreeGridNodeService.prototype._findNodeByGuid = function (guid) {
        var filteredNodes = guid !== null ? this.nodes.filter(function (node) {
            return node.guid === guid ? true : false;
        }) : null;
        if (filteredNodes && filteredNodes.length) {
            return filteredNodes.pop();
        }
        return null;
    };
    TreeGridNodeService.prototype._findNodeByOrderId = function (orderId) {
        var filteredNodes = orderId !== null ? this.nodes.filter(function (node) {
            return node.order === orderId ? true : false;
        }) : null;
        if (filteredNodes && filteredNodes.length) {
            return filteredNodes.pop();
        }
        return null;
    };
    TreeGridNodeService.prototype._formatExpandedNode = function (value, data, clsWrap) {
        if (clsWrap === void 0) { clsWrap = null; }
        if (data.selectable) {
            if (data.selected === true) {
                value = '<span class="slick-group-toggle tree-toggle expanded"></span>' +
                    '<span class="slick-group-toggle tree-toggle selected"></span>&nbsp;' + value;
            }
            else {
                value = '<span class="slick-group-toggle tree-toggle expanded"></span>' +
                    '<span class="slick-group-toggle tree-toggle unselected"></span>&nbsp;' + value;
            }
        }
        else {
            value = '<span class="slick-group-toggle expanded"></span>&nbsp;' + value;
        }
        if (clsWrap) {
            value = '<span class="' + clsWrap + '">' + value + '</span>';
        }
        return value;
    };
    TreeGridNodeService.prototype._formatChildlessNode = function (value, data) {
        var indent = '<span style="display:inline-block;height:1px;width: 15px;"></span>', formattedValue = value;
        if (data.children && data.children.length > 0) {
            if (data.expanded) {
                formattedValue = indent + this._formatExpandedNode(value, data);
            }
            else {
                formattedValue = indent + this._formatCollapsedNode(value, data);
            }
            if (this._isChildSelected(data)) {
                formattedValue += '<a class="pull-right see-more un-select-all">' +
                    '<i class="slick-group-toggle tree-toggle unselect-children"></i>&nbsp;</a>';
            }
            else {
                formattedValue += '<a class="pull-right see-more select-all">' +
                    '<i class="slick-group-toggle tree-toggle select-children"></i>&nbsp;</a>';
            }
        }
        else if (data.barren) {
            formattedValue = indent + '<span class="slick-group-toggle tree-toggle childless"></span>' +
                this._formatChildNode(value, data);
        }
        else {
            formattedValue = indent + '<span class="slick-group-toggle tree-toggle childless"></span>' +
                this._formatChildNode(value, data);
            formattedValue += '<a class="pull-right see-more un-select-all">' +
                '<i class="slick-group-toggle tree-toggle request-children"></i>&nbsp;</a>';
        }
        formattedValue = '<span class="fs-8">' + formattedValue + '</span>';
        return formattedValue;
    };
    TreeGridNodeService.prototype._formatCollapsedNode = function (value, data, clsWrap) {
        if (clsWrap === void 0) { clsWrap = null; }
        if (data.selectable) {
            if (data.selected === true) {
                value = '<span class="slick-group-toggle tree-toggle collapsed"></span>' +
                    '<span class="slick-group-toggle tree-toggle selected"></span>&nbsp;' + value;
            }
            else {
                value = '<span class="slick-group-toggle tree-toggle collapsed"></span>' +
                    '<span class="slick-group-toggle tree-toggle unselected"></span>&nbsp;' + value;
            }
        }
        else {
            value = '<span class="fs-11 slick-group-toggle collapsed"></span>&nbsp;' + value;
        }
        if (clsWrap) {
            value = '<span class="' + clsWrap + '">' + value + '</span>';
        }
        return value;
    };
    TreeGridNodeService.prototype._formatChildNode = function (value, data, clsWrap) {
        if (clsWrap === void 0) { clsWrap = null; }
        if (data.selectable) {
            if (data.selected === true) {
                value = '<span class=" slick-group-toggle child-selected"></span>&nbsp;' + value;
            }
            else {
                value = '<span class="slick-group-toggle child-unselected"></span>&nbsp;' + value;
            }
        }
        if (clsWrap) {
            value = '<span class="' + clsWrap + '">' + value + '</span>';
        }
        return value;
    };
    TreeGridNodeService.prototype._initSelectedNodeGuids = function (nodes) {
        var selectedGridNodes = nodes.filter(function (treeGridNode) {
            return treeGridNode.selectable && treeGridNode.selected ? true : false;
        });
        if (selectedGridNodes && selectedGridNodes.length) {
            this.selectedNodeGuids = selectedGridNodes.map(function (treeGridNode) {
                return treeGridNode.guid;
            });
        }
    };
    TreeGridNodeService.prototype._isChildSelected = function (node) {
        var selectedChildren = node.hasOwnProperty('children') && node.children.length ?
            node.children.filter(function (child) {
                return child.selected;
            }) : null;
        if (selectedChildren && selectedChildren.length > 0) {
            return true;
        }
        return false;
    };
    TreeGridNodeService.prototype._isValueFilter = function (node, sentence) {
        var words = sentence.split(' is '), field = words && words.length === 2 ? words[0] : null, value = field ? words[1] : null, model = node.hasOwnProperty('model') ? node.model : null, modelField = model && model.hasOwnProperty(field) ? field : null, modelFieldValue = modelField ? String(model[modelField]) : null;
        if (modelFieldValue && value) {
            return modelFieldValue.toLowerCase() === value.toLowerCase() ? true : false;
        }
        return false;
    };
    TreeGridNodeService.prototype._selectNode = function (selectedGuids, node, state) {
        if (node && node.hasOwnProperty('guid')) {
            var filteredGuids = selectedGuids.filter(function (guid) {
                return guid !== node.guid;
            });
            if (state === true) {
                filteredGuids.push(node.guid);
            }
            return filteredGuids;
        }
        return selectedGuids;
    };
    TreeGridNodeService.prototype._expandFilter = function (node) {
        if (node.parentGuid) {
            var parent = this._findNodeByGuid(node.parentGuid);
            while (parent) {
                if (!parent.expanded) {
                    return false;
                }
                parent = this._findNodeByGuid(parent.parentGuid);
            }
        }
        return true;
    };
    TreeGridNodeService.prototype._valueFilter = function (node, value) {
        var selectedGuids = this.selectedNodeGuids;
        if (value) {
            if (this._containsKeyword(value)) {
                return this._queryFilter(node, value);
            }
            if (value.toLowerCase().indexOf('selected') !== -1) {
                if (selectedGuids.indexOf(node.guid) !== -1) {
                    return true;
                }
            }
            if (node['title'].toLowerCase() === value.toLowerCase()) {
                return true;
            }
            if (node['title'].toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                return true;
            }
            return false;
        }
        return this._expandFilter(node);
    };
    TreeGridNodeService.prototype._queryFilter = function (node, value) {
        var _this = this;
        var sentence = value.toLowerCase(), keywords = this._parseKeywords(sentence), rc = false;
        if (keywords && keywords.length) {
            keywords.forEach(function (keyword) {
                switch (keyword.toLowerCase()) {
                    case 'is':
                        rc = _this._isValueFilter(node, value);
                        break;
                }
            });
        }
        return rc ? this._expandFilter(node) : false;
    };
    TreeGridNodeService.prototype._containsKeyword = function (sentence) {
        var _this = this;
        var words = sentence.split(' '), rc = false;
        if (words && words.length) {
            words.forEach(function (word) {
                if (_this._keywords.indexOf(word.toLowerCase()) !== -1) {
                    rc = true;
                }
            });
        }
        return rc;
    };
    TreeGridNodeService.prototype._parseKeywords = function (sentence) {
        var _this = this;
        var words = String(sentence).split(' '), keywords = [];
        if (words && words.length) {
            words.forEach(function (word) {
                if (_this._keywords.indexOf(word.toLowerCase()) !== -1) {
                    keywords.push(word.toLowerCase());
                }
            });
        }
        if (keywords.length) {
            return keywords;
        }
        return null;
    };
    TreeGridNodeService.prototype._flattenNodes = function (node, nodes, parent, indent, root) {
        var _this = this;
        if (root === void 0) { root = false; }
        var rootNode = null;
        if (root) {
            rootNode = this._generateTreeGridNode(node, 0, parent, indent);
            nodes.push(rootNode);
        }
        if (node && node.children && node.children.length > 0) {
            parent = nodes.length - 1;
            indent++;
            if (!node.hasOwnProperty('expanded')) {
                node.expanded = false;
            }
            if (!rootNode && !node.hasOwnProperty('guid')) {
                node.guid = __WEBPACK_IMPORTED_MODULE_2__shared_shared_utils__["a" /* SharedUtils */].guid();
            }
            if (rootNode) {
                rootNode.children.forEach(function (child) {
                    var childNode = Object.assign({}, child);
                    if (childNode.selected) {
                        rootNode.expanded = true;
                    }
                    nodes.push(childNode);
                });
                if (!rootNode.expanded) {
                    this.collapsedNodeGuids.push(node.guid);
                }
            }
            else {
                node.children.forEach(function (child, index) {
                    var childNode = _this._generateTreeGridNode(child, index, parent, indent, node.guid);
                    if (childNode.selected) {
                        node.expanded = true;
                    }
                    nodes.push(childNode);
                    if (child.children && child.children.length > 0) {
                        _this._flattenNodes(child, nodes, parent, indent);
                    }
                });
                if (!node.expanded && this.collapsedNodeGuids.indexOf(node.guid) === -1) {
                    this.collapsedNodeGuids.push(node.guid);
                }
            }
        }
        return nodes;
    };
    TreeGridNodeService.prototype._generateTreeGridNode = function (node, index, parent, indent, guid) {
        var _this = this;
        if (guid === void 0) { guid = null; }
        var treeGridNode = {};
        if (node) {
            if (node.hasOwnProperty('model')) {
                treeGridNode.model = node.model;
            }
            else {
                treeGridNode.model = node;
            }
            treeGridNode.order = index + parent + 1;
            treeGridNode.parent = parent;
            treeGridNode.parentGuid = guid;
            treeGridNode.indent = indent;
            treeGridNode.title = node.title;
            treeGridNode.guid = __WEBPACK_IMPORTED_MODULE_2__shared_shared_utils__["a" /* SharedUtils */].guid();
            if (node.hasOwnProperty('selectable')) {
                treeGridNode.selectable = node.selectable;
            }
            else {
                treeGridNode.selectable = true;
            }
            if (treeGridNode.selectable) {
                if (node.hasOwnProperty('selected')) {
                    treeGridNode.selected = node.selected;
                }
                else {
                    treeGridNode.selected = false;
                }
            }
            if (node.hasOwnProperty('children')) {
                treeGridNode.children = [];
                if (node.hasOwnProperty('expanded')) {
                    treeGridNode.expanded = node.expanded;
                }
                else {
                    treeGridNode.expanded = false;
                }
                if (!treeGridNode.expanded) {
                    if (this.collapsedNodeGuids.indexOf(treeGridNode.guid) === -1) {
                        this.collapsedNodeGuids.push(treeGridNode.guid);
                    }
                }
                if (node.hasOwnProperty('bubbleSelect')) {
                    treeGridNode.bubbleSelect = node.bubbleSelect;
                }
                else {
                    treeGridNode.bubbleSelect = false;
                }
                if (node.children.length === 0 && this.childlessNodeGuids.indexOf(node.guid) === -1) {
                    this.childlessNodeGuids.push(treeGridNode.guid);
                }
                else {
                    treeGridNode.children = node.children.map(function (child, childIndex) {
                        return _this._generateTreeGridNode(child, childIndex, treeGridNode.order, indent + 1, treeGridNode.guid);
                    });
                }
            }
        }
        return treeGridNode;
    };
    TreeGridNodeService.prototype._updateSelectedNodes = function () {
        var selectedNodeGuids = JSON.parse(this._selectedNodeGuids), nodes = this.nodes.filter(function (node) {
            return selectedNodeGuids.indexOf(node.guid) !== -1;
        });
        this.selectedNodes = nodes;
        if (this._selectedNodesObserver) {
            this._selectedNodesObserver.next(nodes);
        }
    };
    return TreeGridNodeService;
}());
TreeGridNodeService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], TreeGridNodeService);

//# sourceMappingURL=tree-grid-node.service.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_subscriptions__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_index__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interfaces_index__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__enums_index__ = __webpack_require__(33);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeGridComponent; });
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





var TreeGridComponent = (function (_super) {
    __extends(TreeGridComponent, _super);
    function TreeGridComponent(_changeDetector, _differs, _resizeService, _eventService, _nodesService) {
        var _this = _super.call(this) || this;
        _this._changeDetector = _changeDetector;
        _this._differs = _differs;
        _this._resizeService = _resizeService;
        _this._eventService = _eventService;
        _this._nodesService = _nodesService;
        _this._differ = null;
        _this.loading = true;
        _this.filter = null;
        _this.events = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */]();
        _this.height = 0;
        _this._gridOptions = {
            nodeHeight: 27,
            headerRowHeight: 0,
            topPanelHeight: 0,
            enableColumnReorder: false,
            showHeaderRow: false,
            editable: false
        };
        _this.isDataValid = false;
        _this.subscriptions.push(_nodesService.selectedNodesChange$
            .subscribe(function (nodes) { return _this.onSelectedNodesChange(nodes); }));
        _this.subscriptions.push(_eventService.dataViewRowsChange$
            .subscribe(function () { return _this.onDataViewRowsChange(); }));
        return _this;
    }
    TreeGridComponent.prototype.ngOnChanges = function (changes) {
        if ('options' in changes) {
            var value = changes['options'].currentValue;
            if (!this._differ && value) {
                this._differ = this._differs.find(value).create(this._changeDetector);
            }
        }
    };
    TreeGridComponent.prototype.ngDoCheck = function () {
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
    TreeGridComponent.prototype.ngAfterViewInit = function () {
        this.containerEl.nativeElement.setAttribute('class', 'tree-grid-container');
    };
    TreeGridComponent.prototype.onFilterChanged = function (filter) {
        if (this.filter !== filter) {
            this.filter = filter;
            if (this._nodesService.dataView) {
                this._nodesService.dataView.refresh();
            }
        }
    };
    TreeGridComponent.prototype.onDataViewRowsChange = function () {
        this._resize();
    };
    TreeGridComponent.prototype.onWindowResize = function () {
        this._resize();
    };
    TreeGridComponent.prototype.onSelectedNodesChange = function (nodes) {
        this.events.emit({
            type: __WEBPACK_IMPORTED_MODULE_4__enums_index__["b" /* TreeGridEvents */].nodeChange,
            data: nodes
        });
    };
    TreeGridComponent.prototype.bubbleCmd = function (cmd) {
        this.events.emit({
            type: __WEBPACK_IMPORTED_MODULE_4__enums_index__["b" /* TreeGridEvents */].cmd,
            data: cmd
        });
    };
    TreeGridComponent.prototype.toggleLoader = function (state) {
        var _this = this;
        this.loading = state;
        window.setTimeout(function () {
            if (!state) {
                _this._resizeService.init(_this.containerEl.nativeElement, _this._grid, _this.gridEl.nativeElement);
            }
        }, 66);
    };
    TreeGridComponent.prototype.renderDOM = function () {
        var _this = this;
        if (Slick) {
            this._nodesService.dataView = new Slick.Data.DataView();
            this._nodesService.dataView.inlineFilters = true;
            this._nodesService.dataView.setItems(this._nodesService.nodes, 'order');
            this._nodesService.dataView.setFilter(function (node) {
                return _this._nodesService.filter(node, _this.filter);
            });
            this._grid = new Slick.Grid(this.gridEl.nativeElement, this._nodesService.dataView, this._nodesService.schema, this._gridOptions);
        }
    };
    TreeGridComponent.prototype.updateDOM = function () {
        var _this = this;
        this._nodesService.dataView.setItems(this._nodesService.nodes);
        this._isUpdate = true;
        if (this._renderTimeout) {
            clearTimeout(this._renderTimeout);
        }
        this._renderTimeout = setTimeout(function () {
            if (_this._isUpdate === true) {
                _this._isUpdate = false;
                _this._grid.invalidate();
                _this._grid.render();
            }
        }, 66);
    };
    TreeGridComponent.prototype.initEventServices = function () {
        this._eventService.init(this._grid, this._nodesService.dataView, this.events);
    };
    TreeGridComponent.prototype._applyChange = function (item) {
        var _this = this;
        switch (item.key) {
            case 'nodes':
                if (this.options.nodes && this.options.nodes.length) {
                    this.toggleLoader(true);
                    this._nodesService.nodes = this._nodesService.transform(this.options.nodes);
                    if (!this._grid) {
                        this.renderDOM();
                        this.initEventServices();
                    }
                    else {
                        this.updateDOM();
                    }
                    this.toggleLoader(false);
                }
                break;
            case 'notification':
                break;
            case 'nodesRequest':
                item.currentValue.then(function (data) {
                    var node = _this._nodesService.append(data.id, data.children);
                    if (node && node.selected) {
                        _this._eventService.bubbleSelect(node, _this.events);
                    }
                });
                break;
            case 'nodesUpdate':
                item.currentValue.then(function (data) {
                    _this._nodesService.updateNode(data.node, data.selected, data.expanded);
                });
                break;
            case 'filter':
                this.filter = this.options.filter;
                break;
            case 'macro':
                if (this.options.macro) {
                    this._runCmdMacro(this.options.macro);
                    this.options.macro = null;
                }
                break;
            case 'height':
                this.height = this.options.height;
                this._resize();
                break;
        }
    };
    TreeGridComponent.prototype._resize = function () {
        if (this._grid) {
            this._resizeService.resize(this._grid, this.gridEl.nativeElement);
        }
    };
    TreeGridComponent.prototype._runCmdMacro = function (cmd) {
        if (cmd) {
            switch (cmd) {
                case __WEBPACK_IMPORTED_MODULE_4__enums_index__["a" /* TreeGridCmds */].ShowAll:
                    this.filter = null;
                    this._nodesService.dataView.refresh();
                    break;
                case __WEBPACK_IMPORTED_MODULE_4__enums_index__["a" /* TreeGridCmds */].ClearSelected:
                    this._nodesService.deselectAll();
                    break;
                case __WEBPACK_IMPORTED_MODULE_4__enums_index__["a" /* TreeGridCmds */].ShowSelected:
                    this.filter = 'selected';
                    this._nodesService.dataView.refresh();
                    break;
                case __WEBPACK_IMPORTED_MODULE_4__enums_index__["a" /* TreeGridCmds */].CollapseAll:
                    this._nodesService.collapseAll();
                    break;
                case __WEBPACK_IMPORTED_MODULE_4__enums_index__["a" /* TreeGridCmds */].ExpandAll:
                    this._nodesService.expandAll();
                    break;
                case __WEBPACK_IMPORTED_MODULE_4__enums_index__["a" /* TreeGridCmds */].SelectAll:
                    this._nodesService.selectAll();
                    break;
                case __WEBPACK_IMPORTED_MODULE_4__enums_index__["a" /* TreeGridCmds */].Reload:
                    this.isDataValid = false;
                    break;
            }
            this.bubbleCmd(cmd);
        }
    };
    return TreeGridComponent;
}(__WEBPACK_IMPORTED_MODULE_1__shared_subscriptions__["a" /* Subscriptions */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* EventEmitter */]) === "function" && _a || Object)
], TreeGridComponent.prototype, "events", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__interfaces_index__["TreeGridInterface"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__interfaces_index__["TreeGridInterface"]) === "function" && _b || Object)
], TreeGridComponent.prototype, "options", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* ViewChild */])('containerEl'),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* ElementRef */]) === "function" && _c || Object)
], TreeGridComponent.prototype, "containerEl", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* ViewChild */])('gridEl'),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* ElementRef */]) === "function" && _d || Object)
], TreeGridComponent.prototype, "gridEl", void 0);
TreeGridComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'tree-grid',
        template: __webpack_require__(220),
        styles: [__webpack_require__(193)],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ViewEncapsulation */].None,
        providers: [
            __WEBPACK_IMPORTED_MODULE_2__services_index__["a" /* TreeGridEventsService */],
            __WEBPACK_IMPORTED_MODULE_2__services_index__["b" /* TreeGridResizeService */],
            __WEBPACK_IMPORTED_MODULE_2__services_index__["c" /* TreeGridNodeService */]
        ]
    }),
    __metadata("design:paramtypes", [typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* KeyValueDiffers */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* KeyValueDiffers */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_2__services_index__["b" /* TreeGridResizeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_index__["b" /* TreeGridResizeService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_2__services_index__["a" /* TreeGridEventsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_index__["a" /* TreeGridEventsService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_2__services_index__["c" /* TreeGridNodeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_index__["c" /* TreeGridNodeService */]) === "function" && _j || Object])
], TreeGridComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j;
//# sourceMappingURL=tree-grid.component.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tree_grid_component__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_bar_search_bar_module__ = __webpack_require__(120);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeGridModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var TreeGridModule = (function () {
    function TreeGridModule() {
    }
    return TreeGridModule;
}());
TreeGridModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__search_bar_search_bar_module__["a" /* SearchBarModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* CommonModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__tree_grid_component__["a" /* TreeGridComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__tree_grid_component__["a" /* TreeGridComponent */]
        ]
    })
], TreeGridModule);

//# sourceMappingURL=tree-grid.module.js.map

/***/ }),

/***/ 90:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 90;


/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(134);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ })

},[272]);
//# sourceMappingURL=main.bundle.js.map