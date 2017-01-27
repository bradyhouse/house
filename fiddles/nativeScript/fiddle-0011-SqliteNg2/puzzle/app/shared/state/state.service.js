"use strict";
var Sqlite = require('nativescript-sqlite');
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/share");
var state_sql_1 = require("./state.sql");
var state_1 = require("./state");
var db_base_service_1 = require("../db-base.service");
var StateService = (function (_super) {
    __extends(StateService, _super);
    function StateService() {
        var _this = _super.call(this) || this;
        _this._state = [];
        _this._isEmpty = true;
        _this.stateChange$ = new Observable_1.Observable(function (observer) { return _this._stateObserver = observer; }).share();
        _this.subscriptions.push(_this.databaseChange$
            .subscribe(function (database) { return _this.onDatabaseChange(database); }));
        return _this;
    }
    Object.defineProperty(StateService.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (value) {
            this._state = value;
            if (this._stateObserver) {
                this._stateObserver.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    StateService.prototype.onDatabaseChange = function (database) {
        this.consoleLogMsg('state.service', 'onDatabaseChange');
        this.fetch();
    };
    StateService.prototype.fetch = function () {
        var _this = this;
        this.consoleLogMsg('state.service', 'fetch');
        var data = [];
        if (this.database) {
            this.consoleLogMsg('state.service', state_sql_1.StateSql.selectAll);
            this.database.all(state_sql_1.StateSql.selectAll).then(function (items) {
                if (items && items.length) {
                    items.forEach(function (item, index) {
                        var state = new state_1.State(item.hasOwnProperty('id') ? +(item.id) : 1, item.hasOwnProperty('key') ? item.key : null, item.hasOwnProperty('value') ? item.value : null);
                        _this.consoleLogRecord(index, state);
                        _this._isEmpty = false;
                        data.push(state);
                    });
                }
                else {
                    var state = new state_1.State(0, 'level', '1');
                    data.push(state);
                }
                _this.state = data;
            }, function (error) {
                _this.consoleLogMsg('state.service', 'fetch error: ' + error);
            });
        }
    };
    StateService.prototype.insert = function (state, fetch) {
        var _this = this;
        if (fetch === void 0) { fetch = false; }
        this.consoleLogMsg('state.service', 'insert');
        if (this.database) {
            this.database.execSQL(state_sql_1.StateSql.insert, [state.id, state.key, state.value])
                .then(function (item) {
                _this.consoleLogRecord(0, item);
                if (fetch) {
                    _this.fetch();
                }
            });
        }
    };
    StateService.prototype.updateLevel = function (level) {
        var _this = this;
        this.consoleLogMsg('state.service', 'updateLevel');
        if (this.database) {
            if (this._isEmpty) {
                this.insert(new state_1.State(0, 'level', String(level)));
            }
            else {
                this.database.execSQL(state_sql_1.StateSql.updateLevel, [level])
                    .then(function (item) {
                    _this.consoleLogRecord(0, item);
                    _this.fetch();
                });
            }
        }
    };
    StateService.prototype.truncate = function () {
        var _this = this;
        this.consoleLogMsg('state.service', 'truncate');
        if (this.database) {
            this.database.execSQL(state_sql_1.StateSql.dropTable)
                .then(function (err) {
                if (err) {
                    _this.consoleLogMsg('state.service', 'ERROR: Attempt to drop the config table failed.');
                    return;
                }
                _this.database.execSQL(state_sql_1.StateSql.createTable)
                    .then(function (err) {
                    if (err) {
                        _this.consoleLogMsg('state.service', 'ERROR: Attempt to create the config table failed.');
                        return;
                    }
                    _this.insert(new state_1.State(0, 'level', '1'), true);
                });
            });
        }
    };
    StateService.prototype.getKeyValue = function (key) {
        this.consoleLogMsg('state.service', 'getKeyValue');
        var arr;
        if (this.state) {
            arr = this.state.filter(function (item) {
                return item.key.toLowerCase() === key.toLowerCase();
            });
            if (arr && arr.length) {
                return arr[0]['value'];
            }
        }
        return null;
    };
    return StateService;
}(db_base_service_1.DbBaseService));
StateService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], StateService);
exports.StateService = StateService;
