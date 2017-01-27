"use strict";
var Sqlite = require('nativescript-sqlite');
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/share");
var config_1 = require("./config");
var base_1 = require("../base");
var DbBaseService = (function (_super) {
    __extends(DbBaseService, _super);
    function DbBaseService() {
        var _this = _super.call(this) || this;
        _this._database = null;
        _this.databaseChange$ = new Observable_1.Observable(function (observer) { return _this._databaseObserver = observer; }).share();
        (new Sqlite(config_1.Config.dbFile)).then(function (db) {
            db.resultType(Sqlite.RESULTSASOBJECT);
            db.valueType(Sqlite.VALUESARENATIVE);
            _this.database = db;
        }, function (error) {
            _this.consoleLogMsg("OPEN DB ERROR", error);
        });
        return _this;
    }
    Object.defineProperty(DbBaseService.prototype, "database", {
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
    return DbBaseService;
}(base_1.Base));
exports.DbBaseService = DbBaseService;
