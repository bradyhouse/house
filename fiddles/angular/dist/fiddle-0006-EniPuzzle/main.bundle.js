webpackJsonp([1,4],{

/***/ 103:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 103;


/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(122);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_puzzle_index__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_state_service__ = __webpack_require__(65);
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
    function AppComponent(_boardService, _gameStateService, _actionService) {
        var _this = this;
        this._boardService = _boardService;
        this._gameStateService = _gameStateService;
        this._actionService = _actionService;
        this.startDragSquare = null;
        this.dragOverSquare = null;
        this.fiddleTitle = __WEBPACK_IMPORTED_MODULE_1__shared_puzzle_index__["PuzzleConfig"].title;
        this.subscriptions = [];
        this.toolbarOptions = {
            id: 'pz-toolbar',
            state: this.isToolbarPersisted('pz-toolbar') === true ? this.restoreToolbarState('pz-toolbar') : 'PLAY',
            toggleText: 'Play',
            actionService: _actionService,
            stateService: _gameStateService,
            isBack: false
        };
        this.subscriptions.push(_boardService.boardChange$.subscribe(function (board) { return _this.onBoardChange(board); }));
        _boardService.init(_gameStateService, new __WEBPACK_IMPORTED_MODULE_1__shared_puzzle_index__["Board"](8, 8));
    }
    AppComponent.prototype.ngOnDestroy = function () {
        this.clearSubscriptions();
    };
    AppComponent.prototype.onSquareClick = function ($event) {
        var a = $event, b = this._boardService.emptySquare ? this._boardService.emptySquare : null;
        if (a && b && !this.dragOverSquare && !this.startDragSquare) {
            if (!a.isEmpty && __WEBPACK_IMPORTED_MODULE_1__shared_puzzle_index__["Utils"].isValidMove(a, b)) {
                __WEBPACK_IMPORTED_MODULE_1__shared_puzzle_index__["Utils"].swap(a, b);
                this._boardService.persist(a);
                this._boardService.persist(b);
                this._boardService.emptySquare = a;
            }
        }
    };
    AppComponent.prototype.onSquareDragOver = function ($event, square) {
        if (this.startDragSquare) {
            this.dragOverSquare = square;
        }
    };
    AppComponent.prototype.onSquareDragStart = function ($event, square) {
        this.startDragSquare = square;
        $event.dataTransfer.dropEffect = 'move';
    };
    AppComponent.prototype.onSquareDragEnd = function ($event, square) {
        if (this.startDragSquare && this.dragOverSquare) {
            if (this.startDragSquare.row === this.dragOverSquare.row) {
                return this.onHorizontalDragEnd($event, square);
            }
            /*if (this.startDragSquare.col === this.dragOverSquare.col) {
              return this.onVerticalDragEnd($event, square);
            }*/
        }
        this.startDragSquare = null;
        this.dragOverSquare = null;
    };
    AppComponent.prototype.onVerticalDragEnd = function ($event, square) {
        this.startDragSquare = null;
        this.dragOverSquare = null;
    };
    AppComponent.prototype.onHorizontalDragEnd = function ($event, square) {
        var _this = this;
        var repX = Math.abs(this.startDragSquare.col - this.dragOverSquare.col), i = 1;
        if (repX) {
            for (; i <= repX; i++) {
                if (this.startDragSquare.col < this.dragOverSquare.col) {
                    window.setTimeout(function () {
                        _this._boardService.shiftX(false, square);
                    }, i * 66);
                }
                else {
                    window.setTimeout(function () {
                        _this._boardService.shiftX(true, square);
                    }, i * 66);
                }
            }
        }
        this.startDragSquare = null;
        this.dragOverSquare = null;
    };
    AppComponent.prototype.clearSubscriptions = function () {
        this.subscriptions.map(function (subscription) {
            subscription.unsubscribe();
        });
        this.subscriptions = [];
    };
    Object.defineProperty(AppComponent.prototype, "database", {
        get: function () {
            return this._gameStateService.databaseService;
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.isToolbarPersisted = function (id) {
        var databaseService = this.database;
        if (databaseService) {
            return databaseService.exists(id);
        }
        return false;
    };
    AppComponent.prototype.restoreToolbarState = function (id) {
        var databaseService = this.database, toolbarState = null;
        if (databaseService) {
            toolbarState = databaseService.pull(id);
        }
        return toolbarState;
    };
    AppComponent.prototype.onBoardChange = function (board) {
        console.log(board.toString());
        this.board = board;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(179),
        styles: [__webpack_require__(176)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_puzzle_index__["BoardService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_puzzle_index__["BoardService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__app_state_service__["a" /* AppStateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__app_state_service__["a" /* AppStateService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__shared_puzzle_index__["ActionsService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_puzzle_index__["ActionsService"]) === "function" && _c || Object])
], AppComponent);

var _a, _b, _c;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_puzzle_puzzle_module__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_state_service__ = __webpack_require__(65);
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
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__shared_puzzle_puzzle_module__["a" /* PuzzleModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_6__app_state_service__["a" /* AppStateService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 112:
/***/ (function(module, exports) {

//# sourceMappingURL=actions-service.interface.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PuzzleConfig; });
var PuzzleConfig = (function () {
    function PuzzleConfig() {
    }
    return PuzzleConfig;
}());

PuzzleConfig.title = '16 Puzzle';
PuzzleConfig.isDev = false;
PuzzleConfig.dbFile = 'puzzle.db';
PuzzleConfig.transition = {
    transition: {
        name: 'flip',
        curve: 'linear'
    }
};
//# sourceMappingURL=puzzle-config.common.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_index__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__actions_index__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_index__ = __webpack_require__(77);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PuzzleModule; });
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








var PuzzleModule = (function () {
    function PuzzleModule(parentModule) {
        if (parentModule) {
            throw new Error('PuzzleModule already loaded; Import in root module only.');
        }
    }
    return PuzzleModule;
}());
PuzzleModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_6__actions_index__["ACTION_PROVIDERS"],
            __WEBPACK_IMPORTED_MODULE_7__services_index__["PUZZLE_PROVIDERS"]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__components_index__["PUZZLE_COMPONENTS"]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_5__components_index__["PUZZLE_COMPONENTS"]
        ],
        schemas: [
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* NO_ERRORS_SCHEMA */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* CUSTOM_ELEMENTS_SCHEMA */]
        ],
    }),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Optional */])()), __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* SkipSelf */])()),
    __metadata("design:paramtypes", [PuzzleModule])
], PuzzleModule);

//# sourceMappingURL=puzzle.module.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_index__ = __webpack_require__(24);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseService; });

var BaseService = (function () {
    function BaseService() {
        this.subscriptions = [];
    }
    BaseService.prototype.ngOnDestroy = function () {
        this.clearSubscriptions();
    };
    BaseService.prototype.clearSubscriptions = function () {
        this.subscriptions.map(function (subscription) {
            subscription.unsubscribe();
        });
        this.subscriptions = [];
    };
    BaseService.prototype.handleErrors = function (error) {
        this.consoleLogMsg('ERROR', error);
    };
    BaseService.prototype.consoleLogMsg = function (tag, msg) {
        if (__WEBPACK_IMPORTED_MODULE_0__common_index__["a" /* PuzzleConfig */].isDev === true) {
            console.log(tag + ': ' + msg);
        }
    };
    BaseService.prototype.consoleLogRecord = function (i, model) {
        if (__WEBPACK_IMPORTED_MODULE_0__common_index__["a" /* PuzzleConfig */].isDev === true) {
            console.log('record #' + i + ' = ' + model.toString());
        }
    };
    return BaseService;
}());

