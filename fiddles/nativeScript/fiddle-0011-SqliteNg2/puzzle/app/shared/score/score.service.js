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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NvcmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNjb3JlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBRTlDLHVDQUErQjtBQUMvQixzQ0FBeUM7QUFDekMsOENBQTJDO0FBRzNDLGlDQUErQjtBQUMvQixtQ0FBaUM7QUFHakMsaUNBQThCO0FBQzlCLHlDQUFxQztBQUNyQyxzREFBaUQ7QUFHakQsSUFBYSxZQUFZO0lBQVMsZ0NBQWE7SUE0RTdDO1FBQUEsWUFDRSxpQkFBTyxTQTJCUjtRQXpCQyxLQUFJLENBQUMsS0FBSyxHQUFHLGdCQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFbkIsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHVCQUFVLENBQy9CLFVBQUMsUUFBYSxJQUFLLE9BQUEsS0FBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLEVBQTdCLENBQTZCLENBQ2pELENBQUMsS0FBSyxFQUFFLENBQUM7UUFFVixLQUFJLENBQUMsZUFBZSxHQUFHLElBQUksdUJBQVUsQ0FDbkMsVUFBQyxRQUFhLElBQUssT0FBQSxLQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxFQUFqQyxDQUFpQyxDQUNyRCxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRVYsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLHVCQUFVLENBQ2hDLFVBQUMsUUFBYSxJQUFLLE9BQUEsS0FBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLEVBQTlCLENBQThCLENBQ2xELENBQUMsS0FBSyxFQUFFLENBQUM7UUFFVixLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksdUJBQVUsQ0FDbEMsVUFBQyxRQUFhLElBQUssT0FBQSxLQUFJLENBQUMsZ0JBQWdCLEdB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QUFDLENBQUM7b0JBQ3BCLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUNsQixDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDSCxHQUFHLEVBQUUsQ0FBQztRQUNSLENBQUM7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFSCxtQkFBQztBQUFELENBQUMsQUFqUEQsQ0FBa0MsK0JBQWEsR0FpUDlDO0FBalBZLFlBQVk7SUFEeEIsaUJBQVUsRUFBRTs7R0FDQSxZQUFZLENBaVB4QjtBQWpQWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFNxbGl0ZSA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1zcWxpdGUnKTtcblxuaW1wb3J0IHtMaXN0fSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7T2JzZXJ2ZXJ9ICAgZnJvbSAncnhqcy9PYnNlcnZlcic7XG5cbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3Ivc2hhcmUnO1xuXG5cbmltcG9ydCB7U2NvcmV9IGZyb20gJy4vc2NvcmUnO1xuaW1wb3J0IHtTY29yZVNxbH0gZnJvbSAnLi9zY29yZS5zcWwnO1xuaW1wb3J0IHtEYkJhc2VTZXJ2aWNlfSBmcm9tICcuLi9kYi1iYXNlLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2NvcmVTZXJ2aWNlIGV4dGVuZHMgRGJCYXNlU2VydmljZSB7XG5cbiAgZGF0YUNoYW5nZSQ6IE9ic2VydmFibGU8U2NvcmVbXT47XG4gIG1pbk1vdmVzQ2hhbmdlJDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBsZXZlbENoYW5nZSQ6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgbmV4dFJvd0NoYW5nZSQ6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBwcml2YXRlIF9uZXh0SWQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBfbmV4dFJvdzogbnVtYmVyO1xuICBwcml2YXRlIF9uZXh0Um93T2JzZXJ2ZXI6IE9ic2VydmVyPG51bWJlcj47XG4gIHByaXZhdGUgX2RhdGE6IExpc3Q8U2NvcmU+O1xuICBwcml2YXRlIF9kYXRhT2JzZXJ2ZXI6IE9ic2VydmVyPFNjb3JlW10+O1xuICBwcml2YXRlIF9taW5Nb3ZlczogbnVtYmVyO1xuICBwcml2YXRlIF9taW5Nb3Zlc09ic2VydmVyOiBPYnNlcnZlcjxudW1iZXI+O1xuICBwcml2YXRlIF9sZXZlbDogbnVtYmVyO1xuICBwcml2YXRlIF9sZXZlbE9ic2VydmVyOiBPYnNlcnZlcjxudW1iZXI+O1xuXG5cbiAgZ2V0IG5leHRSb3coKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmV4dFJvdztcbiAgfVxuXG4gIHNldCBuZXh0Um93KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ3Njb3JlLnNlcnZpY2UnLCAnc2V0IG5leHRSb3cnKTtcbiAgICBpZiAodGhpcy5fbmV4dFJvdyAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX25leHRSb3cgPSB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLl9uZXh0Um93T2JzZXJ2ZXIpIHtcbiAgICAgICAgdGhpcy5fbmV4dFJvd09ic2VydmVyLm5leHQodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldCBuZXh0SWQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbmV4dElkO1xuICB9XG5cbiAgZ2V0IGRhdGEoKTogU2NvcmVbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGEudG9BcnJheSgpO1xuICB9XG5cbiAgc2V0IGRhdGEodmFsdWU6IFNjb3JlW10pIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ3Njb3JlLnNlcnZpY2UnLCAnc2V0IGRhdGEnKTtcbiAgICBsZXQgbGlzdDogTGlzdDxTY29yZT4gPSBMaXN0KHZhbHVlKTtcbiAgICB0aGlzLl9kYXRhID0gbGlzdDtcbiAgICBpZiAodGhpcy5fZGF0YU9ic2VydmVyKSB7XG4gICAgICB0aGlzLl9kYXRhT2JzZXJ2ZXIubmV4dCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG1pbk1vdmVzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21pbk1vdmVzO1xuICB9XG5cbiAgc2V0IG1pbk1vdmVzKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fbWluTW92ZXMgIT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX21pbk1vdmVzID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5fbWluTW92ZXNPYnNlcnZlcikge1xuICAgICAgICB0aGlzLl9taW5Nb3Zlc09ic2VydmVyLm5leHQodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldCBsZXZlbCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9sZXZlbDtcbiAgfVxuXG4gIHNldCBsZXZlbCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX2xldmVsICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fbGV2ZWwgPSB2YWx1ZTtcbiAgICAgIHRoaXMuZmV0Y2godmFsdWUpO1xuICAgICAgaWYgKHRoaXMuX2xldmVsT2JzZXJ2ZXIpIHtcbiAgICAgICAgdGhpcy5fbGV2ZWxPYnNlcnZlci5uZXh0KHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fZGF0YSA9IExpc3QoW10pO1xuICAgIHRoaXMuX21pbk1vdmVzID0gbnVsbDtcbiAgICB0aGlzLl9sZXZlbCA9IG51bGw7XG5cbiAgICB0aGlzLmRhdGFDaGFuZ2UkID0gbmV3IE9ic2VydmFibGU8U2NvcmVbXT4oXG4gICAgICAob2JzZXJ2ZXI6IGFueSkgPT4gdGhpcy5fZGF0YU9ic2VydmVyID0gb2JzZXJ2ZXJcbiAgICApLnNoYXJlKCk7XG5cbiAgICB0aGlzLm1pbk1vdmVzQ2hhbmdlJCA9IG5ldyBPYnNlcnZhYmxlPG51bWJlcj4oXG4gICAgICAob2JzZXJ2ZXI6IGFueSkgPT4gdGhpcy5fbWluTW92ZXNPYnNlcnZlciA9IG9ic2VydmVyXG4gICAgKS5zaGFyZSgpO1xuXG4gICAgdGhpcy5sZXZlbENoYW5nZSQgPSBuZXcgT2JzZXJ2YWJsZTxudW1iZXI+KFxuICAgICAgKG9ic2VydmVyOiBhbnkpID0+IHRoaXMuX2xldmVsT2JzZXJ2ZXIgPSBvYnNlcnZlclxuICAgICkuc2hhcmUoKTtcblxuICAgIHRoaXMubmV4dFJvd0NoYW5nZSQgPSBuZXcgT2JzZXJ2YWJsZTxudW1iZXI+KFxuICAgICAgKG9ic2VydmVyOiBhbnkpID0+IHRoaXMuX25leHRSb3dPYnNlcnZlciA9IG9ic2VydmVyXG4gICAgKS5zaGFyZSgpO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5kYXRhYmFzZUNoYW5nZSRcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIChkYXRhYmFzZTogYW55KSA9PiB0aGlzLm9uRGF0YWJhc2VDaGFuZ2UoZGF0YWJhc2UpXG4gICAgICApKTtcblxuICB9XG5cbiAgdHJ1bmNhdGUoKSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdzY29yZS5zZXJ2aWNlJywgJ3RydW5jYXRlJyk7XG4gICAgaWYgKHRoaXMuZGF0YWJhc2UpIHtcbiAgICAgIHRoaXMuY29uc29sZUxvZ01zZygnc2NvcmUuc2VydmljZScsIFNjb3JlU3FsLmRyb3BIaWdoU2NvcmUpO1xuICAgICAgdGhpcy5kYXRhYmFzZS5leGVjU1FMKFNjb3JlU3FsLmRyb3BIaWdoU2NvcmUpXG4gICAgICAgIC50aGVuKChlcnI6YW55KSA9PiB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgdGhpcy5jb25zb2xlTG9nTXNnKCdzY29yZS5zZXJ2aWNlJywgJ0VSUk9SOiBBdHRlbXB0IHRvIGRyb3AgdGhlIGhpZ2hfc2NvcmVzIHRhYmxlIGZhaWxlZC4nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jb25zb2xlTG9nTXNnKCdzY29yZS5zZXJ2aWNlJywgU2NvcmVTcWwuY3JlYXRlSGlnaFNjb3JlKTtcbiAgICAgICAgICB0aGlzLmRhdGFiYXNlLmV4ZWNTUUwoU2NvcmVTcWwuY3JlYXRlSGlnaFNjb3JlKVxuICAgICAgICAgICAgLnRoZW4oKGVycjphbnkpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHRoaXMuY29uc29sZUxvZ01zZygnc2NvcmUuc2VydmljZScsICdFUlJPUjogQXR0ZW1wdCB0byBjcmVhdGUgdGhlIGhpZ2hfc2NvcmVzIHRhYmxlIGZhaWxlZC4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5fZGF0YSA9IExpc3QoW10pO1xuICAgICAgICAgICAgICB0aGlzLmZldGNoKHRoaXMubGV2ZWwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGluc2VydChzY29yZTogU2NvcmUpIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ3Njb3JlLnNlcnZpY2UnLCAnaW5zZXJ0Jyk7XG4gICAgdGhpcy5jb25zb2xlTG9nUmVjb3JkKDAsIHNjb3JlKTtcbiAgICBpZiAodGhpcy5kYXRhYmFzZSkge1xuICAgICAgdGhpcy5kYXRhYmFzZS5leGVjU1FMKFNjb3JlU3FsLmluc2VydEhpZ2hTY29yZSwgW3Njb3JlLmlkLCBzY29yZS51c2VyLCBzY29yZS50aW1lLCBzY29yZS5tb3Zlcywgc2NvcmUubGV2ZWxdKVxuICAgICAgICAudGhlbigoaXRlbTogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy5jb25zb2xlTG9nUmVjb3JkKDAsIGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmZXRjaChsZXZlbDogbnVtYmVyKSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdzY29yZS5zZXJ2aWNlJywgJ2ZldGNoJyk7XG4gICAgbGV0IHNjb3JlczogU2NvcmVbXSA9IFtdLFxuICAgICAgcm93OiBudW1iZXIgPSAxO1xuICAgIGlmICh0aGlzLmRhdGFiYXNlKSB7XG4gICAgICB0aGlzLmRhdGFiYXNlLmFsbChTY29yZVNxbC5zZWxlY3RIaWdoU2NvcmUpLnRoZW4oKGl0ZW1zOiBhbnlbXSkgPT4ge1xuICAgICAgICBpZiAoaXRlbXMgJiYgaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbTogYW55LCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2NvcmU6IFNjb3JlID0gbmV3IFNjb3JlKFxuICAgICAgICAgICAgICBpdGVtLmhhc093blByb3BlcnR5KCdpZCcpID8gKyhpdGVtLmlkKSA6IDEsXG4gICAgICAgICAgICAgIGl0ZW0uaGFzT3duUHJvcGVydHkoJ3VzZXInKSA/IGl0ZW0udXNlciA6IG51bGwsXG4gICAgICAgICAgICAgIGl0ZW0uaGFzT3duUHJvcGVydHkoJ3RpbWUnKSA/IGl0ZW0udGltZSA6IG51bGwsXG4gICAgICAgICAgICAgIGl0ZW0uaGFzT3duUHJvcGVydHkoJ21vdmVzJykgPyArKGl0ZW0ubW92ZXMpIDogMCxcbiAgICAgICAgICAgICAgaXRlbS5oYXNPd25Qcm9wZXJ0eSgnbGV2ZWwnKSA/ICsoaXRlbS5sZXZlbCkgOiAxLFxuICAgICAgICAgICAgICBpdGVtLmhhc093blByb3BlcnR5KCdpZCcpICYmICsoaXRlbS5pZCkgJSAyID09PSAwID8gJ2hpZ2hTY29yZUV2ZW4nIDogJ2hpZ2hTY29yZU9kZCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBzY29yZS5yb3cgPSByb3c7XG4gICAgICAgICAgICB0aGlzLmNvbnNvbGVMb2dSZWNvcmQoaW5kZXgsIHNjb3JlKTtcbiAgICAgICAgICAgIHNjb3Jlcy5wdXNoKHNjb3JlKTtcbiAgICAgICAgICAgIHJvdysrO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuZGF0YSA9IHNjb3JlcztcbiAgICAgICAgICB0aGlzLmNhbGMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm1pbk1vdmVzID0gMDtcbiAgICAgICAgICB0aGlzLmRhdGEgPSBbXTtcbiAgICAgICAgfVxuICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICB0aGlzLmNvbnNvbGVMb2dNc2coXCJTRUxFQ1QgRVJST1JcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cblxuICBpc0hpZ2hTY29yZShtb3ZlczogbnVtYmVyLCBsZXZlbDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdzY29yZS5zZXJ2aWNlJywgJ2lzSGlnaFNjb3JlJyk7XG4gICAgaWYgKGxldmVsID09PSB0aGlzLmxldmVsICYmIHRoaXMubWluTW92ZXMpIHtcbiAgICAgIHJldHVybiBtb3ZlcyA8IHRoaXMubWluTW92ZXMgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNhbGMoKSB7XG4gICAgdGhpcy5jYWxjTWluTW92ZXMoKTtcbiAgICB0aGlzLmNhbGNOZXh0SWQoKTtcbiAgICB0aGlzLmNhbGNOZXh0Um93KCk7XG4gIH1cblxuICBvbkRhdGFiYXNlQ2hhbmdlKGRhdGFiYXNlOiBhbnkpIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ3Njb3JlLnNlcnZpY2UnLCAnb25EYXRhYmFzZUNoYW5nZScpO1xuICAgIGlmIChkYXRhYmFzZSAmJiB0aGlzLmxldmVsKSB7XG4gICAgICB0aGlzLmZldGNoKHRoaXMubGV2ZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ3Njb3JlLnNlcnZpY2UnLCAnV0FSTklORzogTm8gbGV2ZWwgc2V0IGluIHRoZSBzY29yZSBzZXJ2aWNlLicpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2FsY01pbk1vdmVzKCkge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnc2NvcmUuc2VydmljZScsICdjYWxjTWluTW92ZXMnKTtcbiAgICBsZXQgbW92ZXM6IG51bWJlciA9IDA7XG4gICAgaWYgKHRoaXMuX2RhdGEuc2l6ZSA+IDApIHtcbiAgICAgIHRoaXMuX2RhdGEubWFwKChzY29yZTogU2NvcmUpID0+IHtcbiAgICAgICAgaWYgKG1vdmVzID09PSAwIHx8IHNjb3JlLm1vdmVzIDwgbW92ZXMpIHtcbiAgICAgICAgICBtb3ZlcyA9IHNjb3JlLm1vdmVzO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5fbWluTW92ZXMgPSBtb3ZlcztcbiAgfVxuXG4gIHByaXZhdGUgY2FsY05leHRJZCgpIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ3Njb3JlLnNlcnZpY2UnLCAnY2FsY05leHRJZCcpO1xuICAgIGxldCBpZDogbnVtYmVyID0gMTtcbiAgICBpZiAodGhpcy5fZGF0YS5zaXplID4gMCkge1xuICAgICAgdGhpcy5fZGF0YS5tYXAoKHNjb3JlOiBTY29yZSkgPT4ge1xuICAgICAgICBpZiAoc2NvcmUuaWQgPiBpZCkge1xuICAgICAgICAgIGlkID0gc2NvcmUuaWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWQrKztcbiAgICB9XG4gICAgdGhpcy5fbmV4dElkID0gaWQ7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdzY29yZS5zZXJ2aWNlJywgJ25leHRJZCA9ICcgKyB0aGlzLm5leHRJZCk7XG4gIH1cblxuICBwcml2YXRlIGNhbGNOZXh0Um93KCkge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnc2NvcmUuc2VydmljZScsICdjYWxjTmV4dFJvdycpO1xuICAgIGxldCByb3c6IG51bWJlciA9IDE7XG4gICAgaWYgKHRoaXMuX2RhdGEuc2l6ZSA+IDApIHtcbiAgICAgIHRoaXMuX2RhdGEubWFwKChzY29yZTogU2NvcmUpID0+IHtcbiAgICAgICAgaWYgKHNjb3JlLnJvdyA+IHJvdykge1xuICAgICAgICAgIHJvdyA9IHNjb3JlLnJvdztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByb3crKztcbiAgICB9XG4gICAgdGhpcy5uZXh0Um93ID0gcm93O1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnc2NvcmUuc2VydmljZScsICduZXh0Um93ID0gJyArIHRoaXMubmV4dFJvdyk7XG4gIH1cblxufVxuIl19