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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGItYmFzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGItYmFzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUU1Qyw4Q0FBMkM7QUFHM0MsaUNBQStCO0FBQy9CLG1DQUFpQztBQUVqQyxtQ0FBZ0M7QUFFaEMsZ0NBQTZCO0FBRTdCO0lBQW1DLGlDQUFJO0lBb0JyQztRQUFBLFlBQ0UsaUJBQU8sU0FlUjtRQWJDLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBRXRCLEtBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSx1QkFBVSxDQUNuQyxVQUFDLFFBQWEsSUFBSyxPQUFBLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLEVBQWpDLENBQWlDLENBQ3JELENBQUMsS0FBSyxFQUFFLENBQUM7UUFFVixDQUFDLElBQUksTUFBTSxDQUFDLGVBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7WUFDakMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDdEMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDckMsS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDckIsQ0FBQyxFQUFFLFVBQUEsS0FBSztZQUNOLEtBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDOztJQUNMLENBQUM7SUE3QkQsc0JBQUksbUNBQVE7YUFBWjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLENBQUM7YUFFRCxVQUFhLEtBQVU7WUFDckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckMsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDOzs7T0FUQTtJQStCSCxvQkFBQztBQUFELENBQUMsQUF4Q0QsQ0FBbUMsV0FBSSxHQXdDdEM7QUF4Q1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgU3FsaXRlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXNxbGl0ZScpO1xuXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQge09ic2VydmVyfSAgIGZyb20gJ3J4anMvT2JzZXJ2ZXInO1xuXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3NoYXJlJztcblxuaW1wb3J0IHtDb25maWd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7TW9kZWxJbnRlcmZhY2V9IGZyb20gJy4vbW9kZWwuaW50ZXJmYWNlJztcbmltcG9ydCB7QmFzZX0gZnJvbSAnLi4vYmFzZSc7XG5cbmV4cG9ydCBjbGFzcyBEYkJhc2VTZXJ2aWNlIGV4dGVuZHMgQmFzZSB7XG5cbiAgZGF0YWJhc2VDaGFuZ2UkOiBPYnNlcnZhYmxlPGFueT47XG5cbiAgcHJpdmF0ZSBfZGF0YWJhc2U6IGFueTtcbiAgcHJpdmF0ZSBfZGF0YWJhc2VPYnNlcnZlcjogT2JzZXJ2ZXI8YW55PjtcblxuICBnZXQgZGF0YWJhc2UoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YWJhc2U7XG4gIH1cblxuICBzZXQgZGF0YWJhc2UodmFsdWU6IGFueSkge1xuICAgIGlmICh0aGlzLl9kYXRhYmFzZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2RhdGFiYXNlID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5fZGF0YWJhc2VPYnNlcnZlcikge1xuICAgICAgICB0aGlzLl9kYXRhYmFzZU9ic2VydmVyLm5leHQodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9kYXRhYmFzZSA9IG51bGw7XG5cbiAgICB0aGlzLmRhdGFiYXNlQ2hhbmdlJCA9IG5ldyBPYnNlcnZhYmxlPGFueT4oXG4gICAgICAob2JzZXJ2ZXI6IGFueSkgPT4gdGhpcy5fZGF0YWJhc2VPYnNlcnZlciA9IG9ic2VydmVyXG4gICAgKS5zaGFyZSgpO1xuXG4gICAgKG5ldyBTcWxpdGUoQ29uZmlnLmRiRmlsZSkpLnRoZW4oZGIgPT4ge1xuICAgICAgZGIucmVzdWx0VHlwZShTcWxpdGUuUkVTVUxUU0FTT0JKRUNUKTtcbiAgICAgIGRiLnZhbHVlVHlwZShTcWxpdGUuVkFMVUVTQVJFTkFUSVZFKTtcbiAgICAgIHRoaXMuZGF0YWJhc2UgPSBkYjtcbiAgICB9LCBlcnJvciA9PiB7XG4gICAgICB0aGlzLmNvbnNvbGVMb2dNc2coXCJPUEVOIERCIEVSUk9SXCIsIGVycm9yKTtcbiAgICB9KTtcbiAgfVxuXG5cblxufVxuIl19