//# sourceMappingURL=base.service.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__board_model__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_utils_common__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_share__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_share__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BoardService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BoardService = (function () {
    function BoardService() {
        var _this = this;
        this.database = null;
        this._board = new __WEBPACK_IMPORTED_MODULE_2__board_model__["a" /* Board */]();
        this.boardChange$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) { return _this._boardObserver = observer; }).share();
    }
    Object.defineProperty(BoardService.prototype, "board", {
        get: function () {
            return this._board;
        },
        set: function (board) {
            if (this._board.toString() !== board.toString()) {
                this._board = board;
                if (this._boardObserver) {
                    this._boardObserver.next(board);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoardService.prototype, "emptySquare", {
        get: function () {
            return this._emptySquare;
        },
        set: function (value) {
            this._emptySquare = value;
        },
        enumerable: true,
        configurable: true
    });
    BoardService.prototype.init = function (stateService, model) {
        if (model === void 0) { model = null; }
        var board = model ? new __WEBPACK_IMPORTED_MODULE_2__board_model__["a" /* Board */](model.rowCount, model.colCount, model.isSolved, model.sequence, model.expectedSequence) : null;
        if (stateService && stateService.databaseService) {
            this.database = stateService.databaseService;
        }
        if (board) {
            board.squares = this.transform(board);
            this.board = board;
        }
    };
    BoardService.prototype.sequence = function (model, expect) {
        if (expect === void 0) { expect = false; }
        var min = 1, rows = model ? model.rowCount : null, cols = model ? model.colCount : null, max = rows && cols ? rows * cols : 0, seq = [];
        if (max > 0) {
            if (!expect) {
                seq = __WEBPACK_IMPORTED_MODULE_3__common_utils_common__["a" /* Utils */].generateSequence(min, max, max);
            }
            else {
                seq = __WEBPACK_IMPORTED_MODULE_3__common_utils_common__["a" /* Utils */].generateSequentialSequence(min, max);
            }
        }
        return seq;
    };
    BoardService.prototype.transform = function (model) {
        var row = 1, i = 1, pos = 0, rows = model.rowCount, cols = model.colCount, isSolved = model.isSolved, seq = model.sequence && model.sequence.length ? model.sequence : this.sequence(model), expectedSeq = model.expectedSequence && model.expectedSequence.length ? model.expectedSequence :
            this.sequence(model, true), subSeq = [], expectedSubSeq = [], store = [];
        for (; row <= rows; row++) {
            if (isSolved) {
                subSeq = __WEBPACK_IMPORTED_MODULE_3__common_utils_common__["a" /* Utils */].parseSubSequence(expectedSeq, pos, cols);
            }
            else {
                subSeq = __WEBPACK_IMPORTED_MODULE_3__common_utils_common__["a" /* Utils */].parseSubSequence(seq, pos, cols);
            }
            expectedSubSeq = __WEBPACK_IMPORTED_MODULE_3__common_utils_common__["a" /* Utils */].parseSubSequence(expectedSeq, pos, cols);
            store.push({
                index: i,
                isLast: row === rows ? true : false,
                seq: subSeq,
                expectedSeq: expectedSubSeq
            });
            i++;
            pos += cols;
        }
        return this.transformStore(store);
    };
    BoardService.prototype.transformStore = function (store) {
        var _this = this;
        var squares = [], emptySquares = [];
        store.forEach(function (row) {
            if (row.seq && row.expectedSeq && row.seq.length === row.expectedSeq.length) {
                row.seq.forEach(function (num, i) {
                    var colClass = __WEBPACK_IMPORTED_MODULE_3__common_utils_common__["a" /* Utils */].mapColClass(num), squareValue = i < (row.seq.length - 1) || (i < row.seq.length && !row.isLast) ? num : null, squareIsEmpty = squareValue ? false : true, squareClass = squareValue ? 'btn ' + colClass : 'btn empty', squareExpectedValue = row.expectedSeq[i], squareId = 'row-' + row.index + '-square-' + squareExpectedValue, squareRow = row.index, squareCol = i, squareOptions = _this.isSquarePersisted(squareId) ? _this.restoreSquareOptions(squareId) :
                        {
                            id: squareId,
                            isEmpty: squareIsEmpty,
                            row: squareRow,
                            col: squareCol,
                            value: String(i),
                            expectedValue: String(squareExpectedValue),
                            cssClass: squareClass
                        };
                    squares.push(squareOptions);
                });
            }
        });
        emptySquares = squares.filter(function (square) {
            return square.isEmpty;
        });
        if (emptySquares.length) {
            this.emptySquare = emptySquares[0];
        }
        if (this.emptySquare) {
            console.log('emptySquare');
            console.log(JSON.stringify(this.emptySquare));
        }
        return squares;
    };
    BoardService.prototype.isSquarePersisted = function (id) {
        var databaseService = this.database;
        if (databaseService) {
            return databaseService.exists(id);
        }
        return false;
    };
    BoardService.prototype.restoreSquareOptions = function (id) {
        var databaseService = this.database, squareState = null;
        if (databaseService) {
            squareState = databaseService.pull(id);
        }
        return squareState;
    };
    BoardService.prototype.unPersist = function () {
        var databaseService = this.database;
        if (databaseService) {
            databaseService.zero('row');
        }
    };
    BoardService.prototype.persist = function (options) {
        var _this = this;
        if (options === void 0) { options = null; }
        var databaseService = this.database;
        if (databaseService) {
            if (options) {
                databaseService.push(options.id, options);
            }
            else {
                if (this.board && this.board.squares) {
                    this.board.squares.forEach(function (square) {
                        _this.persist(square);
                    });
                }
            }
        }
    };
    BoardService.prototype.slide = function (left, square, reps) {
        for (var i = 0; i < reps; i++) {
            this.shiftX(left, square);
        }
    };
    BoardService.prototype.shiftX = function (left, square) {
        var _this = this;
        if (left === void 0) { left = false; }
        var squareIndices = [], emptySquareIndices = [];
        if (this.board && this.board.squares && this.board.squares.length) {
            this.board.squares.forEach(function (s, index) {
                if (s.row === square.row) {
                    squareIndices.push(index);
                }
            });
            if (squareIndices.length === 8) {
                if (left) {
                    __WEBPACK_IMPORTED_MODULE_3__common_utils_common__["a" /* Utils */].swap(this.board.squares[squareIndices[0]], this.board.squares[squareIndices[1]]);
                    __WEBPACK_IMPORTED_MODULE_3__common_utils_common__["a" /* Utils */].swap(this.board.squares[squareIndices[1]], this.board.squares[squareIndices[2]]);
                    __WEBPACK_IMPORTED_MODULE_3__common_utils_common__["a" /* Utils */].swap(this.board.squares[squareIndices[2]], this.board.squares[squareIndices[3]]);
                    __WEBPACK_IMPORTED_MODULE_3__common_utils_common__["a" /* Utils */].swap(this.board.squares[squareIndices[3]], this.board.squares[squareIndices[4]]);
                    __WEBPACK_IMPORTED_MODULE_3__common_utils_common__["a" /* Utils */].swap(this.board.squares[squareIndices[4]], this.board.squares[squareIndices[5]]);
                    __WEBPACK_IMPORTED_MODULE_3__common_utils_common__["a" /* Utils */].swap(this.board.squares[squareIndices[5]], this.board.squares[squareIndices[6]]);
                    __WEBPACK_IMPORTED_MODULE_3__common_utils_common__["a" /* Utils */].swap(this.board.squares[squareIndices[6]], this.board.squares[squareIndices[7]]);
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_3__common_utils_common__["a" /* Utils */].swap(this.board.squares[squareIndices[7]], this.board.squares[squareIndices[6]]);
                    __WEBPACK_IMPORTED_MODULE_3__common_utils_common__["a" /* Utils */].swap(this.board.squares[squareIndices[6]], this.board.squares[squareIndices[5]]);
                    __WEBPACK_IMPORTED_MODULE_3__common_utils_common__["a" /* Utils */].swap(this.board.squares[squareIndices[5]], this.board.squares[squareIndices[4]]);
                    __WEBPACK_IMPORTED_MODULE_3__common_utils_common__["a" /* Utils */].swap(this.board.squares[squareIndices[4]], this.board.squares[squareIndices[3]]);
                    __WEBPACK_IMPORTED_MODULE_3__common_utils_common__["a" /* Utils */].swap(this.board.squares[squareIndices[3]], this.board.squares[squareIndices[2]]);
                    __WEBPACK_IMPORTED_MODULE_3__common_utils_common__["a" /* Utils */].swap(this.board.squares[squareIndices[2]], this.board.squares[squareIndices[1]]);
                    __WEBPACK_IMPORTED_MODULE_3__common_utils_common__["a" /* Utils */].swap(this.board.squares[squareIndices[1]], this.board.squares[squareIndices[0]]);
                }
                emptySquareIndices = squareIndices.filter(function (indice) {
                    return _this.board.squares[indice].isEmpty;
                });
                if (emptySquareIndices.length) {
                    this.emptySquare = this.board.squares[emptySquareIndices[0]];
                }
                this.persist();
            }
        }
    };
    return BoardService;
}());
BoardService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], BoardService);

