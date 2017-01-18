"use strict";
var Sqlite = require('nativescript-sqlite');
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var immutable_1 = require("immutable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/share");
var state_sql_1 = require("./state.sql");
var state_1 = require("./state");
var db_base_service_1 = require("../db-base.service");
var StateService = (function (_super) {
    __extends(StateService, _super);
    function StateService() {
        var _this = _super.call(this) || this;
        _this._state = immutable_1.List([]);
        _this.stateChange$ = new Observable_1.Observable(function (observer) { return _this._stateObserver = observer; }).share();
        _this.subscriptions.push(_this.databaseChange$
            .subscribe(function (database) { return _this.onDatabaseChange(database); }));
        return _this;
    }
    Object.defineProperty(StateService.prototype, "state", {
        get: function () {
            return this._state.toArray();
        },
        set: function (value) {
            var list = immutable_1.List(value);
            this._state = list;
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
            this.database.all(state_sql_1.StateSql.selectAll).then(function (items) {
                if (items && items.length) {
                    items.forEach(function (item, index) {
                        var state = new state_1.State(item.hasOwnProperty('id') ? +(item.id) : 1, item.hasOwnProperty('key') ? item.key : null, item.hasOwnProperty('value') ? item.value : null);
                        _this.consoleLogRecord(index, state);
                        data.push(state);
                    });
                    _this.state = data;
                }
                else {
                    var state = new state_1.State(0, 'level', '1');
                    _this.state = [state];
                }
            }, function (error) {
                _this.consoleLogMsg('state.service', 'fetch error: ' + error);
            });
        }
    };
    StateService.prototype.updateLevel = function (level) {
        var _this = this;
        this.consoleLogMsg('state.service', 'updateLevel');
        if (this.database) {
            this.database.execSQL(state_sql_1.StateSql.updateLevel, [level])
                .then(function (item) {
                _this.consoleLogRecord(0, item);
                _this.fetch();
            });
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
                    _this._state = immutable_1.List([]);
                    _this.fetch();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0YXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBRzlDLHNDQUF5QztBQUN6Qyw4Q0FBMkM7QUFHM0MsdUNBQStCO0FBRS9CLGlDQUErQjtBQUMvQixtQ0FBaUM7QUFFakMseUNBQXFDO0FBQ3JDLGlDQUE4QjtBQUM5QixzREFBa0Q7QUFJbEQsSUFBYSxZQUFZO0lBQVMsZ0NBQWE7SUFtQjdDO1FBQUEsWUFDRSxpQkFBTyxTQWFSO1FBWEMsS0FBSSxDQUFDLE1BQU0sR0FBRyxnQkFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXZCLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSx1QkFBVSxDQUNoQyxVQUFDLFFBQWEsSUFBSyxPQUFBLEtBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxFQUE5QixDQUE4QixDQUNsRCxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRVYsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGVBQWU7YUFDekMsU0FBUyxDQUNSLFVBQUMsUUFBYSxJQUFLLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxFQUEvQixDQUErQixDQUNuRCxDQUFDLENBQUM7O0lBRVAsQ0FBQztJQTFCRCxzQkFBSSwrQkFBSzthQUFUO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDL0IsQ0FBQzthQUVELFVBQVUsS0FBYztZQUN0QixJQUFJLElBQUksR0FBZ0IsZ0JBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxDQUFD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TyxDQUFDLENBQUM7WUFDekIsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVILG1CQUFDO0FBQUQsQ0FBQyxBQXRIRCxDQUFrQywrQkFBYSxHQXNIOUM7QUF0SFksWUFBWTtJQUR4QixpQkFBVSxFQUFFOztHQUNBLFlBQVksQ0FzSHhCO0FBdEhZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgU3FsaXRlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXNxbGl0ZScpO1xuXG5cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQge09ic2VydmVyfSAgIGZyb20gJ3J4anMvT2JzZXJ2ZXInO1xuXG5pbXBvcnQge0xpc3R9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3Ivc2hhcmUnO1xuXG5pbXBvcnQge1N0YXRlU3FsfSBmcm9tICcuL3N0YXRlLnNxbCc7XG5pbXBvcnQge1N0YXRlfSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7RGJCYXNlU2VydmljZSB9IGZyb20gJy4uL2RiLWJhc2Uuc2VydmljZSc7XG5pbXBvcnQge1NoYXJlZFV0aWxzfSBmcm9tICcuLi9zaGFyZWQtdXRpbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RhdGVTZXJ2aWNlIGV4dGVuZHMgRGJCYXNlU2VydmljZSB7XG5cbiAgc3RhdGVDaGFuZ2UkOiBPYnNlcnZhYmxlPFN0YXRlW10+O1xuXG4gIHByaXZhdGUgX3N0YXRlOkxpc3Q8U3RhdGU+O1xuICBwcml2YXRlIF9zdGF0ZU9ic2VydmVyOiBPYnNlcnZlcjxTdGF0ZVtdPjtcblxuICBnZXQgc3RhdGUoKTogU3RhdGVbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlLnRvQXJyYXkoKTtcbiAgfVxuXG4gIHNldCBzdGF0ZSh2YWx1ZTogU3RhdGVbXSkge1xuICAgIGxldCBsaXN0OiBMaXN0PFN0YXRlPiA9IExpc3QodmFsdWUpO1xuICAgIHRoaXMuX3N0YXRlID0gbGlzdDtcbiAgICBpZiAodGhpcy5fc3RhdGVPYnNlcnZlcikge1xuICAgICAgdGhpcy5fc3RhdGVPYnNlcnZlci5uZXh0KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fc3RhdGUgPSBMaXN0KFtdKTtcblxuICAgIHRoaXMuc3RhdGVDaGFuZ2UkID0gbmV3IE9ic2VydmFibGU8U3RhdGVbXT4oXG4gICAgICAob2JzZXJ2ZXI6IGFueSkgPT4gdGhpcy5fc3RhdGVPYnNlcnZlciA9IG9ic2VydmVyXG4gICAgKS5zaGFyZSgpO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5kYXRhYmFzZUNoYW5nZSRcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIChkYXRhYmFzZTogYW55KSA9PiB0aGlzLm9uRGF0YWJhc2VDaGFuZ2UoZGF0YWJhc2UpXG4gICAgICApKTtcblxuICB9XG5cbiAgb25EYXRhYmFzZUNoYW5nZShkYXRhYmFzZTphbnkpIHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ3N0YXRlLnNlcnZpY2UnLCAnb25EYXRhYmFzZUNoYW5nZScpO1xuICAgIHRoaXMuZmV0Y2goKTtcbiAgfVxuXG4gIGZldGNoKCkge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnc3RhdGUuc2VydmljZScsICdmZXRjaCcpO1xuICAgIGxldCBkYXRhOiBTdGF0ZVtdID0gW107XG5cbiAgICBpZiAodGhpcy5kYXRhYmFzZSkge1xuICAgICAgdGhpcy5kYXRhYmFzZS5hbGwoU3RhdGVTcWwuc2VsZWN0QWxsKS50aGVuKChpdGVtczogYW55W10pID0+IHtcbiAgICAgICAgaWYgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgbGV0IHN0YXRlOiBTdGF0ZSA9IG5ldyBTdGF0ZShcbiAgICAgICAgICAgICAgaXRlbS5oYXNPd25Qcm9wZXJ0eSgnaWQnKSA/ICsoaXRlbS5pZCkgOiAxLFxuICAgICAgICAgICAgICBpdGVtLmhhc093blByb3BlcnR5KCdrZXknKSA/IGl0ZW0ua2V5IDogbnVsbCxcbiAgICAgICAgICAgICAgaXRlbS5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSA/IGl0ZW0udmFsdWUgOiBudWxsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5jb25zb2xlTG9nUmVjb3JkKGluZGV4LCBzdGF0ZSk7XG4gICAgICAgICAgICBkYXRhLnB1c2goc3RhdGUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuc3RhdGUgPSBkYXRhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBzdGF0ZSA9IG5ldyBTdGF0ZShcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAnbGV2ZWwnLFxuICAgICAgICAgICAgJzEnXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLnN0YXRlID0gW3N0YXRlXTtcbiAgICAgICAgfVxuICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ3N0YXRlLnNlcnZpY2UnLCAnZmV0Y2ggZXJyb3I6ICcgKyBlcnJvcik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVMZXZlbChsZXZlbDogbnVtYmVyKSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdzdGF0ZS5zZXJ2aWNlJywgJ3VwZGF0ZUxldmVsJyk7XG4gICAgaWYgKHRoaXMuZGF0YWJhc2UpIHtcbiAgICAgIHRoaXMuZGF0YWJhc2UuZXhlY1NRTChTdGF0ZVNxbC51cGRhdGVMZXZlbCwgW2xldmVsXSlcbiAgICAgICAgLnRoZW4oKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICAgIHRoaXMuY29uc29sZUxvZ1JlY29yZCgwLCBpdGVtKTtcbiAgICAgICAgICB0aGlzLmZldGNoKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHRydW5jYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnc3RhdGUuc2VydmljZScsICd0cnVuY2F0ZScpO1xuICAgIGlmICh0aGlzLmRhdGFiYXNlKSB7XG4gICAgICB0aGlzLmRhdGFiYXNlLmV4ZWNTUUwoU3RhdGVTcWwuZHJvcFRhYmxlKVxuICAgICAgICAudGhlbigoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ3N0YXRlLnNlcnZpY2UnLCAnRVJST1I6IEF0dGVtcHQgdG8gZHJvcCB0aGUgY29uZmlnIHRhYmxlIGZhaWxlZC4nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5kYXRhYmFzZS5leGVjU1FMKFN0YXRlU3FsLmNyZWF0ZVRhYmxlKVxuICAgICAgICAgICAgLnRoZW4oKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ3N0YXRlLnNlcnZpY2UnLCAnRVJST1I6IEF0dGVtcHQgdG8gY3JlYXRlIHRoZSBjb25maWcgdGFibGUgZmFpbGVkLicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IExpc3QoW10pO1xuICAgICAgICAgICAgICB0aGlzLmZldGNoKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0S2V5VmFsdWUoa2V5OnN0cmluZyk6IGFueSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdzdGF0ZS5zZXJ2aWNlJywgJ2dldEtleVZhbHVlJyk7XG4gICAgbGV0IGFycjphbnlbXTtcbiAgICBpZiAodGhpcy5zdGF0ZSkge1xuICAgICAgYXJyID0gdGhpcy5zdGF0ZS5maWx0ZXIoKGl0ZW06U3RhdGUpID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0ua2V5LnRvTG93ZXJDYXNlKCkgPT09IGtleS50b0xvd2VyQ2FzZSgpO1xuICAgICAgfSk7XG4gICAgICBpZiAoYXJyICYmIGFyci5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGFyclswXVsndmFsdWUnXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxufVxuIl19