"use strict";
var Sqlite = require('nativescript-sqlite'), frame = require('ui/frame'), dbFile = 'highscore.db';
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/share");
var score_1 = require("./score");
var sql_1 = require("./sql");
var ScoreService = (function () {
    function ScoreService() {
        var _this = this;
        this.highScoreChange$ = new Observable_1.Observable(function (observer) { return _this._highScoreObserver = observer; }).share();
        this._dbFile = this._dbName = dbFile;
    }
    Object.defineProperty(ScoreService.prototype, "highScore", {
        get: function () {
            return this._highScore;
        },
        set: function (score) {
            if (this._highScore !== score) {
                this._highScore = score;
                if (this._highScoreObserver) {
                    this._highScoreObserver.next(score);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ScoreService.prototype.connect = function (fn, scope) {
        var _this = this;
        this.consoleLogMsg('score.service', 'connect');
        if (!Sqlite.exists(this._dbFile)) {
            Sqlite.copyDatabase(this._dbFile);
        }
        this._dbPromise = new Sqlite(this._dbName, function (err, dbConnection) {
            if (err) {
                _this.handleErrors(err);
            }
            else {
                dbConnection.resultType(Sqlite.RESULTSASOBJECT);
                if (typeof fn === 'function') {
                    if (scope) {
                        fn.apply(scope, [dbConnection]);
                    }
                    else {
                        fn(dbConnection);
                    }
                }
                dbConnection.close();
            }
        });
    };
    ScoreService.prototype.insert = function (db, record, fn, scope) {
        var _this = this;
        this.consoleLogMsg('score.service', 'insert');
        var rs = null;
        if (db) {
            db.execSQL(sql_1.Sql.insertHighScore, [record.id, record.user, record.time, record.moves, record.level], function (err, rs) {
                if (err) {
                    _this.handleErrors(err);
                }
                else {
                    _this.consoleLogRecord(record.id, record);
                    if (typeof fn === 'function') {
                        if (scope) {
                            fn.apply(scope, [record]);
                        }
                        else {
                            fn(record);
                        }
                    }
                }
            });
        }
        else {
            if (typeof fn === 'function') {
                if (scope) {
                    fn.apply(scope, [null]);
                }
                else {
                    fn(null);
                }
            }
        }
    };
    ScoreService.prototype.select = function (db, fn, scope) {
        var _this = this;
        this.consoleLogMsg('score.service', 'select');
        var scores = [];
        if (db) {
            db.resultType(Sqlite.RESULTSASOBJECT);
            db.valueType(Sqlite.VALUESARENATIVE);
            db.all(sql_1.Sql.selectHighScore, function (err, items) {
                if (err) {
                    _this.handleErrors(err);
                }
                else {
                    if (items && items.length) {
                        items.forEach(function (item, index) {
                            var score = new score_1.Score();
                            score.id = item.hasOwnProperty('id') ? +(item.id) : 1,
                                score.user = item.hasOwnProperty('user') ? item.user : null,
                                score.time = item.hasOwnProperty('time') ? item.time : null,
                                score.moves = item.hasOwnProperty('moves') ? +(item.moves) : 0,
                                score.level = item.hasOwnProperty('level') ? +(item.level) : 1,
                                score.cssClass = score.id % 2 === 0 ? 'highScoreEven' : 'highScoreOdd';
                            _this.consoleLogRecord(index, score);
                            scores.push(score);
                        });
                    }
                    if (typeof fn === 'function') {
                        if (scope) {
                            fn.apply(scope, [scores]);
                        }
                        else {
                            fn(scores);
                        }
                    }
                }
            });
        }
        else {
            if (typeof fn === 'function') {
                if (scope) {
                    fn.apply(scope, [null]);
                }
                else {
                    fn(null);
                }
            }
        }
    };
    ScoreService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return Observable_1.Observable.throw(error);
    };
    ScoreService.prototype.consoleLogMsg = function (tag, msg) {
        console.log(tag + ': ' + msg);
    };
    ScoreService.prototype.consoleLogRecord = function (i, model) {
        console.log('high score #' + i + ' = { id: ' + model.id + ', user: ' + model.user + ', time: ' + model.time + ', moves: ' + model.moves + ', level: ' + model.level + ' }');
    };
    return ScoreService;
}());
ScoreService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ScoreService);
exports.ScoreService = ScoreService;
//# sourceMappingURL=score.service.js.map