//# sourceMappingURL=board.service.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Row */
var Row = (function () {
    function Row(index, isLast, squares, seq, expectedSeq, emptySquare) {
        if (emptySquare === void 0) { emptySquare = null; }
        this.index = index;
        this.isLast = isLast;
        this.squares = squares;
        this.seq = seq;
        this.expectedSeq = expectedSeq;
        this.emptySquare = emptySquare;
    }
    return Row;
}());

//# sourceMappingURL=row.model.js.map

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Square */
var Square = (function () {
    function Square(id, isEmpty, row, col, value, expectedValue, cssClass) {
        this.id = id;
        this.isEmpty = isEmpty;
        this.row = row;
        this.col = col;
        this.value = value;
        this.expectedValue = expectedValue;
        this.cssClass = cssClass;
    }
    return Square;
}());

//# sourceMappingURL=square.model.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigRecord; });
var ConfigRecord = (function () {
    function ConfigRecord(key, value) {
        this.key = key;
        this.value = value;
    }
    ConfigRecord.prototype.toString = function () {
        return '{ key: ' + this.key + ', value: ' + this.value + ' }';
    };
    return ConfigRecord;
}());

//# sourceMappingURL=config-record.model.js.map

/***/ }),

/***/ 120:
/***/ (function(module, exports) {

//# sourceMappingURL=database-service.interface.js.map

/***/ }),

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_share__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_share__);

//# sourceMappingURL=state-service.interface.js.map

/***/ }),

/***/ 122:
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

/***/ 176:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(30)();
// imports


