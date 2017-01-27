"use strict";
var Sqlite = require('nativescript-sqlite');
var immutable_1 = require("immutable");
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/share");
var score_1 = require("./score");
var score_sql_1 = require("./score.sql");
var db_base_service_1 = require("../db-base.service");
var ScoreService = (function (_super) {
    __extends(ScoreService, _super);
    function ScoreService() {
        var _this = _super.call(this) || this;
        _this._data = immutable_1.List([]);
        _this._minMoves = null;
        _this._level = null;
        _this.dataChange$ = new Observable_1.Observable(function (observer) { return _this._dataObserver = observer; }).share();
        _this.minMovesChange$ = new Observable_1.Observable(function (observer) { return _this._minMovesObserver = observer; }).share();
        _this.levelChange$ = new Observable_1.Observable(function (observer) { return _this._levelObserver = observer; }).share();
        _this.nextRowChange$ = new Observable_1.Observable(function (observer) { return _this._nextRowObserver = observer; }).share();
        _this.subscriptions.push(_this.databaseChange$
            .subscribe(function (database) { return _this.onDatabaseChange(database); }));
        return _this;
    }
    Object.defineProperty(ScoreService.prototype, "nextRow", {
        get: function () {
            return this._nextRow;
        },
        set: function (value) {
            this.consoleLogMsg('score.service', 'set nextRow');
            if (this._nextRow !== value) {
                this._nextRow = value;
                if (this._nextRowObserver) {
                    this._nextRowObserver.next(value);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScoreService.prototype, "nextId", {
        get: function () {
            return this._nextId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScoreService.prototype, "data", {
        get: function () {
            return this._data.toArray();
        },
        set: function (value) {
            this.consoleLogMsg('score.service', 'set data');
            var list = immutable_1.List(value);
            this._data = list;
            if (this._dataObserver) {
                this._dataObserver.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScoreService.prototype, "minMoves", {
        get: function () {
            return this._minMoves;
        },
        set: function (value) {
            if (this._minMoves != value) {
                this._minMoves = value;
                if (this._minMovesObserver) {
                    this._minMovesObserver.next(value);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScoreService.prototype, "level", {
        get: function () {
            return this._level;
        },
        set: function (value) {
            if (this._level !== value) {
                this._level = value;
                this.fetch(value);
                if (this._levelObserver) {
                    this._levelObserver.next(value);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ScoreService.prototype.truncate = function () {
        var _this = this;
        this.consoleLogMsg('score.service', 'truncate');
        if (this.database) {
            this.consoleLogMsg('score.service', score_sql_1.ScoreSql.dropHighScore);
            this.database.execSQL(score_sql_1.ScoreSql.dropHighScore)
                .then(function (err) {
                if (err) {
                    _this.consoleLogMsg('score.service', 'ERROR: Attempt to drop the high_scores table failed.');
                    return;
                }
                _this.consoleLogMsg('score.service', score_sql_1.ScoreSql.createHighScore);
                _this.database.execSQL(score_sql_1.ScoreSql.createHighScore)
                    .then(function (err) {
                    if (err) {
                        _this.consoleLogMsg('score.service', 'ERROR: Attempt to create the high_scores table failed.');
                        return;
                    }
                    _this._data = immutable_1.List([]);
                    _this.fetch(_this.level);
                });
            });
        }
    };
    ScoreService.prototype.insert = function (score) {
        var _this = this;
        this.consoleLogMsg('score.service', 'insert');
        this.consoleLogRecord(0, score);
        if (this.database) {
            this.database.execSQL(score_sql_1.ScoreSql.insertHighScore, [score.id, score.user, score.time, score.moves, score.level])
                .then(function (item) {
                _this.consoleLogRecord(0, item);
            });
        }
    };
    ScoreService.prototype.fetch = function (level) {
        var _this = this;
        this.consoleLogMsg('score.service', 'fetch');
        var scores = [], row = 1;
        if (this.database) {
            this.database.all(score_sql_1.ScoreSql.selectHighScore).then(function (items) {
                if (items && items.length) {
                    items.forEach(function (item, index) {
                        var score = new score_1.Score(item.hasOwnProperty('id') ? +(item.id) : 1, item.hasOwnProperty('user') ? item.user : null, item.hasOwnProperty('time') ? item.time : null, item.hasOwnProperty('moves') ? +(item.moves) : 0, item.hasOwnProperty('level') ? +(item.level) : 1, item.hasOwnProperty('id') && +(item.id) % 2 === 0 ? 'highScoreEven' : 'highScoreOdd');
                        score.row = row;
                        _this.consoleLogRecord(index, score);
                        scores.push(score);
                        row++;
                    });
                    _this.data = scores;
                    _this.calc();
                }
                else {
                    _this.minMoves = 0;
                    _this.data = [];
                }
            }, function (error) {
                _this.consoleLogMsg("SELECT ERROR", error);
            });
        }
    };
    ScoreService.prototype.isHighScore = function (moves, level) {
        this.consoleLogMsg('score.service', 'isHighScore');
        if (level === this.level && this.minMoves) {
            return moves < this.minMoves ? true : false;
        }
        return false;
    };
    ScoreService.prototype.calc = function () {
        this.calcMinMoves();
        this.calcNextId();
        this.calcNextRow();
    };
    ScoreService.prototype.onDatabaseChange = function (database) {
        this.consoleLogMsg('score.service', 'onDatabaseChange');
        if (database && this.level) {
            this.fetch(this.level);
        }
        else {
            this.consoleLogMsg('score.service', 'WARNING: No level set in the score service.');
        }
    };
    ScoreService.prototype.calcMinMoves = function () {
        this.consoleLogMsg('score.service', 'calcMinMoves');
        var moves = 0;
        if (this._data.size > 0) {
            this._data.map(function (score) {
                if (moves === 0 || score.moves < moves) {
                    moves = score.moves;
                }
            });
        }
        this._minMoves = moves;
    };
    ScoreService.prototype.calcNextId = function () {
        this.consoleLogMsg('score.service', 'calcNextId');
        var id = 1;
        if (this._data.size > 0) {
            this._data.map(function (score) {
                if (score.id > id) {
                    id = score.id;
                }
            });
            id++;
        }
        this._nextId = id;
        this.consoleLogMsg('score.service', 'nextId = ' + this.nextId);
    };
    ScoreService.prototype.calcNextRow = function () {
        this.consoleLogMsg('score.service', 'calcNextRow');
        var row = 1;
        if (this._data.size > 0) {
            this._data.map(function (score) {
                if (score.row > row) {
                    row = score.row;
                }
            });
            row++;
        }
        this.nextRow = row;
        this.consoleLogMsg('score.service', 'nextRow = ' + this.nextRow);
    };
    return ScoreService;
}(db_base_service_1.DbBaseService));
ScoreService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ScoreService);
exports.ScoreService = ScoreService;