// module
exports.push([module.i, ".app-component {\n\n}\n\n.app-component input[type=\"button\"] {\n  border-radius: 10px; /* future proofing */\n  -khtml-border-radius: 10px; /* for old Konqueror browsers */\n  border-color: white;\n  border-width: 1px;\n}\n\n.app-component .col-a {\n  width: calc(12vw);\n  height: calc(12vh);\n  background-color: yellow;\n}\n\n.app-component .col-b {\n  width: calc(12vw);\n  height: calc(12vh);\n  background-color: orange;\n}\n\n.app-component .col-c {\n  width: calc(12vw);\n  height: calc(12vh);\n  background-color: red;\n}\n\n.app-component .col-d {\n  width: calc(12vw);\n  height: calc(12vh);\n  background-color: darkred;\n}\n\n.app-component .col-e {\n  width: calc(12vw);\n  height: calc(12vh);\n  background-color: blueviolet;\n}\n\n.app-component .col-f {\n  width: calc(12vw);\n  height: calc(12vh);\n  background-color: blue;\n}\n\n.app-component .col-g {\n  width: calc(12vw);\n  height: calc(12vh);\n  background-color: turquoise;\n}\n\n.app-component .col-h {\n  width: calc(12vw);\n  height: calc(12vh);\n  background-color: green;\n}\n\n.app-component .empty {\n  width: calc(12vw);\n  height: calc(12vh);\n  background-color: white;\n  border-radius: none;\n  box-shadow: none;\n  border: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n      user-select: none;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 177:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(30)();
// imports


// module
exports.push([module.i, "input[type=\"button\"] {\n  border-radius: 10px; /* future proofing */\n  -khtml-border-radius: 10px; /* for old Konqueror browsers */\n  border: none;\n  background-color: aliceblue;\n  font-size: 1.4rem;\n  width: calc(99vw);\n  height: calc(8vh);\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 179:
/***/ (function(module, exports) {

module.exports = "<span class=\"app-component\" *ngIf=\"!isLoading\">\n  <input type=\"button\" *ngFor=\"let square of board.squares\"\n         [id]=\"square.id\"\n         value=\"\"\n         [class]=\"square.cssClass\"\n         [draggable]=\"!square.isEmpty\"\n         (dragstart)=\"onSquareDragStart($event, square)\"\n         (dragend)=\"onSquareDragEnd($event, square)\"\n         (dragover)=\"onSquareDragOver($event, square)\"\n         (click)=\"onSquareClick(square)\" >\n</span>\n"

/***/ }),

/***/ 180:
/***/ (function(module, exports) {

module.exports = "<input type=\"button\" (click)=\"onToggleClick()\" value=\"{{options?.toggleText}}\">\n<input type=\"button\" *ngIf=\"options?.isBack\" value=\"{{options?.backText}}\">\n"

/***/ }),

/***/ 212:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(104);


/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_common__ = __webpack_require__(69);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__utils_common__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__puzzle_config_common__ = __webpack_require__(113);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__puzzle_config_common__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_index__ = __webpack_require__(71);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__components_index__, "StateService")) __webpack_require__.d(__webpack_exports__, "StateService", function() { return __WEBPACK_IMPORTED_MODULE_0__components_index__["StateService"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__components_index__, "LocalStorageService")) __webpack_require__.d(__webpack_exports__, "LocalStorageService", function() { return __WEBPACK_IMPORTED_MODULE_0__components_index__["LocalStorageService"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__components_index__, "ActionsEnum")) __webpack_require__.d(__webpack_exports__, "ActionsEnum", function() { return __WEBPACK_IMPORTED_MODULE_0__components_index__["ActionsEnum"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__components_index__, "PuzzleConfig")) __webpack_require__.d(__webpack_exports__, "PuzzleConfig", function() { return __WEBPACK_IMPORTED_MODULE_0__components_index__["PuzzleConfig"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__components_index__, "Board")) __webpack_require__.d(__webpack_exports__, "Board", function() { return __WEBPACK_IMPORTED_MODULE_0__components_index__["Board"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__components_index__, "Utils")) __webpack_require__.d(__webpack_exports__, "Utils", function() { return __WEBPACK_IMPORTED_MODULE_0__components_index__["Utils"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__components_index__, "BoardService")) __webpack_require__.d(__webpack_exports__, "BoardService", function() { return __WEBPACK_IMPORTED_MODULE_0__components_index__["BoardService"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__components_index__, "ActionsService")) __webpack_require__.d(__webpack_exports__, "ActionsService", function() { return __WEBPACK_IMPORTED_MODULE_0__components_index__["ActionsService"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_index__ = __webpack_require__(24);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "PuzzleConfig", function() { return __WEBPACK_IMPORTED_MODULE_1__common_index__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "Utils", function() { return __WEBPACK_IMPORTED_MODULE_1__common_index__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions_index__ = __webpack_require__(68);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2__actions_index__, "StateService")) __webpack_require__.d(__webpack_exports__, "StateService", function() { return __WEBPACK_IMPORTED_MODULE_2__actions_index__["StateService"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2__actions_index__, "LocalStorageService")) __webpack_require__.d(__webpack_exports__, "LocalStorageService", function() { return __WEBPACK_IMPORTED_MODULE_2__actions_index__["LocalStorageService"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2__actions_index__, "ActionsEnum")) __webpack_require__.d(__webpack_exports__, "ActionsEnum", function() { return __WEBPACK_IMPORTED_MODULE_2__actions_index__["ActionsEnum"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2__actions_index__, "Board")) __webpack_require__.d(__webpack_exports__, "Board", function() { return __WEBPACK_IMPORTED_MODULE_2__actions_index__["Board"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2__actions_index__, "BoardService")) __webpack_require__.d(__webpack_exports__, "BoardService", function() { return __WEBPACK_IMPORTED_MODULE_2__actions_index__["BoardService"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2__actions_index__, "ActionsService")) __webpack_require__.d(__webpack_exports__, "ActionsService", function() { return __WEBPACK_IMPORTED_MODULE_2__actions_index__["ActionsService"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_index__ = __webpack_require__(77);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_3__services_index__, "StateService")) __webpack_require__.d(__webpack_exports__, "StateService", function() { return __WEBPACK_IMPORTED_MODULE_3__services_index__["StateService"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_3__services_index__, "LocalStorageService")) __webpack_require__.d(__webpack_exports__, "LocalStorageService", function() { return __WEBPACK_IMPORTED_MODULE_3__services_index__["LocalStorageService"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_3__services_index__, "ActionsEnum")) __webpack_require__.d(__webpack_exports__, "ActionsEnum", function() { return __WEBPACK_IMPORTED_MODULE_3__services_index__["ActionsEnum"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_3__services_index__, "Board")) __webpack_require__.d(__webpack_exports__, "Board", function() { return __WEBPACK_IMPORTED_MODULE_3__services_index__["Board"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_3__services_index__, "BoardService")) __webpack_require__.d(__webpack_exports__, "BoardService", function() { return __WEBPACK_IMPORTED_MODULE_3__services_index__["BoardService"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_3__services_index__, "ActionsService")) __webpack_require__.d(__webpack_exports__, "ActionsService", function() { return __WEBPACK_IMPORTED_MODULE_3__services_index__["ActionsService"]; });




//# sourceMappingURL=index.js.map

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalStorageService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var LocalStorageService = (function () {
    function LocalStorageService() {
    }
    Object.defineProperty(LocalStorageService.prototype, "tables", {
        get: function () {
            var tables = [];
            if (this.connect()) {
                for (var table in window.localStorage) {
                    tables.push(table);
                }
            }
            return tables;
        },
        enumerable: true,
        configurable: true
    });
    LocalStorageService.prototype.connect = function () {
        return window.localStorage ? true : false;
    };
    LocalStorageService.prototype.delete = function (table) {
        return this.push(table, null);
    };
    LocalStorageService.prototype.pull = function (table) {
        if (this.connect()) {
            if (window.localStorage.hasOwnProperty(table)) {
                try {
                    return JSON.parse(window.localStorage[table]);
                }
                catch (e) {
                    return {};
                }
            }
        }
        return null;
    };
    LocalStorageService.prototype.push = function (table, value) {
        if (this.connect()) {
            if (!value) {
                window.localStorage.removeItem(table);
            }
            else {
                window.localStorage[table] = JSON.stringify(value);
            }
            return true;
        }
        return false;
    };
    LocalStorageService.prototype.exists = function (table) {
        if (this.connect()) {
            return window.localStorage.hasOwnProperty(table);
        }
        return false;
    };
    LocalStorageService.prototype.zero = function (criteria) {
        var _this = this;
        if (criteria === void 0) { criteria = null; }
        var tables = this.tables;
        if (tables.length) {
            tables.forEach(function (table) {
                if (criteria) {
                    if (table.indexOf(criteria) !== -1) {
                        _this.delete(table);
                    }
                }
                else {
                    _this.delete(table);
                }
            });
        }
    };
    return LocalStorageService;
}());
LocalStorageService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])()
], LocalStorageService);

//# sourceMappingURL=local-storage.service.js.map

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_share__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_share__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_puzzle_index__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppStateService; });
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



var AppStateService = (function (_super) {
    __extends(AppStateService, _super);
    function AppStateService(databaseService) {
        return _super.call(this, databaseService) || this;
    }
    return AppStateService;
}(__WEBPACK_IMPORTED_MODULE_2__shared_puzzle_index__["StateService"]));
AppStateService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_puzzle_index__["LocalStorageService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_puzzle_index__["LocalStorageService"]) === "function" && _a || Object])
], AppStateService);

var _a;
//# sourceMappingURL=app-state.service.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionsEnum; });
var ActionsEnum;
(function (ActionsEnum) {
    ActionsEnum[ActionsEnum["LOAD"] = 0] = "LOAD";
    ActionsEnum[ActionsEnum["READY"] = 1] = "READY";
    ActionsEnum[ActionsEnum["PLAY"] = 2] = "PLAY";
    ActionsEnum[ActionsEnum["SOLVE"] = 3] = "SOLVE";
    ActionsEnum[ActionsEnum["HELP"] = 4] = "HELP";
    ActionsEnum[ActionsEnum["SAVE"] = 5] = "SAVE";
    ActionsEnum[ActionsEnum["START"] = 6] = "START";
})(ActionsEnum || (ActionsEnum = {}));
//# sourceMappingURL=actions.enum.js.map

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_share__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_share__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions_enum__ = __webpack_require__(66);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ActionsService = (function () {
    function ActionsService() {
        var _this = this;
        this._action = __WEBPACK_IMPORTED_MODULE_4__actions_enum__["a" /* ActionsEnum */].START;
        this.actionChange$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) { return _this.actionObserver = observer; }).share();
    }
    Object.defineProperty(ActionsService.prototype, "actionObserver", {
        get: function () {
            return this._actionObserver;
        },
        set: function (value) {
            this._actionObserver = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionsService.prototype, "action", {
        get: function () {
            return this._action;
        },
        set: function (value) {
            if (this._action !== value) {
                this._action = value;
                if (this.actionObserver) {
                    this.actionObserver.next(value);
                }
            }
            value = null;
        },
        enumerable: true,
        configurable: true
    });
    return ActionsService;
}());
ActionsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], ActionsService);

//# sourceMappingURL=actions.service.js.map

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_service__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions_enum__ = __webpack_require__(66);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "ActionsEnum", function() { return __WEBPACK_IMPORTED_MODULE_1__actions_enum__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions_service_interface__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions_service_interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__actions_service_interface__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2__actions_service_interface__, "StateService")) __webpack_require__.d(__webpack_exports__, "StateService", function() { return __WEBPACK_IMPORTED_MODULE_2__actions_service_interface__["StateService"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2__actions_service_interface__, "LocalStorageService")) __webpack_require__.d(__webpack_exports__, "LocalStorageService", function() { return __WEBPACK_IMPORTED_MODULE_2__actions_service_interface__["LocalStorageService"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2__actions_service_interface__, "Board")) __webpack_require__.d(__webpack_exports__, "Board", function() { return __WEBPACK_IMPORTED_MODULE_2__actions_service_interface__["Board"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2__actions_service_interface__, "BoardService")) __webpack_require__.d(__webpack_exports__, "BoardService", function() { return __WEBPACK_IMPORTED_MODULE_2__actions_service_interface__["BoardService"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2__actions_service_interface__, "ActionsService")) __webpack_require__.d(__webpack_exports__, "ActionsService", function() { return __WEBPACK_IMPORTED_MODULE_2__actions_service_interface__["ActionsService"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "ActionsService", function() { return __WEBPACK_IMPORTED_MODULE_0__actions_service__["a"]; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_PROVIDERS", function() { return ACTION_PROVIDERS; });

var ACTION_PROVIDERS = [
    __WEBPACK_IMPORTED_MODULE_0__actions_service__["a" /* ActionsService */]
];



//# sourceMappingURL=index.js.map

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Utils; });
var Utils = (function () {
    function Utils() {
    }
    Utils.isEven = function (x) {
        return (x % 2) === 0;
    };
    Utils.generateSequence = function (min, max, count) {
        var range = [], number = 0, i = 0;
        while (i < count) {
            number = Math.floor(Math.random() * (max - min + 1)) + min;
            if (range.indexOf(number) === -1) {
                range.push(number);
                i++;
            }
        }
        return range;
    };
    Utils.generateSequentialSequence = function (min, max) {
        var sequence = [], i = 0, number = min, count = (max - min);
        if (count > 0) {
            while (i < (count + 1)) {
                sequence.push(number);
                number++;
                i++;
            }
        }
        return sequence;
    };
    Utils.generateGameSequence = function (min, max, count) {
        var sequence = this.generateSequence(min, max, count);
        while (!this.isValid(sequence)) {
            sequence = this.generateSequence(min, max, count);
        }
        return sequence;
    };
    Utils.isValid = function (sequence) {
        var inversionCounts = [], inversionSum = 0;
        sequence.forEach(function (a, x, arr) {
            var inversions = arr.filter(function (b, y) {
                return y > x && b < a;
            });
            if (inversions.length) {
                inversionCounts.push(inversions.length);
            }
            else {
                inversionCounts.push(0);
            }
        });
        inversionCounts.forEach(function (cnt) {
            inversionSum += cnt;
        });
        return this.isEven(inversionSum);
    };
    Utils.mapLevelDimensions = function (level) {
        switch (level) {
            case 8:
                return {
                    cols: 10,
                    rows: 10
                };
            case 7:
                return {
                    cols: 9,
                    rows: 9
                };
            case 6:
                return {
                    cols: 8,
                    rows: 8
                };
            case 5:
                return {
                    cols: 7,
                    rows: 7
                };
            case 4:
                return {
                    cols: 6,
                    rows: 6
                };
            case 3:
                return {
                    cols: 5,
                    rows: 5
                };
            case 2:
                return {
                    cols: 4,
                    rows: 4
                };
            default:
                return {
                    cols: 3,
                    rows: 3
                };
        }
    };
    Utils.overlay = function (updates, obj) {
        for (var prop in updates) {
            if (obj.hasOwnProperty(prop)) {
                obj[prop] = updates[prop];
            }
        }
        return obj;
    };
    Utils.mapColClass = function (value) {
        switch (value) {
            case 1:
            case 9:
            case 17:
            case 25:
            case 33:
            case 41:
            case 49:
            case 57:
                return 'col-a';
            case 2:
            case 10:
            case 18:
            case 26:
            case 34:
            case 42:
            case 50:
            case 58:
                return 'col-b';
            case 3:
            case 11:
            case 19:
            case 27:
            case 35:
            case 43:
            case 51:
            case 59:
                return 'col-c';
            case 4:
            case 12:
            case 20:
            case 28:
            case 36:
            case 44:
            case 52:
            case 60:
                return 'col-d';
            case 5:
            case 13:
            case 21:
            case 29:
            case 37:
            case 45:
            case 53:
            case 61:
                return 'col-e';
            case 6:
            case 14:
            case 22:
            case 30:
            case 38:
            case 46:
            case 54:
            case 62:
                return 'col-f';
            case 7:
            case 15:
            case 23:
            case 31:
            case 39:
            case 47:
            case 55:
            case 63:
                return 'col-g';
            default:
                return 'col-h';
        }
    };
    Utils.parseSubSequence = function (sequence, pos, range) {
        var subSequence = [], i = pos, lim = pos + range;
        sequence.map(function (element) {
            while (i < lim) {
                subSequence.push(sequence[i]);
                i++;
            }
        });
        return subSequence;
    };
    Utils.isValidMove = function (a, b) {
        var rowDelta = Math.abs(a.row - b.row), colDelta = Math.abs(a.col - b.col);
        if (a.col === b.col) {
            return (rowDelta === 1) && (colDelta === 0);
        }
        return false;
    };
    Utils.swap = function (a, b) {
        var valueA = a.value, isEmptyA = a.isEmpty, cssClassA = a.cssClass, valueB = b.value, isEmptyB = b.isEmpty, cssClassB = b.cssClass;
        a.value = valueB;
        a.isEmpty = isEmptyB;
        a.cssClass = cssClassB;
        b.value = valueA;
        b.isEmpty = isEmptyA;
        b.cssClass = cssClassA;
    };
    return Utils;
}());

//# sourceMappingURL=utils.common.js.map

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_index__ = __webpack_require__(24);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseComponent; });

var BaseComponent = (function () {
    function BaseComponent() {
        this.subscriptions = [];
    }
    BaseComponent.prototype.ngOnDestroy = function () {
        this.clearSubscriptions();
    };
    BaseComponent.prototype.clearSubscriptions = function () {
        this.subscriptions.map(function (subscription) {
            subscription.unsubscribe();
        });
        this.subscriptions = [];
    };
    BaseComponent.prototype.handleErrors = function (error) {
        this.consoleLogMsg('ERROR', error);
    };
    BaseComponent.prototype.consoleLogMsg = function (tag, msg) {
        if (__WEBPACK_IMPORTED_MODULE_0__common_index__["a" /* PuzzleConfig */].isDev === true) {
            console.log(tag + ': ' + msg);
        }
    };
    return BaseComponent;
}());

//# sourceMappingURL=base.component.js.map

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__toolbar_toolbar_component__ = __webpack_require__(73);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__toolbar_toolbar_options_interface__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__toolbar_toolbar_options_interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__toolbar_toolbar_options_interface__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__toolbar_toolbar_options_interface__, "StateService")) __webpack_require__.d(__webpack_exports__, "StateService", function() { return __WEBPACK_IMPORTED_MODULE_1__toolbar_toolbar_options_interface__["StateService"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__toolbar_toolbar_options_interface__, "LocalStorageService")) __webpack_require__.d(__webpack_exports__, "LocalStorageService", function() { return __WEBPACK_IMPORTED_MODULE_1__toolbar_toolbar_options_interface__["LocalStorageService"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__toolbar_toolbar_options_interface__, "ActionsEnum")) __webpack_require__.d(__webpack_exports__, "ActionsEnum", function() { return __WEBPACK_IMPORTED_MODULE_1__toolbar_toolbar_options_interface__["ActionsEnum"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__toolbar_toolbar_options_interface__, "PuzzleConfig")) __webpack_require__.d(__webpack_exports__, "PuzzleConfig", function() { return __WEBPACK_IMPORTED_MODULE_1__toolbar_toolbar_options_interface__["PuzzleConfig"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__toolbar_toolbar_options_interface__, "Board")) __webpack_require__.d(__webpack_exports__, "Board", function() { return __WEBPACK_IMPORTED_MODULE_1__toolbar_toolbar_options_interface__["Board"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__toolbar_toolbar_options_interface__, "Utils")) __webpack_require__.d(__webpack_exports__, "Utils", function() { return __WEBPACK_IMPORTED_MODULE_1__toolbar_toolbar_options_interface__["Utils"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__toolbar_toolbar_options_interface__, "BoardService")) __webpack_require__.d(__webpack_exports__, "BoardService", function() { return __WEBPACK_IMPORTED_MODULE_1__toolbar_toolbar_options_interface__["BoardService"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__toolbar_toolbar_options_interface__, "ActionsService")) __webpack_require__.d(__webpack_exports__, "ActionsService", function() { return __WEBPACK_IMPORTED_MODULE_1__toolbar_toolbar_options_interface__["ActionsService"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_component__ = __webpack_require__(70);
/* unused harmony namespace reexport */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PUZZLE_COMPONENTS", function() { return PUZZLE_COMPONENTS; });

var PUZZLE_COMPONENTS = [
    __WEBPACK_IMPORTED_MODULE_0__toolbar_toolbar_component__["a" /* ToolbarComponent */]
];



//# sourceMappingURL=index.js.map

/***/ }),

/***/ 72:
/***/ (function(module, exports) {

//# sourceMappingURL=toolbar-options.interface.js.map

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__toolbar_options_interface__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__toolbar_options_interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__toolbar_options_interface__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__base_component__ = __webpack_require__(70);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToolbarComponent; });
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




var ToolbarComponent = (function (_super) {
    __extends(ToolbarComponent, _super);
    function ToolbarComponent() {
        var _this = _super.call(this) || this;
        _this.toggle = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */]();
        _this.about = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */]();
        return _this;
    }
    ToolbarComponent.prototype.ngOnChanges = function (changes) {
        if (this.options) {
            this.options = this.transform(this.options);
        }
    };
    Object.defineProperty(ToolbarComponent.prototype, "database", {
        get: function () {
            var stateService = this.options &&
                this.options.hasOwnProperty('stateService') ? this.options.stateService : null;
            return stateService ? stateService.databaseService : null;
        },
        enumerable: true,
        configurable: true
    });
    ToolbarComponent.prototype.onToggleClick = function () {
        var action = this.options && this.options.actionService ? this.options.actionService.action : null;
        if (this.options.state === 'PLAY') {
            this.options.state = 'SOLVE';
        }
        else {
            this.options.state = 'PLAY';
        }
        this.persist(this.options);
        this.options = this.transform(this.options);
        if (action !== null) {
            action = this.options.state === 'PLAY' ? __WEBPACK_IMPORTED_MODULE_2__index__["ActionsEnum"].SOLVE : __WEBPACK_IMPORTED_MODULE_2__index__["ActionsEnum"].PLAY;
            this.options.actionService.action = action;
        }
        this.toggle.emit(this);
    };
    ToolbarComponent.prototype.onAboutClick = function () {
        this.about.emit(this);
    };
    ToolbarComponent.prototype.onActionChange = function (action) {
        var state = this.options ? this.options.state : null;
        if (state) {
            switch (action) {
                case __WEBPACK_IMPORTED_MODULE_2__index__["ActionsEnum"].PLAY:
                    state = 'SOLVE';
                    break;
                case __WEBPACK_IMPORTED_MODULE_2__index__["ActionsEnum"].SOLVE:
                    state = 'PLAY';
                    break;
            }
            if (state !== this.options.state) {
                this.options.state = state;
                this.persist(this.options);
                this.transform(this.options);
            }
        }
    };
    ToolbarComponent.prototype.transform = function (options) {
        var _this = this;
        var state = this.isToolbarPersisted(options.id) ?
            this.restoreToolbarOptions(options.id) : options.state;
        if (this.subscriptions.length === 0) {
            if (options.actionService) {
                this.subscriptions.push(options.actionService.actionChange$
                    .subscribe(function (action) { return _this.onActionChange(action); }));
            }
        }
        switch (state) {
            case 'PLAY':
                {
                    options.toggleText = 'Play';
                    options.toggleTitle = 'Play game';
                }
                break;
            default:
                {
                    options.toggleText = 'Solve';
                    options.toggleTitle = 'Solve puzzle';
                }
                break;
        }
        return options;
    };
    ToolbarComponent.prototype.isToolbarPersisted = function (id) {
        var databaseService = this.database;
        if (databaseService) {
            return databaseService.exists(id);
        }
        return false;
    };
    ToolbarComponent.prototype.restoreToolbarOptions = function (id) {
        var databaseService = this.database, state = null;
        if (databaseService) {
            state = databaseService.pull(id);
        }
        return state;
    };
    ToolbarComponent.prototype.clearState = function (id) {
        var databaseService = this.database;
        if (databaseService) {
            databaseService.delete(id);
        }
    };
    ToolbarComponent.prototype.persist = function (options) {
        var databaseService = this.database;
        if (databaseService) {
            databaseService.push(options.id, options.state);
        }
    };
    return ToolbarComponent;
}(__WEBPACK_IMPORTED_MODULE_3__base_component__["a" /* BaseComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__toolbar_options_interface__["ToolbarOptionsInterface"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__toolbar_options_interface__["ToolbarOptionsInterface"]) === "function" && _a || Object)
], ToolbarComponent.prototype, "options", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */]) === "function" && _b || Object)
], ToolbarComponent.prototype, "toggle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */]) === "function" && _c || Object)
], ToolbarComponent.prototype, "about", void 0);
ToolbarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Component */])({
        selector: 'pz-toolbar',
        template: __webpack_require__(180),
        styles: [__webpack_require__(177)],
    }),
    __metadata("design:paramtypes", [])
], ToolbarComponent);

var _a, _b, _c;
//# sourceMappingURL=toolbar.component.js.map

/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Board; });
var Board = (function () {
    function Board(rowCount, colCount, isSolved, sequence, expectedSequence) {
        if (rowCount === void 0) { rowCount = 0; }
        if (colCount === void 0) { colCount = 0; }
        if (isSolved === void 0) { isSolved = false; }
        if (sequence === void 0) { sequence = []; }
        if (expectedSequence === void 0) { expectedSequence = []; }
        this.rowCount = rowCount;
        this.colCount = colCount;
        this.isSolved = isSolved;
        this.sequence = sequence;
        this.expectedSequence = expectedSequence;
        this._squares = [];
    }
    Object.defineProperty(Board.prototype, "squares", {
        get: function () {
            return this._squares;
        },
        set: function (value) {
            this._squares = value;
        },
        enumerable: true,
        configurable: true
    });
    Board.prototype.toString = function () {
        return '{ rows: ' + this.rowCount + ', cols: ' + this.colCount + ', isSolved: ' +
            this.isSolved + ', sequence: ' + JSON.stringify(this.sequence) +
            ', expectedSequence: ' + JSON.stringify(this.expectedSequence) +
            ', squares:' + this._squares.length + ' }';
    };
    return Board;
}());

//# sourceMappingURL=board.model.js.map

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board_model__ = __webpack_require__(74);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__board_model__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__board_service__ = __webpack_require__(116);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__board_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__row_model__ = __webpack_require__(117);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__square_model__ = __webpack_require__(118);
/* unused harmony namespace reexport */




//# sourceMappingURL=index.js.map

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_record_model__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__base_service__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_share__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_share__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common_index__ = __webpack_require__(24);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sqlite3DatabaseService; });
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
var StateModelSql = {
    insert: "insert into config(key, value) values(?,?)",
    selectAll: "select id, key, value from config",
    selectNextId: "select seq from sqlite_sequence where name='config'",
    delete: "DELETE FROM config WHERE key = ?",
    update: "update 'main'.'config' set value = ? where key = ?",
    dropTable: "drop table 'main'.'config';",
    count: "SELECT COUNT(*) as count FROM config WHERE key = ?",
    createTable: "create table 'config' ('id' integer primary key  autoincrement  not null  unique , 'key' text not null , 'value' text not null)"
};








var Sqlite3DatabaseService = (function (_super) {
    __extends(Sqlite3DatabaseService, _super);
    function Sqlite3DatabaseService() {
        var _this = _super.call(this) || this;
        _this._database = null;
        _this._isEmpty = true;
        Sqlite = Sqlite3;
        _this.databaseChange$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) { return _this._databaseObserver = observer; }).share();
        (new Sqlite(__WEBPACK_IMPORTED_MODULE_7__common_index__["a" /* PuzzleConfig */].dbFile)
            .toPromise()
            .then(function (err, db) {
            console.log(db);
            _this.database = db;
            _this._localStorage = _this.fetch();
        })
            .catch(_this.handleError));
        return _this;
    }
    Object.defineProperty(Sqlite3DatabaseService.prototype, "tables", {
        get: function () {
            var tables = [];
            if (this.connect()) {
                for (var table in this._localStorage) {
                    tables.push(table);
                }
            }
            return tables;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sqlite3DatabaseService.prototype, "database", {
        get: function () {
            return this._database;
        },
        set: function (value) {
            if (this._database !== value) {
                this._database = value;
                if (this._databaseObserver) {
                    this._databaseObserver.next(value);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Sqlite3DatabaseService.prototype.connect = function () {
        return this.database ? true : false;
    };
    Sqlite3DatabaseService.prototype.delete = function (table) {
        return this.push(table, null);
    };
    Sqlite3DatabaseService.prototype.pull = function (table) {
        if (this.connect()) {
            if (this._localStorage.hasOwnProperty(table)) {
                try {
                    return JSON.parse(this._localStorage[table]);
                }
                catch (e) {
                    return {};
                }
            }
        }
        return null;
    };
    Sqlite3DatabaseService.prototype.push = function (key, value) {
        if (this.connect()) {
            if (!value) {
                delete this._localStorage[key];
                this.dbDelete(key)
                    .then(function (rc) {
                    return rc;
                });
            }
            else {
                this._localStorage[key] = JSON.stringify(value);
                this.sync(key, value)
                    .then(function (rc) {
                    return rc;
                });
            }
        }
        return false;
    };
    Sqlite3DatabaseService.prototype.exists = function (table) {
        if (this.connect()) {
            return this._localStorage.hasOwnProperty(table);
        }
        return false;
    };
    Sqlite3DatabaseService.prototype.zero = function (criteria) {
        var _this = this;
        if (criteria === void 0) { criteria = null; }
        var tables = this.tables;
        if (tables.length) {
            tables.forEach(function (table) {
                if (criteria) {
                    if (table.indexOf(criteria) !== -1) {
                        _this.delete(table);
                    }
                }
                else {
                    _this.delete(table);
                }
            });
        }
    };
    Sqlite3DatabaseService.prototype.dbDelete = function (key) {
        var _this = this;
        if (this.connect()) {
            this.database.execSQL(StateModelSql.delete, [key])
                .toPromise()
                .then(function (item) {
                _this.consoleLogRecord(0, item);
                return Promise.resolve(true);
            })
                .catch(this.handleError);
        }
        else {
            return Promise.resolve(false);
        }
    };
    /*private getHeroes(): Promise<Boolean> {
     return this.http.get(this.heroesUrl)
     .toPromise()
     .then(response => response.json().data as Hero[])
     .catch(this.handleError);
     }*/
    Sqlite3DatabaseService.prototype.dbInsert = function (key, value) {
        var _this = this;
        this.consoleLogMsg('sqlite-database.service', 'dbInsert');
        if (this.connect()) {
            this.database.execSQL(StateModelSql.insert, [key, String(value)])
                .toPromise()
                .then(function (item) {
                _this.consoleLogRecord(0, item);
                return Promise.resolve(true);
            })
                .catch(this.handleError);
        }
        else {
            return Promise.resolve(false);
        }
    };
    Sqlite3DatabaseService.prototype.fetch = function () {
        var _this = this;
        this.consoleLogMsg('sqlite-database.service', 'fetch');
        var data = [], rc = {};
        if (this.connect) {
            this.consoleLogMsg('sqlite-database.service', StateModelSql.selectAll);
            this.database.all(StateModelSql.selectAll).then(function (items) {
                if (items && items.length) {
                    items.forEach(function (item, index) {
                        var configRecord = new __WEBPACK_IMPORTED_MODULE_3__config_record_model__["a" /* ConfigRecord */](item.hasOwnProperty('key') ? item.key : null, item.hasOwnProperty('value') ? item.value : null);
                        _this.consoleLogRecord(index, configRecord);
                        data.push(configRecord);
                    });
                }
                else {
                    var state = new __WEBPACK_IMPORTED_MODULE_3__config_record_model__["a" /* ConfigRecord */]('level', '1');
                    data.push(state);
                }
                if (data.length) {
                    _this._isEmpty = false;
                    data.forEach(function (rec) {
                        rc[rec.key] = rec.value;
                    });
                }
            }, function (error) {
                _this.consoleLogMsg('sqlite-database.service', 'fetch error: ' + error);
            });
        }
        return rc;
    };
    Sqlite3DatabaseService.prototype.dbUpdate = function (key, value) {
        var _this = this;
        this.consoleLogMsg('sqlite-database.service', 'dbUpdate');
        if (this.connect()) {
            this.database.execSQL(StateModelSql.update, [key, String(value)])
                .toPromise()
                .then(function (item) {
                _this.consoleLogRecord(0, item);
                return Promise.resolve(true);
            })
                .catch(this.handleError);
        }
        else {
            return Promise.resolve(false);
        }
    };
    Sqlite3DatabaseService.prototype.sync = function (key, value) {
        var _this = this;
        this.consoleLogMsg('sqlite-database.service', 'sync');
        if (this.connect()) {
            this.database.execSQL(StateModelSql.count, [key])
                .toPromise()
                .then(function (item) {
                if (item.hasOwnProperty('count') && (+item.count) > 0) {
                    return _this.dbUpdate(key, value);
                }
                else {
                    return _this.dbInsert(key, value);
                }
            })
                .catch(this.handleError);
        }
        else {
            return Promise.resolve(false);
        }
    };
    Sqlite3DatabaseService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.resolve(false);
    };
    return Sqlite3DatabaseService;
}(__WEBPACK_IMPORTED_MODULE_4__base_service__["a" /* BaseService */]));
Sqlite3DatabaseService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], Sqlite3DatabaseService);

//# sourceMappingURL=sqlite3-database.service.js.map

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__database_sqlite3_database_service__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__board_index__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__database_local_storage_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__state_state_service__ = __webpack_require__(78);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "LocalStorageService", function() { return __WEBPACK_IMPORTED_MODULE_2__database_local_storage_service__["a"]; });
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__database_database_service_interface__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__database_database_service_interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__database_database_service_interface__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__database_database_service_interface__, "StateService")) __webpack_require__.d(__webpack_exports__, "StateService", function() { return __WEBPACK_IMPORTED_MODULE_4__database_database_service_interface__["StateService"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__database_database_service_interface__, "ActionsEnum")) __webpack_require__.d(__webpack_exports__, "ActionsEnum", function() { return __WEBPACK_IMPORTED_MODULE_4__database_database_service_interface__["ActionsEnum"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__database_database_service_interface__, "Board")) __webpack_require__.d(__webpack_exports__, "Board", function() { return __WEBPACK_IMPORTED_MODULE_4__database_database_service_interface__["Board"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__database_database_service_interface__, "BoardService")) __webpack_require__.d(__webpack_exports__, "BoardService", function() { return __WEBPACK_IMPORTED_MODULE_4__database_database_service_interface__["BoardService"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__database_database_service_interface__, "ActionsService")) __webpack_require__.d(__webpack_exports__, "ActionsService", function() { return __WEBPACK_IMPORTED_MODULE_4__database_database_service_interface__["ActionsService"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__state_state_service_interface__ = __webpack_require__(121);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_5__state_state_service_interface__, "StateService")) __webpack_require__.d(__webpack_exports__, "StateService", function() { return __WEBPACK_IMPORTED_MODULE_5__state_state_service_interface__["StateService"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_5__state_state_service_interface__, "ActionsEnum")) __webpack_require__.d(__webpack_exports__, "ActionsEnum", function() { return __WEBPACK_IMPORTED_MODULE_5__state_state_service_interface__["ActionsEnum"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_5__state_state_service_interface__, "Board")) __webpack_require__.d(__webpack_exports__, "Board", function() { return __WEBPACK_IMPORTED_MODULE_5__state_state_service_interface__["Board"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_5__state_state_service_interface__, "BoardService")) __webpack_require__.d(__webpack_exports__, "BoardService", function() { return __WEBPACK_IMPORTED_MODULE_5__state_state_service_interface__["BoardService"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_5__state_state_service_interface__, "ActionsService")) __webpack_require__.d(__webpack_exports__, "ActionsService", function() { return __WEBPACK_IMPORTED_MODULE_5__state_state_service_interface__["ActionsService"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "StateService", function() { return __WEBPACK_IMPORTED_MODULE_3__state_state_service__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "Board", function() { return __WEBPACK_IMPORTED_MODULE_1__board_index__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "BoardService", function() { return __WEBPACK_IMPORTED_MODULE_1__board_index__["a"]; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PUZZLE_PROVIDERS", function() { return PUZZLE_PROVIDERS; });




var PUZZLE_PROVIDERS = [
    __WEBPACK_IMPORTED_MODULE_2__database_local_storage_service__["a" /* LocalStorageService */],
    __WEBPACK_IMPORTED_MODULE_0__database_sqlite3_database_service__["a" /* Sqlite3DatabaseService */],
    __WEBPACK_IMPORTED_MODULE_3__state_state_service__["a" /* StateService */],
    __WEBPACK_IMPORTED_MODULE_1__board_index__["a" /* BoardService */]
];






//# sourceMappingURL=index.js.map

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_share__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_share__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__database_local_storage_service__ = __webpack_require__(36);
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
    function StateService(databaseService) {
        var _this = this;
        this.databaseService = databaseService;
        this._stateEvent = 'init';
        this.stateEventChange$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) { return _this._stateEventObserver = observer; }).share();
    }
    Object.defineProperty(StateService.prototype, "stateEvent", {
        get: function () {
            return this._stateEvent;
        },
        set: function (value) {
            if (this.stateEvent !== value) {
                this.stateEvent = value;
                if (this._stateEventObserver) {
                    this._stateEventObserver.next(value);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    return StateService;
}());
StateService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__database_local_storage_service__["a" /* LocalStorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__database_local_storage_service__["a" /* LocalStorageService */]) === "function" && _a || Object])
], StateService);

var _a;
//# sourceMappingURL=state.service.js.map

/***/ })

},[212]);
//# sourceMappingURL=main.bundle.js.map